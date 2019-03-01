import Observable from "../core/interface/Observable";
import $ from 'jquery';
import AutoLoader from 'autoloader';


function modalTemplate() {
    return `<div class="c-modal">`;
}


/**
 * The `Modal` class creates a widget that can be used to create a transparent background that can be displayed and hidden.
 * Useful for creating windows, lightboxes or other popup content.  By default the modal will hide if the use clicks on it.
 *
 * Modal is an observable with the following events:
 * modal.show: Fired when the modal goes from hidden to visible.
 * modal.hide: Fired when the modal goes from visible to hidden.
 *
 * CLASSES:
 * .c-modal - Main class of the widget
 *
 * STATE CLASSES:
 * .c-modal--visible - Applied when the widget is visible.
 * .c-modal--hidden - Applied when the widget is hidden.
 * .disabled - Applied when the widget is disabled.
 *
 * ACTION CLASSES
 * .js-modal-close - Can be applied to any child element.  If the user clicks an element marked with this class that
 * doesn't have the class disabled the modal will close.
 */
export default class Modal extends Observable {
    /**
     * Constructs the modal.
     *
     * @param template - A template function, string or selector that is to be used to create the modal.  If null
     * the default will be used.
     * @param classes - Additional classes to add to the modal.
     * @param visibleClassName - The visible state class name.
     * @param hiddenClassName - The hidden state class name.
     * @param closeOnClick - If true the modal will close when clicked directly.
     */
    constructor({template=modalTemplate, classes="", visibleClassName="c-modal--visible", hiddenClassName="c-modal--hidden", closeOnClick=true}={}) {
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
        this.closeOnClick = closeOnClick;

        if(classes) this.$element.addClass(classes);

        this.$element.on('click', (event) => {
            const $target = $(event.target),
                $targetModal = $target.closest('.c-modal');

            if(!$targetModal.is(this.$element)) return;

            if(this.closeOnClick && $target.is(this.$element)) {
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

    /**
     * Shows the modal.
     * @returns {boolean}
     */
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

    /**
     * Hides the modal.
     * @returns {boolean}
     */
    hide() {
        if(this.visible) {
            this.$element.removeClass(this._visibleClassName);
            this.$element.addClass(this._hiddenClassName);
            this._visible = false;
            this.trigger('modal.hide', this);
            return true;
        }

        return false;
    }

    /**
     * Appends to modal to the target selector.
     * @param selector
     * @returns {*}
     */
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


function constructModalWindow({title, classes, template=null, titlebar=true, menubar=false, iconbar=false, statusbar=true, scrollable=true}={}) {
    if(template) {
        if(typeof template === 'function') {
            return $(template({titlebar, menubar, iconbar, statusbar, scrollable}));
        } else{
            return $(template);
        }
    }

    let $window = $(`<div class="c-window c-modal__window"></div>`);

    if(titlebar) {
        let $titlebar = $(`
            <div class="c-window__title-bar">
                <div class="c-window__title"></div>
                <div class="c-window__title-bar__buttons"></div>
            </div>
        `);

        let $title = $titlebar.find('.c-window__title');
        $window.append($titlebar);
        if(title) $title.html(title);
    }

    if(menubar) {
        $window.append(`
            <div class="c-window__menu-bar"></div>
        `);
    }

    if(iconbar) {
        $window.append(`
            <div class="c-window__icon-bar"></div>
        `);
    }

    let $context = $('<div class="c-window__context"></div>');
    $window.append($context);

    if(statusbar) {
        $window.append(`
            <div class="c-window__status-bar"></div>
        `);
    }

    if(scrollable) {
        $context.addClass('c-window__context--scrollable');
    }

    if(classes) $window.addClass(classes);
    return $window;
}


function findElementOrNull(context, selector) {
    if(context) {
        let f = context.find(selector);
        return f.length ? f : null;
    }
    return null;
}


export class ModalWindow extends Modal {
    constructor({title=null, classes, template=null, titlebar=true, menubar=false, iconbar=false, statusbar=true, scrollable=true}={}) {
        super();

        this.$window = constructModalWindow({template, title, classes, titlebar, menubar, iconbar, statusbar, scrollable});
        this.$element.append(this.$window);
        this.$titlebar = findElementOrNull(this.$window, '.c-window__title-bar');
        this.$statusbar = findElementOrNull(this.$window, '.c-window__status-bar');
        this.$menubar = findElementOrNull(this.$window, '.c-window__menu-bar');
        this.$iconbar = findElementOrNull(this.$window, '.c-window__icon-bar');
        this.$title = findElementOrNull(this.$titlebar, '.c-window__title');
        this.$context = findElementOrNull(this.$window, '.c-window__context');
        this.$titleButtons = findElementOrNull(this.$window, '.c-window__title-bar__buttons');
    }

    get title() {
        return this.$title.html();
    }

    set title(value) {
        this.$title.html(value);
    }
}


AutoLoader.register('Modal', (element) => {
    element = $(element);
    let config = Object.assign({}, element.data());
    config.template = element;
    return new Modal(config);
});


AutoLoader.register('ModalWindow', (element) => {
    element = $(element);
    let config = Object.assign({}, element.data());
    config.template = element;
    return new ModalWindow(config);
});
