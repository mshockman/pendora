import DataGridHeaderColumnBase from "./DataGridHeaderColumnBase";
import DataGridCellBase from "./DataGridCellBase";
import DataColumn from "./DataColumn";


export default class CheckboxColumn extends DataColumn {
    constructor({key, width=null, minWidth=0, maxWidth=Infinity, resizeable=false, tableSort=false, tableSortValue="none", sortable=false, columnClasses=null, cellClasses=null, columnId=null, ...options}={}) {
        super({key, label: "", width, minWidth, maxWidth, resizeable, tableSort, tableSortValue, sortable, columnClasses, cellClasses, columnId, ...options});
    }

    cellFactory(row, data) {
        return new CheckboxCell(this, data);
    }

    columnFactory(header, model) {
        return new CheckboxHeaderColumn(header, model, this);
    }

    getSelectedRows() {
        let r = [];

        for(let data of this.model) {
            if(data[this.key]) {
                r.push(data);
            }
        }

        return r;
    }

    init(model) {
        super.init(model);

        this.model.getSelectedRows = () => {
            return this.getSelectedRows();
        };
    }

    destroy() {
        delete this.model.getSelectedRows;
        super.destroy();
    }
}


/**
 * @implements DataGridHeaderColumnInterface
 */
export class CheckboxHeaderColumn extends DataGridHeaderColumnBase {
    #checkbox;

    constructor(parent, model, column) {
        let element = document.createElement("div"),
            checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        element.className = "check-all-column";
        element.appendChild(checkbox);

        super(element, parent, model, column);

        this.#checkbox = checkbox;

        checkbox.addEventListener('change', event => {
            for(let data of this.model) {
                data[this.column.key] = this.#checkbox.checked;
                this.model.refresh();
            }
        });
    }
}


/**
 * @implements DataGridCellInterface
 */
export class CheckboxCell extends DataGridCellBase {
    #data;
    #checkbox;

    constructor(column, data) {
        let element = document.createElement("div"),
            checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        element.className = "checkbox-cell";

        element.appendChild(checkbox);

        super(element, column);

        this.#data = data;
        this.#checkbox = checkbox;
    }

    render() {
        this.#checkbox.checked = !!this.#data[this.column.key];
    }
}
