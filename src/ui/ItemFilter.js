import Publisher from "../core/Publisher";

export default class ItemFilter extends Publisher {
    constructor({element, target, items=null, inputSelector="[data-filter]"}) {
        super();
        this.element = document.createElement('div');
        this.input = document.createElement('input');
        this.element.appendChild(this.input);
    }
}
