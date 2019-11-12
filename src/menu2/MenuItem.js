import MenuNode from "./MenuNode";
import {inherit} from "./decorators";
import Menu from './Menu';
import {parseAny, parseBoolean, parseIntValue, parseHTML} from "../core/utility";
import Attribute, {DROP, TRUE} from "core/attributes";


const parseBooleanOrInt = (value) => parseAny(value, parseBoolean, parseIntValue),
    timeAttribute = new Attribute(parseBooleanOrInt, DROP, TRUE),
    boolAttribute = new Attribute(parseBoolean, DROP, TRUE),
    stringAttribute = new Attribute(null, DROP, TRUE);


export const ITEM_ATTRIBUTES = {
    closeOnBlur: timeAttribute,
    timeout: timeAttribute,
    autoActivate: timeAttribute,
    multiple: boolAttribute,
    openOnHover: timeAttribute,
    closeOnSelect: boolAttribute,
    deactivateOnItemHover: boolAttribute,
    delay: timeAttribute,
    position: stringAttribute,
    toggle: stringAttribute
};


/**
 * @abstract
 */
export class AbstractMenuItem extends MenuNode {
    @inherit toggle;
    @inherit autoActivate;
    @inherit openOnHover;
    /**@type{boolean|Number|"inherit"|"root"}*/
    @inherit delay = false;
    @inherit position;

    static __attributes__ = ITEM_ATTRIBUTES;

    constructor() {
        super();
        this.menuNodeType = "menuitem";

        this.toggle = "both";
        this.autoActivate = false;
        this.openOnHover = false;
        this.delay = false;
        this.closeOnSelect = false;
        this.closeOnBlur = false;
        this.timeout = false;
        this.position = null;
        this.multiple = false;
        this.clearSubItemsOnHover = true;
        this.autoDeactivateItems = true;
    }

    registerTopics() {
        this.on('event.click', (event) => this.onClick(event));
        this.on('event.mouseover', (event) => this.onMouseOver(event));
        this.on('event.mouseout', (event) => this.onMouseOut(event));
        this.on('menuitem.selected', (event) => this.onSelect(event));
    }

    /**
     * Activates the item.
     *
     * @param show {boolean|number} - The number of milliseconds after the item activates that the submenu will display.
     */
    activate(show=true) {
        if(this.isActive) return;
        this.isActive = true;

        this.clearTimer('activateItem');

        if(this.submenu) {
            if(show === true) {
                this.submenu.show();
            } else if(typeof show === 'number' && show >= 0) {
                this.startTimer('showTimer', () => {
                    this.submenu.show();
                }, show);
            }
        }

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

        this.publish('activate', this);

        if(this.parent) {
            this.parent.publish('activate', this);
        }

        this.element.dispatchEvent(new CustomEvent('menuitem.activate', {
            detail: this,
            bubbles: true
        }));
    }

    /**
     * Deactivates the item.
     */
    deactivate() {
        if(!this.isActive) return;
        this.isActive = false;
        this.clearTimer('showTimer');

        if(this.submenu) {
            this.submenu.deactivate();
            this.submenu.hide();
        }

        // Remove document click handler that tracks user clicks outside of menu tree.
        if(this._captureDocumentClick) {
            this._captureDocumentClick.target.removeEventListener('click', this._captureDocumentClick.onDocumentClick);
            this._captureDocumentClick = null;
        }

        this.publish('deactivate', this);
        if(this.parent) this.parent.publish('deactivate', this);

        this.element.dispatchEvent(new CustomEvent('menuitem.deactivate', {
            detail: this,
            bubbles: true
        }));
    }

    /**
     * Triggers a select item event.
     */
    select() {
        this.publish('selected');
        this.dispatchTopic('menuitem.selected', {target: this});

        this.element.dispatchEvent(new CustomEvent('menuitem.selected', {
            detail: this,
            bubbles: true
        }));
    }

    /**
     * Returns true if the menu node is a menu item.
     *
     * @returns {boolean}
     */
    isMenuItem() {
        return true;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Action management

    /**
     * Adds an action that will be called when the user selects the item.
     *
     * @param action {Function|String} - A callback to call when the action occurs.
     * @returns {Function}
     */
    addAction(action) {
        if(typeof action === 'string') {
            let fn = () => {
                window.location = action;
            };

            this.on('selected', fn);
            return fn;
        } else {
            this.on('selected', action);
            return action;
        }
    }

    /**
     * Removes an action.
     * @param action
     */
    removeAction(action) {
        this.off('selected', action);
    }

    /**
     * Tests to see if the item has an action.
     * @param action
     * @returns {boolean}
     */
    hasAction(action) {
        return this.hasEvent('selected', action);
    }

    /**
     * Removes all actions from the item.
     */
    clearActions() {
        this.off('selected');
    }

    //------------------------------------------------------------------------------------------------------------------
    // Manage submenu

    /**
     * Attaches a submenu to the menuitem.
     *
     * @param submenu
     */
    attachSubMenu(submenu) {
        if(this.submenu) {
            if(this.submenu === submenu) return;
            throw new Error("MenuItem can only have one submenu.");
        }

        if(submenu.parent) {
            submenu.parent.detachSubMenu();
        }

        submenu._parent = this;
        this._children = [submenu];

        if(!submenu.element.parentElement) {
            submenu.appendTo(this.element);
        }
    }

    /**
     * Detaches the submenu from the item.
     * @param remove {Boolean} If true the submenu will be removed from the dom.
     * @returns {*} The detached submenu.
     */
    detachSubMenu(remove=true) {
        let submenu = this.submenu;

        if(submenu) {
            this._children = [];
            submenu._parent = null;
            if(remove) submenu.remove();
        }

        return submenu;
    }

    /**
     * Returns true if the menu item has a submenu.
     * @returns {boolean}
     */
    hasSubMenu() {
        return !!this.submenu;
    }

    /**
     * Returns true if the item has a submenu and that submenu is visible.
     * @returns {boolean}
     */
    isSubMenuVisible() {
        return this.hasSubMenu() ? this.submenu.isVisible : false;
    }

    setParent(parent) {
        this._parent = parent;
        parent._children.push(this);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event handlers

    /**
     * Handles select events.
     */
    onSelect() {
        if(this.closeOnSelect && this.isActive) {
            this.deactivate();
        }
    }

    /**
     * Handles click events.
     * @param event
     */
    onClick(event) {
        let isDisabled = this.getDisabled();

        if(isDisabled) {
            event.preventDefault();
        }

        if(event.target !== this) return;

        if(this.parent) {
            this.parent.publish('click-item', this, event);
        }

        if(!isDisabled) {
            if (this.isActive && this.hasSubMenu() && !this.isSubMenuVisible()) {
                this.submenu.show();
            } else if (!this.isActive && this.toggleOn) {
                this.activate();
            } else if (this.isActive && this.toggleOff && this.hasSubMenu()) {
                this.deactivate();
            }

            if (this.isActive && !this.hasSubMenu()) {
                this.select();
            }
        }
    }

    /**
     * Handles on mouse over events.
     * @param event
     */
    onMouseOver(event) {
        this.clearTimer('timeout');

        if(event.target === this) {
            // When the mouse moves on an item clear any active items in it's submenu.
            if (this.submenu && this.clearSubItemsOnHover) {
                this.submenu.clearItems();
            }

            if(this.element.contains(event.originalEvent.relatedTarget)) return;

            let activate = this.parent && this.parent.isActive ? this.openOnHover : this.autoActivate;

            if (this.parent) {
                this.parent.publish('mouse-enter-item', this, event);
            }

            if (!this.isActive && !this.isDisabled) {
                if (activate === true) {
                    this.activate(typeof this.delay === 'boolean' ? !this.delay : this.delay);
                } else if (typeof activate === 'number' && activate >= 0) {
                    this.startTimer('activateItem', () => {
                        if (!this.isDisabled) {
                            this.activate(typeof this.delay === 'boolean' ? !this.delay : this.delay);
                        }
                    }, activate);
                }
            }
        }
    }

    /**
     * Handles on mouse out events.
     *
     * @param event
     */
    onMouseOut(event) {
        if(this.element.contains(event.originalEvent.relatedTarget)) return;

        this.clearTimer('activateItem');

        if(this.parent) {
            this.parent.publish('mouse-leave-item', this, event);
        }

        if(this.autoDeactivateItems && event.target === this && (!this.hasSubMenu() || !this.submenu.isVisible) && this.isActive) {
            this.deactivate();
        }

        if(this.isActive && typeof this.timeout === 'number' && this.timeout >= 0) {
            this.startTimer('timeout', () => {
                this.deactivate();
            }, this.timeout);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Getters and Setters

    get button() {
        if(!this._button) {
            this._button = Array.prototype.slice.call(this.element.children).find(node => node.matches("button, a, .btn, [data-role='button']"));
        }

        return this._button;
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

    get submenu() {
        return this._children[0];
    }

    /**
     * Property wrapper around attachSubMenu and detachSubMenu methods.
     * @param value
     */
    set submenu(value) {
        if(!value) {
            this.detachSubMenu();
        } else {
            this.attachSubMenu(value);
        }
    }
}


export default class MenuItem extends AbstractMenuItem {
    constructor({target, text, action, href=null, toggle="inherit", autoActivate="inherit", openOnHover="inherit",
                    delay='inherit', closeOnSelect=false, closeOnBlur=false, classes, timeout=false,
                    nodeName="div", position="inherit", multiple=false, ...context}={}) {
        super();

        if(target) {
            this.element = target;
        } else {
            this.element = this.render({text, nodeName, href, ...context});
        }

        if(classes) {
            this.addClass(classes);
        }

        if(action) this.addAction(action);

        this.toggle = toggle;
        this.autoActivate = autoActivate;
        this.openOnHover = openOnHover;
        this.delay = delay;
        this.closeOnSelect = closeOnSelect;
        this.closeOnBlur = closeOnBlur;
        this.timeout = timeout;
        this.position = position;
        this.multiple = multiple;
        this.clearSubItemsOnHover = true;
        this.autoDeactivateItems = true;
        this.MenuItemClass = MenuItem;
        this.SubMenuClass = Menu;

        this.registerTopics();
        this.parseDOM();
    }

    /**
     * Renders the domElement.
     *
     * @param text {String}
     * @param nodeName
     * @param href
     * @returns {HTMLElement|Element}
     */
    render({text, nodeName="div", href=null}={}) {
        let html = `
            <${nodeName} class="menuitem">
                <a class="menuitem__button" ${href ? `href="${href}"` : ""}>${text}</a>
            </${nodeName}>
        `;

        let fragment = parseHTML(html);
        return fragment.children[0];
    }
}
