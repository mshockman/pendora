/**
 * @interface
 */
export default class DataGridRowInterface {
    render() {}

    appendTo(selector) {}

    getCellByElement(element) {}

    getTargetCell(target) {}

    get element() {}

    get index() {}

    get model() {}

    get data() {}
}
