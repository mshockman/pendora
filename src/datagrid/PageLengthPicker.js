import Publisher from "../core/Publisher";


export default class PageLengthPicker extends Publisher {
    #element;
    #pageSizeSelect;
    #disabled;
    #model;

    #pageSize;

    #onDataChange;
    #onPageSizeChange;

    constructor(pageSizes) {
        super();

        this.#element = document.createElement("div");
        this.#element.className = "paginator";

        this.#pageSizeSelect = document.createElement("select");
        this.#pageSizeSelect.dataset.cmd = "page-size";

        this.#disabled = false;

        for(let size of pageSizes) {
            let {label=null, value, selected=false} = size;
            label = label === null ? value : label;

            let option = document.createElement("option");
            option.innerHTML = label;
            option.value = value;

            if(selected) {
                option.selected = true;
                this.#pageSize = value;
            }

            this.#pageSizeSelect.appendChild(option);
        }

        this.#element.appendChild(this.#pageSizeSelect);

        this.#pageSizeSelect.addEventListener("change", event => {
            let pageSize = parseInt(this.#pageSizeSelect.value, 10);
            this.setPageSize(pageSize);
        });

        this.#onDataChange = () => {
            this.pageSize = this.#model.getPageSize();
        };

        this.#onPageSizeChange = topic => {
            console.log(topic.pageSize);

            if(this.#model) {
                this.#model.setPageSize(topic.pageSize);
            }
        };
    }

    setModel(model) {
        if(this.#model) {
            this.#model.off('data-change', this.#onDataChange);
            this.off("page-size-change", this.#onPageSizeChange);
            this.#model = null;
        }

        if(model) {
            this.#model = model;
            this.#model.on("data-change", this.#onDataChange);
            this.on("page-size-change", this.#onPageSizeChange);
            this.pageSize = this.#model.getPageSize();
        }
    }

    setPageSize(value) {
        value = parseInt(value, 10);

        if(!Number.isNaN(value) && this.pageSize !== value) {
            this.pageSize = value;

            if(this.pageSize === value) {
                console.log(value);
                this.publish("page-size-change", {topic: "page-size-change", target: this, pageSize: this.pageSize});
            }
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

    setDisabled(value) {
        this.disabled = value;
    }

    get element() {
        return this.#element;
    }

    get disabled() {
        return this.#disabled;
    }

    set disabled(value) {
        this.#disabled = !!value;

        if(this.#disabled) {
            this.#element.classList.add("disabled");
            this.#pageSizeSelect.disabled = true;
        } else {
            this.#element.classList.remove("disabled");
            this.#pageSizeSelect.disabled = false;
        }
    }

    get pageSize() {
        return this.#pageSize;
    }

    set pageSize(value) {
        value = parseInt(value, 10);

        if(!Number.isNaN(value)) {
            this.#pageSizeSelect.value = value;
            this.#pageSize = parseInt(this.#pageSizeSelect.value, 10);
        }
    }
}