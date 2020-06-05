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
import {Resizeable} from "../core/ui";
import Publisher from "../core/Publisher";

export default class DataGridHeader extends Publisher {
    #element;
    #body;
    #columns;

    #resizeable;
    #sortable;
    #tableSort;

    constructor({columns=null, resizeable=false, sortable=false, tableSort=false}={}) {
        super();
        this.#element = document.createElement("div");
        this.#element.className = "data-grid-header";
        this.#body = document.createElement("div");
        this.#body.className = "data-grid-header__body";
        this.#element.appendChild(this.#body);

        this.#columns = [];
        this.#resizeable = resizeable;
        this.#sortable = sortable;
        this.#tableSort = tableSort;

        if(columns) {
            this.setColumns(columns);
        }
    }

    setColumns(columns) {
        this.clearColumns();

        for(let column of columns) {
            this.appendColumn(column);
        }

        this.#render();
    }

    getColumn(index) {
        return this.#columns[index];
    }

    getColumnIndex(column) {
        return this.#columns.indexOf(column);
    }

    removeColumn(column) {

    }

    clearColumns() {
        for(let column of this.#columns) {
            this.removeColumn(column);
        }
    }

    appendColumn(column) {
        let dataColumn = this.#createColumn(column);
        this.#columns.push(dataColumn);
        dataColumn.appendTo(this.#body);
        this.#render();
    }

    insertColumn(column, index) {

    }

    insertColumnBefore(column, before) {
        const index = this.getColumnIndex(before);

        if(index !== -1) {
            this.insertColumn(column, this.getColumnIndex(before));
        } else {
            throw new Error("Unknown column");
        }
    }

    insertColumnAfter(column, after) {
        const index = this.getColumnIndex(after);

        if(index !== -1) {
            this.insertColumn(column, this.getColumnIndex(after) + 1);
        } else {
            throw new Error("Unknown column");
        }
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

    #render() {
        this.#body.style.width = this.width + "px";
    }

    #createColumn(column) {
        let dataColumn = new DataColumn(column);

        dataColumn.on('resize', () => {
            console.log(this.width);
            this.#render();
        });
        dataColumn.on('resize-complete', () => this.#render());

        return dataColumn;
    }

    get width() {
        let width = 0;

        for(let column of this.#columns) {
            width += column.width;
        }

        return width + 20;
    }
}


export class DataColumn extends Publisher {
    #element;
    #body;
    #resizer;
    #resizeHandle;
    #renderer;
    #width;

    constructor({label, resizeable=false, minWidth=0, maxWidth=Infinity, width=100, tableSort=false, dataSort="none", renderer=null}) {
        super();

        this.#renderer = renderer || function(label) {
            let body = document.createElement("div");
            body.innerHTML = label;
            return body;
        }

        this.#element = document.createElement("div");
        this.#element.className = "data-column";
        this.#body = this.#renderer.call(this, label);
        this.#body.className = "data-column__body";
        this.#element.appendChild(this.#body);
        this.#width = width;
        this.#element.style.width = `${width}px`;

        this.#resizer = null;
        this.#resizeHandle = null;

        if(resizeable) {
            this.#resizeHandle = document.createElement("div");
            this.#resizeHandle.className = "ui-resize-handle no-sort";
            this.#resizeHandle.dataset.resize = "right";
            this.#element.appendChild(this.#resizeHandle);

            this.#resizer = new Resizeable(this.#element, {
                minWidth,
                maxWidth
            });

            this.#resizer.on('resize-start', topic => {
                this.#element.classList.add('no-sort');

                this.publish("resize-start", topic);
            });

            this.#resizer.on('resize', topic => {
                topic.event.originalEvent.preventDefault();
                this.#width = topic.rect.width;
                this.publish("resize", topic);
            });

            this.#resizer.on('resize-complete', topic => {
                this.#element.classList.add("no-resize");
                this.#width = topic.rect.width;

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

        if(tableSort) {
            this.#element.dataset.dataSort = dataSort;

            this.#element.addEventListener("click", e => {
                if(e.target.closest(".no-sort")) {
                    return;
                }

                let options = ["none", "ascending", "descending"],
                    index = options.indexOf(this.#element.dataset.dataSort);

                if(index === -1) {
                    this.#element.dataset.dataSort = "none";
                } else {
                    this.#element.dataset.dataSort = options[(index+1) % options.length];
                }

                this.publish("data-sort", {
                    event: e,
                    column: this,
                    dataSort: this.#element.dataset.dataSort
                });
            });
        }
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

    get width() {
        return this.#width;
    }
}
