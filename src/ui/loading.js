import {selectElement} from "../core/utility/dom";


/**
 * Component that displays a css loader.  Hides and shows itself depending on session state.
 */
export default class Loader {
    constructor() {
        this.element = document.createElement('div');
        let ring = document.createElement('div');
        this.element.classList.add('c-loader');
        ring.classList.add('lds-dual-ring');
        this.element.appendChild(ring);

        this.element.classList.add('hidden');
    }

    get visible() {
        return this.element.classList.contains('hidden');
    }

    set visible(value) {
        if(value) {
            this.element.classList.remove('hidden');
        } else {
            this.element.classList.add('hidden');
        }
    }

    appendTo(selector) {
        selectElement(selector).appendChild(this.element);
    }
}
