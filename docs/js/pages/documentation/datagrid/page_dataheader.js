import DataGridHeader, {DataColumn} from "datagrid/DataGridHeader";


export default class DataHeaderPage {
    load() {
        let header = new DataGridHeader({
            columns: [
                {label: "Test #1", resizeable: true, tableSort: true, minWidth: 100, width: 200},
                {label: "Test #2", resizeable: true, tableSort: true, minWidth: 100, width: 200},
                {label: "Test #3", resizeable: true, tableSort: true, minWidth: 100, width: 200},
                {label: "Test #4", resizeable: true, tableSort: true, minWidth: 100, width: 200},
                {label: "Test #5", resizeable: true, tableSort: true, minWidth: 100, width: 200}
            ],

            sortable: true
        });

        header.appendTo("#data-grid-header-container1");

        header.on('sort-change', topic => {
            console.log(topic);
        });
    }
}
