import {emptyElement} from "../core/utility";
import FormWidgetBase from "./FormWidgetBase";


export default class HiddenInputWidget extends FormWidgetBase {
    constructor(name) {
        let element = document.createElement('span');
        super(element);
        this.element.style.display = "none";
        this.name = name;
    }

    getValue() {
        let r = [];

        for(let input of this.element.children) {
            r.push(input.value);
        }

        if(r.length === 1) {
            return r[0];
        } else if(r.length > 1) {
            return r;
        }
    }

    setValue(value) {
        let fragment = document.createDocumentFragment();

        if(!Array.isArray(value)) {
            value = [value];
        }

        for(let v of value) {
            let input = document.createElement('input');
            input.type = "hidden";
            input.value = v + "";
            if(this.name) input.name = this.name;
            fragment.appendChild(input);
        }

        emptyElement(this.element);
        this.element.appendChild(fragment);
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;

        for(let input of this.element.querySelectorAll('input')) {
            input.name = name;
        }
    }
}
