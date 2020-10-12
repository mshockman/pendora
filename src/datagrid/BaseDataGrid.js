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
    #isDisabled;
    #isLoading;

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

        this.#isDisabled = false;
        this.#isLoading = false;

        this.#dataGridView = new DataGridView();
        this.#dataGridView.appendTo(this.bodyElement);

        if(dataModel) {
            this.setModel(dataModel);
        }
    }

    setModel(model) {
        this.#model = model;
        this.#dataGridView.setModel(model);
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

    render() {
        this.#dataGridView.render();
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

    set disabled(value) {
        value = !!value;

        if(value !== this.#isDisabled) {
            if(value) {
                this.#rootElement.classList.add("disabled");
                this.#isDisabled = true;
            } else {
                this.#rootElement.classList.remove("disabled");
                this.#isDisabled = false;
            }

            this.#dataGridView.disabled = value;
        }
    }

    get disabled() {
        return this.#isDisabled;
    }
}