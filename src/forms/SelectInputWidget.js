import FormWidgetBase from "./FormWidgetBase";


export default class SelectInputWidget extends FormWidgetBase {
    constructor(select, multiple=null, name=null, hidden=null) {
        if(typeof select === 'string') {
            select = document.querySelector(select);
        }

        super(select);

        if(name !== null) {
            this.element.name = name;
        }

        if(multiple !== null) {
            this.element.multiple = multiple;
        }

        if(hidden !== null) {
            this.isHidden = hidden;
        }
    }

    get isHidden() {
        return this.element.style.display === 'none';
    }

    set isHidden(value) {
        if(this.isHidden !== value) {
            if(value) {
                this.element.style.display = "none";
            } else {
                this.element.style.display = "";
            }
        }
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.element);
        } else if(selector.appendChild) {
            selector.appendChild(this.element);
        } else if(selector.append) {
            selector.append(this.element);
        }
    }

    getValue() {
        let r = [];

        for(let option of this.element.options) {
            if(option.selected) {
                r.push(option.value);
            }
        }

        return r;
    }

    setValue(values) {
        this.clearSelected();

        if(!Array.isArray(values)) {
            values = [values];
        }

        for(let value of values) {
            value += "";
            let found = false;

            for(let option of this.element.options) {
                if(option.value === value && !option.selected) {
                    option.selected = true;
                    found = true;
                    break;
                }
            }

            if(!found) {
                throw new Error(`Unknown value: ${value}`);
            }
        }
    }

    clearSelected() {
        for(let option of this.element.options) {
            option.selected = false;
        }
    }

    getName() {
        return this.element.name;
    }

    setName(name) {
        this.element.name = name;
    }
}
