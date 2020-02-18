import Component from "../core/Component";


// resize.start
// resize.move
// resize.end
// resize.complete
// resize.cancel

export default class DataGridHeader extends Component {
    #shadow;
    #columns;
    #refreshID;
    #resizeable;

    #mainView;
    #leftView;
    #rightView;

    constructor({resizeable=false, orderable=false, sortable=false, sortHelper=null, resizeHelper=null}) {
        let element = document.createElement('div');
        element.className = 'data-grid-header';

        super(element);

        this.#shadow = this.element.attachShadow({mode: 'open'});
        let body = document.createElement('div');
        body.classname = "data-grid-header__main";
        this.#shadow.appendChild(body);
    }

    render() {

    }

    refresh() {

    }
}


class ViewPort {
    #element;
    #body;
    #shadow;

    constructor() {
        this.#element = document.createElement('div');
        this.#body = document.createElement('div');

        this.#element.className = "viewport";
        this.#body.className = "viewport__body";

        this.#element.appendChild(this.#body);
    }

    setWidth(width) {

    }

    setHeight(height) {

    }

    getContentWidth() {

    }

    getContentHeight() {

    }

    setScrollX(pos) {

    }

    setScrollY(pos) {

    }

    appendChild(node) {

    }

    insertChildBefore() {

    }

    removeChild(node) {

    }

    appendTo(selector) {

    }

    removeFrom() {

    }

    mirror(element) {

    }

    unmirror() {

    }

    get isMirroring() {

    }

    get mirroredElement() {

    }

    set scrollX(value) {

    }

    get scrollX() {

    }

    set scrollY(value) {

    }

    get scrollY() {

    }
}


class Column {
    label;
    name;

    resizeable;
    minWidth;
    maxWidth;
    width;

    orderable;
    order;
}
