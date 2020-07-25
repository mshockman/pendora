import Viewport from "../core/ui/Viewport";
import DataGridRow from "./DataGridRow";
import Publisher from "../core/Publisher";


export default class DataGridView extends Publisher {
    #model;
    #element;
    #columnToRowMap;
    #visibleRows;

    #viewport;
    #padding;

    #rowFactory;

    constructor(model=null, {padding=500, rowFactory=null}={}) {
        super();

        this.#element = document.createElement("div");
        this.#element.className = "data-grid-view";
        this.#columnToRowMap = new WeakMap();
        this.#visibleRows = [];

        this.#viewport = new Viewport();
        this.#viewport.appendTo(this.#element);

        this.#padding = padding;

        if(model) {
            this.setDataModel(model);
        }

        this.#viewport.on("scroll", topic => {
            this.publish("scroll", {grid: this, ...topic});

            this.render();
        });

        this.#rowFactory = rowFactory || function(grid, data, index) {
            return new DataGridRow(grid, data, index);
        };
    }

    setDataModel(model) {
        this.#model = model;
    }

    render() {
        this.innerHeight = this.#model.getTotalRowHeight();
        this.innerWidth = this.#model.getTotalColumnWidth();

        this.#viewport.emptyViewport();

        let fragment = document.createDocumentFragment();

        let startIndex = this.#model.getRowIndexAtHeight(this.#viewport.scrollTop - this.#padding),
            endIndex = Math.min(this.#model.getRowIndexAtHeight(this.#viewport.scrollTop + this.#viewport.offsetHeight + this.#padding) + 1, this.#model.getLength());

        this.#visibleRows = [];

        for(let i = startIndex; i < endIndex; i++) {
            let data = this.#model.getRow(i),
                row = this.#columnToRowMap.get(data);

            if(!row) {
                row = this.#rowFactory(this, data, i);
                this.#columnToRowMap.set(data, row);
            }

            row.appendTo(fragment);
            this.#visibleRows.push(row);
        }

        this.renderRows();

        this.#viewport.append(fragment);
    }

    clearCache() {
        this.#columnToRowMap = new WeakMap();
    }

    renderRows() {
        for(let row of this.#visibleRows) {
            row.render();
        }
    }

    setColumnWidths(widths) {
        for(let i = 0; i < widths.length; i++) {
            let column = this.#model.getColumn(i);
            column.width = widths[i];
        }

        this.renderRows();
    }

    setInnerWidth(width) {
        this.#viewport.innerWidth = width;
    }

    setInnerHeight(height) {
        this.#viewport.innerHeight = height;
    }

    appendTo(selector) {
        if(typeof selector === "string") {
            document.querySelector(selector).appendChild(this.#element);
        } else if(selector.appendChild) {
            selector.appendChild(this.#element);
        } else {
            selector.append(this.#element);
        }
    }

    get model() {
        return this.#model;
    }

    get element() {
        return this.#element;
    }

    get scrollLeft() {
        return this.#viewport.scrollLeft;
    }

    get scrollTop() {
        return this.#viewport.scrollTop;
    }

    set scrollLeft(value) {
        this.#viewport.scrollLeft = value;
    }

    set scrollTop(value) {
        this.#viewport.scrollTop = value;
    }

    get innerWidth() {
        return this.#viewport.innerWidth;
    }

    set innerWidth(value) {
        this.#viewport.innerWidth = value;
    }

    get innerHeight() {
        return this.#viewport.innerHeight;
    }

    set innerHeight(value) {
        this.#viewport.innerHeight = value;
    }
}