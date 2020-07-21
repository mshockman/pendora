import DataTable from "../../../../../src/datagrid/DataTable";


export default class PageDataTable {
    constructor() {

    }

    load() {
        window.t1 = DataTable.buildFromTable("#test-table1");
    }
}