import MenuNode from "./MenuNode";


export default class Menu extends MenuNode {
    constructor({target=null, closeOnBlur=false, timeout=false, autoActivate=false, multiple=false, openOnHover=false,
                    toggle="both", closeOnSelect=true, deactivateOnItemHover=true}={}) {
        super();
        this.menuNodeType = "menu";
        this.events = null;

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
            this.element = this.render();
        }
    }

    render() {
        return `
            <div class="menu">
                <div class="menu__arrow"></div>
                <ul class="menu__body">
                    {% for item in this.children %}
                        {{ item }}
                    {% endfor %}
                </ul>
            </div>
        `;
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

            // todo clear timers.
            this.clearTimer('timeout');

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
        }
    }

    hide() {
        if(this.isVisible) {
            this.isVisible = false;

            if(this.parent) this.parent.publish('submenu.hidden', this);
            this.publish('menu.hidden', this);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    //

    addItem(text, action) {

    }

    removeItem(item) {

    }

    hasItem(item) {

    }

    append(item) {

    }

    get activeItems() {

    }

    clearItems() {
        for(let child of this.activeItems) {
            child.deactivate();
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers

    onMouseOver(event) {
        this.clearTimer('timeout');

        let item = this.getTargetItem(event.target);

        if(item && item.getEventDelegator() === this) {
            item.onMouseOver(event);
        }

        if(this.deactivateOnItemHover && !this.multiple) {
            let targetChild = this.getTargetChild(event.target),
                activeItems = this.activeItems;

            for(let item of activeItems) {
                if(item !== targetChild) {
                    item.deactivate();
                }
            }
        }
    }

    onMouseOut(event) {
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

    get toggleOn() {

    }

    get toggleOff() {

    }
}