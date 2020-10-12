import Publisher from "../core/Publisher";
import {Resizeable} from "../core/ui";
import {Rect} from "../core/vectors";


/**
 * @implements DataGridHeaderColumnInterface
 */
export default class DataGridHeaderColumnBase extends Publisher {
    #element;
    #resizer;
    #resizeHandle;
    #model;
    #parent;

    #rebuild;

    /**
     * @type DataColumn
     */
    #column;

    /**
     *
     * @param element
     * @param parent
     * @param model
     * @param column {DataColumn}
     */
    constructor(element, parent, model, column) {
        super();
        this.#column = null;
        this.#element = element;
        this.#resizer = null;
        this.#resizeHandle = null;
        this.#model = model;
        this.#rebuild = true;
        this.#column = column;
        this.#parent = parent;

        if(this.#column.resizeable) {
            this.#initResizeable();
        }

        if(this.#column.tableSort) {
            this.#initTableSort();
        }
    }

    #initResizeable() {
        this.#resizeHandle = document.createElement("div");
        this.#resizeHandle.className = "ui-resize-handle no-sort no-drag";
        this.#resizeHandle.dataset.resize = "right";
        this.#element.appendChild(this.#resizeHandle);

        this.#resizer = new Resizeable(this.#element, {
            minWidth: this.#column.minWidth,
            maxWidth: this.#column.maxWidth,
            position: "width",
            disable: ".disabled"
        });

        this.#resizer.on('resize-start', topic => {
            this.#element.classList.add('no-sort');

            this.#column.model.publish("col-resize-start", {column: this.#column, headerColumn: this, ...topic});
        });

        this.#resizer.on('resize', topic => {
            topic.event.originalEvent.preventDefault();
            this.#column.width = topic.rect.width;
        });

        this.#resizer.on('resize-complete', topic => {
            this.#element.classList.add("no-resize");
            this.#column.width = topic.rect.width;

            setTimeout(() => {
                this.#element.classList.remove('no-sort');
                this.#element.classList.remove("no-resize");
                this.#column.model.publish("col-resize-complete", {column: this.#column, headerColumn: this, ...topic});
            }, 0);
        });

        this.#resizer.on("resize-cancel", topic => {
            this.#column.model.publish("col-resize-cancel", {column: this.#column, headerColumn: this, ...topic});
        });
    }

    #initTableSort() {
        this.#element.dataset.dataSort = this.#column.tableSortValue;

        this.#element.addEventListener("click", e => {
            if(e.target.closest(".no-sort")) {
                return;
            }

            let options = ["none", "ascending", "descending"],
                index = options.indexOf(this.#element.dataset.dataSort),
                newValue = index === -1 ? "none" : options[(index+1) % options.length];

            this.#element.dataset.dataSort = newValue;
            this.#column.tableSortValue = newValue;
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

    render() {
        this.#element.style.width = this.#column.width + "px";
    }

    get width() {
        if(typeof this.#column.width === 'number') {
            return this.#column.width;
        } else {
            return Rect.getBoundingClientRect(this.#element).width;
        }
    }

    get element() {
        return this.#element;
    }

    /**
     *
     * @returns {null|DataGridHeader}
     */
    get parent() {
        return this.#parent;
    }

    get column() {
        return this.#column;
    }

    get model() {
        return this.#model;
    }
}


