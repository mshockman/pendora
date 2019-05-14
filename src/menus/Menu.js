import MenuNode from './MenuNode';


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
}
