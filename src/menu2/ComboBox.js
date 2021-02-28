import {RichSelect} from "./SelectMenu";
import Timer from "../core/utility/timers";


export default class ComboBox extends RichSelect {
    #noItemsFoundMessageContainer;

    constructor({placeholder="Please Select An Item", widget=null}={}) {
        super({placeholder, widget, multiple: false, closeOnSelect: true});

        this.toggle = false;

        this.textContainer.removeAttribute("readonly");

        this.textContainer.addEventListener("blur", event => {
            Timer.forceSetTargetTimeout(this, "blur", () => {
                let selection = this.getSelection();
                this.textContainer.value = selection.map(item => item.text.toString()).join(this.join);
                this.submenu.filter(null);
            }, 100);
        });

        this.element.addEventListener("click", event => {
            if(!this.submenu.element.contains(event.target) && !this.getDisabled()) {
                this.textContainer.focus();
            }
        });

        this.textContainer.addEventListener("focus", event => {
            if(!this.getDisabled()) return;

            Timer.clearTargetTimer(this, "blur");

            if(!this.isActive) {
                this.activate();
            }
        });

        this.textContainer.addEventListener("keyup", event => this.onKeyUpEvent(event));

        this.element.classList.add("combo-box");

        this.#noItemsFoundMessageContainer = document.createElement("div");
        this.#noItemsFoundMessageContainer.className = "no-items-found-body";
        this.missingText = "No Items Found.";
        this.submenu.body.parentElement.insertBefore(this.#noItemsFoundMessageContainer, this.submenu.body);
    }

    onKeyUpEvent(event) {
        if(!this.isActive) {
            this.activate();
        }

        Timer.forceSetTargetTimeout(this, "filter", () => {
            let value = this.textContainer.value.toLowerCase().trim();

            if(!value) {
                this.submenu.filter(null);
            } else {
                this.submenu.filter(item => item.text.toLowerCase().trim().includes(value));
            }
        }, 250);
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
