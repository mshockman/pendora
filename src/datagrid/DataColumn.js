import Publisher from "../core/Publisher";
import {clamp} from "../core/utility";
import DataGridCell from "./DataGridCell";
import DataGridHeaderColumn from "./DataGridHeaderColumn";


/**
 * @implements DataColumnInterface
 */
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
    #columnClasses;
    #cellClasses;
    #columnId;

    constructor({key, label, width=null, minWidth=0, maxWidth=Infinity, resizeable=false, tableSort=false, tableSortValue="none", sortable=false, columnClasses=null, cellClasses=null, columnId=null, ...options}={}) {
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

        this.#columnClasses = columnClasses;
        this.#cellClasses = cellClasses;
        this.#columnId = columnId;

        Object.assign(this, options);
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

    get columnClasses() {
        return this.#columnClasses;
    }

    get cellClasses() {
        return this.#cellClasses;
    }

    get columnId() {
        return this.#columnId;
    }

    /**
     *
     * @param header
     * @param model {DataModel}
     * @returns {DataGridHeaderColumn}
     */
    columnFactory(header, model) {
        return new DataGridHeaderColumn(model, this);
    }

    /**
     * @param row
     * @param data {Object}
     * @returns {DataGridCell}
     */
    cellFactory(row, data) {
        return new DataGridCell(this, data);
    }
}
