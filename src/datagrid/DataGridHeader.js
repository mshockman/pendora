import {clamp} from '../core/utility';
import $ from 'jquery';
import Observable from "../core/interface/Observable";
import * as ds from "./datasource";
import * as g from './DataGridTable';


const SORTING_OPTIONS = ['none', 'asc', 'desc'];


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


function setSortClass($node, direction) {
    if(direction === 'asc') {
        $node.removeClass(CLASSES.uiSortDESC);
        $node.removeClass(CLASSES.uiSortNone);
        $node.addClass(CLASSES.uiSortASC);
        return 'asc';
    } else if(direction === 'desc') {
        $node.removeClass(CLASSES.uiSortASC);
        $node.removeClass(CLASSES.uiSortNone);
        $node.addClass(CLASSES.uiSortDESC);
        return 'desc';
    } else {
        $node.removeClass(CLASSES.uiSortASC);
        $node.removeClass(CLASSES.uiSortDESC);
        $node.addClass(CLASSES.uiSortNone);
        return 'none';
    }
}


function getSortDirection($node) {
    if($node.hasClass(CLASSES.uiSortASC)) {
        return 'asc';
    } else if($node.hasClass(CLASSES.uiSortDESC)) {
        return 'desc';
    } else {
        return 'none';
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

        if(!template) {
            this.$element = $(DataGridHeader.template());
        } else if(template === 'inline') {
            this.$element = $(DataGridHeader.inlineTemplate());
        } else if(typeof template === 'function') {
            this.$element = $(template(this));
        } else {
            this.$element = $(template);
        }

        this.$row = this.$element.find(`.${CLASSES.body}`);
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

            this.grid.source.off(ds.EVENTS.dataChanged, this._render);
            this.grid.source.off(ds.EVENTS.columnsChanged, this._render);
            this.grid.source.off(ds.EVENTS.columnResized, this._refreshWidths);
            this.grid.off(g.EVENTS.render, this._render);
            this.grid = null;
        }

        if(grid) {
            this.grid = grid;
            this.grid.source.on(ds.EVENTS.dataChanged, this._render);
            this.grid.source.on(ds.EVENTS.columnsChanged, this._render);
            this.grid.source.on(ds.EVENTS.columnResized, this._refreshWidths);
            this.grid.on(g.EVENTS.render, this._render);
        }
    }

    destroy() {
        this.grid.source.off(ds.EVENTS.dataChanged, this._render);
        this.grid.source.off(ds.EVENTS.columnsChanged, this._render);
        this.grid.source.off(ds.EVENTS.columnResized, this._refreshWidths);
        this.grid = null;

        this.$element.remove();
        this.$element = null;

        this._render = null;
        this._refreshWidths = null;
    }

    /**
     * Sets the sorting column for the given direction.
     * @param $column
     * @param direction
     */
    setSort($column, direction) {
        let $currentSortNodes = this.$row.find(`.${CLASSES.uiSortDESC} .${CLASSES.uiSortASC}`).not($column);

        if((direction === 'asc' || direction === 'desc') && $currentSortNodes.length) {
            $currentSortNodes.each((x, element) => {
                element = $(element);
                setSortClass(element, 'none');
            });
        }

        setSortClass($column, direction);

        let column = $column.data(COLUMN_KEY);
        this.trigger(EVENTS.sortChange, {$column, column, direction});
    }

    /**
     * Initializes the ui sorting.
     */
    initSortableColumns() {
        // Event listener that handles when the user clicks on a sortable column.  Will increment the direction of the
        // column sorting.
        this._sortingOnClick = (event) => {
            if(this.disabled) return;

            let $target = $(event.target),
                $column = $target.closest(`.${CLASSES.column}.${CLASSES.uiSortable}`, this.$row),
                column = $column.data(COLUMN_KEY);

            if(!column || !column.sortable || $column.hasClass(CLASSES.uiNoSort)) return;

            let currentDirection = getSortDirection($column),
                nextDirection = getNextDirection(currentDirection);

            this.setSort($column, nextDirection);
        };

        // Applies the CLASSES.uiSortable class to all sortable columns.
        this._sortingOnRender = () => {
            this.$row.find(`.${CLASSES.column}`).each((x, element) => {
                element = $(element);
                let column = element.data(COLUMN_KEY);

                if(column.sortable) {
                    element.addClass(CLASSES.uiSortable);
                    element.addClass(CLASSES.uiSortNone);
                }
            });
        };

        // Add listeners
        this.on(EVENTS.render, this._sortingOnRender);
        this.$row.on('click', this._sortingOnClick);
    }

    /**
     * Initializes ui reordering
     */
    initReorderableColumns() {

    }

    initResizeableColumns() {
        // Add resizeable class to all resizeable columns.
        this._resizeableOnRender = () => {
            this.$row.find(`.${CLASSES.column}`).each((x, element) => {
                element = $(element);
                let column = element.data(COLUMN_KEY);

                if(column.resizeable) {
                    element.addClass(CLASSES.resizable);

                    let $handle = $(`<div class="${CLASSES.uiResizeHandle}">`);
                    element.append($handle);
                }
            });
        };

        let $doc = $(document),
            startX = 0,
            startY = 0,
            x = 0,
            y = 0,
            dX = 0,
            dY = 0,
            startWidth = 0,
            width = 0,
            column = null,
            $handle, $column;

        let onMouseMove = (event) => {
            x = event.pageX;
            y = event.pageY;
            width = clamp(startWidth + dX, Math.max(column.minWidth, 0), column.maxWidth);
            event.preventDefault();

            this.trigger(EVENTS.resizing, {startX, startY, x, y, dX, dY, startWidth, width, column, $doc, $handle, $column, grid: this});
        };

        let onMouseUp = () => {
            $doc.off('mousemove', onMouseMove);
            $doc.off('mouseup', onMouseUp);

            dX = x - startX;
            dY = y - startY;

            width = clamp(startWidth + dX, Math.max(column.minWidth, 0), column.maxWidth);

            this.source.setColumnWidth(column, width);
            this.trigger(EVENTS.resizeEnd, {startX, startY, x, y, dX, dY, startWidth, width, column, $doc, $handle, $column, target: this});
        };

        this._resizeOnMouseDown = (event) => {
            if(this.disabled) return;

            let $target = $(event.target);
            $handle = $target.closest(`.${CLASSES.uiResizeHandle}`, this.$row);
            $column = $handle.closest(`.${CLASSES.column}`);

            column = $column.data(COLUMN_KEY);

            if(!column || column.disabled) return;

            x = startX = event.pageX;
            y = startY = event.pageY;
            dX = 0;
            dY = 0;
            width = startWidth = column.width;
            $doc.on('mousemove', onMouseMove);
            $doc.on('mouseup', onMouseUp);
            this.trigger(EVENTS.resizeStart, {startX, startY, x, y, dX, dY, startWidth, width, column, $doc, $handle, $column, target: this, event});
        };

        this.$row.on('mousedown', this._resizeOnMouseDown);
        this.on(EVENTS.render, this._resizeableOnRender);
    }

    render() {
        if(this._renderID) return;

        this._renderID = window.requestAnimationFrame(() => {
            this._renderID = null;

            this.$row.empty();

            for(let column of this.source.getColumns()) {
                let $th = $(`<th class="${CLASSES.column}">`);
                $th = column.columnRenderer($th);
                $th.data(COLUMN_KEY, column);
                this.$row.append($th);
            }

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
        let total = 0,
            widths = [];

        this.$row.find(`.${CLASSES.column}`).each((x, element) => {
            element = $(element);
            let column = element.data(COLUMN_KEY);
            total += column.width;
            element.css('width', column.width);
            widths.push(column.width);
        });

        this.$element.css('width', total);
    }

    appendTo(selector) {
        return this.$element.appendTo(selector);
    }

    get source() {
        return this.grid.source;
    }

    static inlineTemplate() {
        return `<thead class="${CLASSES.header} ${CLASSES.body}"></thead>`;
    }

    static template() {
        return `
            <table class="${CLASSES.header}">
                <thead class="${CLASSES.body}"></thead>
            </table>
        `;
    }
}


/**
 * Creates a div that hovers over the users mouse position when they are resizing.
 */
export class ResizeHelper {
    constructor(header) {
        this.$element = $(`<div class="${CLASSES.uiResizeHelper}" style="display: none; position: absolute;">`);
        this.header = header;

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
        this.$element.css('display', 'block');
    }

    hide() {
        this.$element.css('display', 'none');
    }

    setOffset(cords) {
        this.$element.offset(cords);
    }

    appendTo(selector) {
        return this.$element.appendTo(selector);
    }
}
