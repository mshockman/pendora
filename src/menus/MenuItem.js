import MenuNode from './MenuNode';
import {getMenuNode, isMenu, getMenu, getMenuItem} from "./core";
import {findChild} from "../core/utility";


function isToggleEvent(event, option) {
    return option === 'click' || (event.ctrlKey && option === 'ctrl-click') || (event.shiftKey && option === 'shift-click');
}


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
            } else if(overlay) {
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
    select(multiple) {
        let parent = this.parent;

        if(parent && parent.selectable) {
            this.isSelected = true;

            if(!multiple) {
                for(let child of parent.children) {
                    if(child !== this && child.isSelected) {
                        child.isSelected = false;
                        if(child.isActive) child.deactivate();
                    }
                }
            }
        }

        let o = parent;

        while(o) {
            if(o.trigger) {
                o.trigger('item-select', {
                    item: this,
                    parent: this
                });
            }

            o = o.parent;
        }

        this.trigger('select', this);

        let event = new CustomEvent('item-select', {
            detail: {
                item: this
            },
            bubbles: true
        });

        this.element.dispatchEvent(event);
    }

    deselect() {
        let parent = this.parent;

        if(parent && parent.selectable && this.isSelected) {
            this.isSelected = false;
        }

        let o = parent;

        while(o) {
            if(o.trigger) {
                o.trigger('item-deselect', {
                    item: this,
                    parent: this
                });
            }

            o = o.parent;
        }

        this.trigger('deselect', this);

        let event = new CustomEvent('item-deselect', {
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
                    // Use timein property.

                    if(parent.timein === true) {
                        this.activate();
                    } else if(typeof parent.timein === 'number' && parent.timein >= 0) {
                        parent.startActivateItemTimer(this, parent.timein);
                    }
                } else {
                    // Use autoActivate property because menu is already active.

                    if(parent.autoActivate === true) {
                        this.activate();
                    } else if(typeof parent.autoActivate === 'number' && parent.autoActivate >= 0) {
                        parent.startActivateItemTimer(this, parent.autoActivate);
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

            let doesAutoActivate = false;

            if(typeof parent.autoActivate === 'number') {
                doesAutoActivate = parent.autoActivate >= 0;
            } else if(typeof parent.autoActivate === 'boolean') {
                doesAutoActivate = parent.autoActivate;
            }

            // If the item doesn't have a submenu deactivate immediately when the user leaves it.
            if(this.isActive && !this.hasOverlay() && doesAutoActivate) {
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

        let parent = this.parent,
            toggle = this.parent.getToggleValues();

        if(this.hasOverlay()) {
            if(this.isActive && isToggleEvent(event, toggle[1])) {
                this.deactivate();

                // If we toggle off the last item then deactivate the parent menu.
                if(parent.isActive && !parent.activeItems.length) {
                    parent.deactivate();
                }
            } else if(!this.isActive && isToggleEvent(event, toggle[0])) {
                this.activate();
            }
        } else if(parent.selectable) {
            let multipleSelectAction = toggle[2] || 'ctrl-click',
                rangeSelectAction = toggle[3] || 'shift-click';

            event.preventDefault();

            if(!this.isSelected) {
                if(parent.multiple && parent.lastItemSelect && isToggleEvent(event, rangeSelectAction)) {
                    // We are performing a range selection.

                    let children = parent.children,
                        start = children.indexOf(parent.lastItemSelect),
                        end = children.indexOf(this);

                    if(start > end) {
                        [start, end] = [end, start];
                    }

                    if(start === -1) {
                        throw new Error("Could range select items.  One of the selected items was not a child item.");
                    }

                    for(let i = start; i < end+1; i++) {
                        let item = children[i];
                        if(!item.isSelected) item.select(true);
                        if(!item.isActive) item.activate();
                    }
                } else if(isToggleEvent(event, toggle[0])) {
                    this.select(parent.multiple && isToggleEvent(event, multipleSelectAction));
                    this.activate();
                }
            } else if(isToggleEvent(event, toggle[1])) {
                // Deselect item.
                this.deselect();
                if(parent.bindActiveToSelect) this.deactivate();
            } else {
                this.select(false);
                this.activate();
            }
        } else {
            if(!this.isActive && isToggleEvent(event, toggle[0])) {
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

    get isSelected() {
        return this.element.classList.contains('selected');
    }

    set isSelected(value) {
        if(value) {
            this.element.classList.add('selected');
        } else {
            this.element.classList.remove('selected');
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // STATIC METHODS
    //------------------------------------------------------------------------------------------------------------------

    static FromHTML(selector, config={}) {
        if(typeof selector === 'string') {
            selector = document.querySelector(selector);
        }

        let menuitem = getMenuItem(selector);

        // Object already initialized.
        if(menuitem) {
            return menuitem;
        }

        return new this(null, null, {target: selector, ...config});
    }
}
