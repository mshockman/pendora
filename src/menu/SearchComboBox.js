import {ComboBox} from "./Select2";


export default class SearchComboBox extends ComboBox {
    #delay;
    #findFunction;

    constructor({find, delay=250}) {
        super();

        this.element.classList.add('search-box');
        this.closeOnSelect = false;
        this.#delay = delay;
        this.#findFunction = find;

        this.on("menuitem.select", topic => {
            this.publish("option.select", {...topic});
            this.textbox.value = "";
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

    initFilter() {
        let timer = null;

        let applyFilter= () => {
            timer = null;

            this.#findFunction(this.getFilterValue()).then((options) => {
                if(options !== null) {
                    this.clearOptions();

                    if(options.length) {
                        for (let option of options) {
                            this.append(option);
                        }

                        this.activateSelectedItemOrFirst();
                    }

                    if(!this.isActive) {
                        this.activate();
                    }
                }
            });
        };

        let onInput = () => {
            if(timer) {
                clearTimeout(timer);
                timer = null;
            }

            if(this.#delay === false || this.#delay < 0) {
                applyFilter();
            } else {
                timer = setTimeout(applyFilter, this.#delay);
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
}