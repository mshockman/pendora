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
import {ComboBox, SelectOption} from "../../../../src/menu";
import {Loader} from "../../../../src/core/ui/Loader";
import SearchComboBox from "../../../../src/menu/SearchComboBox";


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

    get attribute() {
        return this.#attribute;
    }
}


class AttributeRepositoryMock {
    #attributes;

    constructor(delay=1000) {
        this.#attributes = [];
        this.delay = delay;

        for(let i = 0; i < 100; i++) {
            this.#attributes.push(new AttributeDO(i, `Attribute ${i}`, '', ''));
        }
    }

    find({name=null, limit=10, exclude_ids=null}) {
        if(name) {
            name = name.toLowerCase();
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                let r = this.#attributes.filter((item) => {
                    if(name && !item.name.toLowerCase().includes(name)) {
                        return false;
                    }

                    return !(exclude_ids !== null && exclude_ids.indexOf(item.id) !== -1);
                });

                r = r.slice(0, limit);
                resolve(r);
            }, this.delay);
        });
    }
}


class AttributeSearchBox extends ComboBox {
    #loader;
    #attributes;
    #attributeRepo;
    #filterWait;
    #search;

    #request;

    constructor(filterWait=250) {
        super();

        this.closeOnSelect = false;
        this.#attributeRepo = new AttributeRepositoryMock(1000);
        this.#loader = new Loader();
        this.#loader.element.classList.add("menu-loader");
        this.#loader.hide();
        this.#loader.appendTo(this.submenu.body);
        this.#attributes = null;
        this.#filterWait = filterWait;
        this.element.classList.add('attribute-search-box');
        this.#attributes = new WeakMap();

        this.#search = (value) => {
            this.findAttributes(value);
        };

        this.on("menuitem.select", topic => {
            this.clearSelection();
            let attribute = this.#attributes.get(topic.target);
            this.publish("attribute.select", {target: attribute});
            this.deactivate();
        });

        this.on("menuitem.click", topic => {
            if(topic.target === this) {
                topic.preventDefault();

                if(this.submenu.options.length) {
                    this.activate();
                }
            }
        });

        this.on("keyboard-navigation-start", topic => {
            if(!this.options.length) {
                topic.cancel();
            }
        });

        this.on("menu.hide", topic => {
            this.clearOptions();
        });
    }

    findAttributes(value) {
        this.clearOptions();
        this.#loader.show();

        if(this.#request) {
            this.#request.cancel();
            this.#request = null;
        }

        let canceled = false;

        this.#request = {
            cancel() { canceled = true },
            isCanceled() { return canceled }
        };

        this.#attributeRepo.find(value).then((attributes) => {
            if(!canceled) {
                this.#request = null;
                this.#loader.hide();

                for (let attribute of attributes) {
                    let option = new SelectOption({text: attribute.name, value: null});
                    this.#attributes.set(option, attribute);
                    this.append(option);
                }

                if(!this.isActive) {
                    this.activate();
                }
            }
        });
    }

    initFilter() {
        let timer = null;

        let applyFilter= () => {
            timer = null;
            this.#search(this.getFilterValue());
            this.activateSelectedItemOrFirst();
        };

        let onInput = () => {
            if(timer) {
                clearTimeout(timer);
                timer = null;
            }

            if(this.#filterWait === false || this.#filterWait < 0) {
                applyFilter();
            } else {
                timer = setTimeout(applyFilter, this.#filterWait);
            }
        };

        let onKeyDown = event => {
            // Apply the filter immediately on enter.
            if(event.key === "Enter" && timer) {
                clearTimeout(timer);
                timer = null;
                applyFilter();
            }
        };

        this.textbox.addEventListener('input', onInput);
        this.textbox.addEventListener('keydown', onKeyDown);
    }

    clearOptions() {
        this.submenu.clearChildMenuNodes();
    }

    clearSelection() {
        for(let item of this.submenu.selection) {
            item.optionDeselect();
        }
    }
}


class AttributeSearchBox2 extends SearchComboBox {
    #request;
    #repo;

    constructor() {
        let repo = new AttributeRepositoryMock(1000);

        let find = (value) => {
            if(this.#request) {
                this.#request.cancel();
                this.#request = null;
            }

            let canceled = false;

            let request = {
                cancel() { canceled = true; },
                isCanceled() { return canceled; }
            }

            return new Promise((resolve, reject) => {
                this.#repo.find({name: value, ...this.getFilter()}).then(attributes => {
                    if(request.isCanceled()) {
                        resolve(null);
                    } else {
                        let r = [];

                        for(let attr of attributes) {
                            r.push(new SelectOption({text: attr.name, model: attr}));
                        }

                        resolve(r);
                    }
                }).catch(e => {
                    reject(e);
                });
            });
        };

        super({find, delay: 250});
        this.#request = null;
        this.#repo = repo;
        this.getFilter = () => {};

        this.element.classList.add("attribute-search-box");
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

        let controls = this.#element.querySelector(".attributes-widget__controls"),
            attributeSearchBox = new AttributeSearchBox2();

        attributeSearchBox.getFilter = () => {
            return {
                exclude_ids: this.#attributes.map(item => item.attribute.id)
            };
        };

        attributeSearchBox.on("menuitem.select", topic => {
            this.addAttribute(topic.target.model);
        });

        attributeSearchBox.appendTo(controls);

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
        if(this.getAttributeItemById(attribute.id)) {
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

    getAttributeItemById(id) {
        for(let item of this.#attributes) {
            if(item.attribute.id === id) {
                return item;
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