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

        for(let option of this.element.querySelectorAll("option")) {
            if(option.selected) {
                r.push(option.value);
            }
        }

        return r;
    }

    setValue(values) {
        if(!Array.isArray(values)) {
            values = [values];
        }

        let options = [];

        for(let option of this.element.querySelectorAll("option")) {
            options.push({
                element: option,
                value: option.value,
                selected: false
            });
        }

        for(let value of values) {
            value += "";
            let found = false;

            for(let option of options) {
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

        // Select will set its value back to selected if there is no currently selected elements.
        // To fix this select the elements first, then deselect.
        for(let option of options) {
            if(option.selected) {
                option.element.selected = true;
            }
        }

        for(let option of options) {
            if(!option.selected) {
                option.element.selected = false;
            }
        }
    }

    clearSelected() {
        let options = this.element.querySelectorAll("option");

        for(let option of options) {
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
