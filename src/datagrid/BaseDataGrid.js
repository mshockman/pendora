import DataGridView from "./DataGridView";


export default class BaseDataGrid {
    #rootElement;
    #headerElement;
    #bodyElement;
    #footerElement;

    /**
     * @type DataGridView
     */
    #dataGridView;

    #model;
    #plugins = [];

    constructor(dataModel=null) {
        this.#rootElement = document.createElement("div");
        this.#headerElement = document.createElement("div");
        this.#bodyElement = document.createElement("div");
        this.#footerElement = document.createElement("div");

        this.#rootElement.className = "data-grid";
        this.#headerElement.className = "data-grid__header";
        this.#bodyElement.className = "data-grid__body";
        this.#footerElement.className = "data-grid__footer";

        this.#rootElement.appendChild(this.#headerElement);
        this.#rootElement.appendChild(this.#bodyElement);
        this.#rootElement.appendChild(this.#footerElement);

        this.#plugins = [];

        if(dataModel) {
            this.setModel(dataModel);
        }

        this.#dataGridView = this.plugin(new DataGridView());
    }

    setModel(model) {
        this.#model = model;

        for(let plugin of this.#plugins) {
            if(plugin.setModel) {
                plugin.setModel(model);
            }
        }
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.element);
        } else if(selector.appendChild) {
            selector.appendChild(this.element);
        } else {
            selector.append(this.element);
        }
    }

    plugin(plugin) {
        plugin.plugin({grid: this, body: this.#bodyElement, footer: this.#footerElement, header: this.#headerElement, root: this.#rootElement, model: this.#model});
        this.#plugins.push(plugin);
        return plugin;
    }

    render() {
        for(let plugin of this.#plugins) {
            if(plugin.render) {
                plugin.render();
            }
        }
    }

    get element() {
        return this.#rootElement;
    }

    get model() {
        return this.#model;
    }

    get headerElement() {
        return this.#headerElement;
    }

    get footerElement() {
        return this.#footerElement;
    }

    get bodyElement() {
        return this.#bodyElement;
    }

    get dataGridView() {
        return this.#dataGridView;
    }
}