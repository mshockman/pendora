import {addClasses, emptyElement} from "../core/utility";


/**
 * @implements DataGridRowInterface
 */
export default class DataGridRow {
    #element;
    #columnMap;
    #data;
    #index;
    #model;
    #cells;

    constructor(model, data, index, {classes=null, id=null}={}) {
        this.#element = document.createElement("div");
        this.#element.className = "data-grid__row";
        this.#columnMap = new WeakMap();
        this.#index = index;
        this.#cells = [];

        if(classes) {
            addClasses(this.#element, classes);
        }

        if(id) {
            this.#element.id = id;
        }

        this.#model = model;
        this.#data = data;

        let fragment = document.createDocumentFragment();

        for(let i = 0, l = this.#model.getColumnLength(); i < l; i++) {
            let column = this.#model.getColumn(i),
                cell = column.cellFactory(this, this.#data);

            this.#columnMap.set(column, cell);
            cell.appendTo(fragment);
            this.#cells.push(cell);
        }

        this.#element.appendChild(fragment);
    }

    render() {
        let append = false;
        let cells = [];

        for(let i = 0, l = this.#model.getColumnLength(); i < l; i++) {
            let column = this.#model.getColumn(i),
                cell = this.#columnMap.get(column);

            cell.setWidth(column.width);
            cells.push(cell);

            if(this.#cells[i] !== cell) {
                append = true;
            }

            cell.render();
        }

        this.#cells = cells;

        if(append) {
            let fragment = document.createDocumentFragment();
            emptyElement(this.#element);

            for(let cell of cells) {
                cell.appendTo(fragment);
            }

            this.#element.appendChild(fragment);
        }
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
