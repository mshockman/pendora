import {attachMenuNode, getMenuNode} from './core';


export default class MenuNode {
    constructor(element) {
        this.element = element;
        attachMenuNode(this.element, this);
    }

    get root() {
        let o = this;

        while(o) {
            if(o.isRoot) {
                return o;
            }

            o = o.parent;
        }
    }

    get parent() {
        let o = this.element.parentElement;

        while(o) {
            let node = getMenuNode(this.element);

            if(node) {
                return node;
            }
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
}
