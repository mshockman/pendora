import MenuNode from './MenuNode';
import {getMenuNode} from './core';


export default class Menu extends MenuNode {
    constructor({target=null}={}) {
        let element;

        if(!target) {
            element = document.createElement('ul');
        } else if(typeof target === 'string') {
            element = document.querySelector(target);
        } else {
            element = target;
        }

        element.classList.add('menu');
        element.dataset.role = 'menu';

        super(element);

        this.timeout = false;
        this.autoActivate = false;
        this.delay = false;
        this.closeOnBlur = false;
        this.multiple = false;
        this.toggle = false;
        this.menuNodeType = "menu";
    }

    init() {
        this._onMouseOver = this.onMouseOver.bind(this);
        this._onMouseOut = this.onMouseOut.bind(this);
        this._onClick = this.onClick.bind(this);
        this.isRoot = true;

        this.element.addEventListener('mouseover', this._onMouseOver);
        this.element.addEventListener('mouseout', this._onMouseOut);
        this.element.addEventListener('click', this._onClick);
    }

    activate() {

    }

    deactivate() {

    }

    show() {

    }

    hide() {

    }

    add(item) {
        this.element.appendChild(item.element);
    }

    onMouseOver(event) {
        console.log("On Mouse Over");
    }

    onMouseOut(event) {
        console.log("On Mouse Out");
    }

    onClick(event) {
        console.log("On Click");
    }

    get activeItems() {
        let r = [];

        for(let child of this.children) {
            if(child.isActive) {
                r.push(child);
            }
        }

        return r;
    }

    get children() {
        let r = [];

        for(let element of this.element.querySelectorAll('.menuitem')) {
            let menuNode = getMenuNode(element);

            if(menuNode && menuNode.parent === this) {
                r.push(menuNode);
            }
        }

        return r;
    }
}
