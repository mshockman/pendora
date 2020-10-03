import {clamp} from "../core/utility";
import DataGridHeaderColumn from "./DataGridHeaderColumn";
import DataGridCell from "./DataGridCell";
import Publisher from "../core/Publisher";


/**
 * Basic DataColumn class.  Defines all of the base operations expected for a normal data grid column.
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
    #model;

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

    init(model) {
        if(this.#model) {
            throw new Error("Column is already bound to model.");
        }

        this.#model = model;
        this.publish("init", {column: this});
    }

    destroy() {
        this.#model = null;
        this.publish("destroy", {column: this});
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
        let newValue = clamp(width, this.#minWidth, this.#maxWidth),
            oldValue = this.#width;

        if(newValue !== oldValue) {
            this.#width = width;

            if(this.#model) {
                this.#model.publish("col-resize", {topic: "resize", oldValue, newValue, column: this, model: this.#model});
            }
        }
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
        let oldValue = this.#tableSortValue;

        if(value !== oldValue) {
            this.#tableSortValue = value;

            if(this.#model) {
                this.#model.publish("table-sort", {topic: "table-sort", oldValue, newValue: value, column: this, model: this.#model});
            }
        }
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
        return new DataGridHeaderColumn(header, model, this);
    }

    /**
     * @param row
     * @param data {Object}
     * @returns {DataGridCell}
     */
    cellFactory(row, data) {
        return new DataGridCell(this, data, row);
    }

    get model() {
        return this.#model;
    }
}
