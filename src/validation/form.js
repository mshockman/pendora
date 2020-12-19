import {InvalidErrorBase} from "./errors";


export class FormValidator {
    #element;
    #validators;

    /**
     *
     * @param selector
     * @param onInvalid {null|function}
     */
    constructor(selector, onInvalid=null) {
        this.#element = null;
        this.onInvalid = onInvalid;

        if(typeof selector === "string") {
            this.#element = document.querySelector(selector);
        } else if(typeof selector === "function") {
            this.#element = selector.call(this);
        } else if(selector) {
            this.#element = selector;
        }

        this.#validators = [];

        if(this.#element) {
            this.#element.addEventListener("submit", (event) => {
                if (!this.validate()) {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }

    validate() {
        let valid = true;

        for(let validator of this.#validators) {
            try {
                validator.validate();
            } catch (e) {
                if(e instanceof InvalidErrorBase) {
                    if(this.onInvalid) {
                        this.onInvalid(e, validator);
                    }
                    valid = false;
                } else {
                    throw e;
                }
            }
        }

        return valid;
    }

    addValidator(validator) {
        this.#validators.push(validator);
    }

    get element() {
        return this.#element;
    }

    get validators() {
        return this.#validators;
    }
}


export class Field {
    constructor(widget, validatorNode, onInvalid) {
        this.widget = widget;
        this.node = validatorNode;
        this.onInvalid = onInvalid;
    }

    validate() {
        try {
            this.node.deserialize(this.widget.getValue());
        } catch (e) {
            if(e instanceof InvalidErrorBase) {
                if(this.onInvalid) {
                    this.onInvalid(e, this);
                }

                throw e;
            } else {
                throw e;
            }
        }
    }
}


export class InputWidget {
    #element;

    constructor(selector) {
        if(typeof selector === "string") {
            this.#element = document.querySelector(selector);
        } else if(typeof selector === "function") {
            this.#element = selector.call(this);
        } else if(!selector) {
            this.#element = document.createElement("input");
            this.#element.type = "text";
        } else {
            this.#element = selector;
        }
    }

    getValue() {
        return this.#element.value;
    }

    setValue(value) {
        this.#element.value = value;
    }

    getName() {
        return this.#element.name;
    }

    setName(name) {
        this.#element.name = name;
    }

    getDisabled() {
        return this.#element.disabled;
    }

    setDisabled(disabled) {
        this.#element.disabled = disabled;
    }

    addClass(classList) {
        this.#element.classList.add(...classList.split(/\s+/));
    }

    removeClass(classList) {
        this.#element.classList.remove(...classList.split(/\s+/));
    }

    hasClass(className) {
        return this.#element.classList.contains(className);
    }

    getAttribute(key) {
        return this.#element.getAttribute(key);
    }

    setAttribute(key, value) {
        this.#element.setAttribute("id", value);
    }

    getId() {
        return this.#element.id;
    }

    setId(id) {
        this.#element.id = id;
    }

    getDataSetValue(key) {
        return this.#element.dataset[key];
    }

    setDataSetValue(key, value) {
        this.#element.dataset[key] = value;
    }

    get element() {
        return this.#element;
    }
}