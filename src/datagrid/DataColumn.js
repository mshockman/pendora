import Publisher from "../core/Publisher";
import {addClasses, clamp} from "../core/utility";


export default class DataColumn extends Publisher {
    #key;
    #label;
    #resizeable;
    #width;
    #minWidth;
    #maxWidth;
    #tableSort;
    #tableSortValue;
    #sortable;
    #cellRenderer;
    #columnRenderer;
    #columnClasses;
    #cellClasses;
    #columnId;

    #parent;

    constructor({key, label, width=null, minWidth=0, maxWidth=Infinity, resizeable=false, tableSort=false, tableSortValue="none", sortable=false, cellRenderer=null, columnRenderer=null, columnClasses=null, cellClasses=null, columnId=null, ...options}={}) {
        super();
        this.#key = key;
        this.#label = label;

        this.#resizeable = resizeable;
        this.#width = width;
        this.#minWidth = minWidth;
        this.#maxWidth = maxWidth;

        this.#tableSort = tableSort;
        this.#tableSortValue = tableSortValue;

        this.#sortable = sortable;

        this.#cellRenderer = cellRenderer;
        this.#columnRenderer = columnRenderer;

        this.#columnClasses = columnClasses;
        this.#cellClasses = cellClasses;
        this.#columnId = columnId;

        Object.assign(this, options);
    }

    renderColumn(column) {
        let body;

        if (this.#columnRenderer) {
            body = this.#columnRenderer.call(this, this.label);
        } else {
            body = document.createElement("div");
            body.innerHTML = this.#label;
        }

        if(this.columnClasses) {
            addClasses(column, this.#columnClasses);
        }

        body.classList.add("data-column__body");
        column.appendChild(body);
        return column;
    }

    renderCell(cell, data) {
        let body = document.createElement("div");
        body.className = "data-grid__cell-body";
        body.innerHTML = data[this.key];
        cell.appendChild(body);
        return cell;
    }

    _setParent(parent) {
        this.#parent = parent;
    }

    get parent() {
        return this.#parent;
    }

    get key() {
        return this.#key;
    }

    get label() {
        return this.#label;
    }

    get resizeable() {
        return this.#resizeable;
    }

    get width() {
        return this.#width;
    }

    set width(width) {
        this.#width = clamp(width, this.#minWidth, this.#maxWidth);
    }

    get minWidth() {
        return this.#minWidth;
    }

    get maxWidth() {
        return this.#maxWidth;
    }

    get tableSort() {
        return this.#tableSort;
    }

    get tableSortValue() {
        return this.#tableSortValue;
    }

    set tableSortValue(value) {
        this.#tableSortValue = value;
    }

    get sortable() {
        return this.#sortable;
    }

    get cellRenderer() {
        return this.#cellRenderer;
    }

    get columnRenderer() {
        return this.#columnRenderer;
    }

    get columnClasses() {
        return this.#columnClasses;
    }

    get cellClasses() {
        return this.#cellClasses;
    }

    get columnId() {
        return this.#columnId;
    }
}
