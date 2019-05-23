import {attachMenuNode, getMenuNode} from './core';
import Observable from 'core/interface/Observable';


export default class MenuNode extends Observable {
    constructor(element) {
        super();
        this.element = element;
        attachMenuNode(this.element, this);
    }

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
     * @returns {MenuNode|Menu|MenuItem}
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

    get parentItem() {
        let o = this.parent;

        while(o) {
            if(o.menuNodeType === 'item') {
                return o;
            }

            o = o.parent;
        }
    }

    get parentMenu() {
        let o = this.parent;

        while(o) {
            if(o.menuNodeType === 'menu') {
                return o;
            }

            o = o.parent;
        }
    }

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

    get isDisabled() {
        return this.element.classList.contains('disabled');
    }

    set isDisabled(value) {
        if(!!value !== this.isDisabled) {
            this.element.classList.toggle('disabled');
        }
    }

    _getDisabled() {
        let o = this.element;

        while(o) {
            if(o.classList.contains('disabled')) {
                return true;
            }

            o = o.parentElement;
        }

        return false;
    }
}
