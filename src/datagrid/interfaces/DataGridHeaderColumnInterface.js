/**
 * @interface
 * @implements PublisherInterface
 */
export default class DataGridHeaderColumnInterface {
    appendTo(selector) {}

    render() {}

    get width() {}

    get element() {}

    /**
     *
     * @returns {null|DataGridHeader}
     */
    get parent() {}

    get column() {}

    get model() {}
}
