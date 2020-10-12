import {createFragment} from "../utility";
import Publisher from "../Publisher";


export class Loader extends Publisher {
    #element;

    static TEMPLATES = {
        "default": function() { return createFragment(`<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`) }
    };

    constructor(type="default") {
        super();
        this.#element = document.createElement("div");
        this.#element.classList.add("loader");

        let spinner = Loader.TEMPLATES[type]().firstChild;
        spinner.classList.add("loader__spinner");
        this.#element.appendChild(spinner);
    }

    show() {
        this.isVisible = true;
        this.publish("show", {topic: "show", target: this});
    }

    hide() {
        this.isVisible = false;
        this.publish("hidden", {topic: "hidden", target: this});
    }

    remove() {
        if(this.#element.parentElement) {
            this.#element.parentElement.removeChild(this.#element);
        }
    }

    appendTo(selector) {
        if(typeof selector === "string") {
            document.querySelector(selector).appendChild(selector);
        } else if(selector.appendChild) {
            selector.appendChild(this.#element);
        } else {
            selector.append(this.#element);
        }
    }

    get isVisible() {
        return !this.#element.classList.contains("hidden");
    }

    set isVisible(value) {
        value = !!value;

        if(value !== this.isVisible) {
            if(value) {
                this.#element.classList.remove("hidden");
            } else {
                this.#element.classList.add("hidden");
            }
        }
    }

    get element() {
        return this.#element;
    }
}
