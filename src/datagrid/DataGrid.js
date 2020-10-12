import DataGridHeader from "./DataGridHeader";
import BaseDataGrid from "./BaseDataGrid";
import DataGridPageBar from "./DataGridPageBar";
import {Loader} from "../core/ui/Loader";


export default class DataGrid extends BaseDataGrid {
    #dataGridHeader;
    #pageBar;
    #loader;

    #preventDefaultOnDisabled;
    #isLoading;

    constructor(dataModel=null, {resizeable=true, sortable=true, tableSort=true, scrollBarPadding=30, preprocessRows=false, pageBar=false, pageSizes=null, loader=false}={}) {
        super(null);

        this.#dataGridHeader = new DataGridHeader({resizeable, sortable, tableSort, scrollBarPadding});
        this.#pageBar = null;
        this.#loader = null;
        this.#isLoading = false;

        this.#dataGridHeader.appendTo(this.headerElement);
        this.#dataGridHeader.setModel(this.model);

        if(pageBar) {
            this.#pageBar = new DataGridPageBar(pageSizes);
            this.#pageBar.appendTo(this.footerElement);
        }

        if(loader === true) {
            this.#loader = new Loader("default");
        } else if(typeof loader === "string") {
            this.#loader = new Loader(loader);
        } else if(loader) {
            this.#loader = loader;
        }

        this.setModel(dataModel);

        this.#preventDefaultOnDisabled = event => {
            if(this.disabled) {
                event.preventDefault();
            }
        };

        this.element.addEventListener("click", this.#preventDefaultOnDisabled);
        this.element.addEventListener("mousedown", this.#preventDefaultOnDisabled);
    }

    setModel(model) {
        super.setModel(model);
        this.#dataGridHeader.setModel(model);
        if(this.#pageBar) this.#pageBar.setModel(model);
    }

    get dataGridHeader() {
        return this.#dataGridHeader;
    }

    set disabled(value) {
        value = !!value;

        if(value !== this.disabled) {
            super.disabled = value;

            if(this.#pageBar) {
                this.#pageBar.disabled = value;
            }
        }
    }

    get disabled() {
        return super.disabled;
    }

    get isLoading() {
        return this.#isLoading;
    }

    set isLoading(value) {
        value = !!value;

        if(value !== this.isLoading) {
            this.#isLoading = value;

            if(this.#isLoading) {
                this.element.classList.add("loading");

                if(this.#loader) {
                    this.#loader.appendTo(this.element);
                    this.#loader.show();
                }
            } else {
                this.element.classList.remove("loading");
                if(this.#loader) this.#loader.remove();
            }
        }
    }
}
