import Observable from "../core/interface/Observable";


export const EVENTS = {
    dataChanged: 'data-changed',
    loadingStart: 'loading-start',
    loadingEnd: 'loading-end',
    requestSuccess: 'request-success',
    requestFailed: 'request-failed'
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

    getPageTotal() {
        Math.ceil(this.getItemCount() / this.getPageSize());
    }
}


export class DataSource extends DataSourceInterface {
    constructor(data, pageSize=100) {
        super();
        this._data = null;
        this._pageNumber = 1;
        this._pageSize = pageSize;
        this.setData(data);
    }

    setData(data) {
        this._data = data;
        this.refresh();
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
}