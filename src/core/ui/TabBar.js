import Component from "../Component";
import autoloader from "../../autoloader";


export default class TabBar extends Component {
    #onClass;
    #offClass;
    #openClass;
    #closeClass;

    constructor(element, {onClass="active", offClass=null, openClass="open", closeClass=null}={}) {
        if(!element) {
            element = document.createElement('div');
        }

        super(element);

        this.#onClass = onClass;
        this.#offClass = offClass;
        this.#openClass = openClass;
        this.#closeClass = closeClass;

        this.element.classList.add('tab-bar');

        this.element.addEventListener('click', event => {
            let tab = event.target.closest("[data-tab]");

            if(tab && this.element.contains(tab)) {
                this.activateTab(tab);
            }
        });
    }

    getTabs() {
        return this.element.querySelectorAll("[data-tab]");
    }

    getActiveTab() {
        return this.element.querySelector(`[data-tab].${this.#onClass}`);
    }

    activateTab(tab) {
        let current = this.getActiveTab();

        if(current !== tab) {
            this.deactivateTab(current);

            let target = document.querySelector(tab.dataset.tab);

            if(target) {
                target.classList.add(this.#openClass);
                if (this.#closeClass) target.classList.remove(this.#closeClass);
            }

            tab.classList.add(this.#onClass);
            if(this.#offClass) tab.classList.remove(this.#offClass);
        }
    }

    deactivateTab(tab) {
        let target = document.querySelector(tab.dataset.tab);

        if(target) {
            target.classList.remove(this.#openClass);
            if (this.#closeClass) target.classList.add(this.#closeClass);
        }

        tab.classList.remove(this.#onClass);
        if(this.#offClass) tab.classList.add(this.#offClass);
    }
}


autoloader.register('tab-bar', element => {
    return new TabBar(element);
});
