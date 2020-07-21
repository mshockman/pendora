import {parseBoolean} from "../core/utility/parser";
import {addClasses, findChild, findChildren, removeClasses} from "../core/utility";


/**
 * Creates a table with a scrollable body and a static header.
 */
export default class DataTable {
    #element;
    #headerRow;
    #bodyContainer;

    #headerTable;
    #bodyTable;

    #scrollable;

    #onResize = null;

    constructor({scrollable=false}) {
        this.#scrollable = !!scrollable;

        this.#element = document.createElement("div");
        this.#element.className = "data-table";

        if(this.#scrollable) {
            let headerTableContainer = document.createElement("div"),
                bodyTableContainer = document.createElement("div");

            this.#element.classList.add('data-table--scrollable');

            headerTableContainer.className = "data-table__header-container";
            bodyTableContainer.className = "data-table__body-container";

            this.#headerTable = document.createElement("table");
            this.#bodyTable = document.createElement("table");

            this.#headerTable.className = "data-table__header-table";
            this.#bodyTable.className = "data-table__body-table";

            let thead = document.createElement("thead"),
                tbody = document.createElement("tbody"),
                headerRow = document.createElement("tr");

            thead.className = "data-table__thead";
            tbody.className = "data-table__tbody";
            headerRow.className = "data-table__header-row";

            thead.appendChild(headerRow);

            this.#headerTable.appendChild(thead);
            this.#bodyTable.appendChild(tbody);

            headerTableContainer.appendChild(this.#headerTable);
            bodyTableContainer.appendChild(this.#bodyTable);

            this.#element.appendChild(headerTableContainer);
            this.#element.appendChild(bodyTableContainer);

            this.#bodyContainer = tbody;
            this.#headerRow = headerRow;

            this.init();
        } else {
            let table = document.createElement("table"),
                thead = document.createElement('thead'),
                tbody = document.createElement("tbody"),
                headerRow = document.createElement('tr');

            table.className = "data-table__table";
            thead.className = "data-table__thead";
            tbody.className = "data-table__tbody";
            headerRow.className = "data-table__header-row";
            thead.appendChild(headerRow);
            table.appendChild(thead);
            table.appendChild(tbody);

            this.#element.appendChild(table);
            this.#headerTable = this.#bodyTable = table;
            this.#bodyContainer = tbody;
            this.#headerRow = headerRow;
        }
    }

    appendHeaderNode(node) {
        this.#headerRow.appendChild(node);
    }

    appendRowNode(node) {
        this.#bodyContainer.appendChild(node);
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.#element);
        } else if(selector.appendChild) {
            selector.appendChild(this.#element);
        } else {
            selector.append(this.#element);
        }

        if(this.#scrollable) {
            this.refreshColumnWidths();
            this.init();
        }
    }

    detach() {
        if(this.#element.parentElement) {
            this.#element.parentElement.removeChild(this.#element);
        }
    }

    replaceNode(node) {
        node.parentElement.replaceChild(this.#element, node);

        if(this.#scrollable) {
            this.refreshColumnWidths();
            this.init();
        }
    }

    init() {
        if(!this.#onResize && this.#scrollable) {
            this.#onResize = () => {
                console.log('resize');
                this.refreshColumnWidths();
            };

            window.addEventListener("resize", this.#onResize);
        }
    }

    destroy() {
        if(this.#element.parentElement) {
            this.#element.parentElement.removeChild(this.#element);
        }

        if(this.#onResize) {
            window.removeEventListener('resize', this.#onResize);
            this.#onResize = null;
        }
    }

    addTableClasses(classes) {
        if(this.#bodyTable === this.#headerTable) {
            this.addBodyTableClasses(classes);
        } else {
            this.addBodyTableClasses(classes);
            this.addHeaderTableClasses(classes);
        }
    }

    addHeaderTableClasses(classes) {
        addClasses(this.#headerTable, classes);
    }

    addBodyTableClasses(classes) {
        addClasses(this.#bodyTable, classes);
    }

    removeTableClasses(classes) {
        if(this.#bodyTable === this.#headerTable) {
            this.removeBodyTableClasses(classes);
        } else {
            this.removeHeaderTableClasses(classes);
            this.removeBodyTableClasses(classes);
        }
    }

    removeHeaderTableClasses(classes) {
        removeClasses(this.#headerTable, classes);
    }

    removeBodyTableClasses(classes) {
        removeClasses(this.#bodyTable, classes);
    }

    addClasses(classes) {
        addClasses(this.#element, classes);
    }

    removeClasses(classes) {
        removeClasses(this.#element, classes);
    }

    refreshColumnWidths() {
        if(this.#bodyTable === this.#headerTable) return;

        let row = this.#bodyContainer.querySelector("tr"),
            cells = row ? findChildren(row, "td") : [];

        if(cells.length) {
            let columns = this.columnHeaderNodes;

            for(let i = 0; i < cells.length; i++) {
                let cell = cells[i],
                    column = columns[i],
                    width = cell.getBoundingClientRect().width;

                column.style.width = width + "px";
            }

            this.#headerTable.style.width = this.#bodyTable.getBoundingClientRect().width + "px";
        }
    }

    get columnHeaderNodes() {
        return findChildren(this.#headerRow, "th, td");
    }

    get element() {
        return this.#element;
    }

    get scrollable() {
        return this.#scrollable;
    }

    static buildFromTable(table) {
        if(typeof table === 'string') table = document.querySelector(table);

        let {scrollable=false} = table.dataset;

        scrollable = parseBoolean(scrollable);

        let dataTable = new DataTable({scrollable});
        dataTable.element.id = table.id;
        dataTable.addClasses(table.className);

        let thead = findChild(table, "thead"),
            tbody = findChild(table, "tbody"),
            headerRow = thead ? findChild(thead, "tr") : null;

        if(headerRow) {
            for(let column of findChildren(headerRow, "td, th")) {
                dataTable.appendHeaderNode(column);
            }
        }

        if(tbody) {
            for(let row of findChildren(tbody, "tr")) {
                dataTable.appendRowNode(row);
            }
        }

        if(table.parentElement) {
            dataTable.replaceNode(table);
        }

        return dataTable;
    }
}