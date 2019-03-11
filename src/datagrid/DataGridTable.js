/**
 * Widget that displays information in a data source in a table.
 */
import Observable from "../core/interface/Observable";
import $ from 'jquery';
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
    constructor(table, source, index) {
        this.datatable = table;
        this.source = source;
        this.index = index;
        this.data = this.source.getItem(this.index);

        this.$element = $(`<tr class="${CLASSES.row}">`);

        for(let column of this.source.getColumns()) {
            let $td = $(`<td class="${CLASSES.cell}">`);
            $td = column.cellRenderer($td, this.data);
            this.$element.append($td);
        }
    }

    appendTo(selector) {
        return this.$element.appendTo(selector);
    }
}


export class DataGridTable extends Observable {
    // noinspection JSUnusedGlobalSymbols
    static EVENTS = EVENTS;
    // noinspection JSUnusedGlobalSymbols
    static CLASSES = CLASSES;

    constructor(source, {placeholder="", classes=""}={}) {
        super();
        this.placeholder = placeholder;
        // {on(event, listener), off(event, listener), getItem(index), getLength()}
        this.source = null;
        this.rows = [];

        this.RowClass = Row;

        this.$element = $(DataGridTable.template());
        this.$colgroup = this.$element.find('colgroup');
        this.$body = this.$element.find('tbody');

        if(classes) this.$element.addClass(classes);

        this._onDataChange = () => {
            this.render();
        };

        this._refreshWidths = this.refreshColumnWidths.bind(this);

        if(source) {
            this.setDataSource(source);
        }
    }

    setDataSource(source) {
        let old = this.source;

        // Remove the old data source
        if(source !== old && old) {
            this.source.off(SOURCE_EVENTS.dataChanged, this._onDataChange);
            this.source.off(SOURCE_EVENTS.columnResized, this._refreshWidths);
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
            this.source.on(SOURCE_EVENTS.columnResized, this._refreshWidths);

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

            this.$body.empty();
            this.rows = [];

            this.refreshColumnWidths();

            if(l === 0) {
                if(typeof this.placeholder === 'function') {
                    this.placeholder(this);
                } else if(this.placeholder) {
                    this.$body.html(this.placeholder);
                }
            } else {
                for(; i < l; i++) {
                    let row = new this.RowClass(this, this.source, i);

                    if(row.init) row.init();
                    this.rows.push(row);
                    row.$element.data('row', row);
                    row.appendTo(this.$body);
                }
            }

            this.trigger(EVENTS.render, {target: this});
        });
    }

    refreshColumnWidths() {
        let width = 0,
            widths = [];

        this.$colgroup.empty();

        for(let column of this.source.getColumns()) {
            let w = Math.max(column.width || 0, 0),
                $col = $("<col>");

            widths.push(w);
            width += w;
            $col.css('width', w);
            $col.data("column", column);
            this.$colgroup.append($col);
        }

        this.$element.css('width', width);
    }

    appendTo(selector) {
        return this.$element.appendTo(selector);
    }

    static template() {
        return `
            <table class="${CLASSES.table}">
                <colgroup></colgroup>
                <tbody class="${CLASSES.body}"></tbody>
            </table>
        `;
    }
}
