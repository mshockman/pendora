/**
 * @interface
 */
class DataSourceInterface {
    getLength() {}

    getItem(index) {}

    *items() {}
}


/**
 * @interface
 * @implements DataSourceInterface
 */
class DataSourceEditableInterface {
    setDataField(index, fieldName, value) {}

    getDataField(index, fieldName) {}
}
