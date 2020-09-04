import Publisher from "../core/Publisher";
import {Resizeable} from "../core/ui";
import {Rect} from "../core/vectors";
import {addClasses} from "../core/utility";


const HEADER_COLUMN_MAP = new WeakMap();


/**
 * @implements DataGridHeaderColumnInterface
 */
export default class DataGridHeaderColumn extends Publisher {
    #element;
    #resizer;
    #resizeHandle;
    #model;

    #rebuild;

    /**
     * @type DataColumn
     */
    #column;

    /**
     *
     * @param model
     * @param column {DataColumn}
     */
    constructor(model, column) {
        super();
        this.#column = null;
        this.#element = null;
        this.#resizer = null;
        this.#resizeHandle = null;
        this.#model = model;
        this.#rebuild = true;
        this.#column = column;

        this.#renderElement(column);
    }

    #renderElement() {
        this.#resizer = null;
        this.#resizeHandle = null;

        let element = document.createElement("div");
        element.className = "data-column";

        let body = document.createElement("div");
        body.innerHTML = this.#column.label;

        if(this.#column.columnClasses) {
            addClasses(this.#column, this.#column.columnClasses);
        }

        body.classList.add("data-column__body");
        element.appendChild(body);

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

    /**
     *
     * @returns {null|DataGridHeader}
     */
    get parent() {
        let cache = DataGridHeaderColumn.getCache(this);
        return cache ? cache.parent : null;
    }

    get column() {
        return this.#column;
    }

    get model() {
        return this.#model;
    }

    /**
     *
     * @param column {DataGridHeaderColumn}
     * @returns {Object}
     */
    static getCache(column) {
        return HEADER_COLUMN_MAP.get(column);
    }

    /**
     *
     * @param column {DataGridHeaderColumn}
     */
    static removeCache(column) {
        HEADER_COLUMN_MAP.delete(column);
    }

    /**
     *
     * @param column {DataGridHeaderColumn}
     * @param cache
     */
    static setCache(column, cache) {
        HEADER_COLUMN_MAP.set(column, cache);
    }
}


