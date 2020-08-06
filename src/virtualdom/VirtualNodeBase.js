import Publisher from "../core/Publisher";
import {addClasses, removeClasses} from "../core/utility";


export default class VirtualNodeBase extends Publisher {
    #element;

    constructor(element) {
        super();

        if(typeof element === 'string') {
            element = document.querySelector(element);
        }

        this.#element = element;
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

    addClasses(classes) {
        addClasses(this.#element, classes);
    }

    removeClasses(classes) {
        removeClasses(this.#element, classes);
    }

    get element() {
        return this.#element;
    }

    get classList() {
        return this.#element.classList;
    }

    get dataset() {
        return this.#element.dataset;
    }

    get style() {
        return this.#element.style;
    }

    get id() {
        return this.#element.id;
    }

    set id(value) {
        this.#element.id = value;
    }
}