import MenuNode from "./MenuNode";
import MenuItem from "./MenuItem";


export default class Menu extends MenuNode {
    constructor({target=null, closeOnBlur=false, timeout=false, autoActivate=false, multiple=false, openOnHover=false,
                    toggle="both", closeOnSelect=true, deactivateOnItemHover=true, ...context}={}) {
        super();
        this.menuNodeType = "menu";
        this.events = null;
        this.MenuItemClass = MenuItem;

        this.closeOnBlur = closeOnBlur;
        this.timeout = timeout;
        this.autoActivate = autoActivate;
        this.multiple = multiple;
        this.openOnHover = openOnHover;
        this.toggle = toggle;
        this.closeOnSelect = closeOnSelect;
        this.deactivateOnItemHover = deactivateOnItemHover;

        if(target) {
            this.element = target;
        } else {
            this.element = this.render(context);
        }
    }

    render({arrow=false}={}) {
        let element = document.createElement('div'),
            body = document.createElement('div');

        element.className = "menu";
        body.classname = "menu__body";

        if(arrow) {
            let arrow = document.createElement('div');
            arrow.className = "menu__arrow";
            element.appendChild(arrow);
        }

        element.appendChild(body);
        return element;
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

            if(this.parent) this.parent.publish('submenu.shown', this);
            this.publish('menu.shown', this);

            this.element.dispatchEvent(new CustomEvent('menu.show', {
                detail: this,
                bubbles: true
            }));
        }
    }

    hide() {
        if(this.isVisible) {
            this.isVisible = false;

            if(this.parent) this.parent.publish('submenu.hidden', this);
            this.publish('menu.hidden', this);

            this.element.dispatchEvent(new CustomEvent('menu.hide', {
                detail: this,
                bubbles: true
            }));
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Tree methods.

    addItem(text, action) {
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

    setActiveItem(item) {
        if(!item.isActive) {
            item.activate();
            return;
        }

        if(!this.multiple) {
            for(let activeItem of this.activeItems) {
                if(activeItem.isActive && activeItem !== item) {
                    activeItem.deactivate();
                }
            }
        }
    }

    /**
     * Returns list of all menu bodies for the menu.
     *
     * Menu bodies are where item are appended when using function like addItem or append.  They will be added to the
     * last menu body in the menu.
     *
     * @returns {NodeListOf<HTMLElementTagNameMap[string]> | NodeListOf<Element> | NodeListOf<SVGElementTagNameMap[string]>}
     */
    getMenuBody() {
        return this.element.querySelectorAll(':scope > .menu__body');
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers

    onMouseOver(event) {
        this.clearTimer('timeout');
        this._isMouseOver = true;

        let item = this.getTargetItem(event.target);

        if(item && item.getEventDelegator() === this) {
            item.onMouseOver(event);
        }
    }

    onMouseOut(event) {
        this._isMouseOver = false;

        if(this.isActive && typeof this.timeout === 'number' && this.timeout >= 0 && !this.element.contains(event.relatedTarget)) {
            this.startTimer('timeout', () => {
                this.deactivate();
            }, this.timeout);
        }

        let targetItem = this.getTargetItem(event.target);

        if(targetItem && targetItem.getEventDelegator() === this) {
            this.onMouseOut(event);
        }
    }

    onClick(event) {
        let target = this.getTargetNode(event.target);

        if(target === this) {
            if(this.isActive && this.toggleOff) {
                this.deactivate();
            } else if(!this.isActive && this.toggleOn) {
                this.activate();
            }
        } else if(target.isMenuItem()) {
            if(target.getEventDelegator() === this) {
                target.onClick(event);
            }

            if(this.isActive && !target.hasSubMenu()) {
                this.deactivate();
            }
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