import Publisher from "../core/Publisher";
import {addClasses, removeClasses, selectElement} from "../core/utility/dom";

/**
 * Compares if the item innerText matches the value with case insensitive matching.
 * @param item
 * @param value
 * @returns {boolean}
 */
export function innerTextCompare(item, value) {
    value = value.trim().toLowerCase();

    // If value is empty clear the filter.
    if(!value) {
        return true;
    }

    return item.innerText.toLowerCase().indexOf(value) !== -1;
}

/**
 * A component that filters items in a container by an the input value of the text field.
 */
export default class ItemFilter extends Publisher {
    constructor({element, target, items=".filter-item", compareFunction=innerTextCompare, onHide="hidden", onShow=null, delay=500, placeholder="", tabindex=0}={}) {
        super();

        if(element) {
            this.element = selectElement(element);
            this.input = this.element.querySelector('input[type="text"], [data-filter-input]');
        } else {
            this.element = document.createElement('div');
            this.input = document.createElement("input");
            this.input.placeholder = placeholder;
            this.element.appendChild(this.input);
            this.input.classList.add("item-filter__input");
            this.input.tabIndex = tabindex;
        }

        this.target = target;
        this.items = items;
        this.compareFunction = compareFunction;
        this.onHide = onHide;
        this.onShow = onShow;
        this.delay = delay;

        this.element.classList.add("item-filter");

        let timer;

        this.element.addEventListener('input', event => {
            if(timer) {
                clearTimeout(timer);
                timer = null;
            }

            setTimeout(() => {
                let value = this.input.value,
                    allItemsHidden = true;

                for(let item of this.getFilterItems()) {
                    if(this.compareFunction(item, value)) {
                        this._showItem(item);
                        allItemsHidden = false;
                    } else {
                        this._hideItem(item);
                    }
                }

                this.publish('filter-change', {
                    filter: this,
                    allItemsFiltered: allItemsHidden
                });
            }, this.delay);
        });
    }

    /**
     * Shows the item.
     * @param item
     * @private
     */
    _showItem(item) {
        if(typeof this.onHide === 'string') {
            removeClasses(item, this.onHide);
        }

        if(this.onShow) {
            if(typeof this.onShow === 'function') {
                this.onShow(item);
            } else if(typeof this.onShow === 'string') {
                addClasses(item, this.onShow);
            }
        }
    }

    /**
     * Hides the item.
     * @param item
     * @private
     */
    _hideItem(item) {
        if(typeof this.onShow === 'string') {
            removeClasses(item, this.onShow);
        }

        if(this.onHide) {
            if(typeof this.onHide === 'function') {
                this.onHide(item);
            } else if(typeof this.onHide === 'string') {
                addClasses(item, this.onHide);
            }
        }
    }

    /**
     * Returns a list of the filterable items.
     * @returns {NodeListOf<HTMLElementTagNameMap[string]> | NodeListOf<Element> | NodeListOf<SVGElementTagNameMap[string]>}
     */
    getFilterItems() {
        let target,
            items;

        if(typeof this.target === 'function') {
            target = this.target();
        } else if(typeof this.target === 'string') {
            target = document.querySelector(this.target);
        } else {
            target = this.target;
        }

        if(typeof this.items === 'function') {
            items = this.items(target);
        } else {
            items = target.querySelectorAll(this.items);
        }

        return items;
    }

    clear() {
        this.input.value = "";

        for(let item of this.getFilterItems()) {
            this._showItem(item);
        }

        this.publish('filter-change', {
            filter: this,
            allItemsFiltered: false
        });
    }

    /**
     * Appends the widget to the element.
     * @param element
     */
    appendTo(element) {
        if(typeof element === 'string') {
            document.querySelector(element).appendChild(this.element);
        } else if(element.appendChild) {
            element.appendChild(this.element);
        } else if(element.append) {
            element.append(this.element);
        }
    }

    /**
     * Removes the widget from the dom.
     * @returns {Element|Document|DocumentFragment|HTMLDivElement}
     */
    remove() {
        return this.element.parentElement.removeChild(this.element);
    }

    focus() {
        this.input.focus();
    }

    blur() {
        this.input.blur();
    }

    isFocused() {
        return document.activeElement === this.input;
    }
}
