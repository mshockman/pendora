import DataGridBase from "./DataGridBase";
import DataGridHeader from "./DataGridHeader";
import {addClasses} from "../core/utility";
import DataGridView from "./DataGridView";


export default class DataGrid extends DataGridBase {
    constructor(model, {resizeable=false, sortable=false, tableSort=false, classes=null, id=null}={}) {
        let dataGridHeader = new DataGridHeader({dataModel: model, resizeable, sortable, tableSort}),
            dataGridView = new DataGridView(model);

        super(dataGridHeader, dataGridView);

        if(classes) {
            addClasses(this.element, classes);
        }

        if(id) {
            this.element.id = id;
        }
    }
}