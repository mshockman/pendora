import DataGridRow from "./DataGridRow";


export default class DataModel {
    #columns;
    #data;
    #rowHeight;

    constructor(columns, data, rowHeight) {
        this.#data = data;
        this.#rowHeight = rowHeight;
        this.#columns = columns;
    }

    getRow(index) {
        return this.#data[index];
    }

    getRowLength() {
        return this.#data.length;
    }

    getRowHeight() {
        return this.#rowHeight;
    }

    getColumn(index) {
        return this.#columns[index];
    }

    getColumnLength() {
        return this.#columns.length;
    }

    getColumns() {
        return this.#columns;
    }

    setColumns(columns) {
        this.#columns = columns;
    }

    rowFactory(list, model, data, index) {
        return new DataGridRow(model, data, index);
    }
}
