import {emptyElement} from "../core/utility";


export default class PageDisplay {
    #template;
    #element;
    #model;
    #onChange;

    constructor(template=null) {
        this.#template = template || function(model) {
            let page = model.getPageNumber(),
                pageTotal = model.getPageCount(),
                count = model.getCount();

            return document.createTextNode(`Displaying page ${page} out of ${pageTotal}, ${count} items total`);
        };

        this.#element = document.createElement("div");
        this.#element.className = "page-display";
        this.#model = null;

        this.#onChange = () => {
            this.render();
        };
    }

    render() {
        if(this.#model) {
            emptyElement(this.#element);
            this.#element.appendChild(this.#template(this.#model));
        } else {
            emptyElement(this.#element);
        }
    }

    setModel(model) {
        if(this.#model) {
            this.#model.off(["data-change", "refresh"], this.#onChange);
            this.#model = null;
        }

        if(model) {
            this.#model = model;
            this.#model.on(["data-change", "refresh"], this.#onChange);
        }

        this.render();
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

    get element() {
        return this.#element;
    }

    get model() {
        return this.#model;
    }
}