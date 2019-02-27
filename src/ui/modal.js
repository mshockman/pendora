import Observable from "../core/interface/Observable";
import $ from 'jquery';


export default class Modal extends Observable {
    constructor(template, classes="", visibleClassName="c-modal--visible", hiddenClassName="c-modal--hidden", closeOnClick=true) {
        super();

        if(template) {
            if (typeof template === 'function') {
                this.$element = $(template(this));
            } else {
                this.$element = $(template);
            }
        } else {
            this.$element = $(`<div>`);
        }

        this.$element.addClass('c-modal');
        this._hiddenClassName = hiddenClassName;
        this._visibleClassName = visibleClassName;
        this._visible = true;

        if(classes) this.$element.addClass(classes);

        this.$element.on('click', (event) => {
            const $target = $(event.target),
                $targetModal = $target.closest('.c-modal');

            if(!$targetModal.is(this.$element)) return;

            if(closeOnClick && $target.is(this.$element)) {
                this.visible = false;
                return;
            }

            let $dismiss = $target.closest('js-modal-close', this.$element);

            if($dismiss.length && !$dismiss.hasClass('disabled')) {
                this.visible = false;
            }
        });

        this.visible = false; // Set to hidden by default.  This will cause correct classes to be applied.
    }

    show() {
        if(!this.visible) {
            this.$element.addClass(this._visibleClassName);
            this.$element.removeClass(this._hiddenClassName);
            this.trigger('modal.show', this);
            this._visible = true;
            return true;
        }

        return false;
    }

    hide() {
        if(this.visible) {
            this.$element.removeClass(this._visibleClassName);
            this.$element.addClass(this._hiddenClassName);
            this._visible = false;
            this.trigger('modal.hidden', this);
        }
    }

    appendTo(selector) {
        return this.$element.appendTo(selector);
    }

    set visible(value) {
        if(value) {
            return this.show();
        } else {
            return this.hide();
        }
    }

    get visible() {
        return this._visible;
    }
}


export class ModalWindow extends Modal {
    constructor(title, windowClasses="", titlebar=true, menubar=true, iconbar=false, statusbar=true, scrollable=true) {
        super();

        this.$element.append(`
            <div class="c-window c-modal__window">
                <div class="c-window__title-bar">
                    <div class="c-window__title"></div>
                    <div class="c-window__title-bar__buttons"></div>
                </div>
                <div class="c-window__context"></div>
                <div class="c-window__status-bar"></div>
            </div>
        `);
    }
}
