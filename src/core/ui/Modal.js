import Component from "../Component";
import Overlay from "./Overlay";
import Animation from "../fx/Animation";
import AutoLoader from "../../autoloader";


export default class Modal extends Component {
    #overlay;

    constructor({element=null, closeOnClick=true, showFX=null, hideFX=null, showDuration=null, hideDuration=null, timeout=null, removeOnHide=false}={}) {
        if(!element) {
            element = document.createElement('div');
        }

        super(element);

        this.element.classList.add('modal');

        this.closeOnClick = closeOnClick;
        this.#overlay = new Overlay(this.element, {showFX, showDuration, hideFX, hideDuration, hiddenClassName: "closed", visibleClassName: "open", timeout, removeOnHide});

        this.element.addEventListener('click', event => {
            let dismiss = event.target.closest("[data-dismiss]");

            if(dismiss || (this.closeOnClick && event.target === this.element)) {
                event.stopPropagation();
                this.hide();
            }
        });

        if(this.classList.contains('open')) {
            this.show(true);
        } else {
            this.hide(true);
        }
    }

    async show(immediate) {
        let promise = this.#overlay.show(immediate);
        this.publish('modal.show', this);

        let result = await promise;

        if(result === Animation.complete) {
            this.publish('modal.visible');
        }

        return result;
    }

    async hide(immediate) {
        let promise = this.#overlay.hide(immediate);
        this.publish('modal.hide', this);

        let result = await promise;

        if(result === Animation.complete) {
            this.publish('modal.hidden', this);
        }

        return result;
    }

    get isVisible() {
        return this.state === Overlay.visible || this.state === Overlay.showing;
    }

    get state() {
        return this.#overlay.state;
    }
}
