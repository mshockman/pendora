import DataGridHeader, {DataColumn} from "datagrid/DataGridHeader";


export default class DataHeaderPage {
    load() {
        let header = new DataColumn({label: "Test 01", resizeable: true, tableSort: true});
        header.appendTo("#data-grid-header-container1");
    }
}
