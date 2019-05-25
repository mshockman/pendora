import MenuNode from './MenuNode';
import {getClosestMenuItem, getClosestMenuNode, isMenuItem} from "./core";
import {parseBoolean, parseBooleanOrInt, parseIntValue, validateChoice} from "../core/utility";


/**
 * Base menu controller class.  Is responsible for delegating events to it's child items.  Is inherited by any
 * menu like MenuNode such as Menu and Dropdown.
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
 * showDelay            Gets or sets the delay after a menuitem activates that is show's its submenu.
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
 * isMenuController     Used to test if the menu is a menu controller.  Readonly.
 */
export default class MenuControllerBase extends MenuNode {
    initMenuController({closeOnBlur=false, timeout=false, autoActivate=0, delay=false, multiple=false,
                toggleItem='on', toggleMenu='off', closeOnSelect=false, position=null,
                showDelay=0}={}) {
        /**
         * Controls how long after the user moves off the menu that it will timeout.
         * @type {boolean|Number}
         */
        this.timeout = parseBooleanOrInt(timeout, 10);

        /**
         * If a number greater then or equal to 0, this property controls how long the user must hover over an item
         * for the menu to activate.  If the value is false or a negative number the menu will never auto activate.
         * If true or 0 the menu will activate immediately.
         * @type {boolean|Number}
         */
        this.autoActivate = parseBooleanOrInt(autoActivate, 10);

        /**
         * Gets or sets the delay between the user hovering over the menu item and it activating.  This is only used
         * in the cases in which the container menu is already active.  Otherwise the autoActivate property is used
         * instead.  If the value is negative items will never activate on hover.
         * @type {boolean|number|*}
         */
        this.delay = parseBooleanOrInt(delay, 10);

        /**
         * Controls if the menu allows multiple items to be active at the same time.
         * @type {boolean}
         */
        this.multiple = parseBoolean(multiple);

        /**
         * Gets or sets a function that will be called whenever the menu is shown to position it.
         * @type {Function|null}
         */
        this.position = position;

        /**
         * Gets or sets the delay after a menuitem activates that is show's its submenu.
         * @type {number}
         */
        this.showDelay = parseIntValue(showDelay, 10);

        /**
         * Gets or sets how items will behave when the user clicks them.  Can be on, off, both or none.
         * If on items will only toggle on when clicked and if off they will only toggle off.
         * If both they will toggle both off and on.
         * If none nothing will happen when the user clicks an item.
         * @type {'on'|'off'|'both'|'none'}
         */
        this.toggleItem = validateChoice(toggleItem, ['on', 'off', 'both', 'none']);

        /**
         * Gets or sets how menus will behave when the user clicks them.  Can be on, off, both or none.
         * If on items will only toggle on when clicked and if off they will only toggle off.
         * If both they will toggle both off and on.
         * If none nothing will happen when the user clicks an item.
         * @type {'on'|'off'|'both'|'none'}
         */
        this.toggleMenu = validateChoice(toggleMenu, ['on', 'off', 'both', 'none']);

        /**
         * Used to test if an object is a menu controller.
         * @readonly
         * @type {boolean}
         */
        this.isMenuController = true;

        this._onMouseOver = this.onMouseOver.bind(this);
        this._onMouseOut = this.onMouseOut.bind(this);
        this._onClick = this.onClick.bind(this);
        this.element.addEventListener('mouseover', this._onMouseOver);
        this.element.addEventListener('mouseout', this._onMouseOut);
        this.element.addEventListener('click', this._onClick);

        /**
         * Gets or sets how the menu will behave when the user clicks outside it.  AKA it looses focus.  If true the
         * menu will close and deactivate itself.
         * @type {boolean|*}
         */
        this.closeOnBlur = parseBoolean(closeOnBlur);

        /**
         * Gets or sets the menu's behavior when an item is selected.  Can be either true, false, or 'child'.  If true
         * the menu will close itself when an item-select event is encountered.  The special 'child' option is
         * similiar to true but will only close if the item is an immediate child item of the menu.
         *
         * @type {boolean|'child'}
         */
        this.closeOnSelect = parseBoolean(closeOnSelect);
    }

    /**
     * Handles on mouse over events for the menu.
     * @param event
     */
    onMouseOver(event) {
        // Clear the timeout timer if it exists.
        if(this._timeoutTimer) {
            clearTimeout(this._timeoutTimer);
            this._timeoutTimer = null;
        }

        let targetItem = getClosestMenuItem(event.target, this.element);

        if(targetItem && targetItem.getController() === this && !targetItem.element.contains(event.relatedTarget)) {
            targetItem.onMouseEnterItem(event);
        }
    }

    /**
     * Handles on mouse out events for the menu.
     * @param event
     */
    onMouseOut(event) {
        if(this.isActive && typeof this.timeout === 'number' && this.timeout >= 0 && !this.element.contains(event.relatedTarget)) {
            this._timeoutTimer = setTimeout(() => {
                this._timeoutTimer = null;
                this.deactivate();
            }, this.timeout);
        }

        let targetItem = getClosestMenuItem(event.target, this.element);

        if(targetItem && targetItem.getController() === this && !targetItem.element.contains(event.relatedTarget)) {
            targetItem.onMouseLeaveItem(event);
        }
    }

    /**
     * Handles on click events for the menu.
     * @param event
     */
    onClick(event) {
        // Used because we need to know if the menu was targeted directly with the click.
        // We can test for this if the target is a menuitem.
        let target = getClosestMenuNode(event.target, this.element);

        if(this.isActive && target === this && (this.toggleMenu === 'off' || this.toggleMenu === 'both')) {
            this.deactivate();
        } else if(!this.isActive && target === this && (this.toggleMenu === 'on' || this.toggleMenu === 'both')) {
            this.activate();
        }

        if(target.onClickItem && isMenuItem(target) && target.getController() === this) {
            target.onClickItem(event);
        }
    }

    /**
     * Returns if the menu will close when it looses focus.
     * @returns {boolean}
     */
    get closeOnBlur() {
        return !!this._closeOnBlurEvents;
    }

    /**
     * Sets if the menu will close when it looses focus.
     * @param value
     */
    set closeOnBlur(value) {
        value = !!value;

        if(value && !this.closeOnBlur) {
            let doc = document;

            this._closeOnBlurEvents = {doc: doc, clickCaptured: false};

            this._closeOnBlurEvents.onDocumentClick = (event) => {
                if(!this.element.contains(event.target)) {
                    this.deactivate();

                    // Just in case the menu ended up deactivated for whatever reason and the onDeactivate trigger
                    // didn't run.
                    if(this._closeOnBlurEvents.clickCaptured) {
                        doc.removeEventListener('click', this._closeOnBlurEvents.onDocumentClick);
                        this._closeOnBlurEvents.clickCaptured = false;
                    }
                }
            };

            this._closeOnBlurEvents.onActivate = () => {
                if(!this._closeOnBlurEvents.clickCaptured) {
                    doc.addEventListener('click', this._closeOnBlurEvents.onDocumentClick);
                    this._closeOnBlurEvents.clickCaptured = true;
                }
            };

            this._closeOnBlurEvents.onDeactivate = () => {
                doc.removeEventListener('click', this._closeOnBlurEvents.onDocumentClick);
                this._closeOnBlurEvents.clickCaptured = false;
            };

            this.on('activate', this._closeOnBlurEvents.onActivate);
            this.on('deactivate', this._closeOnBlurEvents.onDeactivate);
        } else if(!value && this.closeOnBlur) {
            this.off('activate', this._closeOnBlurEvents.onActivate);
            this.off('deactivate', this._closeOnBlurEvents.onDeactivate);
            this._closeOnBlurEvents.doc.removeEventListener('click', this._closeOnBlurEvents.onDocumentClick);
            this._closeOnBlurEvents = null;
        }
    }

    /**
     * Returns if the menu will close when it encounters an item-select event.  Can be either true, false, or 'child'.
     * If closeOnSelect is the special string 'child' it will behave similiar to true except that it will only close
     * if the event originated from a direct child item.
     * @returns {*}
     */
    get closeOnSelect() {
        return this._closeOnSelect;
    }

    /**
     * Sets the behavior of the menu when it encounters a item-select event.
     * @param value
     */
    set closeOnSelect(value) {
        if((value === 'child' || value === true) && !this._closeOnSelectHandler) {
            this._closeOnSelectHandler = (event) => {
                if(this.closeOnSelect === true || this.closeOnSelect === 'child' && event.detail.item.parent === this) {
                    this.deactivate();
                }
            };

            this.element.addEventListener('item-select', this._closeOnSelectHandler);
        } else if(value === false && this._closeOnSelectHandler) {
            this.element.removeEventListener('item-select', this._closeOnSelectHandler);
            this._closeOnSelectHandler = null;
        }

        this._closeOnSelect = value;
    }
}