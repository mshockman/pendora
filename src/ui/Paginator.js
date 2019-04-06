import Observable from "../core/interface/Observable";
import {parseHTML} from 'core/utility';


/**
 * @EVENTS
 *  page-change({target, paginator, from, to})
 */
export default class Paginator extends Observable {
    constructor(page=1, totalPages=1) {
        super();

        this.page = page;
        this.totalPages = totalPages;
        this._disabled = null;

        /**
         * @type {ChildNode}
         */
        this.element = parseHTML(Paginator.template()).firstChild;
        this.pageInput = this.element.querySelector('.c-paginator__page-input');
        this.pageDisplay = this.element.querySelector('.c-paginator__page-total');
        this.nextBTN = this.element.querySelector('.c-paginator__next');
        this.prevBTN = this.element.querySelector('.c-paginator__previous');
        this.firstBTN = this.element.querySelector('.c-paginator__first');
        this.lastBTN = this.element.querySelector('.c-paginator__last');

        this.element.addEventListener('click', (event) => {
            let actionElement = event.target.closest("[data-action]", this.element);
            if(!actionElement || actionElement.disabled) return;

            let action = actionElement.dataset.action;

            if(action === 'first-page') {
                this.setPage(1);
            } else if(action === 'previous-page') {
                this.setPage(this.page - 1);
            } else if(action === 'next-page') {
                this.setPage(this.page + 1);
            } else if(action === 'last-page') {
                this.setPage(this.totalPages);
            }
        });

        this.pageInput.addEventListener('change', () => {
            let page = parseInt(this.pageInput.value, 10);

            if(!Number.isNaN(page)) {
                this.setPage(page);
            } else {
                this.pageInput.value = this.page;
            }
        });

        this.setDisabled(false);
        this.refresh();
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.element);
        } else if(selector.jquery) {
            selector.append(this.element);
        } else {
            selector.appendChild(this.element);
        }
    }

    setPage(page) {
        if(page < 1) {
            page = 1;
        } else if(page > this.totalPages) {
            page = this.totalPages;
        }

        if(this.page !== page) {
            let oldPage = this.page;
            this.page = page;
            this.refresh();
            this.trigger('page-change', {
                target: this,
                paginator: this,
                from: oldPage,
                to: this.page
            });
        }

        this.pageInput.value = this.page;
    }

    setTotalPages(total) {
        if(this.totalPages !== total) {
            this.totalPages = total;
            this.refresh();
        }
    }

    refresh() {
        if(this._renderID) return;

        this._renderID = window.requestAnimationFrame(() => {
            this._renderID = null;

            this.pageDisplay.innerHTML = this.totalPages;
            this.pageInput.value = this.page;
            let disabled = this._disabled;
            this._disabled = null;
            this.setDisabled(disabled);

            this.trigger('refresh', {
                paginator: this,
                target: this
            });
        });
    }

    setDisabled(disabled) {
        if(this._disabled === disabled) return;

        this._disabled = disabled;

        let inputs = [
            this.pageInput,
            this.firstBTN,
            this.prevBTN,
            this.lastBTN,
            this.nextBTN
        ];

        if(this._disabled) {
            for(let i = 0, l = inputs.length; i < l; i++) {
                inputs[i].disabled = true;
            }

            this.element.classList.add('disabled');
            this.trigger('disabled', {target: this});
        } else {
            for(let i = 0, l = inputs.length; i < l; i++) {
                inputs[i].disabled = false;
            }

            this.element.classList.remove('disabled');
            this.trigger('enabled', {target: this});
        }
    }

    hasNextPage() {
        return this.page < this.totalPages;
    }

    hasPreviousPage() {
        return this.page > 1;
    }

    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this.setDisabled(value);
    }

    get visible() {
        return !this.element.classList.contains('hidden');
    }

    set visible(value) {
        if(this.visible !== value) {
            if(value) {
                this.element.classList.remove('hidden');
            } else {
                this.element.classList.add('hidden');
            }
        }
    }

    static template() {
        return `
        <div class="c-paginator">
            <div class="c-paginator__left-controls">
                <button type="button" class="c-paginator__first" data-action="first-page"><i class="fas fa-step-backward"></i></button>
                <button type="button" class="c-paginator__previous" data-action="previous-page"><i class="fas fa-caret-left"></i></button>
            </div>
            <div class="c-paginator__page-input-container">
                Page 
                <input type="text" class="c-paginator__page-input" /> 
                of 
                <span class="c-paginator__page-total"></span>
            </div>
            <div class="c-paginator__right-controls">
                <button type="button" class="c-paginator__next" data-action="next-page"><i class="fas fa-caret-right"></i></button>
                <button type="button" class="c-paginator__last" data-action="last-page"><i class="fas fa-step-forward"></i></button>
            </div>
        </div>
        `;
    }
}
