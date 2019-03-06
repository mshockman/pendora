import Observable from "../core/interface/Observable";
import $ from 'jquery';


export default class Viewport extends Observable {
    constructor(selector) {
        super();

        this._left = 0;
        this._top = 0;
        this.mirrorX = null;
        this.mirrorY = null;

        if(!selector) {
            this.$elemenet = $(Viewport.template());
        } else {
            this.$element = $(selector);
        }
    }

    appendTo(selector) {

    }

    append(component) {

    }

    mirror(viewport, target='xy') {

    }

    static template() {

    }
}