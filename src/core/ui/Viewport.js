import Publisher from "../Publisher";


export default class Viewport extends Publisher {
    #element;
    #body;

    #innerWidth = null;
    #innerHeight = null;

    constructor() {
        super();

        this.#element = document.createElement("div");
        this.#body = document.createElement("div");
        this.#element.appendChild(this.#body);

        this.#element.className = "viewport";
        this.#body.className = "viewport__body";
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.#element);
        } else if(selector.appendChild) {
            selector.appendChild(this.#element);
        } else {
            selector.append(this.#element);
        }
    }

    appendChild(element) {
        return this.#body.appendChild(element);
    }

    get innerWidth() {
        return this.#innerWidth;
    }

    get innerHeight() {
        return this.#innerHeight;
    }

    set innerWidth(width) {
        width = parseFloat(width);

        if(!Number.isNaN(width)) {
            this.#innerWidth = width;
            this.#body.style.width = this.#innerWidth+"px";
        }
    }

    set innerHeight(height) {
        height = parseFloat(height);

        if(!Number.isNaN(height)) {
            this.#innerHeight = height;
            this.#body.style.height = this.#innerHeight+"px";
        }
    }

    get scrollLeft() {
        return this.#element.scrollLeft;
    }

    get scrollTop() {
        return this.#element.scrollTop;
    }

    set scrollLeft(value) {
        return this.#element.scrollLeft = value;
    }

    set scrollTop(value) {
        return this.#element.scrollTop = value;
    }

    get element() {
        return this.#element;
    }

    get body() {
        return this.#body;
    }
}
