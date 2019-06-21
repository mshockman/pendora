import {attachMenuNode, getMenuNode, isMenu, isMenuItem} from './core';
import Observable from 'core/interface/Observable';
import {addClasses} from 'core/utility';


/**
 * The base class for all menu nodes.
 */
export default class MenuNode extends Observable {
    constructor(element, nodeType, {classNames, id}={}) {
        super();
        this.element = element;
        attachMenuNode(this.element, this);

        /**
         * Used to test if an object is a menu controller.
         * @readonly
         * @type {boolean}
         */
        this.isMenuController = false;
        this.menuNodeType = nodeType;

        if(classNames) {
            addClasses(this.element, classNames);
        }

        if(id) {
            this.element.id = id;
        }
    }

    /**
     * Returns the root most MenuNode.
     * @returns {MenuNode}
     */
    get root() {
        let o = this,
            r = this;

        while(o) {
            o = o.parent;

            if(o) r = o;
        }

        return r;
    }

    /**
     * Returns the parent Menu or MenuItem.
     * @returns {MenuNode}
     */
    get parent() {
        let o = this.element.parentElement;

        while(o) {
            let node = getMenuNode(o);

            if(node) {
                return node;
            }

            o = o.parentElement;
        }
    }

    /**
     * Returns the first MenuItem parent that the node has in the tree.
     * @returns {MenuItem}
     */
    get parentItem() {
        let o = this.parent;

        while(o) {
            if(isMenuItem(o)) {
                return o;
            }

            o = o.parent;
        }
    }

    /**
     * Returns the closest parent Menu that the node has.
     * @returns {Menu}
     */
    get parentMenu() {
        let o = this.parent;

        while(o) {
            if(isMenu(o)) {
                return o;
            }

            o = o.parent;
        }
    }

    /**
     * True if the node is active.
     * @returns {boolean}
     */
    get isActive() {
        return this.element.classList.contains('active');
    }

    set isActive(value) {
        let isActive = this.isActive;

        if(!isActive && value) {
            this.element.classList.add('active');
        } else if(isActive && !value) {
            this.element.classList.remove('active');
        }
    }

    /**
     * True if the node is disabled.
     * @returns {boolean}
     */
    get isDisabled() {
        return this.element.classList.contains('disabled');
    }

    set isDisabled(value) {
        if(!!value !== this.isDisabled) {
            this.element.classList.toggle('disabled');
        }
    }

    /**
     * Returns true if the node or any of it's ancestor nodes in the tree are disabled.
     * @returns {boolean}
     */
    getDisabled() {
        let o = this.element;

        while(o) {
            if(o.classList.contains('disabled')) {
                return true;
            }

            o = o.parentElement;
        }

        return false;
    }

    /**
     * Returns the controller node that capture event listeners.
     * @returns {MenuNode}
     */
    getController() {
        let o = this;

        while(o) {
            if(o.isMenuController) {
                return o;
            }

            o = o.parent;
        }
    }

    appendTo(element) {
        if(element.jquery) {
            element.append(this.element);
        } else if(typeof element === 'string') {
            element = document.querySelector(element);
            element.appendChild(this.element);
        } else {
            element.appendChild(this.element);
        }
    }
}
