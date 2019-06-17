import {getClosestMenuItem, getClosestMenuNode, getMenuNode, isMenuItem, getTargetChild} from './core';
import MenuItem from "./MenuItem";
import MenuNode from "./MenuNode";
import {parseBoolean, parseBooleanOrInt, validateChoice} from "../core/utility";


/**
 * Represents a Menu component that enables you to display an hierarchically organized set of elements with commands.
 *
 * Remarks
 * ------------------------------
 *
 * The Menu component presents a list of items that either specify a command or contain a nested submenu.  Typically
 * clicking on an item will cause it to either open it's submenu or carry out some command.
 *
 * MenuItem is the most common type of item in a Menu.  A MenuItem can contain an attached submenu with additional child
 * items.  A MenuItem that has a submenu can not contain an action.
 *
 * Although MenuItems are the most common type of item in the Menu, any object can be a child as long as it implements
 * methods to activate, deactivate and tell it's parent when it does so.  For example you can add a static Menu as a
 * direct child to a Menu that implements a different set of rules for it's items such it added a checkable interface.
 *
 * Initializing from code
 * ------------------------------
 *
 * let menu = new Menu();
 *
 * menu.add(new MenuItem({text: "Item #1"});
 * menu.add(new MenuItem({text: "Item #2"});
 * menu.add(new MenuItem({text: "Item #3"});
 *
 * Initializing from html
 * ------------------------------
 *
 * <ul data-role="menu" id="my-menu">
 *      <li data-role="menuitem">Item #1<a></li>
 *      <li data-role="menuitem">Item #2<a></li>
 *      <li data-role="menuitem">Item #3<a></li>
 * </ul>
 *
 * Menu.buildFromHTML('#my-menu');
 *
 * Properties
 * -------------------------------
 *
 * element              References the menus root dom element.
 *
 * timeout              Controls how long after the user moves off the menu that it will timeout.
 *
 * autoActivate         If a number greater then or equal to 0, this property controls how long the user must hover
 *                      over an item for the menu to activate.  If the value is false or a negative number the menu will
 *                      never auto activate. If true or 0 the menu will activate immediately.
 *
 * delay                Gets or sets the delay between the user hovering over the menu item and it activating.  This is
 *                      only used in the cases in which the container menu is already active.  Otherwise the
 *                      autoActivate property is used instead.  If the value is negative items will never activate on
 *                      hover.
 *
 * multiple             Controls if the menu allows multiple items to be active at the same time.
 *
 * position             Gets or sets a function that will be called whenever the menu is shown to position it.
 *
 * toggleItem           Gets or sets how items will behave when the user clicks them.  Can be on, off, both or none.
 *                      If on items will only toggle on when clicked and if off they will only toggle off.
 *                      If both they will toggle both off and on.
 *                      If none nothing will happen when the user clicks an item.
 *
 * toggleMenu           Gets or sets how menus will behave when the user clicks them.  Can be on, off, both or none.
 *                      If on items will only toggle on when clicked and if off they will only toggle off.
 *                      If both they will toggle both off and on.
 *                      If none nothing will happen when the user clicks an item.
 *
 * menuNodeType         A readonly property that is used to determine what kind of MenuNode the element is.
 *
 * isMenu               A readonly property that is used to test if an object is a Menu node.
 *
 * visible              Gets or sets the visibility of the menu.  This only updates the css classes.  It does not
 *                      trigger events. Use the show() and hide() methods if you want to show and hide the menu
 *                      normally, they will update the visible property.
 *
 * closeOnBlur          Gets or sets how the menu will behave when the user clicks outside it.  AKA it looses focus.
 *                      If true the menu will close and deactivate itself.
 *
 * closeOnSelect        Gets or sets the menu's behavior when an item is selected.  Can be either true, false, or
 *                      'child'.  If true the menu will close itself when an item-select event is encountered.
 *                      The special 'child' option is similiar to true but will only close if the item is an immediate
 *                      child item of the menu.
 *
 * deactivateOnItemHover
 *      If true item will automatically deactivate when the user mouses over another item even if that item is disabled.
 */
export default class Menu extends MenuNode {
    static POSITIONERS = {};

    constructor({target=null, closeOnBlur=false, timeout=false, autoActivate=0, delay=false, multiple=false,
                    toggleItem='on', toggleMenu='off', closeOnSelect=false, nodeName='ul', position=null,
                    deactivateOnItemHover=false, classNames, id}={}) {
        let element;

        if(!target) {
            element = document.createElement(nodeName);
        } else if(typeof target === 'string') {
            element = document.querySelector(target);
        } else {
            element = target;
        }

        element.classList.add('c-menu');
        element.dataset.role = 'menu';

        super(element, 'menu', {classNames, id});

        this._timeoutTimer = null;
        this._activateItemTimer = null;

        this.timeout = timeout;
        this.closeOnBlur = closeOnBlur;
        this.autoActivate = autoActivate;
        this.delay = delay;
        this.multiple = multiple;
        this.toggleItem = toggleItem;
        this.toggleMenu = toggleMenu;
        this.closeOnSelect = closeOnSelect;
        this.position = position;

        this.deactivateOnItemHover = deactivateOnItemHover;

        /**
         * Gets or sets the visibility of the menu.  This only updates the css classes.  It does not trigger events.
         * Use the show() and hide() methods if you want to show and hide the menu normally, they will update the
         * visible property.
         * @type {boolean}
         */
        this.visible = false;

        this.initEvents();
    }

    initEvents() {
        if(!this.isMenuController) {
            this.isMenuController = true;
            this.boundEvents = {};

            this.boundEvents.onClick = this.onClick.bind(this);
            this.boundEvents.onMouseOver = this.onMouseOver.bind(this);
            this.boundEvents.onMouseOut = this.onMouseOut.bind(this);
            this.boundEvents.onSelect = this.onSelect.bind(this);

            this.element.addEventListener('click', this.boundEvents.onClick);
            this.element.addEventListener('mouseover', this.boundEvents.onMouseOver);
            this.element.addEventListener('mouseout', this.boundEvents.onMouseOut);
            this.element.addEventListener('item-select', this.boundEvents.onSelect);
        }
    }

    destroyEvents() {
        if(this.isMenuController) {
            this.isMenuController = false;

            this.element.removeEventListener('click', this.boundEvents.onClick);
            this.element.removeEventListener('mouseover', this.boundEvents.onMouseOver);
            this.element.removeEventListener('mouseout', this.boundEvents.onMouseOut);
            this.element.removeEventListener('item-select', this.boundEvents.onSelect);

            this.boundEvents = null;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // METHODS

    /**
     * Activates the menu.
     */
    activate() {
        if(!this.isActive) {
            this.isActive = true;

            let parent = this.parent;

            if(parent) {
                if(!parent.isActive) {
                    parent.activate();
                }

                if(parent.setActiveItem) {
                    parent.setActiveItem(this, true);
                }
            }

            if(this.closeOnBlur && !this._captureDocumentClick) {
                let doc = document;
                this._captureDocumentClick = {
                    doc: doc,
                    onDocumentClick: (event) => {
                        if(!this.element.contains(event.target)) {
                            this.deactivate();
                        }
                    }
                };

                // noinspection JSUnresolvedFunction
                doc.addEventListener('click', this._captureDocumentClick.onDocumentClick);
            }

            this.trigger('activate', this);
        }
    }

    /**
     * Deactivates the menu.
     */
    deactivate() {
        if(this.isActive) {
            this.isActive = false;

            if(this._captureDocumentClick) {
                // noinspection JSUnresolvedFunction
                this._captureDocumentClick.doc.removeEventListener('click', this._captureDocumentClick.onDocumentClick);
                this._captureDocumentClick = null;
            }

            this.clearTimeoutTimer();
            this.clearActivateItemTimer();

            if(this._activateItemTimer) {
                clearTimeout(this._activateItemTimer);
                this._activateItemTimer = null;
            }

            this.clearActiveItems();

            this.trigger('deactivate', this);
        }
    }

    /**
     * Shows the menu.
     */
    show() {
        if(!this.visible) {
            this.visible = true;

            if(this.position) {
                let position = this.position;

                if(typeof position === 'string') {
                    position = Menu.POSITIONERS[position];
                }

                position.call(this, this);
            }

            this.trigger('show', this);
        }
    }

    /**
     * Hides the menu.
     */
    hide() {
        if(this.visible) {
            this.visible = false;
            this.trigger("hide", this);
        }
    }

    /**
     * Adds an item to the menu.
     * @param item
     * @returns {*}
     */
    add(item) {
        this.element.appendChild(item.element);
        return item;
    }

    setActiveItem(item, active) {
        if(active) {
            if(!item.isActive) {
                item.activate();
                return;
            }

            if(!this.multiple) {
                let activeItems = this.activeItems;

                for(let _item of activeItems) {
                    if(_item !== item) {
                        _item.deactivate();
                    }
                }
            }
        } else {
            if(item.isActive) {
                item.deactivate();
            }
        }
    }

    clearActiveItems() {
        let activeItems = this.activeItems;

        for(let _item of activeItems) {
            _item.deactivate();
        }
    }

    startTimeoutTimer(timeout=null) {
        if(!this.isActive) return;

        if(timeout === null) timeout = this.timeout;

        this.clearTimeoutTimer();

        this._timeoutTimer = setTimeout(() => {
            this._timeoutTimer = null;
            this.deactivate();
        }, timeout);

        return this._timeoutTimer;
    }

    clearTimeoutTimer() {
        if(this._timeoutTimer) {
            clearTimeout(this._timeoutTimer);
            this._timeoutTimer = null;
        }
    }

    startActivateItemTimer(item, time) {
        this.clearActivateItemTimer();
        this._activateItemTimerTarget = item;

        this._activateItemTimer = setTimeout(() => {
            this._activateItemTimer = null;
            this._activateItemTimerTarget = null;
            item.activate();
        }, time);
    }

    clearActivateItemTimer(target) {
        if(this._activateItemTimer && (!target || target === this._activateItemTimerTarget)) {
            clearTimeout(this._activateItemTimer);
            this._activateItemTimer = null;
            this._activateItemTimerTarget = null;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // EVENT HANDLER METHODS

    onMouseOver(event) {
        // Clear timeout timer.
       this.clearTimeoutTimer();

        // Pass event to target item.
        let targetItem = getClosestMenuItem(event.target, this.element);

        if(targetItem && targetItem.getController() === this) {
            targetItem.onMouseOver(event);
        }

        // If the user mouses over an item and deactivateOnItemHover is true and multiple is false
        // then deactivate any other active items.
        if(this.deactivateOnItemHover && !this.multiple) {
            let childItem = getTargetChild(this, event.target),
                activeItems = this.activeItems;

            if(childItem) {
                for (let item of activeItems) {
                    if (item !== childItem) {
                        item.deactivate();
                    }
                }
            }
        }
    }

    onMouseOut(event) {
        // Start timer if menu is active, timeout is a valid time and it is a mouseleave event.
        if(this.isActive && typeof this.timeout === 'number' && this.timeout >= 0 && !this.element.contains(event.relatedTarget)) {
            this.startTimeoutTimer(this.timeout);
        }

        // Pass event to target item.
        let targetItem = getClosestMenuItem(event.target, this.element);

        if(targetItem && targetItem.getController() === this) {
            targetItem.onMouseOut(event);
        }
    }

    onClick(event) {
        let target = getClosestMenuNode(event.target, this.element);

        if(target === this) {
            if(this.isActive && (this.toggleMenu === 'off' || this.toggleMenu === 'both')) {
                this.deactivate();
            } else if(!this.isActive && (this.toggleMenu === 'on' || this.toggleMenu === 'both')) {
                this.activate();
            }
        } else if(target && isMenuItem(target) && target.getController() === this) {
            target.onClick(event);
        }
    }

    onSelect(event) {
        if(this.closeOnSelect === true || (this.closeOnSelect === 'child' && event.detail.item.parent === this)) {
            this.deactivate();
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // GETTER AND SETTER METHODS

    /**
     * Gets the menus active child items.
     * @returns {Array}
     */
    get activeItems() {
        let r = [];

        for(let child of this.children) {
            if(child.isActive) {
                r.push(child);
            }
        }

        return r;
    }

    /**
     * Gets the menu's child items.
     * @returns {Array}
     */
    get children() {
        let r = [];

        for(let element of this.element.querySelectorAll('[data-role="menuitem"], [data-role="menu"], [data-role="dropdown"]')) {
            let menuNode = getMenuNode(element);

            if(menuNode && menuNode.parent === this) {
                r.push(menuNode);
            }
        }

        return r;
    }

    /**
     * Returns true if the menu is visible.
     * @returns {boolean}
     */
    get visible() {
        return !this.element.classList.contains('hidden');
    }

    /**
     * Sets the menu visible or hidden.
     * @param value
     */
    set visible(value) {
        if(value && !this.visible) {
            this.element.classList.remove('hidden');
            this.element.classList.add('visible');
        } else if(!value && this.visible) {
            this.element.classList.add('hidden');
            this.element.classList.remove('visible');
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // STATIC METHODS

    static FromHTML(selector, config={}) {
        if(typeof selector === 'string') {
            selector = document.querySelector(selector);
        }

        config = config || {};

        let dataset = {};

        if(selector.dataset.timeout) {
            dataset.timeout = parseBooleanOrInt(selector.dataset.timeout);
        }
        if(selector.dataset.closeOnBlur) {
            dataset.closeOnBlur = parseBoolean(selector.dataset.closeOnBlur);
        }
        if(selector.dataset.autoActivate) {
            dataset.autoActivate = parseBooleanOrInt(selector.dataset.autoActivate);
        }
        if(selector.dataset.delay) {
            dataset.delay = parseBooleanOrInt(selector.dataset.delay);
        }
        if(selector.dataset.multiple) {
            dataset.multiple = parseBoolean(selector.dataset.multiple);
        }
        if(selector.dataset.toggleItem) {
            dataset.toggleItem = validateChoice(selector.dataset.toggleItem, ['on', 'off', 'both']);
        }
        if(selector.dataset.toggleMenu) {
            dataset.toggleMenu = validateChoice(selector.dataset.toggleMenu, ['on', 'off', 'both']);
        }
        if(selector.dataset.closeOnSelect) {
            let value = validateChoice(selector.dataset.closeOnSelect, ['true', 'false', 'child']);

            if(value === 'true' || value === 'false') {
                value = value === 'true';
            }

            dataset.closeOnSelect = value;
        }
        if(selector.dataset.deactivateOnItemHover) {
            dataset.deactivateOnItemHover = parseBoolean(selector.dataset.deactivateOnItemHover);
        }

        return new this({target: selector, ...dataset, ...config});
    }

    static widget({target, subItemConfig={}, subMenuConfig={}, config={}}={}) {
        let root = this.FromHTML(target, config);

        for(let element of root.element.querySelectorAll('[data-role="menu"]')) {
            Menu.FromHTML(element, subMenuConfig);
        }

        for(let element of root.element.querySelectorAll('[data-role="menuitem"]')) {
            MenuItem.FromHTML(element, subItemConfig);
        }

        return root;
    }
}
