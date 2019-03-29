/**
 * @interface
 */
export default class Pageable {
    /**
     * Returns the current page.
     *
     * @returns {Number}
     */
    getPage() {}

    setPage(page) {}

    getItemCount() {}

    getPageSize() {}

    setPageSize(size) {}

    getPageCount() {}
}
