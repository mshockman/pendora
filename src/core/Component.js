import Publisher from "./Publisher";
import {selectElement, addClasses, removeClasses} from "./utility";
import Rect from "./vectors/Rect";
import {KeyError} from "./errors";


export const SYMBOLS = {
    appendChild: Symbol("appendChild")
};


export default class Component extends Publisher {
    #element;

    constructor(element) {
        super();

        this.#element = selectElement(element);
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.#element);
        } else if(selector.nodeType && selector.appendChild) {
            selector.appendChild(this.#element);
        } else if(selector[SYMBOLS.appendChild]) {
            selector[SYMBOLS].appendChild(this.#element);
        } else if(selector.#element) {
            selector.#element.appendChild(this.#element);
        }
    }

    // noinspection JSUnusedGlobalSymbols
    removeFrom() {
        if(this.#element.parentElement) {
            this.#element.parentElement.removeChild(this.#element);
        }
    }

    getBoundingClientRect() {
        return Rect.getBoundingClientRect(this.#element);
    }

    getAttribute(name) {
        return this.#element.getAttribute(name);
    }

    hasAttribute(name) {
        return this.#element.hasAttribute(name);
    }

    removeAttribute(name) {
        return this.#element.removeAttribute(name);
    }

    setAttribute(name, value) {
        return this.#element.setAttribute(name, value);
    }

    addClass(classes) {
        return addClasses(this.#element, classes);
    }

    removeClass(classes) {
        return removeClasses(this.#element, classes);
    }

    get isDisabled() {
        return this.classList.contains('disabled');
    }

    set isDisabled(value) {
        let isDisabled = this.isDisabled;

        if(!isDisabled && value) {
            this.classList.remove('disabled');
        } else if(isDisabled && !value) {
            this.classList.add('disabled');
        }
    }

    get disabled() {
        return this.isDisabled;
    }

    set disabled(value) {
        this.isDisabled = value;
    }

    get id() {
        return this.#element.id;
    }

    set id(value) {
        this.#element.id = value;
    }

    get style() {
        return this.#element.style;
    }

    set style(value) {
        this.#element.style = value;
    }

    get classList() {
        return this.#element.classList;
    }

    set classList(value) {
        this.#element.classList = value;
    }

    get dataset() {
        return this.#element.dataset;
    }

    set dataset(value) {
        this.#element.dataset = value;
    }

    get element() {
        return this.#element;
    }
}
