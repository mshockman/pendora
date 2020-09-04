/**
 * @interface
 * @implements PublisherInterface
 */
export default class DataGridHeaderColumnInterface {
    appendTo(selector) {}

    render(clean=false) {}

    get width() {}

    set width(width) {}

    get element() {}

    /**
     *
     * @returns {null|DataGridHeader}
     */
    get parent() {}

    get column() {}

    get model() {}
}
