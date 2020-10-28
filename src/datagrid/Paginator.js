import Publisher from "../core/Publisher";


export default class Paginator extends Publisher {
    #element;
    #firstPageButton;
    #previousPageButton;
    #nextPageButton;
    #lastPageButton;
    #pageNumberInput;

    #model;
    #onPageChange;

    #handleDataChange;
    #handleLoadingStart;
    #handleLoadingEnd;

    #currentPageNumber;
    #pageNumberCount;
    #disabled;

    #isLoading;

    constructor(page=1, pageNumberCount=null) {
        super();

        this.#model = null;
        this.#element = document.createElement("div");
        this.#currentPageNumber = parseInt(page, 10);
        this.#pageNumberCount = pageNumberCount !== null ? parseInt(pageNumberCount, 10) : null;
        this.#disabled = false;
        this.#isLoading = false;
        this.#onPageChange = null;

        this.#firstPageButton = document.createElement("button");
        this.#previousPageButton = document.createElement("button");
        this.#nextPageButton = document.createElement("button");
        this.#lastPageButton = document.createElement("button");
        this.#pageNumberInput = document.createElement("input");
        this.#pageNumberInput.type = "number";

        this.#element.appendChild(this.#firstPageButton);
        this.#element.appendChild(this.#previousPageButton);
        this.#element.appendChild(this.#pageNumberInput);
        this.#element.appendChild(this.#nextPageButton);
        this.#element.appendChild(this.#lastPageButton);

        this.#element.className = "paginator";
        this.#firstPageButton.className = "paginator__btn-first-page";
        this.#previousPageButton.className = "paginator__btn-previous-page";
        this.#pageNumberInput.className = "paginator__page-input";
        this.#nextPageButton.className = "paginator__btn-next-page";
        this.#lastPageButton.className = "paginator__btn-last-page";

        this.#firstPageButton.innerHTML = "First";
        this.#previousPageButton.innerHTML = "Prevous";
        this.#nextPageButton.innerHTML = "Next";
        this.#lastPageButton.innerHTML = "Last";
        this.#pageNumberInput.value = this.#currentPageNumber;

        this.#firstPageButton.dataset.cmd = "first";
        this.#previousPageButton.dataset.cmd = "previous";
        this.#nextPageButton.dataset.cmd = "next";
        this.#lastPageButton.dataset.cmd = "last";

        this.#element.addEventListener("click", event => {
            let control = event.target.closest("[data-cmd]"),
                cmd = control ? control.dataset.cmd : null;

            if(!this.#element.contains(control)) {
                return;
            }

            if(cmd === "first") {
                this.firstPage();
            } else if(cmd === "previous") {
                this.previousPage();
            } else if(cmd === "next") {
                this.nextPage();
            } else if(cmd === "last") {
                this.lastPage();
            }
        });

        this.#pageNumberInput.addEventListener("change", event => {
            let value = parseInt(this.#pageNumberInput.value);

            if(!Number.isNaN(value) && value !== this.page) {
                this.setPage(value);
            }
        });

        this.#handleDataChange = () => {
            this.#currentPageNumber = this.#model.getPageNumber();
            this.#pageNumberCount = this.#model.getPageCount();
            this.render();
        };

        this.#handleLoadingStart = () => {
            this.#isLoading = true;
            this.render();
        };

        this.#handleLoadingEnd = () => {
            this.#isLoading = false;
            this.render();
        };

        this.#onPageChange = topic => {
            this.#model.setPageNumber(topic.page);
        };

        this.page = page;
        this.pageNumberCount = pageNumberCount;

        this.render();
    }

    render() {
        this.#pageNumberInput.value = this.#currentPageNumber == null ? "" : this.#currentPageNumber;
        this.#pageNumberInput.disabled = this.#isLoading || this.#disabled;

        this.#previousPageButton.disabled = this.#isLoading || this.#disabled || this.#currentPageNumber <= 1;
        this.#firstPageButton.disabled = this.#isLoading || this.#disabled || this.#currentPageNumber <= 1;

        this.#nextPageButton.disabled = this.#isLoading || this.#disabled || (this.#pageNumberCount !== null && this.#currentPageNumber >= this.#pageNumberCount);
        this.#lastPageButton.disabled = this.#isLoading || this.#disabled || this.#pageNumberCount === null || this.#pageNumberCount <= this.#currentPageNumber;
    }

    setModel(model) {
        if(this.#model) {
            this.#model.off("data-change", this.#handleDataChange);
            this.off("page-change", this.#onPageChange);
            this.#model = null;
        }

        if(model) {
            this.#model = model;
            this.#model.on('data-change', this.#handleDataChange);
            this.#currentPageNumber = this.#model.getPageNumber();
            this.#pageNumberCount = this.#model.getPageCount();

            this.on("page-change", this.#onPageChange);
        } else {
            this.#currentPageNumber = 1;
            this.#pageNumberCount = null;
        }

        this.render();
    }

    nextPage() {
        let page = this.#currentPageNumber + 1;

        if(this.#pageNumberCount === null || page <= this.#pageNumberCount) {
            this.setPage(page);
        }
    }

    previousPage() {
        let page = Math.max(1, this.#currentPageNumber-1);
        this.setPage(page);
    }

    firstPage() {
        this.setPage(1);
    }

    lastPage() {
        if(this.#pageNumberCount !== null) {
            this.setPage(this.#pageNumberCount);
        }
    }

    setPage(page) {
        page = Math.max(1, page);

        if(page !== this.#currentPageNumber) {
            this.#currentPageNumber = page;

            this.publish("page-change", {topic: "page-change", page: this.#currentPageNumber, pageCount: this.#pageNumberCount, paginator: this});

            this.render();
        }
    }

    setPageCount(count) {
        if(count !== this.#pageNumberCount) {
            this.#pageNumberCount = count;

            this.publish("page-count-change", {topic: "page-count-change", page: this.#currentPageNumber, pageCount: this.#pageNumberCount, paginator: this});

            this.render();
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

    get page() {
        return this.#currentPageNumber;
    }

    set page(value) {
        this.#currentPageNumber = parseInt(value, 10);
        this.render();
    }

    set pageNumberCount(value) {
        this.#pageNumberCount = value === null ? null : parseInt(value, 10);
        this.render();
    }

    get pageNumberCount() {
        return this.#pageNumberCount;
    }

    get model() {
        return this.#model;
    }

    get element() {
        return this.#element;
    }

    get disabled() {
        return this.#disabled;
    }

    set disabled(value) {
        this.#disabled = !!value;
        this.render();
    }

    static BuildUrlPaginator({host=null, mapParams="*", pageParam="page", autoDisabled=false, pageNumberCount=null}={}) {
        let current = new URL(window.location),
            startingPage = current.searchParams.has(pageParam) ? current.searchParams.get(pageParam) : 1,
            paginator = new Paginator(startingPage, pageNumberCount);

        paginator.on("page-change", topic => {
            if(autoDisabled) {
                paginator.disabled = true;
            }

            let url = new URL(host || window.location);

            if(mapParams === "*") {
                url.search = current.search;
            } else if(mapParams) {
                for(let param of mapParams) {
                    if(current.searchParams.has(param)) {
                        for(let value of current.searchParams.getAll(param)) {
                            url.searchParams.append(param, value);
                        }
                    }
                }
            }

            url.searchParams.set(pageParam, paginator.page);

            window.location = url.toString();
        });

        return paginator;
    }
}

