import DataGridBase from "./DataGridBase";
import DataGridHeader from "./DataGridHeader";
import {addClasses} from "../core/utility";
import DataGridView from "./DataGridView";
import DataGridHeaderColumn from "./DataGridHeaderColumn";


export default class DataGrid extends DataGridBase {
    #dataGridHeader;
    #dataGridTable;

    /**
     *
     * @param model {DataModel}
     * @param resizeable
     * @param sortable
     * @param tableSort
     * @param classes
     * @param id
     * @param columnHeaderFactory
     */
    constructor(model, {resizeable=false, sortable=false, tableSort=false, classes=null, id=null, columnHeaderFactory=null}={}) {
        let dataGridHeader = new DataGridHeader({resizeable, sortable, tableSort}),
            dataGridView = new DataGridView(model);

        super(dataGridHeader, dataGridView);
        this.#dataGridHeader = dataGridHeader;
        this.#dataGridTable = dataGridView;

        if(classes) {
            addClasses(this.element, classes);
        }

        if(id) {
            this.element.id = id;
        }

        this.columnHeaderFactory = columnHeaderFactory || function(column) {
            return new DataGridHeaderColumn(column);
        }

        this.setModel(model);
    }
}