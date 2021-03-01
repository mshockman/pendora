import {RichSelect} from "./SelectMenu";
import {createFragment} from "../core/utility";
import Timer from "../core/utility/timers";


export default class MultiComboBox extends RichSelect {
    #input;
    #button;
    #pills;
    #pillToObjectMap;
    #noItemsFoundMessageContainer;

    constructor({placeholder="Please Select An Item.", widget=null}={}) {
        let element = createFragment(`
            <div class="multi-combo-box">
                <div class="multi-combo-box__button">
                    <div class="multi-combo-box__input" contenteditable="true"></div>
                </div>
            </div>
        `).firstElementChild;

        super({element, multiple: true, widget});

        this.#input = this.element.querySelector(".multi-combo-box__input");
        this.#button = this.element.querySelector(".multi-combo-box__button");
        this.#pills = [];
        this.#pillToObjectMap = new WeakMap();
        this.placeholder = placeholder;
        this.toggle = (item, topic) => {
            let pill = topic.originalEvent.target.closest(".multi-combo-box__pill");
            return !pill;
        };

        this.#input.innerHTML = this.placeholder;
        this.#input.classList.add("has-placeholder");

        this.#noItemsFoundMessageContainer = document.createElement("div");
        this.#noItemsFoundMessageContainer.className = "no-items-found-body";
        this.missingText = "No Items Found.";
        this.submenu.body.parentElement.insertBefore(this.#noItemsFoundMessageContainer, this.submenu.body);

        this.on("menunode.deactivate", topic => {
            if(topic.target === this) {
                this.#input.blur();

                if(this.getSelection().length === 0) {
                    this.#input.innerHTML = this.placeholder;
                    this.#input.classList.add("has-placeholder");
                } else {
                    this.#input.innerHTML = "";
                    this.#input.classList.remove("has-placeholder");
                }

                this.submenu.filter(null);
            }
        });

        this.on("event.click", topic => {
            if(this.isActive) {
                this.#input.focus();
            }

            let pillRemoveButton = topic.originalEvent.target.closest(".pill__exit-button");

            if(pillRemoveButton) {
                let pill = pillRemoveButton.closest(".multi-combo-box__pill");

                setTimeout(() => {
                    this.#removePill(pill);
                }, 0);
            }
        });

        this.#input.addEventListener("focus", event => {
            if(this.#input.classList.contains("has-placeholder")) {
                this.#input.classList.remove("has-placeholder");
                this.#input.innerHTML = "";
            }
        });

        this.#input.addEventListener("input", event => {
            console.log({
                event,
            });

            Timer.forceSetTargetTimeout(this, "filter", () => {
                let value = this.#input.innerHTML.toLowerCase().trim();

                if(value) {
                    this.submenu.filter(item => item.text.toLowerCase().trim().includes(value));
                } else {
                    this.submenu.filter(null);
                }
            }, 250);
        });

        this.#input.addEventListener("keydown", event => {
            let value = this.#input.innerHTML;

            if(!value && event.key === "Backspace") {
                event.preventDefault();

                if(this.#pills.length > 0) {
                    this.#removePill(this.#pills[this.#pills.length-1]);
                }
            }
        });
    }

    onChange(topic) {
        let selection = this.getSelection();

        for(let i = this.#pills.length - 1; i >= 0; i--) {
            let pill = this.#pills[i],
                item = this.#pillToObjectMap.get(pill);

            if(selection.indexOf(item) === -1) {
                this.#removePill(pill);
            }
        }

        for(let item of selection) {
            if(!this.#getPillForItem(item)) {
                let pill = this.#createPill(item);
                this.#pills.push(pill);
                this.#button.insertBefore(pill, this.#input);
            }
        }

        if(this.widget) {
            this.widget.setValue(selection.map(item => item.value));
        }
    }

    #createPill(item) {
        let pill = createFragment(`
            <div class="multi-combo-box__pill"><div class="pill__text">${item.text}</div><div class="pill__exit-button"><i class="far fa-times-circle" aria-hidden="true"></i></div></div>
        `).firstElementChild;

        this.#pillToObjectMap.set(pill, item);
        return pill;
    }

    #removePill(pill) {
        let index = this.#pills.indexOf(pill);

        if(index !== -1) {
            let item = this.#pillToObjectMap.get(pill);

            this.#pills.splice(index, 1);
            this.#pillToObjectMap.delete(pill);
            if(pill.parentElement) pill.parentElement.removeChild(pill);

            if(item.isSelected) {
                item.deselect();
            }
        }
    }

    #getPillForItem(item) {
        for(let pill of this.#pills) {
            let pillItem = this.#pillToObjectMap.get(pill);

            if(pillItem === item) {
                return pill;
            }
        }

        return null;
    }

    get noItemsFoundMessageContainer() {
        return this.#noItemsFoundMessageContainer;
    }

    get missingText() {
        return this.#noItemsFoundMessageContainer.innerHTML;
    }

    set missingText(value) {
        this.#noItemsFoundMessageContainer.innerHTML = value;
    }
}