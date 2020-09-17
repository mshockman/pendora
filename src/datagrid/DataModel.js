import DataGridRow from "./DataGridRow";
import Publisher from "../core/Publisher";


export default class DataModel extends Publisher {
    #columns;
    #data;
    #rowHeight;

    constructor(columns, data, rowHeight) {
        super();
        this.#data = data;
        this.#rowHeight = rowHeight;
        this.#columns = [];

        if(columns) {
            this.setColumns(columns);
        }
    }

    refresh(args) {
        args = args || {};

        this.publish("refresh", {
            ...args,
            topic: "refresh",
            model: this,
        });
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

    getColumnIndex(column) {
        return this.#columns.indexOf(column);
    }

    setColumns(columns) {
        while(this.#columns.length) {
            this.removeColumn(this.#columns[this.#columns.length - 1]);
        }

        for(let column of columns) {
            this.appendColumn(column);
        }
    }

    removeColumn(column) {
        let index = this.getColumnIndex(column);

        if(index !== -1) {
            this.#columns.splice(index, 1);
            column.destroy();
            return column;
        }

        return null;
    }

    appendColumn(column) {
        if(column.model) {
            column.destroy();
        }

        column.init(this);
        this.#columns.push(column);
    }

    prependColumn(column) {
        return this.insertColumn(column, 0);
    }

    insertColumn(column, index) {
        if(column.model) {
            column.destroy();
        }

        column.init(this);
        this.#columns.splice(index, 0, [column]);
    }

    rowFactory(list, model, data, index) {
        return new DataGridRow(model, data, index);
    }

    get columns() {
        return this.#columns;
    }

    get data() {
        return this.#data;
    }

    get rowHeight() {
        return this.#rowHeight;
    }

    *[Symbol.iterator]() {
        for(let row of this.data) {
            yield row;
        }
    }
}
