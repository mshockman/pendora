import Publisher from "../core/Publisher";
import DataGridHeader from "./DataGridHeader";
import Viewport from "../core/ui/Viewport";
import {emptyElement} from "../core/utility";


export default class DataTable extends Publisher {
    #element;
    #header;
    #viewport;
    #table;
    #colGroup;
    #cols;
    #tableBody;

    constructor({columns=null, rows=null, resizeable=false, sortable=false, tableSort=false}) {
        super();

        this.#element = document.createElement("div");
        this.#element.className = "data-table";

        this.#header = new DataGridHeader({resizeable, sortable, tableSort});
        this.#header.appendTo(this.#element);
        this.#header.element.className = "data-table__header";

        this.#viewport = new Viewport();
        this.#viewport.appendTo(this.#element);
        this.#viewport.element.className = "data-table__viewport";

        this.#table = document.createElement("table");
        this.#table.className = "data-table__table";
        this.#colGroup = document.createElement("colgroup");
        this.#table.appendChild(this.#colGroup);
        this.#tableBody = document.createElement("tbody");
        this.#table.appendChild(this.#tableBody);

        this.#viewport.appendChild(this.#table);
        this.#cols = [];

        if(columns) {
            this.setColumns(columns);
        }

        if(rows) {
            this.setRows(rows);
        }

        this.#header.on('resize', topic => {
            let column = topic.column,
                index = this.#header.getColumnIndex(column);

            this.#cols[index].style.width = column.width + "px";
            this.#table.style.width = this.#header.totalColumnWidth + "px";
        });

        this.#header.on('resize-complete', topic => {
            console.log(topic);
        });
    }

    setColumns(columns) {
        this.#header.setColumns(columns);
        emptyElement(this.#colGroup);
        this.#cols = [];

        for(let i = 0; i < this.#header.length; i++) {
            let column = this.#header.getColumn(i),
                col = document.createElement("col");

            col.style.width = column.width + "px";
            this.#cols.push(col);
            this.#colGroup.appendChild(col);
        }

        this.#table.style.width = this.#header.totalColumnWidth + "px";
    }

    setRows(rows) {
        emptyElement(this.#tableBody);

        for(let row of rows) {
            let tr = document.createElement("tr");

            for(let cell of row) {
                let td = document.createElement('td');
                td.innerHTML = cell;
                tr.appendChild(td);
            }

            this.#tableBody.appendChild(tr);
        }
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
}