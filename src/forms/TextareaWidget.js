import FormWidgetBase from "./FormWidgetBase";


export default class TextareaWidget extends FormWidgetBase {
    constructor(textarea=null, name=null) {
        if(textarea === null) {
            textarea = document.createElement("textarea");
        }

        super(textarea);

        if(name !== null) {
            this.setName(name);
        }
    }

    setName(name) {
        this.element.name = name;
    }

    getName() {
        return this.element.name;
    }

    getValue() {
        return this.element.value;
    }

    setValue(value) {
        this.element.value = value;
    }

    get placeholder() {
        return this.element.placeholder;
    }

    set placeholder(placeholder) {
        this.element.placeholder = placeholder;
    }
}