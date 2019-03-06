import $ from 'jquery';


/**
 * Component that displays a css loader.  Hides and shows itself depending on session state.
 */
export default class Loader {
    constructor(classes="") {
        this.$element = $(Loader.template());
        this.hide();
    }

    show() {
        this._visible = true;
        this.$element.removeClass('hidden').addClass('visible');
    }

    hide() {
        this._visible = false;
        this.$element.removeClass('visible').addClass('hidden');
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        if(value && !this._visible) {
            this.show();
        } else if(this._visible && !value) {
            this.hide();
        }
    }

    appendTo(selector) {
        return this.$element.appendTo(selector);
    }

    static template() {
        return `<div class="c-loader"><div class="lds-dual-ring"></div></div>`;
    }
}
