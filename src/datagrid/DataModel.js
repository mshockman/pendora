import DataGridRow from "./DataGridRow";
import Publisher from "../core/Publisher";


/**
 * @implements DataModelInterface
 */
export default class DataModel extends Publisher {
    static COLUMN_CHANGE_TOPIC = "column-change";
    static DATA_CHANGE_TOPIC = "data-change";
    static REFRESH_TOPIC = "refresh";

    #columns;
    #data;
    #rowHeight;

    constructor(columns, data, rowHeight) {
        super();
        this.#data = null;
        this.#rowHeight = rowHeight;
        this.#columns = [];

        if(columns) {
            this.setColumns(columns);
        }

        if(data) {
            this.setData(data);
        }
    }

    refresh(args) {
        args = args || {};

        this.publish(DataModel.REFRESH_TOPIC, {
            ...args,
            topic: DataModel.REFRESH_TOPIC,
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
        for(let column of this.#columns) {
            column.destroy();
        }

        this.#columns = [];

        for(let column of columns) {
            if(column.model) {
                column.destroy();
            }

            column.init(this);
            this.#columns.push(column);
        }

        this.publish(DataModel.COLUMN_CHANGE_TOPIC, {target: this, columns: this.#columns});
    }

    removeColumn(column) {
        let index = this.getColumnIndex(column);

        if(index !== -1) {
            this.#columns.splice(index, 1);
            column.destroy();
            this.publish(DataModel.COLUMN_CHANGE_TOPIC, {target: this, columns: this.#columns});
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
        this.publish(DataModel.COLUMN_CHANGE_TOPIC, {target: this, columns: this.#columns});
    }

    prependColumn(column) {
        if(column.model) {
            column.destroy();
        }

        column.init(this);

        return this.insertColumn(column, 0);
    }

    insertColumn(column, index) {
        if(column.model) {
            column.destroy();
        }

        column.init(this);

        this.#columns.splice(index, 0, [column]);
        this.publish(DataModel.COLUMN_CHANGE_TOPIC, {target: this});
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

    setData(data) {
        this.publish(DataModel.DATA_CHANGE_TOPIC, {target: this});
        this.#data = data;
    }
}
