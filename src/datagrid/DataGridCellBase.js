/**
 * @implements DataGridCellInterface
 */
export default class DataGridCellBase {
    #element;
    #column;

    constructor(element, column) {
        this.#element = element;
        this.#column = column;
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