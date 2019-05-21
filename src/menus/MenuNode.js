import {attachMenuNode, getMenuNode} from './core';


export default class MenuNode {
    constructor(element) {
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
