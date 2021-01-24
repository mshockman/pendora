import {emptyElement} from "../core/utility";
import FormWidgetBase from "./FormWidgetBase";
import InputWidget from "./InputWidget";


export class MultiHiddenInputWidget extends FormWidgetBase {
    constructor(container=null) {
        let element = container || document.createElement('span');
        super(element);
        this.element.style.display = "none";
        this._name = "";
        this.inputs = [];
        this._value = [];
    }

    render() {
        let value = this.value;

        emptyElement(this.element);

        if(!Array.isArray(value)) {
            value = [value];
        }

        let fragment = document.createDocumentFragment();

        for(let v of value) {
            let input = document.createElement('input');
            input.type = "hidden";
            input.value = v + "";
            if(this.name) input.name = this.name;
            fragment.appendChild(input);
        }

        this.element.appendChild(fragment);
    }

    getValue() {
        if(this._value.length === 1) {
            return this._value[0];
        } else {
            return this._value;
        }
    }

    setValue(value) {
        if(!Array.isArray(value)) {
            value = [value];
        }

        this._value = value.map(item => item+'');
        this.render();
    }

    getName() {
        return this._name;
    }

    setName(name) {
        this._name = name;

        for(let input of this.element.querySelectorAll('input')) {
            input.name = name;
        }
    }
}


export default class HiddenInputWidget extends InputWidget {
    constructor(input=null, name=null) {
        super(input);
        this.type = 'hidden';

        if(name !== null) {
            this.setName(name);
        }
    }
}
