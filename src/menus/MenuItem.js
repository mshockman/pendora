import MenuNode from './MenuNode';
import {getMenuNode} from "./core";


export default class MenuItem extends MenuNode {
    constructor({target, text}={}) {
        let element;

        if(!target) {
            element = document.createElement("li");
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

        this.element.classList.add('c-menuitem');
        this.element.dataset.role = 'menuitem';
    }

    activate() {
        if(!this.isActive) {
            this.isActive = true;

            let parent = this.parent;

            if(!parent.multiple) {
                for(let activeItem of parent.activeItems) {
                    if(activeItem !== this) {
                        activeItem.deactivate();
                    }
                }
            }

            if(!parent.isActive) {
                parent.activate();
            }

            let submenu = this.submenu;

            if(submenu) {
                submenu.show();
            }

            this.trigger('activate', this);
        }
    }

    deactivate() {
        if(this.isActive) {
            this.isActive = false;

            let parent = this.parent;

            let submenu = this.submenu;

            if(submenu) {
                submenu.hide();
            }

            if(parent.isActive && !parent.activeItems.length) {
                parent.deactivate();
            }

            this.trigger('deactivate', this);
        }
    }

    onMouseEnter(event) {
        if(this._getDisabled()) {
            return;
        }

        let parent = this.parent;

        if(parent._activateItemTimer) {
            clearTimeout(parent._activateItemTimer);
            parent._activateItemTimer = null;
        }

        if(!this.isActive) {
            if(!parent.isActive) {
                if(parent.autoActivate === true) {
                    this.activate();
                } else if(typeof parent.autoActivate === 'number' && parent.autoActivate >= 0) {
                    parent._activateItemTimer = setTimeout(() => {
                        this.activate();
                        parent._activateItemTimer = null;
                    }, parent.autoActivate);
                }
            } else {
                if(parent.delay === false) {
                    this.activate();
                } else if(typeof parent.delay === 'number' && parent.delay >= 0) {
                    parent._activateItemTimer = setTimeout(() => {
                        this.activate();
                        parent._activateItemTimer = null;
                    }, parent.delay);
                }
            }
        }
    }

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

    onClick(event) {
        if(this._getDisabled()) {
            return;
        }

        let parent = this.parent,
            submenu = this.submenu;

        if(submenu) {
            if (this.isActive && (parent.toggleItem === 'off' || parent.toggleItem === 'both')) {
                this.deactivate();
            } else if (!this.isActive && (parent.toggleItem === 'on' || parent.toggleItem === 'both')) {
                this.activate();
            }
        }
    }

    attachSubMenu(menu) {
        if(this.submenu) {
            throw Error("Already has submenu.");
        }

        this.element.appendChild(menu.element);
        return menu;
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
