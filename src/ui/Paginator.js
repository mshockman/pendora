import Observable from "../core/interface/Observable";
import $ from 'jquery';


/**
 * @EVENTS
 *  page-change({target, paginator, from, to})
 */
export default class Paginator extends Observable {
    constructor(page=1, totalPages=1) {
        super();

        this.page = page;
        this.totalPages = totalPages;

        this.$element = $(Paginator.template());
        this.$pageInput = this.$element.find('.c-paginator__page-input');
        this.$pageDisplay = this.$element.find(".c-paginator__page-total");
        this.$next = this.$element.find('.c-paginator__next');
        this.$prev = this.$element.find('.c-paginator__previous');
        this.$first = this.$element.find('.c-paginator__first');
        this.$last = this.$element.find('.c-paginator__last');

        this.$element.addClass('visible');

        this.$element.on('click', (event) => {
            let $action = $(event.target).closest("[data-action]", this.$element);

            if($action.length) {
                let action = $action.attr('data-action');

                if(action === 'first-page') {
                    this.setPage(1);
                } else if(action === 'previous-page') {
                    this.setPage(this.page - 1);
                } else if(action === 'next-page') {
                    this.setPage(this.page + 1);
                } else if(action === 'last-page') {
                    this.setPage(this.totalPages);
                }
            }
        });

        this.refresh();
    }

    appendTo(selector) {
        return this.$element.appendTo(selector);
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

            this.$pageDisplay.html(this.totalPages);
            this.$pageInput.val(this.page);

            if(!this.disabled) {
                this.$element.find("input button").prop('disabled', false).removeClass('disabled');

                if (!this.hasPreviousPage()) {
                    this.$first.prop('disabled', true).addClass('disabled');
                    this.$prev.prop('disabled', true).addClass('disabled');
                }

                if (!this.hasNextPage()) {
                    this.$next.prop('disabled', true).addClass('disabled');
                    this.$last.prop('disabled', true).addClass('disabled');
                }
            } else {
                this.$element.find("input button").prop('disabled', true).addClass('disabled');
            }

            this.trigger('refresh', {
                paginator: this,
                target: this
            });
        });
    }

    hasNextPage() {
        return this.page < this.totalPages;
    }

    hasPreviousPage() {
        return this.page > 1;
    }

    get disabled() {
        return this.$element.hasClass('disabled');
    }

    set disabled(value) {
        if(value && !this.disabled) {
            this.$element.addClass('disabled');
            this.$element.find("input button").prop('disabled', true).addClass('disabled');
            this.trigger('disabled', {target: this});
        } else if(!value && this.disabled) {
            this.$element.removeClass('disabled');
            this.$element.find("input button").prop('disabled', false).removeClass('disabled');
            this.trigger('enabled', {target: this});
        }
    }

    get visible() {
        return this.$element.hasClass('visible');
    }

    set visible(value) {
        if(value && !this.visible) {
            this.$element.addClass('visible');
            this.$element.removeClass('hidden');
        } else if(!value && this.visible) {
            this.$element.removeClass('visible');
            this.$element.addClass('hidden');
        }
    }

    static template() {
        return `
        <div class="c-paginator">
            <button type="button" class="c-paginator__first" data-action="first-page"><i class="fas fa-step-backward"></i></button>
            <button type="button" class="c-paginator__previous" data-action="previous-page"><i class="fas fa-caret-left"></i></button>
            <div>
                Page 
                <input type="text" class="c-paginator__page-input" /> 
                of 
                <span class="c-paginator__page-total"></span>
            </div>
            <button type="button" class="c-paginator__next" data-action="next-page"><i class="fas fa-caret-right"></i></button>
            <button type="button" class="c-paginator__last" data-action="last-page"><i class="fas fa-step-forward"></i></button>
        </div>
        `;
    }
}