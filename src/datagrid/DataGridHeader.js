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
import {arraysEqual, clamp, emptyElement} from "../core/utility";
import DataGridHeaderColumn from "./DataGridHeaderColumn";
import DataModel from "./DataModel";


export default class DataGridHeader extends Publisher {
    #element;
    #body;
    #model;

    #resizeable;
    #sortable;
    #tableSort;
    #sorter;

    #elementToHeaderColumnMap;
    #dataColumnToHeaderColumnMap;

    #minInnerWidth;
    #innerWidth;
    #innerHeight;

    #scrollBarPadding;

    #onColumnChange;
    #onResizeStart;
    #onResize;
    #onResizeComplete;
    #onDataChange;

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

        this.#elementToHeaderColumnMap = new WeakMap();
        this.#dataColumnToHeaderColumnMap = new WeakMap();

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

        let columnChangeQueueId = null;

        this.#onColumnChange = () => {
            if(!columnChangeQueueId) {
                columnChangeQueueId = window.requestAnimationFrame(() => {
                    columnChangeQueueId = null;

                    this.clearColumns();
                    this.render();
                });
            }
        };

        this.#onResizeComplete = () => {
            this.#minInnerWidth = null;
            this.render();
        };

        this.#onResize = () => {
            this.render();
        };

        this.#onResizeStart = () => {
            this.#minInnerWidth = this.innerWidth;
        };

        this.#onDataChange = () => {
            this.clearColumns();
            this.render();
        };
    }

    plugin(grid) {
        this.appendTo(grid.header);
        this.setModel(grid.model);
    }

    setModel(model) {
        if(this.#model) {
            this.#model.off(DataModel.COLUMN_CHANGE_TOPIC, this.#onColumnChange);
            this.#model.off('col-resize-start', this.#onResizeStart);
            this.#model.off('col-resize', this.#onResize);
            this.#model.off('col-resize-complete', this.#onResizeComplete);
            this.#model.off("data-change", this.#onDataChange);
            this.clearColumns();
            this.#model = null;
        }

        if(model) {
            this.#model = model;
            this.#model.on(DataModel.COLUMN_CHANGE_TOPIC, this.#onColumnChange);
            this.#model.on('col-resize-start', this.#onResizeStart);
            this.#model.on('col-resize', this.#onResize);
            this.#model.on('col-resize-complete', this.#onResizeComplete);
            this.#model.on("data-change", this.#onDataChange);
        } else {
            this.#model = null;
        }

        this.render();
    }

    clearColumns() {
        this.#dataColumnToHeaderColumnMap = new WeakMap();
        this.#elementToHeaderColumnMap = new WeakMap();
        emptyElement(this.#body);
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
        let headerColumns = this.#listHeaderColumns(),
            /** @type {null|DataGridHeaderColumn} */
            previous = null;

        for(let headerColumn of headerColumns) {
            if(!headerColumn.element.parentElement) {
                this.#body.insertBefore(headerColumn.element, previous ? previous.element.nextSibling : null)
            }

            previous = headerColumn;
            headerColumn.render();
        }

        this.innerWidth = clamp(this.totalColumnWidth + this.#scrollBarPadding, this.#minInnerWidth, null);
    }

    getColumnWidths() {
        let r = [];

        for(let column of this.#listHeaderColumns()) {
            r.push(column.width);
        }

        return r;
    }

    #listHeaderColumns() {
        let r = [];

        if(this.#model) {
            for(let dataColumn of this.#model.columns) {
                let headerColumn = this.#dataColumnToHeaderColumnMap.get(dataColumn);

                if(!headerColumn) {
                    headerColumn = dataColumn.columnFactory(this, this.#model);

                    this.#elementToHeaderColumnMap.set(headerColumn.element, headerColumn);
                    this.#dataColumnToHeaderColumnMap.set(dataColumn, headerColumn);
                }

                r.push(headerColumn);
            }
        }

        return r;
    }

    #compileColumnListFromDom() {
        let r = [];

        for(let child of this.#body.children) {
            let headerColumn = this.#elementToHeaderColumnMap.get(child);

            if(headerColumn) {
                r.push(headerColumn.column);
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

        let startingColumns = null;

        this.#sorter.on("sort-append", () => {
            this.#model.publish("sort-append", {topic: "sort-append", sorter: this.#sorter, target: this, columns: this.#compileColumnListFromDom()});
        });

        this.#sorter.on('sort-start', () => {
            startingColumns = this.#compileColumnListFromDom();
            this.#model.publish("col-sort-start", {topic: "sort-start", sorter: this.#sorter, target: this, columns: startingColumns});
        });

        this.#sorter.on("sort-complete", topic => {
            let columns = this.#compileColumnListFromDom();
            this.#model.publish("col-sort-complete", {...topic, columns});

            if(!startingColumns || !arraysEqual(startingColumns, columns)) {
                this.#model.publish("col-sort-change", {topic: "sort-change", target: this, sorter: this.#sorter, columns});
                this.#model.setColumns(columns);
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

    get model() {
        return this.#model;
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
