import MenuNode from './MenuNode';
import {getMenuNode} from "./core";


export default class MenuItem extends MenuNode {
    constructor({target, text, nodeName='li'}={}) {
        let element;

        if(!target) {
            element = document.createElement(nodeName);
            let item = document.createElement('a');
            item.classList.add('c-menuitem__item');
            item.innerHTML = text;

            element.appendChild(item);
        } else if(typeof target === 'string') {
            element = document.querySelector(target);
        } else {
            element = target;
        }

        super(element);

        this.menuNodeType = 'menuitem';
        this.isMenuItem = true;

        this.element.classList.add('c-menuitem');
        this.element.dataset.role = 'menuitem';
    }

    activate(showMenuDelay=0) {
        if(!this.isActive) {
            this.isActive = true;

            if(this._showDelayTimer) {
                clearTimeout(this._showDelayTimer);
                this._showDelayTimer = null;
            }

            let parent = this.parent;

            if(!parent.multiple) {
                for(let activeItem of parent.activeItems) {
                    if(activeItem !== this) {
                        activeItem.deactivate();
                    }
                }
            }

            if(this._getDisabled()) {
                return;
            }

            if(!parent.isActive) {
                parent.activate();
            }

            if(showMenuDelay >= 0) {
                let submenu = this.submenu;

                if(submenu) {
                    if(showMenuDelay !== 0) {
                        this._showDelayTimer = setTimeout(() => {
                            submenu.show();
                            this._showDelayTimer = null;
                        }, showMenuDelay);
                    } else {
                        submenu.show();
                    }
                }
            }

            this.trigger('activate', this);
        }
    }

    deactivate() {
        if(this.isActive) {
            this.isActive = false;

            if(this._showDelayTimer) {
                clearTimeout(this._showDelayTimer);
                this._showDelayTimer = null;
            }

            let submenu = this.submenu;

            if(submenu) {
                submenu.deactivate();
                submenu.hide();
            }

            this.trigger('deactivate', this);
        }
    }

    select() {
        this.trigger('select', this);

        let parent = this.parent;

        if(parent) {
            parent.trigger("child-item-select", this);
        }

        let event = new CustomEvent('item-select', {
            detail: {
                item: this
            },
            bubbles: true
        });

        this.element.dispatchEvent(event);
    }

    /**
     * Called when the user enter the MenuItem.
     * @param event
     */
    onMouseEnter(event) {
        // if(this._getDisabled()) {
        //     if(this.isActive) {
        //         this.deactivate();
        //     }
        //
        //     return;
        // }

        let parent = this.parent;

        if(parent._activateItemTimer) {
            clearTimeout(parent._activateItemTimer);
            parent._activateItemTimer = null;
        }

        if(!this.isActive) {
            if(!parent.isActive) {
                if(parent.autoActivate === true) {
                    this.activate(parent.showDelay);
                } else if(typeof parent.autoActivate === 'number' && parent.autoActivate >= 0) {
                    parent._activateItemTimer = setTimeout(() => {
                        this.activate(parent.showDelay);
                        parent._activateItemTimer = null;
                    }, parent.autoActivate);
                }
            } else {
                if(parent.delay === false) {
                    this.activate(parent.showDelay);
                } else if(typeof parent.delay === 'number' && parent.delay >= 0) {
                    parent._activateItemTimer = setTimeout(() => {
                        this.activate(parent.showDelay);
                        parent._activateItemTimer = null;
                    }, parent.delay);
                }
            }
        }
    }

    /**
     * Called when the user leaves the MenuItem.
     * @param event
     */
    onMouseLeave(event) {
        let parent = this.parent;

        if(parent._activateItemTimer) {
            clearTimeout(parent._activateItemTimer);
            parent._activateItemTimer = null;
        }

        if(this.isActive && !this.submenu) {
            this.deactivate();
        }
    }

    /**
     * Called when the user clicks the MenuItem.
     * @param event
     */
    onClick(event) {
        if(this._getDisabled()) {
            event.preventDefault();
            return;
        }

        let parent = this.parent,
            submenu = this.submenu;

        if(submenu) {
            if (this.isActive && (parent.toggleItem === 'off' || parent.toggleItem === 'both')) {
                this.deactivate();

                if(parent.isActive && !parent.activeItems.length) {
                    parent.deactivate();
                }
            } else if (!this.isActive && (parent.toggleItem === 'on' || parent.toggleItem === 'both')) {
                this.activate();
            } else if(this.isActive && this._showDelayTimer) {
                // If the user clicks an already active item with a submenu why the show menu timer is active and we can
                // toggle items on show the submenu immediately.
                if(this._showDelayTimer) {
                    clearTimeout(this._showDelayTimer);
                    this._showDelayTimer = null;
                }

                submenu.show();
            }
        } else {
            if(!this.isActive && (parent.toggleItem === 'on' || parent.toggleItem === 'both')) {
                this.activate();
            }

            this.select();
        }
    }

    attachSubMenu(menu) {
        if(this.submenu) {
            throw Error("Already has submenu.");
        }

        this.element.appendChild(menu.element);
        return menu;
    }

    detachSubMenu() {
        let submenu = this.submenu;

        if(submenu) {
            if(this._showDelayTimer) {
                clearTimeout(this._showDelayTimer);
                this._showDelayTimer = null;
            }

            this.element.removeChild(submenu.element);
        }

        return submenu;
    }

    get submenu() {
        for(let element of this.element.children) {
            let node = getMenuNode(element);

            if(node && node.menuNodeType === 'menu') {
                return node;
            }
        }
    }

    get children() {
        let submenu = this.submenu;

        if(submenu) {
            return [submenu];
        } else {
            return [];
        }
    }
}
