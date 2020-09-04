/**
 * @implements DataGridCellInterface
 */
export default class DataGridCell {
    #element;
    #column;

    constructor(column, data) {
        this.#element = document.createElement("div");
        this.#element.className = "data-grid__cell";
        this.#column = column;

        let body = document.createElement("div");
        body.className = "data-grid__cell-body";
        body.innerHTML = data[column.key];
        this.#element.appendChild(body);
        this.setWidth(column.width);
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
}