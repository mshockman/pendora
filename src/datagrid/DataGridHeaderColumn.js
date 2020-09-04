import {addClasses} from "../core/utility";
import DataGridHeaderColumnBase from "./DataGridHeaderColumnBase";


/**
 * @implements DataGridHeaderColumnInterface
 */
export default class DataGridHeaderColumn extends DataGridHeaderColumnBase {
    /**
     *
     * @param parent
     * @param model
     * @param column {DataColumn}
     */
    constructor(parent, model, column) {
        let element = document.createElement("div");
        element.className = "data-column";

        let body = document.createElement("div");
        body.innerHTML = column.label;

        if(column.columnClasses) {
            addClasses(element, column.columnClasses);
        }

        body.classList.add("data-column__body");
        element.appendChild(body);

        if(column.columnId) {
            element.id = id;
        }

        if(column.sortable) {
            element.classList.add('ui-sort-item');
        }

        super(element, parent, model, column);
    }
}


