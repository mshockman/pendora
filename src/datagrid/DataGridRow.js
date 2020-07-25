import {addClasses} from "../core/utility";


export default class DataGridRow {
    #element;
    #dataGridView;
    #columnMap;
    #data;
    #index;
    #model;

    constructor(dataGridView, data, index, {classes=null, id=null}={}) {
        this.#element = document.createElement("div");
        this.#element.className = "data-grid__row";
        this.#dataGridView = dataGridView;
        this.#columnMap = new WeakMap();
        this.#index = index;

        if(classes) {
            addClasses(this.#element, classes);
        }

        if(id) {
            this.#element.id = id;
        }

        this.#model = this.#dataGridView.model;
        this.#data = data;

        for(let i = 0, l = this.#model.getColumnLength(); i < l; i++) {
            let column = this.#model.getColumn(i),
                cell = document.createElement("div");

            cell.className = "data-grid__cell";
            cell = column.renderCell(cell, this.#data);
            cell.style.width = column.width + "px";
            this.#columnMap.set(column, cell);
            this.#element.appendChild(cell);
        }
    }

    render() {
        let model = this.#dataGridView.model;

        for(let i = 0, l = model.getColumnLength(); i < l; i++) {
            let column = model.getColumn(i),
                cell = this.#columnMap.get(column);

            cell.style.width = column.width + "px";
        }

        let details = this.#model.getRowDetails(this.#index);
        this.#element.style.height = details.height + "px";
        this.#element.style.transform = `translateY(${details.top}px)`;
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

    get dataGridView() {
        return this.#dataGridView;
    }

    get index() {
        return this.#index;
    }

    get model() {
        return this.#model;
    }

    get data() {
        return this.#data;
    }
}