import {getMenuNode} from './core';
import MenuItem from "./MenuItem";
import MenuControllerBase from './MenuControllerBase';


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
 */
export default class Menu extends MenuControllerBase {
    static POSITIONERS = {};

    constructor({target=null, closeOnBlur=false, timeout=false, autoActivate=0, delay=false, multiple=false,
                    toggleItem='on', toggleMenu='off', closeOnSelect=false, nodeName='ul', position=null,
                    showDelay=0, classNames, id}={}) {
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

        super(element, 'menu', {
            classNames, id, closeOnSelect, closeOnBlur, timeout, autoActivate, delay, multiple, toggleItem,
            toggleMenu, position, showDelay
        });

        /**
         * Gets or sets the visibility of the menu.  This only updates the css classes.  It does not trigger events.
         * Use the show() and hide() methods if you want to show and hide the menu normally, they will update the
         * visible property.
         * @type {boolean}
         */
        this.visible = false;
    }

    /**
     * Activates the menu.
     */
    activate() {
        if(!this.isActive) {
            this.isActive = true;

            let parent = this.parent;

            if(parent && !parent.isActive) {
                parent.activate();
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

            for(let child of this.activeItems) {
                child.deactivate();
            }

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

        for(let element of this.element.querySelectorAll('[data-role="menuitem"], [data-role="menu"]')) {
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

    /**
     * Used to build a menu tree from the dom.  Options for the nodes are separated into 3 classes.  The root,
     * items and submenus.  Properties are also read from the dom from their dataset.  Options passed in the construct
     * take presidence over config options found on the element.
     *
     * @param selector - The element or a selector string that can be used to find the element.
     * @param submenus - Config options for the submenus.
     * @param items - Config options for the menu items.
     * @param options - Config options for the root menu.
     * @returns {Menu}
     */
    static buildFromHTML(selector, {submenus=null, items=null, options=null}={}) {
        if(typeof selector === 'string') {
            selector = document.querySelector(selector);
        }

        submenus = submenus || {};
        items = items || {};
        options = options || {};
        let root = new this({target: selector, ...selector.dataset, ...options});

        for(let element of root.element.querySelectorAll('[data-role="menu"]')) {
            new Menu({target: element, ...element.dataset, ...submenus});
        }

        for(let element of root.element.querySelectorAll('[data-role="menuitem"]')) {
            new MenuItem({target: element, ...element.dataset, ...items});
        }

        return root;
    }
}
