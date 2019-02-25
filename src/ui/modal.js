import Observable from "../core/interface/Observable";


export class Modal extends Observable {
    constructor() {
        super();

        this.hiddenClassName = "";
        this.visibleClassName = "";
    }

    show() {
        this.trigger('modal.show', this);
    }

    hide() {
        this.trigger('modal.hide', this);
    }

    isVisible() {

    }

    appendTo(selector) {

    }

    set visible(value) {

    }

    get visible() {

    }
}