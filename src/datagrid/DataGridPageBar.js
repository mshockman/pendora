/**
 * @implements DataGridPluginInterface
 */
import Paginator from "./Paginator";
import PageDisplay from "./PageDisplay";


export default class DataGridPageBar {
    #element;
    #model;
    #disabled;

    #paginator;
    #pageDisplay;

    constructor(pageSizes=null, pageDisplayTemplate=null) {
        this.#element = document.createElement("div");
        this.#element.className = "data-grid__status-bar";
        this.#disabled = false;

        let pageContainer = document.createElement("div");
        this.#paginator = new Paginator(pageSizes);

        pageContainer.className = "paginator-container";
        this.#paginator.appendTo(pageContainer);
        this.#element.appendChild(pageContainer);

        let pageDisplayContainer = document.createElement('div');
        pageDisplayContainer.className = "page-display-container";
        this.#pageDisplay = new PageDisplay(pageDisplayTemplate);
        this.#pageDisplay.appendTo(pageDisplayContainer);
        this.#element.appendChild(pageDisplayContainer);
    }

    plugin(grid) {
        this.appendTo(grid.footer);
        this.setModel(grid.model);
    }

    render() {

    }

    setModel(model) {
        this.#model = model;

        this.#paginator.setModel(model);
        this.#pageDisplay.setModel(model);
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

    get disabled() {
        return this.#disabled;
    }

    set disabled(value) {
        value = !!value;
        this.#paginator.disabled = value;
    }

    setDisabled(value) {
        this.disabled = value;
    }
}