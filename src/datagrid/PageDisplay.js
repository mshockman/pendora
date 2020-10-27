import {emptyElement} from "../core/utility";


export default class PageDisplay {
    #template;
    #element;
    #model;
    #onChange;

    #page;
    #pageTotal;
    #count;

    constructor(template=null) {
        this.#template = template || function(context) {
            return document.createTextNode(`Displaying page ${context.page} out of ${context.pageTotal}, ${context.count} items total`);
        };

        this.#page = 1;
        this.#pageTotal = 1;
        this.#count = 0;
        this.#element = document.createElement("div");
        this.#element.className = "page-display";
        this.#model = null;

        this.#onChange = () => {
            this.#page = this.#model.getPageNumber();
            this.#pageTotal = this.#model.getPageCount();
            this.#count = this.#model.getCount();
            this.render();
        };
    }

    render() {
        if(this.#model) {
            emptyElement(this.#element);

            this.#element.appendChild(this.#template({
                model: this.#model,
                count: this.#count,
                page: this.#page,
                pageTotal: this.#pageTotal
            }));
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
            this.#page = this.#model.getPageNumber();
            this.#pageTotal = this.#model.getPageCount();
            this.#count = this.#model.getCount();
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

    get page() {
        return this.#page;
    }

    get pageTotal() {
        return this.#pageTotal;
    }

    get count() {
        return this.#count;
    }

    set page(value) {
        this.#page = value;
        this.render();
    }

    set pageTotal(value) {
        this.#pageTotal = value;
        this.render();
    }

    set count(value) {
        this.#count = value;
        this.render();
    }
}