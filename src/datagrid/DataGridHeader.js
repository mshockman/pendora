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

export default class DataGridHeader {
    constructor() {

    }

    setColumns(columns) {

    }

    getColumn(index) {

    }

    getColumnIndex(index) {

    }

    removeColumn(column) {

    }

    appendColumn(column) {

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

    }
}


export class DataColumn extends Publisher {
    #element;
    #body;
    #resizer;
    #resizeHandle;
    #renderer;

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
                this.publish("resize", topic);
            });

            this.#resizer.on('resize-complete', topic => {
                this.#element.classList.add("no-resize");

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
}
