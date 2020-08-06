import Viewport from "../core/ui/Viewport";
import Publisher from "../core/Publisher";


export default class DataGridBase extends Publisher {
    #element;
    #header;
    #body;
    #footer;
    #model;

    #dataGridHeader;
    #dataGridTable;

    constructor(dataGridHeader, dataGridTable) {
        super();

        this.#element = document.createElement("div");
        this.#element.className = "data-grid";

        this.#header = document.createElement("div");
        this.#body = document.createElement("div");
        this.#footer = document.createElement("div");

        this.#header.className = "data-grid__header";
        this.#body.className = "data-grid__body";
        this.#footer.className = "data-grid__footer";

        this.#element.appendChild(this.#header);
        this.#element.appendChild(this.#body);
        this.#element.appendChild(this.#footer);

        this.#model = null;

        this.#dataGridHeader = dataGridHeader;
        this.#dataGridHeader.appendTo(this.#header);

        this.#dataGridTable = dataGridTable;
        this.#dataGridTable.appendTo(this.#body);

        this.#dataGridHeader.on("resize", topic => {
            this.#dataGridTable.setColumnWidths(this.#dataGridHeader.getColumnWidths());
            this.#dataGridTable.scrollLeft = topic.scrollLeft;
            this.#dataGridTable.innerWidth = topic.innerWidth;

            this.publish("resize", {
                ...topic,
                grid: this,
                target: this
            });
        });

        this.#dataGridHeader.on("resize-complete", topic => {
            this.#dataGridTable.setColumnWidths(this.#dataGridHeader.getColumnWidths());
            this.#dataGridTable.scrollLeft = topic.scrollLeft;
            this.#dataGridTable.innerWidth = topic.innerWidth;

            this.publish("resize", {
                ...topic,
                grid: this,
                target: this
            });
        });

        this.#dataGridTable.on("scroll", topic => {
            this.#dataGridHeader.scrollLeft = topic.scrollLeft;
        });

        this.#dataGridHeader.on("sort-change", (topic) => {
            let columns = topic.columns.map(c => c.column);

            this.#model.setColumns(columns);
            this.#dataGridTable.clearCache();
            this.#dataGridTable.render();
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

    setModel(model) {
        let columns = [];
        this.#model = model;

        for(let column of model.getColumns()) {
            columns.push(this.columnHeaderFactory.call(this, column));
        }

        this.#dataGridHeader.setColumns(columns);
    }

    render() {
        this.#dataGridHeader.render();
        this.#dataGridTable.render();
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
}
