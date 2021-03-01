import Menu from "./Menu";
import MenuItem, {TOGGLE} from "./MenuItem";
import {POSITIONERS} from "./positioners";
import {MenuNodeTopic} from "./MenuNode";
import {createFragment} from "../core/utility";
import DropDown from "./DropDown";
import {MultiHiddenInputWidget} from "../forms";


function selectOptionTemplate(context) {
    return createFragment(`
       <div data-controller="menuitem" class="select-option" aria-role="option">
            <a class="select-option__body">
                <span class="select-option__check" data-controller="checkmark"><i class="fas fa-check" aria-hidden="true"></i></span>
                <span data-controller="icon" class="select-option__icon">${context.icon || ""}</span>
                <span data-controller="text" class="select-option__text">${context.text || ""}</span>
                <span data-controller="alt" class="select-option__alt">${context.altText || ""}</span>
            </a>
        </div>
    `).firstElementChild;
}


function selectMenuTemplate(context) {
    return createFragment(`
        <div class="select-menu">
            <div class="select-menu__content-wrapper">
                <div class="select-menu__header" data-controller="menu-header"></div>
                <div class="select-menu__body" data-controller="menu-body"></div>
                <div class="select-menu__footer" data-controller="menu-footer""></div>
            </div>
        </div>
    `).firstElementChild;
}


export default class SelectMenu extends Menu {
    #lastClicked;
    #pendingChangeEvent;

    constructor({element=null, multiple=false, closeOnBlur=false, timeout=false, positioner=POSITIONERS.inherit, closeOnSelect=false, multiSelect=false, shiftSelect=true}={}) {
        if(!element) {
            element = selectMenuTemplate();
        }

        super({element, multiple, closeOnBlur, closeOnSelect, timeout, positioner});
        this.element.classList.add("select-menu");
        this.multiSelect = multiSelect;
        this.shiftSelect = shiftSelect;
        this.#lastClicked = null;

        this.toggle = (item, topic) => {
            return this.multiSelect !== false || topic?.originalEvent?.ctrlKey === true;
        };

        this.on("menuitem.select", topic => {
            let originalEvent = topic.trigger ? topic.trigger.originalEvent : null;

            if(this.shiftSelect && this.multiSelect && originalEvent?.type === "click" && originalEvent?.shiftKey) {
                return;
            }

            if(this.multiSelect === false) {
                for(let child of this.children) {
                    if(child !== topic.target) {
                        child.deselect();
                    }
                }
            }

            this.#queueChange();
        });

        this.on("menuitem.deselect", topic => {
            this.#queueChange();
        });

        this.on("event.click", topic => {
            if(topic.target.parent !== this) return;

            if(this.multiSelect !== false && this.shiftSelect && topic.originalEvent.shiftKey && this.#lastClicked) {
                let range = [this.children.indexOf(this.#lastClicked), this.children.indexOf(topic.target)];
                range.sort();

                if(range[0] !== -1) {
                    let children = this.children;

                    for(let i = 0, l = children.length; i < l; i++) {
                        let item = children[i];

                        if(i >= range[0] && i <= range[1]) {
                            if(!item.isSelected) {
                                item.select();
                            }
                        } else if(item.isSelected) {
                            item.deselect();
                        }
                    }
                }
            } else if(this.multiSelect === "ctrl") {
                if(!topic.originalEvent.ctrlKey) {
                    for(let child of this.children) {
                        if(child !== topic.target && child.isSelected) {
                            child.deselect();
                        }
                    }
                }

                this.#lastClicked = topic.target;
            } else {
                this.#lastClicked = topic.target;
            }
        });

        this.on("menu.show", topic => {
            if(topic.target === this) {
                for(let child of this.children) {
                    if(child.isSelected) {
                        child.activate();

                        if(!this.multiple || !this.multiSelect) {
                            break;
                        }
                    }
                }
            }
        });
    }

    #queueChange() {
        if(this.#pendingChangeEvent && this.#pendingChangeEvent.status === "pending") {
            this.#pendingChangeEvent.cancel();
            this.#pendingChangeEvent = null;
        }

        let queue = {
            status: "pending",

            cancel() {
                if(this.status === "pending") {
                    this.status = "canceled";
                }
            }
        };

        this.#pendingChangeEvent = queue;

        window.queueMicrotask(() => {
            if(queue.status === "pending") {
                queue.status = "complete";
                this.dispatchTopic(new MenuNodeTopic("menu.select.change"));
                if(this.#pendingChangeEvent === queue) this.#pendingChangeEvent = null;
            }
        });

        return queue;
    }

    getSelection() {
        let r = [];

        for(let child of this.children) {
            if(child.isSelected) {
                r.push(child);
            }
        }

        return r;
    }

    clearSelection() {
        this.clearActiveItems();
    }
}


export class SelectMenuOption extends MenuItem {
    constructor({element=null, text=null, value=null, altText=null, icon=null}) {
        if(!element) {
            element = selectOptionTemplate({text, altText, icon});
        }

        super({element, text, autoActivate: true, toggle: false, timeout: false});
        this.value = value;
        this.element.classList.add("select-option");

        this.toggle = (item, topic) => {
            return TOGGLE.getComputedValue(this.parent.toggle, item, topic);
        };
    }

    select(trigger=null) {
        if(!this.isSelected) {
            this.isSelected = true;

            window.queueMicrotask(() => {
                this.dispatchTopic(new MenuNodeTopic("menuitem.select", {trigger}));
            });
        }
    }

    deselect(trigger=null) {
        if(this.isSelected) {
            this.isSelected = false;

            window.queueMicrotask(() => {
                this.dispatchTopic(new MenuNodeTopic("menuitem.deselect", {trigger}));
            });
        }
    }

    onClick(topic) {
        if(topic.target !== this || this.getDisabled()) return;

        let toggle = TOGGLE.getComputedValue(this.toggle, this, topic),
            isSelected = this.isSelected;

        if(isSelected && toggle === true) {
            this.deselect(topic);
        } else if(!isSelected) {
            this.select(topic);
        }
    }

    get isSelected() {
        return this.element.classList.contains("selected");
    }

    set isSelected(value) {
        this.element.classList[value ? "add" : "remove"]("selected");
    }

    get multiple() {
        return this.submenu.multiSelect;
    }

    set multiple(value) {
        this.submenu.multiSelect = value;
    }
}


export class RichSelect extends DropDown {
    constructor({element=null, placeholder=null, multiple=false, join=", ", closeOnSelect=false, widget=null}={}) {
        if(!element) {
            element = createFragment(`
                <div class="rich-select">
                    <div class="select-button"><input class="select-button__input" type="text" ${placeholder ? `placeholder="${placeholder}"` : ""} data-controller="text" readonly /><span data-controller="arrow" class="select-button__caret"><i class="fas fa-sort-down"></i></span></div>
                </div>
            `).firstElementChild;
        }

        super({element});
        this.placeholder = placeholder;
        this.join = join;
        this.element.classList.add("rich-select");
        this.detachMenu();
        this.attachMenu(new SelectMenu());
        this.closeOnSelect = closeOnSelect;
        this.multiple = multiple;

        this.widget = widget;

        if(typeof this.widget === "function") {
            this.widget = new this.widget();
        }

        if(this.widget && !this.widget.element.parentElement) {
            this.widget.appendTo(this.element);
        }

        let onChange = topic => this.onChange(topic);
        this.on("menu.select.change", onChange);
    }

    get options() {
        return this.submenu.children;
    }

    getSelection() {
        return this.submenu.getSelection();
    }

    addOption(option) {
        this.submenu.appendItem(option);
    }

    onChange(topic) {
        let selection = this.getSelection();

        if(this.widget) {
            this.widget.setValue(selection.map(item => item.value));
        }

        this.textContainer.value = selection.map(item => item.text.toString()).join(this.join);
    }

    set multiple(value) {
        this.submenu.multiSelect = value;
    }

    get multiple() {
        return this.submenu.multiSelect;
    }

    get name() {
        return this.widget.getName();
    }

    set name(name) {
        this.widget.setName(name);
    }
}
