import DataGridTable from "../../../../../src/datagrid/DataGridTable";
import DataColumn from "../../../../../src/datagrid/DataColumn";
import DataModel from "../../../../../src/datagrid/DataModel";
import {randomChoice} from "../../../../../src/core/utility";


export default class PageDataGrid {
    load() {
        let columns = [],
            data = [];

        for(let i = 0; i < 5; i++) {
            let column = new DataColumn({
                key: `column${i}}`,
                label: `Column #${i+1}`,
                resizeable: true,
                sortable: true,
                tableSort: true,
                width: null,
                minWidth: 100
            });

            columns.push(column);
        }

        for(let i = 0; i < 100; i++) {
            let row = {};

            for(let column of columns) {
                row[column.key] = randomChoice(["Red", "Green", "Blue", "Orange", "Pink", "White", "Black", "Purple"]);
            }

            data.push(row);
        }

        let table = new DataGridTable(columns, new DataModel(data));
        table.appendTo("#data-grid-container1");
        window.table = table;

        table.render();

        window.addEventListener("resize", (e) => {
            table.render();
        });
    }
}
