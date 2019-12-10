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
    openOnHover: timeAttribute,
    closeOnSelect: boolAttribute,
    delay: timeAttribute,
    positioner: stringAttribute,
    toggle: stringAttribute
};


/**
 * @abstract
 */
export class AbstractMenuItem extends MenuNode {
    @inherit toggle;
    @inherit autoActivate;
    @inherit openOnHover;
    @inherit delay = false;
    @inherit positioner;

    static __attributes__ = ITEM_ATTRIBUTES;

    constructor() {
        super();
        this.menuNodeType = "menuitem";

        /**
         * During keyboard navigation, specifies the key that the user the click to target the menuitem directly.
         * @type {null|String}
         */
        this.targetKey = null;

        /**
         * Controls how click behavior works.  on is for toggle on only when clicked, off is for toggle off only, both
         * will toggle both on and off and none will cause the item to not be toggleable.
         * @type {string}
         */
        this.toggle = "both";

        /**
         * Controls if the menuitem will activating when the user mouses over it when it's parent is unactive or if the menuitem has no parent.
         * When the parent is active, openOnHover is used instead.
         * @type {string|Number|Boolean}
         */
        this.autoActivate = false;

        /**
         * Overrides autoActivate when the items parent menu is active.  If null autoActivate is still used.
         * See autoActivate for more details.
         * @type {string}
         */
        this.openOnHover = false;

        /**
         * Adds adds a delay between a menuitem activating and the menuitem displaying it's submenu.
         * @type {string|Number|Boolean}
         */
        this.delay = false;

        /**
         * If true the item will close when a descendent menuitem is selected.
         * @type {boolean}
         */
        this.closeOnSelect = false;

        /**
         * If true the menuitem will close when the user clicks the page outside of the item.
         * @type {boolean}
         */
        this.closeOnBlur = false;

        /**
         * Controls the amount of time after the user leaves the menuitem that it will remain open.  Time is given in milliseconds.
         * Negative values or false will cause the menuitem to never timeout.  True is interpreted as 0 milliseconds.
         * @type {boolean|Number}
         */
        this.timeout = false;

        /**
         * A function that is used to position the menuitem's submenu.
         * @type {null|Function}
         */
        this.positioner = "inherit";

        /**
         * If true the menuitem will attempt to deactivate any descending menu-items when the user hover over the direct item.
         * @type {boolean}
         */
        this.clearSubItemsOnHover = true;

        /**
         * If true the menuitem will deactivate when the user leaves it if it doesn't have a submenu that it needs to keep open.
         * @type {boolean}
         */
        this.autoDeactivateItems = true;
    }

    registerTopics() {
        if(!this._isTopicInit) {
            super.registerTopics();
            this.on('event.click', (event) => this.onClick(event));
            this.on('event.mouseover', (event) => this.onMouseOver(event));
            this.on('event.mouseout', (event) => this.onMouseOut(event));
            this.on('menuitem.selected', (event) => this.onSelect(event));
        }
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
                this.showSubMenu();
            } else if(typeof show === 'number' && show >= 0) {
                this.startTimer('showTimer', () => {
                    this.showSubMenu();
                }, show);
            }
        }

        // Register document click handler
        if(this.closeOnBlur && !this._captureDocumentClick) {
            this._captureDocumentClick = {
                target: document,

                onDocumentClick: (event) => {
                    if(!this.contains(event.target)) {
                        this.deactivate();
                    }
                }
            };

            this._captureDocumentClick.target.addEventListener('click', this._captureDocumentClick.onDocumentClick);
        }

        let parent = this.parent;
        if(parent && !parent.isActive) {
            parent.activate();
        }

        this.dispatchTopic('menuitem.activate', this);
    }

    /**
     * Deactivates the item.
     */
    deactivate() {
        if(!this.isActive) return;
        this.isActive = false;
        this.clearTimer('showTimer');

        this.hideSubMenu();

        // Remove document click handler that tracks user clicks outside of menu tree.
        if(this._captureDocumentClick) {
            this._captureDocumentClick.target.removeEventListener('click', this._captureDocumentClick.onDocumentClick);
            this._captureDocumentClick = null;
        }

        this.dispatchTopic('menuitem.deactivate', this);
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

    showSubMenu() {
        let submenu = this.submenu;

        if(submenu) {
            submenu.show();
            submenu.position();
        }
    }

    hideSubMenu() {
        if(this.submenu) {
            this.submenu.deactivate();
            this.submenu.hide();
        }
    }

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
            this.parent.publish('click-item', {sender: this, event});
        }

        if(!isDisabled) {
            if (this.isActive && this.hasSubMenu() && !this.isSubMenuVisible()) {
                this.showSubMenu();
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
            if (this.submenu && this.clearSubItemsOnHover && this.submenu.clearActiveChild) {
                this.submenu.clearActiveChild();
            }

            if(this.element.contains(event.originalEvent.relatedTarget)) return;

            let activate = this.parent && this.parent.isActive && this.openOnHover !== null ? this.openOnHover : this.autoActivate;

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

    get text() {
        return this.button.innerText;
    }

    set text(value) {
        this.button.innerText = value;
    }

    _navigate(event, _depth=0) {
        if(_depth === 0 && this.hasSubMenu()) {
            return this.submenu._navigate(event, 0);
        } else if(this.parent) {
            return this.parent._navigate(event, _depth);
        }
    }
}


export default class MenuItem extends AbstractMenuItem {
    constructor({target, text, action, href=null, toggle="inherit", autoActivate="inherit", openOnHover="inherit",
                    delay='inherit', closeOnSelect=false, closeOnBlur=false, classes, timeout=false,
                    nodeName="div", positioner="inherit", ...context}={}) {
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

        this.positioner = positioner;

        this.clearSubItemsOnHover = true;
        this.autoDeactivateItems = true;

        this.MenuItemClass = MenuItem;
        this.SubMenuClass = Menu;

        this.element.tabIndex = -1;

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
