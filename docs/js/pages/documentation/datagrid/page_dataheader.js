import DataGridHeader, {DataColumn} from "datagrid/DataGridHeader";
import Viewport from "core/ui/Viewport";
import DataGridTable from "datagrid/DataGridTable";


export default class DataHeaderPage {
    load() {
        let rows = [];

        for(let i = 0; i < 50; i++) {
            rows.push([i, 2, 3, 4, 5]);
        }

        let table = new DataGridTable({
            columns: [
                {label: "Row", resizeable: true, tableSort: true, minWidth: 100, width: 200},
                {label: "Test #2", resizeable: true, tableSort: true, minWidth: 100, width: 200},
                {label: "Test #3", resizeable: true, tableSort: true, minWidth: 100, width: 200},
                {label: "Test #4", resizeable: true, tableSort: true, minWidth: 100, width: 200},
                {label: "Test #5", resizeable: true, tableSort: true, minWidth: 100, width: 200}
            ],

            sortable: true,
            resizeable: true,
            tableSort: true,

            rows
        });

        table.appendTo("#data-grid-header-container1");

        window.table = table;
    }
}
