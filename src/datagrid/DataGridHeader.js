import {clamp, emptyElement, addClasses, setElementOffset} from 'core/utility';
import {privateCache} from "core/data";
import Observable from "../core/interface/Observable";
import * as g from './DataGridTable';


const SORTING_OPTIONS = [false, 'asc', 'desc'];


export const CLASSES = {
    header: "c-datagrid-columns",
    body: "c-datagrid-columns__body",
    column: 'c-datagrid-columns__column',
    uiSortASC: 'ui-sort-asc',
    uiSortDESC: 'ui-sort-desc',
    uiSortNone: 'ui-sort-none',
    uiNoSort: 'ui-no-sort',
    uiSortable: 'ui-sortable',
    uiResizeHandle: 'ui-resize-handle',
    uiResizeHelper: 'ui-resize-helper',
    resizable: 'ui-col-resize',
};


export const EVENTS = {
    sortChange: 'sort-change',
    resizing: 'resizing',
    resizeEnd: 'resizing-end',
    resizeStart: 'resizing-start',
    render: 'render'
};


const COLUMN_KEY = "column";


function setSortClass(element, direction) {
    if(direction === 'asc') {
        element.classList.remove(CLASSES.uiSortDESC);
        element.classList.remove(CLASSES.uiSortNone);
        element.classList.add(CLASSES.uiSortASC);
        return 'asc';
    } else if(direction === 'desc') {
        element.classList.remove(CLASSES.uiSortASC);
        element.classList.remove(CLASSES.uiSortNone);
        element.classList.add(CLASSES.uiSortDESC);
        return 'desc';
    } else {
        element.classList.remove(CLASSES.uiSortASC);
        element.classList.remove(CLASSES.uiSortDESC);
        element.classList.add(CLASSES.uiSortNone);
        return false;
    }
}


function getSortDirection(element) {
    if(element.classList.contains(CLASSES.uiSortASC)) {
        return 'asc';
    } else if(element.classList.contains(CLASSES.uiSortDESC)) {
        return 'desc';
    } else {
        return false;
    }
}


function getSortClass(sort) {
    if(sort === 'asc') {
        return CLASSES.uiSortASC;
    } else if(sort === 'desc') {
        return CLASSES.uiSortDESC;
    } else if(sort === false || sort === 'none') {
        return CLASSES.uiSortNone;
    }
}


function getNextDirection(currentDirection) {
    return SORTING_OPTIONS[(SORTING_OPTIONS.indexOf(currentDirection) + 1) % SORTING_OPTIONS.length];
}


/**
 * A header component for the data grid.  Responsible for displaying the grid columns.  Also handles user interaction
 * to sort, reorder and resize the columns.
 *
 * EVENTS
 *  col-resize
 *  sort-change
 *  resizing
 *  resizing-end
 *  resizing-start
 *  render
 */
export default class DataGridHeader extends Observable {
    // noinspection JSUnusedGlobalSymbols
    static CLASSES = CLASSES;
    // noinspection JSUnusedGlobalSymbols
    static EVENTS = EVENTS;

    constructor(grid, {sortable=false, reorderable=false, resizeable=false, template=null}={}) {
        super();

        this.grid = null;
        this.sortable = sortable;
        this.reorderable = reorderable;
        this.resizeable = resizeable;
        this.disabled = false;
        this.columnElements = new WeakMap();
        this.columns = [];

        if(template === 'inline') {
            this.element = document.createElement('thead');
            addClasses(this.element, `${CLASSES.header} ${CLASSES.body}`);
            this.row = this.element;
        } else {
            this.element = document.createElement('table');
            this.row = document.createElement('tbody');
            this.element.appendChild(this.row);

            addClasses(this.element, CLASSES.header);
            addClasses(this.row, CLASSES.body);
        }

        this._render = this.render.bind(this);
        this._refreshWidths = this.refreshColumnWidths.bind(this);

        if(this.sortable) {
            this.initSortableColumns();
        }

        if(this.reorderable) {
            this.initReorderableColumns();
        }

        if(this.resizeable) {
            this.initResizeableColumns();
        }

        this.setGrid(grid);
    }

    setGrid(grid) {
        if(this.grid) {
            if(this.grid === grid) return;

            // this.grid.source.off(ds.EVENTS.dataChanged, this._render);
            // this.grid.source.off(ds.EVENTS.columnsChanged, this._render);
            // this.grid.source.off(ds.EVENTS.columnResized, this._refreshWidths);
            this.grid.off(g.EVENTS.render, this._render);
            this.grid.off('column-resize', this._refreshWidths);
            this.grid = null;
        }

        if(grid) {
            this.grid = grid;
            // this.grid.source.on(ds.EVENTS.dataChanged, this._render);
            // this.grid.source.on(ds.EVENTS.columnsChanged, this._render);
            // this.grid.source.on(ds.EVENTS.columnResized, this._refreshWidths);
            this.grid.on(g.EVENTS.render, this._render);
            this.grid.on('column-resize', this._refreshWidths);
        }
    }

    destroy() {
        // this.grid.source.off(ds.EVENTS.dataChanged, this._render);
        // this.grid.source.off(ds.EVENTS.columnsChanged, this._render);
        // this.grid.source.off(ds.EVENTS.columnResized, this._refreshWidths);
        this.grid = null;

        emptyElement(this.element);
        this.element = null;

        this._render = null;
        this._refreshWidths = null;
    }

    /**
     * Applies the sorting method to the column.
     *
     * @param column
     * @param sort {string|boolean} Can be 'asc', 'desc', or false.
     */
    setSort(column, sort) {
        if(column.sort === sort) return;

        if(sort === 'asc' || sort === 'desc') {
            for(let c of this.columns) {
                if(c !== column) {
                    this.setSort(c, false);
                }
            }
        }

        let columnNode = this.columnElements.get(column);
        setSortClass(columnNode, sort);
        column.sort = sort;
        this.trigger(EVENTS.sortChange, {column, element: columnNode, sort});
    }

    /**
     * Initializes the ui sorting.
     */
    initSortableColumns() {
        // Event listener that handles when the user clicks on a sortable column.  Will increment the direction of the
        // column sorting.
        this._sortingOnClick = (event) => {
            if(this.disabled) return;

            let columnNode = event.target.closest(`.${CLASSES.column}.${CLASSES.uiSortable}`, this.row),
                column = privateCache.get(columnNode, COLUMN_KEY);

            if(!column || !column.sortable || columnNode.classList.contains(CLASSES.uiNoSort)) return;

            let direction = getNextDirection(column.sort);
            this.setSort(column, direction);
        };

        // Applies the CLASSES.uiSortable class to all sortable columns.
        this._sortingOnRender = () => {
            for(let column of this.columns) {
                if(column.sortable) {
                    let columnElement = this.columnElements.get(column),
                        cls = getSortClass(column.sort);

                    columnElement.classList.add(CLASSES.uiSortable);
                    if(cls) columnElement.classList.add(cls);
                }
            }
        };

        // Add listeners
        this.on(EVENTS.render, this._sortingOnRender);

        this.row.addEventListener('click', this._sortingOnClick);
    }

    /**
     * Initializes ui reordering
     */
    initReorderableColumns() {

    }

    initResizeableColumns() {
        // Add resizeable class to all resizeable columns.
        this._resizeableOnRender = () => {
            for(let column of this.columns) {
                let element = this.columnElements.get(column);

                if(column.resizeable) {
                    element.classList.add(CLASSES.resizable);

                    let handle = document.createElement('div');
                    handle.classList.add(CLASSES.uiResizeHandle);
                    element.appendChild(handle);
                }
            }
        };

        let startX = 0,
            startY = 0,
            x = 0,
            y = 0,
            dX = 0,
            dY = 0,
            startWidth = 0,
            width = 0,
            column = null,
            handle, columnElement;

        let onMouseMove = (event) => {
            x = event.pageX;
            y = event.pageY;
            width = clamp(startWidth + dX, Math.max(column.minWidth, 0), column.maxWidth);
            event.preventDefault();

            this.trigger(EVENTS.resizing, {startX, startY, x, y, dX, dY, startWidth, width, column, handle, columnElement, grid: this});
        };

        let onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            dX = x - startX;
            dY = y - startY;

            width = clamp(startWidth + dX, Math.max(column.minWidth, 0), column.maxWidth);

            column.setWidth(width);
            this.trigger(EVENTS.resizeEnd, {startX, startY, x, y, dX, dY, startWidth, width, column, handle, columnElement, target: this});
        };

        this._resizeOnMouseDown = (event) => {
            if(this.disabled) return;

            handle = event.target.closest(`.${CLASSES.uiResizeHandle}`, this.row);
            if(!handle) return;
            columnElement = handle.closest(`.${CLASSES.column}`);
            column = privateCache.get(columnElement, COLUMN_KEY);

            if(!column || column.disabled) return;

            x = startX = event.pageX;
            y = startY = event.pageY;
            dX = 0;
            dY = 0;
            width = startWidth = column.width;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            this.trigger(EVENTS.resizeStart, {startX, startY, x, y, dX, dY, startWidth, width, column, handle, columnElement, target: this, event});
        };

        this.row.addEventListener('mousedown', this._resizeOnMouseDown);
        this.on(EVENTS.render, this._resizeableOnRender);
    }

    render() {
        if(this._renderID) return;

        this._renderID = window.requestAnimationFrame(() => {
            this._renderID = null;

            emptyElement(this.row);
            this.columnElements = new WeakMap();
            this.columns = [];
            let fragment = document.createDocumentFragment();

            for(let column of this.grid.columns) {
                let th = document.createElement('th');
                addClasses(th, CLASSES.column);
                th.appendChild(column.columnRenderer());
                privateCache.set(th, COLUMN_KEY, column);
                fragment.appendChild(th);
                this.columnElements.set(column, th);
                this.columns.push(column);

                if(column.onRenderHeader) column.onRenderHeader(column, th, this);
            }

            this.row.appendChild(fragment);
            this._refreshColumnWidths();

            this.trigger(EVENTS.render, {target: this});
        });
    }

    refreshColumnWidths() {
        if(this._refreshWidthID || this._renderID) return;

        this._refreshWidthID = window.requestAnimationFrame(() => {
            this._refreshWidthID = null;
            this._refreshColumnWidths();
        });
    }

    _refreshColumnWidths() {
        let total = 0;

        for(let column of this.columns) {
            total += column.width;
            let element = this.columnElements.get(column);
            element.style.width = column.width + 'px';
        }

        this.element.style.width = total + 'px';
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.element);
        } else if(selector.jquery) {
            selector.append(this.element);
        } else {
            selector.appendChild(this.element);
        }
    }

    get source() {
        return this.grid.source;
    }
}


/**
 * Creates a div that hovers over the users mouse position when they are resizing.
 */
export class ResizeHelper {
    constructor(header) {
        this.header = header;

        this.element = document.createElement('div');
        addClasses(this.element, CLASSES.uiResizeHelper);
        Object.assign(this.element.style, {
            display: 'none',
            position: 'absolute'
        });

        this.header.on(EVENTS.resizeStart, (name, ui) => {
            this.show();
            this.setOffset({left: ui.x});
        });

        this.header.on(EVENTS.resizeEnd, () => {
            this.hide();
        });

        this.header.on(EVENTS.resizing, (name, ui) => {
            this.setOffset({left: ui.x});
        });
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }

    setOffset(cords) {
        setElementOffset(this.element, cords);
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.element);
        } else if(selector.jquery) {
            selector.append(this.element);
        } else {
            selector.appendChild(this.element);
        }
    }
}
