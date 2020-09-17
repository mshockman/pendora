/**
 * column.resize-start
 * column.resize
 * column.resize-end
 * resize-complete
 *
 * column.order-by
 *
 * column.drag-start
 * column.drag
 * column.drag-complete
 * sort-change
 */
import Publisher from "../core/Publisher";
import {clone} from "../core/ui/Draggable";
import Sortable from "../core/ui/Sortable";
import {arraysEqual, clamp} from "../core/utility";
import DataGridHeaderColumn from "./DataGridHeaderColumn";


let HEADER_COLUMN_CACHE = new WeakMap();


export default class DataGridHeader extends Publisher {
    #element;
    #body;
    #columns;
    #model;

    #resizeable;
    #sortable;
    #tableSort;
    #sorter;

    #columnElementMap;

    #minInnerWidth;
    #innerWidth;
    #innerHeight;

    #scrollBarPadding;

    constructor({model=null, resizeable=false, sortable=false, tableSort=false, scrollBarPadding=30}={}) {
        super();
        this.#element = document.createElement("div");
        this.#element.className = "data-grid-header";
        this.#body = document.createElement("div");
        this.#body.className = "data-grid-header__body";
        this.#element.appendChild(this.#body);
        this.#minInnerWidth = null;
        this.#innerWidth = null;
        this.#innerHeight = null;

        this.#columnElementMap = new WeakMap();

        this.#columns = [];
        this.#resizeable = resizeable;
        this.#sortable = sortable;
        this.#tableSort = tableSort;

        this.#scrollBarPadding = scrollBarPadding;

        if(this.#sortable) {
            this.#initTableSort();
        }

        if(model) {
            this.setModel(model);
        }
    }

    setModel(model) {
        if(this.#model) {
            this.clearColumns();
            this.#model = null;
        }

        this.#model = model;
        this.setColumns(this.#model.columns);
        this.render();
    }

    clearColumns() {
        while(this.#columns.length) {
            this.removeColumn(this.#columns[this.#columns.length-1].column);
        }
    }

    /**
     *
     * @param columns {DataColumnInterface}
     */
    setColumns(columns) {
        this.clearColumns();

        if(columns) {
            for(let column of columns) {
                this.appendColumn(column);
            }
        }
    }

    /**
     * Appends a DataHeaderColumn to the header instance.
     * @param column {DataColumnInterface}
     */
    appendColumn(column) {
        let headerColumn = column.columnFactory(this, this.#model);
        this.#attachHeaderColumn(headerColumn);
        this.#columns.push(headerColumn);
        headerColumn.appendTo(this.#body);
    }

    /**
     * Removes the DataHeaderColumn from the header.
     * @param column {DataColumnInterface}
     */
    removeColumn(column) {
        let index = this.#getColumnIndex(column);

        if(index === -1) {
            return;
        }

        let headerColumn = this.#columns[index];

        this.#detachHeaderColumn(headerColumn);

        if(headerColumn.element.parentElement) {
            headerColumn.element.parentElement.removeChild(headerColumn.element);
        }

        this.#columns.splice(index, 1);
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
        for(let column of this.#columns) {
            column.render();
        }

        this.innerWidth = clamp(this.totalColumnWidth + this.#scrollBarPadding, this.#minInnerWidth, null);
    }

    getColumnWidths() {
        let r = [];

        for(let column of this.#columns) {
            r.push(column.width);
        }

        return r;
    }

    getColumnFromElement(element) {
        return this.#columnElementMap.get(element);
    }

    #getColumnIndex(column) {
        for(let i = 0, l = this.#columns.length; i < l; i++) {
            let headerColumn = this.#columns[i];
            if(headerColumn === column) {
                return i;
            }
        }

        return -1;
    }

    /**
     *
     * @param headerColumn
     * @returns {DataGridHeaderColumn}
     */
    #attachHeaderColumn(headerColumn) {
        let cache = HEADER_COLUMN_CACHE.get(headerColumn);

        if(cache) {
            throw Error("Header column is already bound.");
        }

        cache = {};

        HEADER_COLUMN_CACHE.set(headerColumn, cache);

        cache.onResizeStart = () => {
            this.#minInnerWidth = this.innerWidth;
        };

        cache.onResize = topic => {
            this.render();

            this.publish('resize', {
                ...topic,
                header: this,
                headerColumn: headerColumn,
                scrollLeft: this.scrollLeft,
                scrollTop: this.scrollTop,
                innerWidth: this.innerWidth,
                innerHeight: this.innerHeight
            });
        };

        cache.onResizeComplete = topic => {
            this.#minInnerWidth = null;

            this.render();

            this.publish('resize-complete', {
                ...topic,
                header: this,
                headerColumn: headerColumn,
                scrollLeft: this.scrollLeft,
                scrollTop: this.scrollTop,
                innerWidth: this.innerWidth,
                innerHeight: this.innerHeight
            });
        };

        headerColumn.on('resize-start', cache.onResizeStart);
        headerColumn.on('resize', cache.onResize);
        headerColumn.on('resize-complete', cache.onResizeComplete);

        this.#columnElementMap.set(headerColumn.element, headerColumn);

        return headerColumn;
    }

    #detachHeaderColumn(headerColumn) {
        let cache = HEADER_COLUMN_CACHE.get(headerColumn);

        if(cache) {
            headerColumn.off('resize-start', cache.onResizeStart);
            headerColumn.off('resize', cache.onResize);
            headerColumn.off('resize-complete', cache.onResizeComplete);
            HEADER_COLUMN_CACHE.delete(headerColumn);
            this.#columnElementMap.delete(headerColumn.element);
        }
    }

    #compileColumnListFromDom() {
        let r = [];

        for(let child of this.#body.children) {
            let column = this.getColumnFromElement(child);

            if(column) {
                r.push(column);
            }
        }

        return r;
    }

    #initTableSort() {
        this.#sorter = new Sortable(this.#element, {
            helper: clone(1, "sort-clone-helper", 100),
            layout: 'x',
            axis: 'x',
            resistance: 25
        });

        this.#sorter.on(['sort-append', 'sort-complete', 'sort-start'], () => {
            this.#columns = this.#compileColumnListFromDom();
        });

        let startingColumns = null;

        this.#sorter.on("sort-append", () => {
            this.#columns = this.#compileColumnListFromDom();
            this.publish("sort-append", {topic: "sort-append", sorter: this.#sorter, target: this});
        });

        this.#sorter.on('sort-start', () => {
            this.#columns = this.#compileColumnListFromDom();
            startingColumns = this.#columns.slice(0);
            this.publish("sort-start", {topic: "sort-start", sorter: this.#sorter, target: this});
        });

        this.#sorter.on("sort-complete", topic => {
            this.#columns = this.#compileColumnListFromDom();
            this.publish("sort-complete", topic);

            if(!startingColumns || !arraysEqual(startingColumns, this.#columns)) {
                this.publish("sort-change", {topic: "sort-change", target: this, sorter: this.#sorter, columns: this.#columns});
            }

            startingColumns = null;
        });
    }

    get totalColumnWidth() {
        let widths = this.getColumnWidths();
        return widths.length ? this.getColumnWidths().reduce((r, v) => r + v) : 0;
    }

    get element() {
        return this.#element;
    }

    get columns() {
        return this.#columns.slice(0);
    }

    get length() {
        return this.#columns.length;
    }

    get scrollLeft() {
        return this.#element.scrollLeft;
    }

    get scrollTop() {
        return this.#element.scrollTop;
    }

    get innerWidth() {
        return this.#innerWidth;
    }

    get innerHeight() {
        return this.#innerHeight;
    }

    set innerWidth(value) {
        this.#innerWidth = value;
        this.#body.style.minWidth = value + "px";
    }

    set innerHeight(value) {
        this.#innerHeight = value;
        this.#body.style.minHeight = value + "px";
    }

    set scrollLeft(value) {
        this.#element.scrollLeft = value;
    }

    set scrollTop(value) {
        this.#element.scrollTop = value;
    }
}
