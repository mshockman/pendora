import FormWidgetBase from "./FormWidgetBase";


export default class InputWidget extends FormWidgetBase {
    constructor(input=null, name=null) {
        if(!input) {
            input = document.createElement('input');
        }

        super(input);

        if(name !== null) {
            this.setName(name);
        }
    }

    getValue() {
        return this.input.value;
    }

    setValue(value) {
        this.input.value = value;
    }

    getName() {
        return this.input.name;
    }

    setName(name) {
        this.input.name = name;
    }

    get type() {
        return this.input.type;
    }

    set type(type) {
        this.input.type = type;
    }

    get placeholder() {
        return this.input.placeholder;
    }

    set placeholder(value) {
        this.input.placeholder = value;
    }

    get input() {
        return this.element;
    }
}
