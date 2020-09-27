/**
 * @implements DataGridCellInterface
 */
export default class DataGridCellBase {
    #element;
    #column;
    #row;

    constructor(element, column, row) {
        this.#element = element;
        this.#column = column;
        this.#row = row;
    }

    render() {
        // do nothing.
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

    setWidth(width) {
        this.#element.style.width = `${width}px`;
    }

    get column() {
        return this.#column;
    }

    get element() {
        return this.#element;
    }

    get row() {
        return this.#row;
    }

    get data() {
        return this.#row.data;
    }

    get model() {
        return this.#row.model;
    }

    get key() {
        return this.#column.key;
    }

    get value() {
        return this.#row.data[this.#column.key];
    }

    set value(value) {
        this.#row.data[this.#column.key] = value;
    }
}