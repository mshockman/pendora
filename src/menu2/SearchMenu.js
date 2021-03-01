import DropDown from "./DropDown";
import {createFragment} from "../core/utility";
import Timer from "../core/utility/timers";
import {MenuNodeTopic} from "./MenuNode";


export default class SearchMenu extends DropDown {
    #input;
    #promise;
    #icon;
    #value;

    /**
     * @type {null|Function}
     */
    search;
    widget;

    constructor({placeholder="", search=null, widget=null}={}) {
        let element = createFragment(`
            <div class="rich-select search-menu">
                <div class="select-button"><input class="select-button__input" type="text" ${placeholder ? `placeholder="${placeholder}"` : ""} data-controller="text" /><span data-controller="icon" class="select-button__icon"><i class="fas fa-search"></i></span></div>
            </div>
        `).firstElementChild;


        super({element});

        this.toggle = false;
        this.autoActivate = false;
        this.closeOnBlur = true;
        this.closeOnSelect = true;
        this.#value = null;
        this.onReject = null;
        this.widget = widget;
        this.search = search;
        this.#input = this.element.querySelector("[data-controller='text']");
        this.#icon = this.element.querySelector("[data-controller='icon']");
        this.#promise = null;

        this.#input.addEventListener("input", event => {
            Timer.forceSetTargetTimeout(this, "search", () => {
                if(this.search) {
                    let promise = this.#promise = this.search(this.#input.value);

                    if(promise) {
                        this.#promise.then((items) => {
                            if (this.#promise === promise) {
                                this.#promise = null;
                                this.showItems(items);
                            }
                        }).catch(response => {
                            if(this.onReject && this.#promise === promise) {
                                this.#promise = null;
                                this.onReject(response);
                            }
                        });
                    }
                }
            }, 250);
        });

        this.on("menuitem.select", topic => {
            if(topic.target.parentItem === this) {
                this.value = topic.target;

                window.queueMicrotask(() => {
                    this.dispatchTopic(new MenuNodeTopic("search.change", {value: topic.target}));
                });
            }
        });

        this.on("menu.show", topic => {
            if(topic.target === this.submenu && this.#value && this.submenu.children.indexOf(this.#value) !== -1) {
                this.#value.activate();
            }
        });

        this.on("menunode.deactivate", topic => {
            if(topic.target === this && this.#value) {
                this.#input.value = this.#value.text;
            }
        });
    }

    clear() {
        this.#value = null;
        this.#input.value = "";
    }

    showItems(items) {
        this.submenu.empty();

        for(let item of items) {
            this.submenu.appendItem(item);
        }

        if(!this.isActive) {
            this.activate();
        }
    }

    onClick(topic) {
        if(topic.target !== this || this.getDisabled()) {
            topic.originalEvent.preventDefault();
        }

        if(!this.isActive && this.submenu.children.length > 0) {
            this.activate();
        }
    }

    get placeholder() {
        return this.#input.placeholder;
    }

    set placeholder(value) {
        this.#input.placeholder.value = value;
    }

    get input() {
        return this.#input;
    }

    get icon() {
        return this.#icon;
    }

    get value() {
        return this.#value;
    }

    set value(value) {
        if(this.#value && this.submenu.children.indexOf(this.#value) !== -1 && this.#value.isActive) {
            this.#value.deactivate();
            this.#value = null;
        }

        this.#value = value;

        if(this.#value) {
            this.#input.value = this.#value.text;

            if (this.widget) {
                this.widget.setValue(this.#value.value !== null ? this.#value.value : this.#value.text);
            }
        } else {
            this.#input.value = "";

            if(this.widget) {
                this.widget.setValue(null);
            }
        }
    }
}
