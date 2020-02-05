import MenuNode from "./MenuNode";
import {inherit} from "./decorators";
import Menu from './Menu';
import {findChild, createFragment, selectElement} from "../core/utility";
import {AttributeSchema, Attribute, CompoundType, Bool, Integer, Str} from "../core/serialize";


const INT_OR_BOOL_TYPE = new Attribute(new CompoundType(Bool, Integer), Attribute.DROP, Attribute.DROP),
    BOOL_TYPE = new Attribute(Bool, Attribute.DROP, Attribute.DROP),
    STRING_TYPE = new Attribute(Str, Attribute.DROP, Attribute.DROP);


export const MENU_ITEM_ATTRIBUTE_SCHEMA = new AttributeSchema({
    closeOnBlur: INT_OR_BOOL_TYPE,
    timeout: INT_OR_BOOL_TYPE,
    autoActivate: INT_OR_BOOL_TYPE,
    openOnHover: INT_OR_BOOL_TYPE,
    closeOnSelect: BOOL_TYPE,
    delay: INT_OR_BOOL_TYPE,
    positioner: STRING_TYPE,
    toggle: BOOL_TYPE
});


/**
 * @abstract
 */
export class AbstractMenuItem extends MenuNode {
    @inherit toggle;
    @inherit autoActivate;
    @inherit openOnHover;
    @inherit delay = false;
    @inherit positioner;

    constructor({target, targetKey, toggle, autoActivate, openOnHover, delay, closeOnSelect, closeOnBlur, timeout, positioner,
                clearSubItemsOnHover, autoDeactivateItems, ...context}) {
        super(target);

        /**
         * During keyboard navigation, specifies the key that the user the click to target the menuitem directly.
         * @type {null|String}
         */
        this.targetKey = targetKey;

        /**
         * Controls how click behavior works.  on is for toggle on only when clicked, off is for toggle off only, both
         * will toggle both on and off and none will cause the item to not be toggleable.
         * @type {string}
         */
        this.toggle = toggle;

        /**
         * Controls if the menuitem will activating when the user mouses over it when it's parent is unactive or if the menuitem has no parent.
         * When the parent is active, openOnHover is used instead.
         * @type {string|Number|Boolean}
         */
        this.autoActivate = autoActivate;

        /**
         * Overrides autoActivate when the items parent menu is active.  If null autoActivate is still used.
         * See autoActivate for more details.
         * @type {string}
         */
        this.openOnHover = openOnHover;

        /**
         * Adds adds a delay between a menuitem activating and the menuitem displaying it's submenu.
         * @type {string|Number|Boolean}
         */
        this.delay = delay;

        /**
         * If true the item will close when a descendent menuitem is selected.
         * @type {boolean}
         */
        this.closeOnSelect = closeOnSelect;

        /**
         * If true the menuitem will close when the user clicks the page outside of the item.
         * @type {boolean}
         */
        this.closeOnBlur = closeOnBlur;

        /**
         * Controls the amount of time after the user leaves the menuitem that it will remain open.  Time is given in milliseconds.
         * Negative values or false will cause the menuitem to never timeout.  True is interpreted as 0 milliseconds.
         * @type {boolean|Number}
         */
        this.timeout = timeout;

        /**
         * A function that is used to position the menuitem's submenu.
         * @type {null|Function}
         */
        this.positioner = positioner;

        /**
         * If true the menuitem will attempt to deactivate any descending menu-items when the user hover over the direct item.
         * @type {boolean}
         */
        this.clearSubItemsOnHover = clearSubItemsOnHover;

        /**
         * If true the menuitem will deactivate when the user leaves it if it doesn't have a submenu that it needs to keep open.
         * @type {boolean}
         */
        this.autoDeactivateItems = autoDeactivateItems;

        this.button = null;
    }

    registerTopics() {
        if(!this._isTopicInit) {
            super.registerTopics();
            this.on('event.click', (event) => this.onClick(event));
            this.on('event.mouseover', (event) => this.onMouseOver(event));
            this.on('event.mouseout', (event) => this.onMouseOut(event));
            this.on('menuitem.select', (event) => this.onSelect(event));
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

        if(this.hasSubMenu()) {
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
    select(data={}) {
        let topic = {target: this, ...data};

        this.publish('select', topic);

        this.dispatchTopic('menuitem.select', topic);

        this.element.dispatchEvent(new CustomEvent('menuitem.select', {
            detail: topic,
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

            this.on('select', fn);
            return fn;
        } else {
            this.on('select', action);
            return action;
        }
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Removes an action.
     * @param action
     */
    removeAction(action) {
        this.off('select', action);
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Tests to see if the item has an action.
     * @param action
     * @returns {boolean}
     */
    hasAction(action) {
        return this.hasEvent('select', action);
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Removes all actions from the item.
     */
    clearActions() {
        this.off('select');
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
        return this.appendChildMenuNode(submenu);
    }

    appendChildMenuNode(submenu) {
        if(submenu.parent === this || this.submenu === submenu) return;

        if(this.submenu) {
            throw new Error("MenuItem can only have one submenu.");
        }

        if(submenu.parent) {
            submenu.parent.detachSubMenu();
        }

        super.appendChildMenuNode(submenu);

        this.element.classList.add('has-submenu');

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
        if(this.submenu) {
            let submenu = this.submenu;
            this.removeChildMenuNode(submenu);
            if(remove) submenu.element.parentElement.removeChild(submenu.element);
            return submenu;
        }
    }

    removeChildMenuNode(submenu) {
        super.removeChildMenuNode(submenu);

        if(!this.children.length) {
            this.element.classList.remove('has-submenu');
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

    clearActiveChild() {
        if(this.submenu && this.submenu.clearActiveChild) {
            this.submenu.clearActiveChild();
        }
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
            event.originalEvent.preventDefault();
        }

        if(event.target !== this) return;

        let isDefaultPrevented = false;

        // noinspection JSUnusedGlobalSymbols
        this.dispatchTopic('menuitem.click', {
            ...event,
            relatedTarget: event.target,
            target: this,

            preventDefault() {
                isDefaultPrevented = true;
            },

            isDefaultPrevented() {
                return isDefaultPrevented;
            }
        });

        let isActive = this.isActive,
            hasSubMenu = this.hasSubMenu(),
            isSubMenuVisible = this.isSubMenuVisible(),
            toggle = this.toggle;

        // Recheck in case it was updated by an event.
        isDisabled = this.getDisabled();

        if(!isDisabled && !isDefaultPrevented) {
            if (isActive && hasSubMenu && !isSubMenuVisible) {
                this.showSubMenu();
            } else if (!isActive) {
                this.activate();
            } else if (isActive && toggle && hasSubMenu) {
                this.deactivate();
            }

            if (isActive && !hasSubMenu) {
                this.select({trigger: event});
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
            if (this.hasSubMenu() && this.clearSubItemsOnHover) {
                // this.submenu.clearActiveChild();
                this.clearActiveChild();
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

        if(this.autoDeactivateItems && event.target === this && (!this.hasSubMenu() || !this.isSubMenuVisible()) && this.isActive) {
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

    get submenu() {
        return this.children[0];
    }

    _navigate(event, _depth=0) {
        if(_depth === 0 && this.hasSubMenu()) {
            return this.submenu._navigate(event, 0);
        } else if(this.parent) {
            return this.parent._navigate(event, _depth);
        }
    }

    static getAttributes(element) {
        return {
            ...super.getAttributes(element),
            ...MENU_ITEM_ATTRIBUTE_SCHEMA.deserialize(element.dataset)
        }
    }
}


export default class MenuItem extends AbstractMenuItem {
    constructor({target, text=null, action, href=null, toggle="inherit", autoActivate="inherit", openOnHover="inherit",
                    delay='inherit', closeOnSelect=false, closeOnBlur=false, timeout=false,
                    nodeName="div", positioner="inherit"}={}) {
        let btn, content, submenu;

        if(target) {
            target = selectElement(target);

            btn = findChild(target, "[data-button]");
            submenu = findChild(target, "[data-menu]");

            if(submenu) {
                submenu.parentElement.removeChild(submenu);
            }

            if(!btn) {
                content = document.createDocumentFragment();

                while(target.firstChild) {
                    content.appendChild(target.firstChild);
                }

                target.appendChild(createFragment(`
                <a class="menuitem__button" data-button>
                    <span class="menuitem__check"></span>
                    <span class="menuitem__text" data-text></span>
                    <span class="menuitem__alt-text" data-alt-text></span>
                    <span class="menuitem__caret"></span>
                </a>`));

                let textContainer = target.querySelector('[data-text]');

                textContainer.appendChild(content);
            }
        } else {
            target = document.createElement(nodeName);

            target.appendChild(createFragment(`
                <a class="menuitem__button" data-button>
                    <span class="menuitem__check"></span>
                    <span class="menuitem__text" data-text></span>
                    <span class="menuitem__alt-text" data-alt-text></span>
                    <span class="menuitem__caret"></span>
                </a>`));
        }

        super({
            toggle,
            autoActivate,
            openOnHover,
            delay,
            closeOnSelect,
            closeOnBlur,
            timeout,
            positioner,
            clearSubItemsOnHover: true,
            autoDeactivateItems: true,

            target,
            text,
            href,
            nodeName
        });

        this.textContainer = this.element.querySelector("[data-text]");
        this.altTextContainer = this.element.querySelector("[data-alt-text]");
        this.button = this.element.querySelector("[data-button]");
        this.element.classList.add('menuitem');
        this.element.tabIndex = -1;

        if(action) this.addAction(action);

        if(submenu) {
            this.attachSubMenu(this.constructSubMenu({target: submenu}));
        }

        if(text !== null) {
            this.text = text;
        }

        if(href !== null) {
            this.href = href;
        }

        this.registerTopics();
    }

    constructMenuItem(config) {
        return new MenuItem(config);
    }

    constructSubMenu(config) {
        return new Menu(config);
    }

    get text() {
        return this.textContainer.innerText;
    }

    set text(value) {
        this.textContainer.innerText = value;
    }

    get href() {
        if(this.button.nodeName === "A") {
            return this.button.href;
        } else {
            return null;
        }
    }

    set href(value) {
        if(this.button.nodeName === 'A') {
            this.button.href=  value;
        } else {
            throw new Error("Cannot assign href to menuitem who's button is not an anchor tag.");
        }
    }
}
