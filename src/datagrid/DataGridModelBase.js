import Publisher from "../core/Publisher";

/**
 * An abstract class that all data models should inherit from.  This class in responsible for managing the data
 * that is display by any data grids and publishes a data change topic whenever the data is changed.
 * @abstract
 */
export default class DataGridModelBase extends Publisher {
    /**
     * Returns a Object of key value pairs for the row at the given index.
     *
     * @param rowIndex
     * @abstract
     * @returns Object
     */
    getRow(rowIndex) {}

    /**
     * Returns the value for the given row cell.
     * @param rowIndex
     * @param key
     * @abstract
     * @returns *
     */
    getValue(rowIndex, key) {}

    /**
     * Sets the value for the given cell and publishes a data.change topic.
     *
     * @param rowIndex
     * @param key
     * @param value
     * @abstract
     */
    setValue(rowIndex, key, value) {}

    /**
     * Returns the number of rows in the data model.
     * @returns Number
     * @abstract
     */
    getLength() {}

    /**
     * @abstract
     * @returns {Generator<*, void, *>}
     */
    *[Symbol.iterator]() {}
}
