import {privateCache} from 'core/data';


export default class MenuNode {
    constructor(element) {
        this.element = element;
        privateCache.set(this.element, 'menu-node', this);
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
            let node = privateCache.get(o, 'menu-node');

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
}
