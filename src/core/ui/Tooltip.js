import Component from "../Component";
import Arrow from "./Arrow";
import {setElementClientPosition, Rect} from "./position";


export default class Tooltip extends Component {
    #arrow;
    #timer;

    constructor(text) {
        let element = document.createElement('div'),
            body = document.createElement('div');

        element.appendChild(body);
        body.innerHTML = text;

        element.className = "tooltip";
        body.className = "tooltip__body";

        super(element);

        this.#timer = null;

        this.#arrow = new Arrow();
        this.#arrow.appendTo(document.body);

        this.showFX = null;
        this.hideFX = null;
    }

    async show(target, placement, timeout) {
        if(this.#timer) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }

        if(!this.element.parentElement) {
            target.offsetParent.appendChild(this.element);
        }

        let showFX;

        if(typeof this.showFX === 'string') {
            // noinspection JSUnusedLocalSymbols
            showFX = (element) => this.addClass(this.showFX);
        } else {
            showFX = this.showFX;
        }

        if(typeof this.hideFX === 'string') {
            this.removeClass(this.hideFX);
        }

        let rect = Rect.getBoundingClientRect(this.element);

        if(showFX) {
            await showFX(this.element);
        }

        this.isVisible = true;
    }

    async hide() {
        if(this.#timer) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }

        this.isVisible = false;
        this.removeFrom();
    }
}
