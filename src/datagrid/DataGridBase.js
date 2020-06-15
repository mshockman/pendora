import Viewport from "../core/ui/Viewport";
import Publisher from "../core/Publisher";


export default class DataGridBase extends Publisher {
    #element;
    #header;
    #body;
    #footer;

    #dataGridHeader;
    #dataGridTable;
    #viewport;

    constructor(dataGridHeader, dataGridTable) {
        super();

        this.#element = document.createElement("div");
        this.#element.className = "datagrid";

        this.#header = document.createElement("div");
        this.#body = document.createElement("div");
        this.#footer = document.createElement("div");

        this.#header.className = "datagrid__header";
        this.#body.className = "datagrid__body";
        this.#footer.className = "datagrid__footer";

        this.#element.appendChild(this.#header);
        this.#element.appendChild(this.#body);
        this.#element.appendChild(this.#footer);

        this.#viewport = new Viewport();
        this.#viewport.appendTo(this.#body);

        this.#dataGridHeader = dataGridHeader;
        this.#dataGridHeader.appendTo(this.#header);

        this.#dataGridTable = dataGridTable;
        this.#viewport.append(this.#dataGridTable);

        this.#dataGridHeader.on("resize", topic => {
            this.#dataGridTable.setColumnWidths(this.#dataGridHeader.getColumnWidths());

            this.publish("resize", {
                ...topic,
                grid: this,
                target: this
            });
        });

        this.#dataGridHeader.on("resize-complete", topic => {
            this.#dataGridTable.setColumnWidths(this.#dataGridHeader.getColumnWidths());

            this.publish("resize", {
                ...topic,
                grid: this,
                target: this
            });
        });

        this.#viewport.on("scroll", topic => {
            this.#dataGridHeader.scrollLeft = this.#viewport.scrollLeft;

            this.#dataGridTable.onViewportScroll({
                grid: this,
                viewport: this.#viewport,
                scrollLeft: this.#viewport.scrollLeft,
                scrollTop: this.#viewport.scrollTop,
                scrollWidth: this.#viewport.scrollWidth,
                scrollHeight: this.#viewport.scrollHeight
            });

            this.publish("scroll");
        })
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
        let widths = this.#dataGridTable.getColumnWidths(),
            columns = this.#dataGridHeader.columns;

        for(let i = 0; i < columns.length; i++) {
            let column = columns[i],
                width = widths[i];

            if(typeof width === 'number') {
                column.width = width;
            }
        }

        this.#dataGridHeader.render();
    }

    get element() {
        return this.#element;
    }

    get header() {
        return this.#header;
    }

    get body() {
        return this.#body;
    }

    get footer() {
        return this.#footer;
    }

    get theader() {
        // todo remove
        return this.#dataGridHeader;
    }
}
