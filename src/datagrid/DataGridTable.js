import DataGridBase from "./DataGridBase";
import DataGridHeader from "./DataGridHeader";
import TableView from "./TableView";
import {addClasses} from "../core/utility";


export default class DataGridTable extends DataGridBase {
    constructor(columns, dataModel, {resizeable=false, sortable=false, tableSort=false, classes=null, id=null}={}) {
        let dataGridHeader = new DataGridHeader({columns, resizeable, sortable, tableSort}),
            dataGridView = new TableView(columns, dataModel);

        super(dataGridHeader, dataGridView);

        if(classes) {
            addClasses(this.element, classes);
        }

        if(id) {
            this.element.id = id;
        }
    }
}
