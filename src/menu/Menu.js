import MenuNode from "./MenuNode";
import MenuItem from "./MenuItem";
import {addClasses} from "core/utility";
import {parseBoolean, parseIntValue, parseAny, parseHTML} from "core/utility";
import {inherit} from './decorators';
import AutoLoader from "autoloader";
import Attribute, {DROP, TRUE} from "core/attributes";


const parseBooleanOrInt = (value) => parseAny(value, parseBoolean, parseIntValue),
    timeAttribute = new Attribute(parseBooleanOrInt, DROP, TRUE),
    boolAttribute = new Attribute(parseBoolean, DROP, TRUE),
    stringAttribute = new Attribute(null, DROP, TRUE);


export const MENU_PARAMETERS = {
    closeOnBlur: timeAttribute,
    timeout: timeAttribute,
    autoActivate: timeAttribute,
    multiActive: boolAttribute,
    openOnHover: timeAttribute,
    closeOnSelect: boolAttribute,
    delay: timeAttribute,
    toggle: stringAttribute,
    visible: boolAttribute
};


/**
 * @abstract
 */
export class AbstractMenu extends MenuNode {
    // Used to parse attributes on elements to their correct type during initializing by
    // parsing the DOM tree.
    static __attributes__ = MENU_PARAMETERS;

    @inherit positioner;

    constructor() {
        super();
        this.menuNodeType = "menu";

        this.closeOnBlur = false; // both sub-item and menu
        this.timeout = false; // both sub-item and menu
        this.autoActivate = false; // sub-item property
        this.openOnHover = false; // sub-item property
        this.toggle = "none";
        this.closeOnSelect = true; // both sub-item and menu.
        this.multiActive = false; // menu only
        this.delay = false; // sub-item property
        this.positioner = "inherit";
    }

    registerTopics() {
        // On child is activate
        // deactivate siblings if multiple is false.
        this.on('activate', (target) => {
            if(target.parent === this) {
                if (!this.isActive) {
                    this.activate();
                }

                if(!this.multiActive) {
                    for (let activeItem of this.activeItems) {
                        if (activeItem !== target) {
                            activeItem.deactivate();
                        }
                    }
                }
            }
        });

        this.on('deactivate', (target) => {
            if(target.parent === this) {
                if (this.isActive && this.activeItems.length === 0) {
                    this.deactivate();
                }
            }
        });

        this.on('event.click', (event) => this.onClick(event));
        this.on('event.mouseover', (event) => this.onMouseOver(event));
        this.on('event.mouseout', (event) => this.onMouseOut(event));
        this.on('menuitem.selected', (event) => this.onSelect(event));
    }

    activate() {
        if(!this.isActive) {
            let parent = this.parent;

            // Set isActivate flag and add active classes.
            this.isActive = true;

            // Register document click handler
            if(this.closeOnBlur && !this._captureDocumentClick) {
                this._captureDocumentClick = {
                    target: document,

                    onDocumentClick: (event) => {
                        if(!this.element.contains(event.target)) {
                            this.deactivate();
                        }
                    }
                };

                this._captureDocumentClick.target.addEventListener('click', this._captureDocumentClick.onDocumentClick);
            }

            // Notify parent that submenu activated.
            if(parent) {
                parent.publish('submenu.activate', this);
            }

            this.publish('menu.activate');

            // Dispatch dom events.
            this.element.dispatchEvent(new CustomEvent('menu.activate', {
                detail: this,
                bubbles: true
            }));
        }
    }

    deactivate() {
        if(this.isActive) {
            // Set flag and remove active classes.
            this.isActive = false;

            // Clear any active child items.
            this.clearItems();

            // Remove document click handler that tracks user clicks outside of menu tree.
            if(this._captureDocumentClick) {
                this._captureDocumentClick.target.removeEventListener('click', this._captureDocumentClick.onDocumentClick);
                this._captureDocumentClick = null;
            }

            // clear timers
            this.clearTimer('timeout');

            for(let child of this.children) {
                child.clearTimer('activateItem');
            }

            // Notify parent that submenu deactivated.
            let parent = this.parent;
            if(parent) {
                parent.publish('submenu.deactivate', this);
            }

            this.publish('menu.deactivate');

            // Dispatch dom events.
            this.element.dispatchEvent(new CustomEvent('menu.deactivate', {
                detail: this,
                bubbles: true
            }));
        }
    }

    show() {
        if(!this.isVisible) {
            this.isVisible = true;

            if(this.parent) this.parent.publish('submenu.show', this);
            this.publish('menu.show', this);

            this.element.dispatchEvent(new CustomEvent('menu.show', {
                detail: this,
                bubbles: true
            }));
        }
    }

    hide() {
        if(this.isVisible) {
            this.isVisible = false;

            if(this.parent) this.parent.publish('submenu.hide', this);
            this.publish('menu.hide', this);

            this.element.dispatchEvent(new CustomEvent('menu.hide', {
                detail: this,
                bubbles: true
            }));
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Tree methods.

    createItems(data) {
        for(let {submenu, ...args} of data) {
            let item = new this.MenuItemClass(args);

            if(submenu) {
                let _submenu = new this.SubMenuClass(submenu);
                item.attachSubMenu(_submenu);
            }

            this.append(item);
        }
    }

    addItem(text, action=null) {
        let item = new this.MenuItemClass({text, action});
        this.append(item);
        return this;
    }

    removeItem(item) {
        let index = this._children.indexOf(item);
        if(index !== -1) {
            this._children.splice(index, 1);
            if(item.element.parentElement) item.element.parentElement.removeChild(item.element);
        }
    }

    hasItem(item) {
        return this._children.indexOf(item) !== -1;
    }

    append(item) {
        let body = this.getMenuBody();

        body = body[body.length - 1];

        if(item.nodeType) {
            body.appendChild(item);
            return this;
        }

        if(item.parent) {
            item.parent.removeItem(item);
        }

        item.appendTo(body);

        if(item.isMenuItem && item.isMenuItem()) {
            item._parent = this;
            this._children.push(item);
        }

        return this;
    }

    get activeItems() {
        let r = [];

        for(let item of this.children) {
            if(item.isActive) {
                r.push(item);
            }
        }

        return r;
    }

    clearItems() {
        for(let child of this.activeItems) {
            child.deactivate();
        }
    }

    /**
     * Returns list of all menu bodies for the menu.
     *
     * Menu bodies are where item are appended when using function like addItem or append.  They will be added to the
     * last menu body in the menu.
     *
     * @returns {NodeListOf<HTMLElementTagNameMap[string]> | NodeListOf<Element> | NodeListOf<SVGElementTagNameMap[string]> | HTMLElement[]}
     */
    getMenuBody() {
        let bodies = Array.prototype.slice.call(this.element.querySelectorAll(':scope > .menu__body'));

        if(!bodies.length) {
            return [this.element];
        } else {
            // noinspection JSValidateTypes
            return bodies;
        }
    }

    isMenu() {
        return true;
    }

    setParent(parent) {
        parent.attachSubMenu(this);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers

    onMouseOver() {
        this.clearTimer('timeout');
    }

    onMouseOut(event) {
        if(!this.element.contains(event.originalEvent.relatedTarget)) {
            if(this.isActive && typeof this.timeout === 'number' && this.timeout >= 0) {
                this.startTimer('timeout', () => {
                    this.deactivate();
                }, this.timeout);
            }
        }
    }

    onClick(event) {
        if(event.target === this) {
            if(this.isActive && this.toggleOff) {
                this.deactivate();
            } else if(!this.isActive && this.toggleOn) {
                this.activate();
            }
        }
    }

    onSelect() {
        if(this.closeOnSelect && this.isActive) {
            this.deactivate();
        }
    }

    /**
     * Will return true if menu items should toggle on.
     *
     * @returns {boolean}
     */
    get toggleOn() {
        return this.toggle === 'on' || this.toggle === 'both';
    }

    /**
     * Will return true if menu items should toggle off.
     *
     * @returns {boolean}
     */
    get toggleOff() {
        return this.toggle === 'off' || this.toggle === 'both';
    }
}


/**
 * A component for rendering nestable list of selectable items.
 */
export default class Menu extends AbstractMenu {
    /**
     *
     * @param target {String|HTMLElement}
     * @param closeOnBlur {Boolean|Number}
     * @param timeout {Boolean|Number}
     * @param autoActivate {Boolean|Number}
     * @param multiActive {Boolean|"inherit"|"root"}
     * @param openOnHover {Boolean|Number}
     * @param toggle {"on"|"off"|"both"|"none"}
     * @param closeOnSelect {Boolean}
     * @param delay {Boolean|Number}
     * @param id {String}
     * @param classes {String}
     * @param children {Array}
     * @param visible
     * @param filter
     * @param context
     */
    constructor({target=null, closeOnBlur=false, timeout=false, autoActivate=true, multiActive=false, openOnHover=true,
                    toggle="on", closeOnSelect=true, delay=0, id=null, classes=null,
                    children=null, visible=false, filter=false, ...context}={}) {
        super();
        this.events = null;
        this.MenuItemClass = MenuItem;
        this.SubMenuClass = Menu;

        this.closeOnBlur = closeOnBlur;
        this.timeout = timeout;
        this.autoActivate = autoActivate;
        this.multiActive = multiActive;
        this.openOnHover = openOnHover;
        this.toggle = toggle;
        this.closeOnSelect = closeOnSelect;
        this.delay = delay;

        if(target) {
            this.element = target;
        } else {
            this.element = this.render(context);
        }

        this.isVisible = visible;

        if(classes) addClasses(this.element, classes);
        if(id) this.element.id = id;

        this.registerTopics();
        this.parseDOM();
        this.init();

        if(children) {
            this.createItems(children);
        }
    }

    /**
     * Renders the domElement of the widget.
     *
     * @param arrow
     * @returns {HTMLElement|Element}
     */
    render({arrow=false}={}) {
        let html = `
            <div class="menu">
                ${arrow ? `<div class="menu__arrow"></div>` : ""}
                <div class="menu__body"></div>
            </div>
        `;

        let fragment = parseHTML(html);
        return fragment.children[0];
    }
}


AutoLoader.register('menu', (element) => {
    return Menu.FromHTML(element);
});
