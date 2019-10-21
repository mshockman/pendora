import MenuNode from "./MenuNode";
import {inherit} from "./decorators";
import Menu from './Menu';
import {parseAny, parseBoolean, parseIntValue} from "../core/utility";
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


export default class MenuItem extends MenuNode {
    @inherit toggle;
    @inherit autoActivate;
    @inherit openOnHover;
    /**@type{boolean|Number|"inherit"|"root"}*/
    @inherit delay = false;
    @inherit position;

    static __attributes__ = ITEM_ATTRIBUTES;

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
        this.MenuItemClass = MenuItem;
        this.SubMenuClass = Menu;

        this.on('event.click', (event) => this.onClick(event));
        this.on('event.mouseover', (event) => this.onMouseOver(event));
        this.on('event.mouseout', (event) => this.onMouseOut(event));
        this.on('menuitem.selected', (event) => this.onSelect(event));
    }

    render({text, nodeName="div", href=null}={}) {
        let element = document.createElement(nodeName),
            button = document.createElement('a');

        element.className = "menuitem";
        button.type = "button";
        button.innerHTML = text;
        button.className = "menuitem__button";

        if(href) {
            button.href = href;
        }

        element.appendChild(button);
        return element;
    }

    /**
     *
     * @param show {boolean|number}
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

    select() {
        this.publish('selected');
        this.dispatchTopic('menuitem.selected', {target: this});

        this.element.dispatchEvent(new CustomEvent('menuitem.selected', {
            detail: this,
            bubbles: true
        }));
    }

    isMenuItem() {
        return true;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Action management

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

    removeAction(action) {
        this.off('selected', action);
    }

    hasAction(action) {
        return this.hasEvent('selected', action);
    }

    clearActions() {
        this.off('selected');
    }

    //------------------------------------------------------------------------------------------------------------------
    // Manage submenu

    attachSubMenu(submenu) {
        if(this.submenu) {
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

    detachSubMenu(remove=true) {
        let submenu = this.submenu;

        if(submenu) {
            this._children = [];
            submenu._parent = null;
            if(remove) submenu.remove();
        }

        return submenu;
    }

    hasSubMenu() {
        return !!this.submenu;
    }

    isSubMenuVisible() {
        return this.hasSubMenu() ? this.submenu.isVisible : false;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event handlers

    onSelect() {
        if(this.closeOnSelect && this.isActive) {
            this.deactivate();
        }
    }

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

    onMouseOver(event) {
        this.clearTimer('timeout');

        if(event.target === this) {
            // When the mouse moves on an item clear any active items in it's submenu.
            if (this.submenu) {
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

    onMouseOut(event) {
        if(this.element.contains(event.originalEvent.relatedTarget)) return;

        this.clearTimer('activateItem');

        if(this.parent) {
            this.parent.publish('mouse-leave-item', this, event);
        }

        if(event.target === this && (!this.hasSubMenu() || !this.submenu.isVisible) && this.isActive) {
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

    set submenu(value) {
        if(!value) {
            this.detachSubMenu();
        } else {
            this.attachSubMenu(value);
        }
    }
}
