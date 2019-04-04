/**
 * Widget that displays information in a data source in a table.
 */
import Observable from "../core/interface/Observable";
import {EVENTS as SOURCE_EVENTS} from './datasource';


export const CLASSES = {
    table: 'c-datatable',
    row: 'c-datatable__row',
    cell: 'c-datatable__cell',
    body: 'c-datatable__body'
};


export const EVENTS = {
    dataSourceChanged: 'data-source-changed',
    dataSourceAdded: 'data-source-added',
    dataSourceRemoved: 'data-source-removed',
    render: 'render'
};


/**
 * A class the represents a row on the datagrid.  Responsible for taking a data object that contains all of the data
 * for a row and constructing all of the columns.
 *
 * EVENTS:
 *  data-source-removed({sourceRemoved, target})
 *  data-source-added({sourceAdded, target})
 *  data-source-changed({target, newSource, oldSource})
 *  columns-changed({target})
 *  render({target})
 *  col-refresh({target, totalWidth, widths})
 */
export class Row {
    constructor(grid, index) {
        this.grid = grid;
        this.index = index;
        this.data = this.grid.source.getItem(this.index);

        this.element = document.createElement('tr');
        this.element.classList.add(CLASSES.row);
    }

    render() {
        let fragment = document.createDocumentFragment();

        for(let column of this.grid.columns) {
            let cell = document.createElement('td');
            cell.classList.add(CLASSES.cell);
            cell.appendChild(column.cellRenderer(this.data));

            fragment.appendChild(cell);
        }

        while(this.element.firstChild) this.element.removeChild(this.element.firstChild);

        this.element.appendChild(fragment);
        return this.element;
    }
}


export class DataGridTable extends Observable {
    // noinspection JSUnusedGlobalSymbols
    static EVENTS = EVENTS;
    // noinspection JSUnusedGlobalSymbols
    static CLASSES = CLASSES;

    constructor(source, columns=null, {placeholder="", classes=""}={}) {
        super();
        this.placeholder = placeholder;
        // {on(event, listener), off(event, listener), getItem(index), getLength()}
        this.source = null;
        this.rows = [];
        this.columns = [];

        this.RowClass = Row;

        this.element = document.createElement('table');
        this.colgroup = document.createElement('colgroup');
        this.tbody = document.createElement('tbody');
        this.element.classList.add(CLASSES.table);
        this.tbody.classList.add(CLASSES.body);
        this.element.appendChild(this.colgroup);
        this.element.appendChild(this.tbody);


        if(classes) this.element.classList.add(classes);

        this._onDataChange = () => {
            this.render();
        };

        this._refreshWidths = this.refreshColumnWidths.bind(this);

        if(source) {
            this.setDataSource(source);
        }

        if(columns) {
            this.setColumns(columns);
        }
    }

    setColumns(columns) {
        for(let column of this.columns) {
            column.onRemoved(this);
        }

        this.columns = [];

        if(columns) {
            for (let column of columns) {
                column.onAdded(this);
                this.columns.push(column);
            }
        }

        this.trigger('columns-changed', {
            target: this
        });
    }

    setDataSource(source) {
        let old = this.source;

        // Remove the old data source
        if(source !== old && old) {
            this.source.off(SOURCE_EVENTS.dataChanged, this._onDataChange);
            this.source = null;

            this.trigger(EVENTS.dataSourceRemoved, {
                sourceRemoved: old,
                target: this
            });
        }

        // Add a new data source.
        this.source = source;

        if(this.source) {
            this.source.on(SOURCE_EVENTS.dataChanged, this._onDataChange);

            this.trigger(EVENTS.dataSourceAdded, {
                target: this,
                sourceAdded: this.source
            });
        }

        // Fire data source change event.
        this.trigger(EVENTS.dataSourceChanged, {
            target: this,
            oldSource: old,
            newSource: this.source
        });
    }

    render() {
        if(this._renderID) return;

        this._renderID = window.requestAnimationFrame(() => {
            this._renderID = null;

            let i = 0,
                l = this.source ? this.source.getLength() : 0;

            for(let row of this.rows) {
                if(row.destroy) row.destroy();
            }

            this.rows = [];

            this.refreshColumnWidths();

            let fragment = document.createDocumentFragment();

            if(l === 0) {
                if(typeof this.placeholder === 'function') {
                    this.placeholder(this);
                } else if(this.placeholder) {
                    this.$body.html(this.placeholder);
                }
            } else {
                for(; i < l; i++) {
                    let row = new this.RowClass(this, i);
                    row.render();

                    if(row.init) row.init();
                    this.rows.push(row);
                    fragment.appendChild(row.element);
                }
            }

            while(this.tbody.firstChild) this.tbody.removeChild(this.tbody.firstChild);
            this.tbody.appendChild(fragment);
            this.trigger(EVENTS.render, {target: this});
        });
    }

    refreshColumnWidths() {
        let width = 0,
            widths = [];

        while(this.colgroup.firstChild) this.colgroup.removeChild(this.colgroup.firstChild);
        let fragment = document.createDocumentFragment();

        for(let column of this.columns) {
            let w = Math.max(column.width || 0, 0),
                col = document.createElement('col');

            widths.push(w);
            width += w;

            col.style.width = w + 'px';
            fragment.appendChild(col);
        }

        this.colgroup.appendChild(fragment);
        this.element.style.width = width + 'px';
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
