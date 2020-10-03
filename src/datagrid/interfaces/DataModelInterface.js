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

    getColumnIndex() {}

    setColumns(columns) {}

    rowFactory(list, model, data, index) {}

    setData(data) {}

    refresh() {}

    getAllData() {}

    get isLoading() {}

    set isLoading(value) {}

    get rowHeight() {}

    get data() {}

    get columns() {}

    *[Symbol.iterator]() {}
}
