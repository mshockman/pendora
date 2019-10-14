import {getMenuInstance, setMenuInstance} from './utility';
import Observable from "../core/interface/Observable";


export default class MenuNode extends Observable {
    constructor() {
        super();
        this._parent = null;
        this._children = [];
        /**
         * @type {undefined|null|HTMLElement}
         * @private
         */
        this._element = undefined;

        this._isActive = false;
        this._isVisible = false;
        this._isDisabled = false;

        this.nodeType = null;
    }

    /**
     * Renders the component.
     */
    render() {

    }

    get parent() {
        return this._parent || null;
    }

    /**
     * Returns the root node of the menu tree.
     *
     * @returns {MenuNode}
     */
    get root() {
        let r = this,
            o = this;

        while(o) {
            o = o.parent;

            if(o) {
                r = o;
            }
        }

        return r;
    }

    /**
     * Returns the closest parent menu.
     * @returns {MenuNode|null}
     */
    get parentMenu() {
        let parent = this.parent;
        return parent.closest(node => node.nodeType === 'menu');
    }

    /**
     * Returns the closest parent item.
     * @returns {MenuNode|null}
     */
    get parentItem() {
        let parent = this.parent;
        return parent.closest(node => node.nodeType === 'menuitem' || node.nodeType === 'dropdown');
    }

    /**
     * Returns the next sibling node.
     * @returns {MenuNode|null}
     */
    get nextSibling() {
        return this.getOffsetSibling(1);
    }

    /**
     * Returns the previous sibling node.
     * @returns {MenuNode|null}
     */
    get previousSibling() {
        return this.getOffsetSibling(-1);
    }

    get children() {
        return this._children.slice(0);
    }

    get isActive() {
        return this._isActive;
    }

    set isActive(value) {
        value = !!value;

        if(value !== this._isActive) {
            if(value) {
                this.element.classList.add('active');
            } else {
                this.element.classList.remove('active');
            }

            this._isActive = value;
        }
    }

    get isDisabled() {
        return this._isDisabled;
    }

    set isDisabled(value) {
        value = !!value;

        if(value !== this._isDisabled) {
            if(value) {
                this.element.classList.add('disabled');
            } else {
                this.element.classList.remove('disabled');
            }

            this._isDisabled = value;
        }
    }

    get isVisible() {
        return this._isVisible;
    }

    set isVisible(value) {
        value = !!value;

        if(value !== this._isVisible) {
            if(value) {
                this.element.classList.remove('hidden');
            } else {
                this.element.classList.add('hidden');
            }

            this._isVisible = value;
        }
    }

    get element() {
        if(this._element === undefined) {
            this.element = this.render();
        }

        return this._element;
    }

    set element(value) {
        if(this._element) {
            privateCache.set(this._element, 'menunode', undefined);
            this._element = undefined;
        }

        if(typeof value === 'string') {
            this._element = document.querySelector(value);
        } else if(typeof value === 'function') {
            this._element = value.call(this);
        } else if(value) {
            this._element = value;
            privateCache.set(this._element, 'menunode', this);
        } else {
            this._element = value;
        }
    }

    getOffsetSibling(offset=1) {
        let parent = this.parent;

        if(parent) {
            let children = parent.children,
                i = children ? children.indexOf(this) : -1;

            if(i >= 0) {
                i += offset;

                if(i >= 0) {
                    return children[i];
                }
            }
        }

        return null;
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.element);
        } else if(selector.appendChild) {
            selector.appendChild(this.element);
        } else if(selector.append) {
            selector.append(this.element);
        }
    }

    closest(fn) {
        let o = this;

        while(o) {
            if(fn.call(this, o)) return o;
            o = o.parent;
        }

        return null;
    }

    *getDescendants() {
        for(let child of this.children) {
            yield child;

            for(let grandchild of child.getDescendants()) {
                yield grandchild;
            }
        }
    }
}