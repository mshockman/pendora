/**
 * An abstraction layer between all of the data grid components and the data those components are displaying.
 * Keeps track of things like pagination, loading, columns, filters, sorting and will query the server if additional
 * information is needed.
 */

import Observable from "../core/interface/Observable";
import {arraysEqual} from '../core/utility';


export const EVENTS = {
    dataChanged: 'data-changed',
    loadingStart: 'loading-start',
    loadingEnd: 'loading-end',
    requestSuccess: 'request-success',
    requestFailed: 'request-failed',
    columnRemoved: 'column-removed',
    columnAdded: 'column-added',
    columnsChanged: 'columns-changed',
    columnResized: 'column-resized'
};


/**
 * EVENTS:
 *  data-changed
 *
 * @interface
 */
export class DataSourceInterface extends Observable {
    /**
     * @virtual
     * @param index
     */
    getItem(index) {}

    /**
     * @virtual
     */
    getLength() {}

    /**
     * @virtual
     */
    getPageSize() {}

    /**
     * @virtual
     */
    getPageNumber() {}

    /**
     * @virtual
     * @param page
     */
    setPageNumber(page) {}

    /**
     * @virtual
     * @param size
     */
    setPageSize(size) {}

    /**
     * @virtual
     */
    filter() {}

    /**
     * @virtual
     */
    sort() {}

    /**
     * @virtual
     */
    getItemCount() {}

    /**
     * @virtual
     */
    isLoading() {}

    getPageTotal() {
        Math.ceil(this.getItemCount() / this.getPageSize());
    }

    /**
     * @virtual
     */
    getColumns() {}

    /**
     * @virtual
     * @param columns
     */
    setColumns(columns) {}

    /**
     * @virtual
     * @param column
     * @param width
     */
    setColumnWidth(column, width) {

    }
}


export class DataSource extends DataSourceInterface {
    constructor(data, columns, pageSize=100) {
        super();
        this._data = null;
        this._columns = [];
        this._pageNumber = 1;
        this._pageSize = pageSize;
        this.setData(data);
        this.setColumns(columns);
    }

    setData(data) {
        this._data = data;
        this.refresh();
    }

    setColumns(columns) {
        let added = [],
            removed = [],
            old = this._columns;

        for(let c of this._columns) {
            if(columns.indexOf(c) === -1) {
                this.trigger(EVENTS.columnRemoved, {
                    target: this,
                    column: c,
                    source: this
                });

                removed.push(c);
            }
        }

        for(let c of columns) {
            if(old.indexOf(c) === -1) {
                this.trigger(EVENTS.columnAdded, {
                    target: this,
                    column: c,
                    source: this
                });

                added.push(c);
            }
        }

        this._columns = columns;

        this.trigger(EVENTS.columnsChanged, {
            target: this,
            from: old,
            to: columns,
            added: added,
            removed: removed,
            source: this
        });

        if(!arraysEqual(old, this._columns)) {
            this.refresh();
        }
    }

    getColumns() {
        return this._columns;
    }

    setPageSize(size) {
        if(size !== this._pageSize) {
            this._pageSize = size;
            this.refresh();
        }
    }

    setPageNumber(page) {
        if(page !== this._pageNumber) {
            this._pageNumber = page;
            this.refresh();
        }
    }

    getPageNumber() {
        return this._pageNumber;
    }

    getPageSize() {
        return this._pageSize;
    }

    getLength() {
        let pageIndex = this.getPageNumber() - 1,
            pageSize = this.getPageSize(),
            start = pageIndex * pageSize,
            end = Math.min(start + pageSize, this._data.length);

        return end - start;
    }

    getItemCount() {
        return this._data.length;
    }

    getItem(index) {
        let pageIndex = this.getPageNumber() - 1,
            pageSize = this.getPageSize(),
            offset = pageSize * pageIndex,
            length = this.getLength();

        if(index >= length) {
            index = null;
        }

        if(index < 0) {
            index = null;
        }

        if(index !== null) {
            return this._data[offset + index];
        }
    }

    filter() {

    }

    sort() {

    }

    refresh() {
        if(this._refreshID) return;

        this._refreshID = window.requestAnimationFrame(() => {
            this._refreshID = null;
            this.trigger('data-changed', {target: this});
        });
    }

    isLoading() {
        return false;
    }

    setColumnWidth(column, width) {
        if(typeof column === 'number') {
            column = this.getColumns()[column];
        } else if(this.getColumns().indexOf(column) === -1) {
            throw new Error("unknown column");
        }

        let oldWidth = column.width;

        if(width !== oldWidth) {
            column.width = width;

            this.trigger(EVENTS.columnResized, {
                column: column,
                oldWidth: oldWidth,
                width: width,
                source: this
            });
        }
    }
}