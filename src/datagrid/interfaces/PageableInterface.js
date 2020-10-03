/**
 * @interface
 * @implements PublisherInterface
 */
export default class PageableInterface {
    getCount() {}

    getPageNumber() {}

    getPageSize() {}

    getPageCount() {}

    setPageNumber(number) {}

    setPageSize(size) {}
}
