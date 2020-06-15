import {emptyElement, findChild, selectElement} from "../core/utility";
import DataGridViewBase from "./DataGridViewBase";
import {Rect} from "../core/vectors";


export default class TableView extends DataGridViewBase {
    #element;
    #colGroup
    #tbody;
    #model;
    #columns;
    #cols;

    constructor(columns, model) {
        super();
        this.#element = document.createElement("table");
        this.#colGroup = document.createElement("colgroup");
        this.#tbody = document.createElement("tbody");
        this.#cols = [];

        this.#element.appendChild(this.#colGroup);
        this.#element.appendChild(this.#tbody);

        this.#element.className = "table-view";
        this.#tbody.className = "table-view__body";

        this.setColumns(columns);
        this.setDataModel(model);
        this.render();
    }

    setDataModel(model) {
        this.#model = model;
    }

    setColumns(columns) {
        this.#columns = [];
        emptyElement(this.#colGroup);
        this.#cols = [];

        let fragment = document.createDocumentFragment();
        for(let column of columns) {
            column = {...column};
            this.#columns.push(column);

            let col = document.createElement("col");
            fragment.appendChild(col);
            this.#cols.push(col);

            if(typeof column.width === 'number') {
                col.style.width = column.width + "px";
            }
        }

        this.#colGroup.appendChild(fragment);
    }

    setColumnWidths(widths) {
        for(let i = 0; i < widths.length; i++) {
            this.#cols[i].style.width = widths[i] + "px";
        }

        let total = widths.reduce((a, v) => a+v);
        this.#element.style.width = total + "px";
    }

    getColumnWidths() {
        let r = [],
            tr = this.#tbody.querySelector('.table-view__tr');

        if(tr) {
            for(let td of tr.querySelectorAll(".table-view__td")) {
                r.push(Rect.getBoundingClientRect(td).width);
            }
        }

        return r;
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.#element);
        } else if(selector.appendChild) {
            selector.appendChild(this.#element);
        } else {
            selector.append(this.#element);
        }
    }

    render() {
        emptyElement(this.#tbody);
        let fragment = document.createDocumentFragment();

        for(let row of this.#model) {
            let tr = document.createElement("tr");
            tr.className = "table-view__tr";

            for(let column of this.#columns) {
                let td = document.createElement("td"),
                    value = row[column.key];

                td.className = "table-view__td";

                if(column.cellRenderer) {
                    td.appendChild(column.cellRenderer(value));
                } else {
                    let cell = document.createElement("div");
                    cell.className = "table-view__cell";
                    cell.innerHTML = value;
                    td.appendChild(cell);
                }

                tr.appendChild(td);
            }

            fragment.appendChild(tr);
        }

        this.#tbody.appendChild(fragment);
    }

    onViewportScroll(topic) {
        // do nothing
    }

    get element() {
        return this.#element;
    }
}
