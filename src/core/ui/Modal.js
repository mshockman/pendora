import Component from "../Component";
import Overlay from "./Overlay";


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
        return this.#overlay.show(immediate);
    }

    hide(immediate) {
        return this.#overlay.hide(immediate);
    }

    get isVisible() {
        return this.state === Overlay.visible || this.state === Overlay.showing;
    }

    get state() {
        return this.#overlay.state;
    }
}
