/**
 * An abstraction layer between all of the data grid components and the data those components are displaying.
 * Keeps track of things like pagination, loading, columns, filters, sorting and will query the server if additional
 * information is needed.
 */

import {IndexError} from '../core/errors';
import {clamp} from '../core/utility';
import Observable from "../core/interface/Observable";



export const EVENTS = {
    dataChanged: 'data-changed',
    dataRefreshed: 'data-refreshed',
    loadingStart: 'loading-start',
    loadingEnd: 'loading-end',
    requestSuccess: 'request-success',
    requestFailed: 'request-failed'
};


/**
 * Stores row data for the DataGrid component.
 *
 * @implements Pageable
 */
export class DataSource extends Observable {
    constructor(data) {
        super();
        this._page = 1;
        this._pageSize = Number.POSITIVE_INFINITY;

        if(data) {
            this.setData(data);
        }
    }

    setData(data) {
        this._data = data;
        this._page = 1;
    }

    //---------------------------------------------------------------------------------------------------//
    // Primary data source method.  Used by the data grid to list the rows that need to be displayed.

    /**
     * Returns the data row at the given index.  If a value outside the valid range of 0 <= index < this.getLength()
     * is passed a IndexError should be thrown.
     *
     * @param index {Number} - Index of the value to retrieve.
     * @throws IndexError - Outside valid range
     * @return {Object} - Row at the given index.
     */
    getItem(index) {
        let offset = 0,
            pageSize = this.getPageSize();

        if(pageSize !== Number.POSITIVE_INFINITY) {
            offset = (this.getPage() - 1) * this.getPageSize();
        }

        if(index >= 0 && index < this.getLength()) {
            return this._data[offset + index];
        } else {
            throw new IndexError(`${index} is out of range`);
        }
    }


    /**
     * Returns the total number of data rows that are CURRENTLY BEING DISPLAYED.  Not the total number of rows in
     * the data source object in total.  To get the total number of items use the getItemCount() method.  In many
     * cases the getLength() and getItemCount() methods might return the same value.  For example if there is no
     * pagination and all items are currently being displayed.
     *
     * @return {Number}
     */
    getLength() {
        if(this.getPageSize() !== Number.POSITIVE_INFINITY) {
            let offset = (this.getPage() - 1) * this.getPageSize();
            return clamp(this.getItemCount() - offset, 0, this.getPageSize());
        } else {
            return this.getItemCount();
        }
    }

    /**
     * Iterates through all rows currently being displayed.  This is an alternate to using the standard for loop with
     * the getItem() and getLength() methods.
     *
     * @return {IterableIterator<Object>}
     */
    * items() {
        for(let i = 0, l = this.getLength(); i < l; i++) {
            yield this.getItem(i);
        }
    }

    //---------------------------------------------------------------------------------------------
    // Used by cell editors to modify the value of a rows field.
    // These methods are responsible for sending the new data to the server if necessary.

    /**
     * Sets the value of the field of the row at the given index.
     *
     * @param index {Number} - Index of the row who's field is being set.
     * @param field - {String} - The name of the field to set.
     * @param value {*} - The value to set the field to.
     * @throws IndexError - If the index is out of bounds.
     */
    setDataField(index, field, value) {
        let item = this.getItem(index);
        item[field] = value;
    }

    /**
     * Returns the value of the field of the row at the given index.
     *
     * @param index {Number} - Index of the row who's field is being retrieved.
     * @param field {String} - The name of the field to get.
     * @throws IndexError - If the index is out of bounds.
     */
    getDataField(index, field) {
        let item = this.getItem(index);
        return item[field];
    }

    getPage() {
        return this._page;
    }

    getItemCount() {
        return this._data ? this._data.length : 0;
    }

    getPageCount() {
        return Math.max(1, Math.ceil(this.getItemCount() / this.getPageSize()));
    }

    getPageSize() {
        return this._pageSize;
    }

    setPage(page) {
        if(this._page !== page) {
            this._page = page;
            this.queueDataChange();
        }
    }

    setPageSize(size) {
        if(this._pageSize !== size) {
            this._pageSize = size;
            this.queueDataChange();
        }
    }

    queueDataChange() {
        if(this._dataChangeQueue) return;

        this._dataChangeQueue = window.requestAnimationFrame(() => {
            this._dataChangeQueue = null;

            this.trigger(EVENTS.dataChanged, {
                target: this
            });
        });
    }
}