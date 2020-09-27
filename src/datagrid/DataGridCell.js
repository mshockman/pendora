import DataGridCellBase from "./DataGridCellBase";


/**
 * @implements DataGridCellInterface
 */
export default class DataGridCell extends DataGridCellBase {
    constructor(column, data, row) {
        let element = document.createElement("div");
        element.className = "data-grid__cell";

        let body = document.createElement("div");
        body.className = "data-grid__cell-body";
        body.innerHTML = data[column.key];
        element.appendChild(body);

        super(element, column, row);
    }
}
