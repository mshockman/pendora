import DataGridHeader from "./DataGridHeader";
import DataGridView from "./DataGridView";
import BaseDataGrid from "./BaseDataGrid";


export default class DataGrid extends BaseDataGrid {
    #dataGridHeader;

    constructor(dataModel=null, {resizeable=true, sortable=true, tableSort=true, scrollBarPadding=30, preprocessRows=false}={}) {
        super(dataModel);

        this.#dataGridHeader = this.plugin(new DataGridHeader({resizeable, sortable, tableSort, scrollBarPadding}));
    }

    get dataGridHeader() {
        return this.#dataGridHeader;
    }
}
