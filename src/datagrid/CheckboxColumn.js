import DataGridHeaderColumnBase from "./DataGridHeaderColumnBase";
import DataGridCellBase from "./DataGridCellBase";
import DataColumn from "./DataColumn";


export default class CheckboxColumn extends DataColumn {
    #header;

    constructor({key, width=null, minWidth=0, maxWidth=Infinity, resizeable=false, tableSort=false, tableSortValue="none", sortable=false, columnClasses=null, cellClasses=null, columnId=null, ...options}={}) {
        super({key, label: "", width, minWidth, maxWidth, resizeable, tableSort, tableSortValue, sortable, columnClasses, cellClasses, columnId, ...options});
    }

    cellFactory(row, data) {
        return new CheckboxCell(this, data, row);
    }

    columnFactory(header, model) {
        this.#header = new CheckboxHeaderColumn(header, model, this);
        return this.#header;
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
        this.#header = null;
        delete this.model.getSelectedRows;
        super.destroy();
    }

    get header() {
        return this.#header;
    }

    get checked() {
        return this.#header.checked;
    }

    set checked(value) {
        this.#header.checked = value;
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

    get checked() {
        return this.#checkbox.checked;
    }

    set checked(value) {
        this.#checkbox.checked = value;
    }
}


/**
 * @implements DataGridCellInterface
 */
export class CheckboxCell extends DataGridCellBase {
    #data;
    #checkbox;

    constructor(column, data, row) {
        let element = document.createElement("div"),
            checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        element.className = "checkbox-cell";

        element.appendChild(checkbox);

        super(element, column, row);

        this.#data = data;
        this.#checkbox = checkbox;
    }

    render() {
        this.#checkbox.checked = !!this.#data[this.column.key];
    }

    onChange(event) {
        if(event.target === this.#checkbox) {
            let checked = this.#checkbox.checked;

            this.#data[this.column.key] = checked;

            if(!checked) {
                this.column.checked = false;
            }
        }
    }

    get value() {
        let value = super.value;
        return value != null ? value : false;
    }

    get checked() {
        return this.value;
    }

    set checked(value) {
        this.value = value;
    }
}
