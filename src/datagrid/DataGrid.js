import DataGridHeader from "./DataGridHeader";
import DataGridView from "./DataGridView";


export default class DataGrid {
    #rootElement;
    #headerElement;
    #bodyElement;
    #footerElement;

    #dataGridHeader;
    #dataGridView;

    #model;

    constructor(dataModel=null, {resizeable=true, sortable=true, tableSort=true, scrollBarPadding=30, preprocessRows=false}={}) {
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

        this.#dataGridHeader = new DataGridHeader({resizeable, sortable, tableSort, scrollBarPadding});
        this.#dataGridHeader.appendTo(this.#headerElement);

        this.#dataGridView = new DataGridView();
        this.#dataGridView.appendTo(this.#bodyElement);

        this.#dataGridHeader.on('resize', () => {
            this.#dataGridView.render();
        });

        this.#dataGridHeader.on("sort-change", topic => {
            let columns = [];

            for(let column of topic.columns) {
                columns.push(column.column);
            }

            this.#model.setColumns(columns);
            this.#dataGridView.render();
        });

        if(dataModel) {
            this.setModel(dataModel);
        }
    }

    setModel(model) {
        this.#model = model;
        this.#dataGridHeader.setModel(model);
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

    }

    get element() {
        return this.#rootElement;
    }

    get model() {
        return this.#model;
    }
}