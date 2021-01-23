import {Schema} from "./schema";
import {selectElement} from "../core/utility";


export default class Form {
    #form;
    #schema;
    #onSubmitEventListener;

    constructor({form, schema}) {
        if(schema instanceof Schema) {
            this.#schema = schema;
        } else {
            this.#schema = new Schema({schema});
        }

        if(form) {
            this.setForm(form);
        }
    }

    setForm(form) {
        if(this.#form) {
            this.#form.removeEventListener("submit", this.#onSubmitEventListener);
            this.#form = null;
            this.#onSubmitEventListener = null;
        }

        if(form) {
            this.#form = selectElement(form);

            this.#onSubmitEventListener = (event) => {
                try {
                    console.log(this.validate());
                } catch (e) {
                    window.t1 = e;
                }

                event.preventDefault();
                return false;
            };

            this.#form.addEventListener("submit", this.#onSubmitEventListener);
        }
    }

    getValue() {
        let r = {};

        for(let node of this.#schema) {
            if(node.options.widget) {
                r[node.name] = node.options.widget.getValue();
            }
        }

        return r;
    }

    addField() {

    }

    get(field) {

    }

    validate() {
        return this.#schema.deserialize(this.getValue());
    }

    serialize() {

    }

    deserialize(value) {

    }
}


export class Field {
    #errorHandlers;

    constructor(widget, validationNode, onError) {
        this.#errorHandlers = [];
    }
}