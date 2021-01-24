import Form, {Field} from "../../../../src/forms/Form";
import {SchemaNode, Schema} from "../../../../src/validation/schema";
import {StringType} from "../../../../src/validation/types";
import {All, LengthValidator} from "../../../../src/validation/validators";
import Notification from "../../../../src/core/ui/Notification";
import InputWidget from "../../../../src/forms/InputWidget";
import {
    getPropertyByPath,
    setPropertyByPath,
    exportWND,
    hasPropertyPath,
    createFragment
} from "../../../../src/core/utility";
import TextareaWidget from "../../../../src/forms/TextareaWidget";
import HiddenInputWidget from "../../../../src/forms/HiddenInputWidget";


class ClassificationForm extends Form {
    constructor() {
        super();

        this.addField(new Field(new InputWidget(null, "name")));
        this.addField(new Field(new TextareaWidget(null, "description")));
    }
}


class AttributeDO {
    constructor(id, name, options, default_value) {
        this.id = id;
        this.name = name;
        this.options = options;
        this.default_value = default_value;
    }
}


let attributeWidgetCounter = 0;


class AttributeWidgetItem {
    #element;
    #label;
    #textarea;
    #idInput;
    #name;
    #attribute;
    #parent;
    #header;

    constructor(attribute, parent) {
        attributeWidgetCounter++;

        this.#element = createFragment(`
            <div class="attribute-item">
                <div class="attribute-item__header">
                    <span class="attribute-item__delete-btn" data-btn="remove"><i class="far fa-trash-alt"></i></span>
                    <h3 class="attribute-item__label" data-pid="label"></h3>
                </div>
                <div class="attribute-item__body">
                    <input type="hidden" data-pid="id" />
                    <div class="attribute-item__dv-label"><label for="attribute-widget-df-${attributeWidgetCounter}">Default Value:</label></div>
                    <textarea id="attribute-widget-df-${attributeWidgetCounter}" class="attribute-item__dv" data-pid="default-value"></textarea>
                </div>
            </div>
        `).firstElementChild;

        this.#attribute = new AttributeDO(attribute.id, attribute.name, attribute.options || null, attribute.default_value ?? '');
        this.#label = this.#element.querySelector("[data-pid='label']");
        this.#textarea = this.#element.querySelector("[data-pid='default-value']");
        this.#idInput = this.#element.querySelector("[data-pid='id']");
        this.#header = this.#element.querySelector('.attribute-item__header');

        this.#idInput.value = this.#attribute.id;
        this.#textarea.value = this.#attribute.default_value;
        this.#label.innerHTML = this.#attribute.name;
        this.#parent = parent;

        this.#header.addEventListener("click", (e) => {
            let btn = e.target.closest("[data-btn]")

            if(btn) {
                let cmd = btn.dataset["btn"];

                if(cmd === "remove") {
                    this.#parent.removeAttribute(this);
                }
            } else {
                this.#element.classList.toggle("open");
            }
        });
    }

    setName(name) {
        this.#name = name;
        this.#textarea.name = this.#name ? `${this.#name}.default_value` : '';
        this.#idInput.name = this.#name ? `${this.#name}.id` : '';
    }

    getValue() {
        this.#attribute.default_value = this.#textarea.value;
        return new AttributeDO(this.#attribute.id, this.#attribute.name, this.#attribute.options, this.#attribute.default_value);
    }

    setValue(value) {
        this.#attribute = new AttributeDO(value.id, value.name, value.options || null, value.default_value ?? '');
        this.#idInput.value = value.id;
        this.#label.innerHTML = this.#attribute.name;
        this.#textarea.value = this.#attribute.default_value;
    }

    getName() {
        return this.#name;
    }

    remove() {
        if(this.#element.parentElement) {
            this.#element.parentElement.removeChild(this.#element);
        }
    }

    appendTo(selector) {
        if(typeof selector === "string") {
            document.querySelector(selector).appendChild(this.#element);
        } if(selector.appendChild) {
            selector.appendChild(this.#element);
        } else if(selector.append) {
            selector.append(this.#element);
        }
    }

    open() {
        this.#element.classList.add("open");
    }

    close() {
        this.#element.classList.remove("open");
    }

    get element() {
        return this.#element;
    }
}


class AttributesWidget {
    #element;
    #attributes;
    #body;
    #name;
    #header;

    constructor(name) {
        this.#attributes = [];

        this.#element = createFragment(`
            <div class="attributes-widget">
                <div class="attributes-widget__header">
                    <h1>Attributes</h1>
                    <div class="attributes-widget__controls">
                        <span class="btn btn-link" data-cmd="expand">Expand All</span>
                        <span class="btn btn-link" data-cmd="collapse">Collapse All</span>
                    </div>
                </div>
                <div class="attributes-widget__body">
                    
                </div>
            </div>
        `).firstElementChild;

        this.#header = this.#element.querySelector('.attributes-widget__header');
        this.#body = this.#element.querySelector(".attributes-widget__body");
        this.setName(name);

        this.#header.addEventListener("click", (event) => {
            let cmd = event.target.closest("[data-cmd]");

            if(cmd) {
                cmd = cmd.dataset.cmd;

                if(cmd === "expand") {
                    this.expandAll();
                } else if(cmd === "collapse") {
                    this.collapseAll();
                }
            }
        });
    }

    appendTo(selector) {
        if(typeof selector === "string") {
            document.querySelector(selector).appendChild(this.#element);
        } if(selector.appendChild) {
            selector.appendChild(this.#element);
        } else if(selector.append) {
            selector.append(this.#element);
        }
    }

    addAttribute(attribute) {
        if(this.getAttributeById(attribute.id)) {
           throw new Error("Attribute already exists.");
        }

        let attributeDO = new AttributeDO(attribute.id, attribute.name, attribute.options, attribute.default_value),
            attributeItem = new AttributeWidgetItem(attributeDO, this);

        attributeItem.appendTo(this.#body);
        attributeItem.setName(`${this.#name}.${this.#attributes.length}`);
        this.#attributes.push(attributeItem);
    }

    removeAttribute(attributeItem) {
        let index = this.#attributes.indexOf(attributeItem);

        if(index !== -1) {
            this.#attributes.splice(index, 1);
            attributeItem.remove();

            for(let i = 0; i < this.#attributes.length; i++) {
                let item = this.#attributes[i];
                item.setName(`${this.#name}.${i}`);
            }
        }
    }

    setName(name) {
        this.#name = name;

        for(let i = 0; i < this.#attributes.length; i++) {
            let item = this.#attributes[i];
            item.setName(`${this.#name}.${i}`);
        }
    }

    getName() {
        return this.#name;
    }

    getAttributeById(id) {
        for(let attribute of this.#attributes) {
            if(attribute.id === id) {
                return attribute;
            }
        }

        return null;
    }

    expandAll() {
        for(let attr of this.#attributes) {
            attr.open();
        }
    }

    collapseAll() {
        for(let attr of this.#attributes) {
            attr.close();
        }
    }
}


export default class FormValidationPage {
    load() {
        exportWND({getPropertyByPath, setPropertyByPath, hasPropertyPath});
        let attributeWidgetContainer = document.querySelector("#attributes-widget-container");

        let aw = new AttributesWidget("attributes");
        aw.appendTo(attributeWidgetContainer);

        for(let i = 0; i < 10; i++) {
            let attr = new AttributeDO(i, `Attribute ${i}`, null, '');
            aw.addAttribute(attr);
        }
    }
}