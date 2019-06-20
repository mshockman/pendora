import MenuNode from './MenuNode';
import {getMenuNode, isMenu, getMenu} from "./core";
import {findChild} from "../core/utility";


/**
 * Represents a selectable item inside a menu.
 */
export default class MenuItem extends MenuNode {
    constructor(text, action, {target, nodeName='div', id, classNames, value}={}) {
        let element;

        if(!target) {
            element = document.createElement(nodeName);
            let item = document.createElement('a');

            if(typeof action === 'string') {
                item.href = action;
            }

            item.classList.add('c-menuitem__item');
            item.innerHTML = text;

            element.appendChild(item);
        } else if(typeof target === 'string') {
            element = document.querySelector(target);
        } else {
            element = target;
        }

        super(element, 'menuitem', {classNames, id});

        this.isMenuItem = true;

        this.element.classList.add('c-menuitem');
        this.element.dataset.role = 'menuitem';

        if(typeof action === 'function') {
            this.on('select', action);
        }

        if(value !== undefined) this.value = value;
    }

    //------------------------------------------------------------------------------------------------------------------
    // METHODS
    //------------------------------------------------------------------------------------------------------------------

    activate() {
        if(!this.isActive) {
            this.isActive = true;

            let parent = this.parent,
                overlay = this.overlayElement,
                submenu = getMenu(overlay);

            if(!parent.isActive) {
                parent.activate();
            }

            parent.setActiveItem(this, true);

            if(submenu) {
                submenu.show();
            } else {
                overlay.classList.remove('hidden');
                overlay.classList.add('visible');
            }

            this.trigger('activate', this);
        }
    }

    /**
     * Deactivates the item.
     */
    deactivate() {
        if(this.isActive) {
            this.isActive = false;

            let overlay = this.overlayElement,
                submenu = getMenu(overlay);

            if(submenu) {
                submenu.deactivate();
                submenu.hide();
            } else if(overlay) {
                overlay.classList.add('hidden');
                overlay.classList.remove('visible');
            }

            this.trigger('deactivate', this);
        }
    }

    /**
     * Triggers a select action for the item.
     */
    select() {
        this.trigger('select', this);

        let event = new CustomEvent('item-select', {
            detail: {
                item: this
            },
            bubbles: true
        });

        this.element.dispatchEvent(event);
    }

    /**
     * Attaches the submenu to the item.
     * @param menu
     * @returns {*}
     */
    attachSubMenu(menu) {
        if(this.hasOverlay()) {
            throw Error("Already has overlay element.");
        }

        menu.appendTo(this.element);
        return menu;
    }

    hasOverlay() {
        return !!this.overlayElement;
    }

    //------------------------------------------------------------------------------------------------------------------
    // EVENT HANDLERS
    //------------------------------------------------------------------------------------------------------------------

    onMouseOver(event) {
        if(this.getDisabled()) return;

        if(!this.element.contains(event.relatedTarget)) {
            // Mouse entered item.

            let parent = this.parent;
            parent.clearActivateItemTimer();

            if(!this.isActive) {
                if(!parent.isActive) {
                    // Use autoActivate property.

                    if(parent.autoActivate === true) {
                        this.activate();
                    } else if(typeof parent.autoActivate === 'number' && parent.autoActivate >= 0) {
                        parent.startActivateItemTimer(this, parent.autoActivate);
                    }
                } else {
                    // Use delay property because menu is already active.

                    if(parent.delay === false) {
                        this.activate();
                    } else if(typeof parent.delay === 'number' && parent.delay >= 0) {
                        parent.startActivateItemTimer(this, parent.delay);
                    }
                }
            }
        }
    }

    onMouseOut(event) {
        if(this.getDisabled()) return;

        if(!this.element.contains(event.relatedTarget)) {
            let parent = this.parent;

            parent.clearActivateItemTimer(this);

            // If the item doesn't have a submenu deactivate immediately when the user leaves it.
            if(this.isActive && !this.hasOverlay()) {
                this.deactivate();
            }
        }
    }

    /**
     * Called when the user clicks the MenuItem.
     * @param event
     */
    onClick(event) {
        if(this.getDisabled()) {
            event.preventDefault();
            return;
        }

        let parent = this.parent;

        if(this.hasOverlay()) {
            if(this.isActive && (parent.toggleItems === 'off' || parent.toggleItems === 'both')) {
                this.deactivate();

                // If we toggle off the last item then deactivate the parent menu.
                if(parent.isActive && !parent.activeItems.length) {
                    parent.deactivate();
                }
            } else if(!this.isActive && (parent.toggleItems === 'on' || parent.toggleItems === 'both')) {
                this.activate();
            }
        } else {
            if(!this.isActive && (parent.toggleItems === 'on' || parent.toggleItems === 'both')) {
                this.activate();
            }

            this.select();
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // GETTERS AND SETTERS
    //------------------------------------------------------------------------------------------------------------------

    /**
     * Gets the items submenu.
     * @returns {MenuNode}
     */
    get submenu() {
        for(let element of this.element.children) {
            let node = getMenuNode(element);

            if(node && isMenu(node)) {
                return node;
            }
        }
    }

    /**
     * Implements the children interface for a MenuItem node. Will return either an empty array or an array with the
     * child submenu inside it.  For MenuItem nodes this should either be 0 or 1 items but it has to be an array to
     * keep with the specification.
     * @returns {MenuNode[]|Array}
     */
    get children() {
        let submenu = this.submenu;

        if(submenu) {
            return [submenu];
        } else {
            return [];
        }
    }

    get value() {
        return this.element.dataset.value;
    }

    set value(value) {
        this.element.dataset.value = value;
    }

    get buttonElement() {
        return findChild(this.element, (child) => child.dataset.role === 'button' || child.nodeName === 'BUTTON' || child.nodeName === 'A');
    }

    get overlayElement() {
        return findChild(this.element, (child) => child.dataset.role === 'menu');
    }

    //------------------------------------------------------------------------------------------------------------------
    // STATIC METHODS
    //------------------------------------------------------------------------------------------------------------------

    static FromHTML(selector, config={}) {
        if(typeof selector === 'string') {
            selector = document.querySelector(selector);
        }

        return new this(null, null, {target: selector, ...config});
    }
}
