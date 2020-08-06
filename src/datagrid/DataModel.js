import Publisher from "../core/Publisher";


export default class DataModel extends Publisher {
    #columns;
    #data;
    #rowHeight;

    constructor(columns=null, data=null, rowHeight=25) {
        super();
        this.#columns = [];
        this.#rowHeight = rowHeight;

        if(columns) {
            this.setColumns(columns);
        }

        if(data) {
            this.setData(data);
        }
    }

    setData(data) {
        this.#data = data;
    }

    setColumns(columns) {
        for(let column of this.#columns) {
            column._setParent(null);
        }

        this.#columns = [];

        for(let column of columns) {
            if(column.parent === this) {
                this.#columns.push(column);
            } else if(column.parent) {
                column.parent.removeColumn(column);
                column._setParent(this);
                this.#columns.push(column);
            } else {
                column._setParent(this);
                this.#columns.push(column);
            }
        }
    }

    getColumns() {
        return this.#columns.slice();
    }

    removeColumn(column) {
        if(column.parent !== this) {
            return null;
        }

        let index;

        if(typeof column === "number") {
            if(!this.#columns[column]) {
                return null;
            }

            index = column;
        } else {
            index = this.#columns.indexOf(column);
        }

        column._setParent(null);
        this.#columns.splice(index, 1);
    }

    appendColumn(column) {
        if(column.parent) {
            column.parent.removeColumn(column);
        }

        column._setParent(this);
        this.#columns.push(column);
    }

    insertColumn(column, before) {
        if(!before) return this.appendColumn(column);

        if(typeof before !== 'number') {
            if(before.parent !== this) {
                throw new Error("Before column is not a child the header.");
            }

            before = this.#columns.indexOf(before);
        }

        if(column.parent) {
            column.parent.removeColumn(column);
        }

        this.#columns.splice(before, 0, [column]);
        column._setParent(this);
    }

    getColumn(index) {
        return this.#columns[index];
    }

    getColumnLength() {
        return this.#columns.length;
    }

    getLength() {
        return this.#data.length;
    }

    getRow(index) {
        return this.#data[index];
    }

    getRowDetails(index) {
        if(index >= 0 && index < this.getLength()) {
            return {
                index,
                row: this.getRow(index),
                height: this.#rowHeight,
                top: index * this.#rowHeight
            }
        }

        return null;
    }

    getTotalRowHeight() {
        return this.getLength() * this.#rowHeight;
    }

    getTotalColumnWidth() {
        let r = 0;

        for(let column of this.#columns) {
            r += column.width;
        }

        return r;
    }

    getRowIndexAtHeight(height) {
        height = Math.max(height, 0);
        return Math.floor(height / this.#rowHeight);
    }

    *[Symbol.iterator]() {
        for(let row of this.#data) {
            yield row;
        }
    }
}
