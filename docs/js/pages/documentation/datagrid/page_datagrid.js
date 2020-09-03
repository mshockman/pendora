import {randomChoice} from "../../../../../src/core/utility";
import DataColumn from "../../../../../src/datagrid/DataColumn";
import DataModel from "../../../../../src/datagrid/DataModel";
import DataGridHeader from "../../../../../src/datagrid/DataGridHeader";
import DataGrid from "../../../../../src/datagrid/DataGrid";


export default class PageDataGrid {
    constructor() {

    }

    load() {
        let columns = [
            new DataColumn({key: "column1", label: "Column #1", minWidth: 100, maxWidth: null, width: 200, resizeable: true, tableSort: true, tableSortValue: "none", sortable: true}),
            new DataColumn({key: "column2", label: "Column #2", minWidth: 100, maxWidth: 500, width: 200, resizeable: true, tableSort: true, tableSortValue: "none", sortable: true}),
            new DataColumn({key: "column3", label: "Column #3", minWidth: 100, maxWidth: 500, width: 200, resizeable: true, tableSort: true, tableSortValue: "none", sortable: true}),
            new DataColumn({key: "column4", label: "Column #4", minWidth: 100, maxWidth: 500, width: 200, resizeable: true, tableSort: true, tableSortValue: "none", sortable: true}),
            new DataColumn({key: "column5", label: "Column #5", minWidth: 100, maxWidth: 500, width: 200, resizeable: true, tableSort: true, tableSortValue: "none", sortable: true}),
        ];

        let model = new DataModel(columns, this.buildTestData(100000), 34);

        let grid = new DataGrid(model,{resizeable: true, sortable: true, tableSort: true});

        grid.appendTo("#data-grid-container1");
        grid.render();

        window.model = model;
        window.grid = grid;
    }

    buildTestData(count) {
        let data = [];

        for(let i = 0; i < count; i++) {
            data.push({
                column1: i,
                column2: '$' + (Math.random()*1000).toFixed(2),
                column3: randomChoice(["Google", "Bing", "Yahoo"]),
                column4: randomChoice(["Red", "Green", "Blue", "Yellow", "Orange", "Black"]),
                column5: (Math.random()*10000).toFixed(2)
            });
        }

        return data;
    }
}
