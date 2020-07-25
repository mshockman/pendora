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
import {Resizeable} from "../core/ui";
import {Rect} from "../core/vectors";


const COLUMN_MAP = new WeakMap();


export default class DataGridHeader extends Publisher {
    #element;
    #body;
    #columns;

    #resizeable;
    #sortable;
    #tableSort;
    #sorter;

    #dataModel;

    #columnElementMap;
    #columnHeaderMap;

    #minInnerWidth;
    #innerWidth;
    #innerHeight;

    constructor({dataModel=null, resizeable=false, sortable=false, tableSort=false}={}) {
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
        this.#columnHeaderMap = new WeakMap();
        this.#dataModel = null;

        this.#columns = [];
        this.#resizeable = resizeable;
        this.#sortable = sortable;
        this.#tableSort = tableSort;

        if(this.#sortable) {
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
                    let columns = this.#columns.map(c => c.column);
                    this.#dataModel.setColumns(columns);

                    this.publish("sort-change", {topic: "sort-change", target: this, sorter: this.#sorter, columns});
                }

                startingColumns = null;
            });
        }

        if(dataModel) {
            this.setDataModel(dataModel);
        }
    }

    setDataModel(dataModel) {
        if(this.#dataModel) {
            for(let headerColumn of this.#columns.slice(0)) {
                this.#destroyHeaderColumn(headerColumn);
            }
        }

        this.#columns = [];
        this.#dataModel = dataModel || null;

        if(!dataModel) return;

        for(let column of this.#dataModel.getColumns()) {
            this.#appendColumn(column);
        }
    }

    #appendColumn(column) {
        let headerColumn = this.#createColumn(column);
        this.#columns.push(headerColumn);
        headerColumn.appendTo(this.#body);
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

        this.innerWidth = clamp(this.totalColumnWidth + 20, this.#minInnerWidth, null);
    }

    getColumnWidths() {
        let r = [];

        for(let column of this.#columns) {
            r.push(column.width);
        }

        return r;
    }

    #createColumn(column) {
        let headerColumn = new DataHeaderColumn(column, this),
            cache = {};

        COLUMN_MAP.set(headerColumn, cache);

        cache.onResizeStart = topic => {
            this.#minInnerWidth = this.innerWidth;
        };

        cache.onResize = topic => {
            this.render();

            this.publish('resize', {
                ...topic,
                header: this,
                column: column,
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
                column: column,
                scrollLeft: this.scrollLeft,
                scrollTop: this.scrollTop,
                innerWidth: this.innerWidth,
                innerHeight: this.innerHeight
            });
        };

        cache.parent = this;

        headerColumn.on('resize-start', cache.onResizeStart);
        headerColumn.on('resize', cache.onResize);
        headerColumn.on('resize-complete', cache.onResizeComplete);

        this.#columnElementMap.set(headerColumn.element, headerColumn);
        this.#columnHeaderMap.set(headerColumn.column, headerColumn);

        return headerColumn;
    }

    #destroyHeaderColumn(headerColumn) {
        let cache = COLUMN_MAP.get(headerColumn);

        if(cache) {
            headerColumn.off('resize-start', cache.onResizeStart);
            headerColumn.off('resize', cache.onResize);
            headerColumn.off('resize-complete', cache.onResizeComplete);
            COLUMN_MAP.delete(headerColumn);
            this.#columnElementMap.delete(headerColumn.element);
            this.#columnHeaderMap.delete(headerColumn.column);
        }

        if(headerColumn.element.parentElement) {
            headerColumn.element.parentElement.removeChild(headerColumn.element);
        }
    }

    #compileColumnListFromDom() {
        let r = [];

        for(let child of this.#body.children) {
            let column = this.#columnElementMap.get(child);

            if(column) {
                r.push(column);
            }
        }

        return r;
    }

    get totalColumnWidth() {
        return this.#dataModel.getTotalColumnWidth();
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


export class DataHeaderColumn extends Publisher {
    #element;
    #resizer;
    #resizeHandle;
    #parent;

    #rebuild;

    /**
     * @type DataColumn
     */
    #column;

    /**
     *
     * @param column {DataColumn}
     * @param parent
     */
    constructor(column, parent) {
        super();
        this.#parent = parent;
        this.#column = null;
        this.#element = null;
        this.#resizer = null;
        this.#resizeHandle = null;
        this.#rebuild = true;
        this.#column = column;

        this.#renderElement(column);
    }

    #renderElement() {
        this.#resizer = null;
        this.#resizeHandle = null;

        let element = document.createElement("div");
        element.className = "data-column";
        element = this.#column.renderColumn(element);

        if(this.#column.columnId) {
            element.id = id;
        }

        if(this.#column.sortable) {
            element.classList.add('ui-sort-item');
        }

        if(this.#element && this.#element.parentElement) {
            this.#element.parentElement.replaceChild(element, this.#element);
        }

        this.#element = element;

        if(this.#column.resizeable) {
            this.#initResizeable();
        }

        if(this.#column.tableSort) {
            this.#initTableSort();
        }

        this.#rebuild = false;
    }

    #initResizeable() {
        this.#resizeHandle = document.createElement("div");
        this.#resizeHandle.className = "ui-resize-handle no-sort no-drag";
        this.#resizeHandle.dataset.resize = "right";
        this.#element.appendChild(this.#resizeHandle);

        this.#resizer = new Resizeable(this.#element, {
            minWidth: this.#column.minWidth,
            maxWidth: this.#column.maxWidth,
            position: "width"
        });

        this.#resizer.on('resize-start', topic => {
            this.#element.classList.add('no-sort');

            this.publish("resize-start", topic);
        });

        this.#resizer.on('resize', topic => {
            topic.event.originalEvent.preventDefault();
            this.#column.width = topic.rect.width;
            this.publish("resize", topic);
        });

        this.#resizer.on('resize-complete', topic => {
            this.#element.classList.add("no-resize");
            this.#column.width = topic.rect.width;

            setTimeout(() => {
                this.#element.classList.remove('no-sort');
                this.#element.classList.remove("no-resize");
                this.publish("resize-complete", topic);
            }, 0);
        });

        this.#resizer.on("resize-cancel", topic => {
            this.publish("resize-cancel", topic);
        });
    }

    #initTableSort() {
        this.#element.dataset.dataSort = this.#column.tableSortValue;

        this.#element.addEventListener("click", e => {
            if(e.target.closest(".no-sort")) {
                return;
            }

            let options = ["none", "ascending", "descending"],
                index = options.indexOf(this.#element.dataset.dataSort);

            if(index === -1) {
                this.#column.tableSortValue = "none";
            } else {
                this.#column.tableSortValue = options[(index+1) % options.length];
            }

            this.#element.dataset.dataSort = this.#column.tableSortValue;

            this.publish("data-sort", {
                event: e,
                column: this,
                dataSort: this.#element.dataset.dataSort
            });
        });
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

    render(clean=false) {
        if(clean) {
            this.#rebuild = true;
        }

        if(this.#rebuild) {
            this.#renderElement();
        }

        if(typeof this.#column.width === 'number') {
            this.#element.style.width = this.#column.width + "px";
        } else {
            this.#element.style.width = "";
        }
    }

    get width() {
        if(typeof this.#column.width === 'number') {
            return this.#column.width;
        } else {
            return Rect.getBoundingClientRect(this.#element).width;
        }
    }

    set width(width) {
        this.#column.width = width;
    }

    get element() {
        return this.#element;
    }

    get parent() {
        return this.#parent;
    }

    get column() {
        return this.#column;
    }
}
