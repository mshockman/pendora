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
    getPageTotal() {}

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

    getLastPage() {

    }
}
