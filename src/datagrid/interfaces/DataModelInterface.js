import DataGridRow from "../DataGridRow";


/**
 * @interface
 */
export class DataModelInterface {
    constructor(columns, data, rowHeight) {}

    getRow(index) {}

    getRowLength() {}

    getRowHeight() {}

    getColumn(index) {}

    getColumnLength() {}

    getColumns() {}

    setColumns(columns) {}

    rowFactory(list, model, data, index) {}
}
