import Publisher from "../core/Publisher";


/**
 * @abstract
 */
export default class DataGridViewBase extends Publisher {
    /**
     * @abstract
     * @param columns
     */
    setColumns(columns) {}

    /**
     * @abstract
     * @param model
     */
    setDataModel(model) {}

    /**
     * @abstract
     */
    getColumnWidths() {}

    /**
     * @abstract
     * @param selector
     */
    appendTo(selector) {}

    /**
     * @abstract
     */
    get element() {}
}