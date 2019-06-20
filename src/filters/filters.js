import {addClasses, getPropertyByPath} from "../core/utility";
import {debounce} from "../core/debounce";
import Observable from "../core/interface/Observable";
import AutoLoader from "autoloader";


export class TextFilter extends Observable {
    constructor({target, label, name, placeholder, id, classNames, wait=500}) {
        super();

        if(!target) {
            this.element = document.createElement('input');
            this.element.type = 'text';

            if(placeholder) this.element.placeholder = placeholder;
            if(id) this.element.id = id;
            if(classNames) addClasses(this.element, classNames);
        } else {
            if(typeof target === 'string') {
                this.element = document.querySelector(target);
            } else {
                this.element = target;
            }
        }

        this.label = label;
        if(name) this.name = name;
        this.placeholder = placeholder;
        this.onFilter = null;

        this._onKeyUp = debounce((event) => {
            this.onKeyUp(event);
        }, wait);

        this.element.addEventListener('keyup', this._onKeyUp);
    }

    onKeyUp() {
        this.trigger('filter-change', {
            target: this,
            value: this.value,
            name: this.name
        });

        if(this.onFilter) {
            this.onFilter({
                target: this,
                value: this.value,
                name: this.name
            });
        }
    }

    get value() {
        return this.element.value;
    }

    set value(value) {
        this.element.value = value;
    }

    get name() {
        return this.element.name;
    }

    set name(value) {
        this.element.name = value;
    }

    /**
     * Builds a widget that will filter selected dom elements on the page by toggling their display on and off.
     *
     * You select what elements are the page are being filtered by passing a query selector to the `filtered` parameter.
     *
     * The `child` parameter can be used to optionally select a sub element that the filtered property is read from.
     * If not set then the filtered element is used.
     *
     * `method` determines how the key is looked up on the element.  'property' uses getPropertyByPath function to lookup
     * the property on the element.  'attribute' uses the getAttribute method to lookup the elements attribute.
     *
     * `key` the name of the attribute or property that is being filtered by.
     *
     * `caseInsensitive` if true a case insensitive matching will be used.
     *
     * `target` The text element that is used as the widget.  If not set then a new text element will be created.
     *
     * @param target
     * @param caseInsensitive
     * @param child
     * @param key
     * @param method
     * @param filter
     * @returns {TextFilter}
     * @constructor
     */
    static BuildDomSearch({target, caseInsensitive, child, key='innerText', method="property", filter}) {
        let fn,
            textFilter = new this({target});

        fn = (element, filterValue) => {
            let value;

            if(method === 'property') {
                value = ''+getPropertyByPath(element, key);
            } else {
                value = ''+element.getAttribute(key);
            }

            if(caseInsensitive) {
                value = value.toLowerCase();
                filterValue = filterValue.toLowerCase();
            }

            return value.indexOf(filterValue) !== -1;
        };

        textFilter.onFilter = (event) => {
            for(let element of document.querySelectorAll(filter)) {
                let target = element;

                if(child) {
                    target = target.querySelector(child);
                }

                if(fn(target, event.value)) {
                    element.style.display = "";
                } else {
                    element.style.display = "none";
                }
            }
        };

        return textFilter;
    }
}


AutoLoader.register('search-filter', (element) => {
    let filter = element.dataset.filter,
        key = element.dataset.filterProperty || 'innerText',
        method = element.dataset.filterMethod || 'property',
        child = element.dataset.filterChild,
        caseInsensitive = (element.dataset.filterCaseInsensitive || 'true') === 'true';

    return TextFilter.BuildDomSearch({target: element, filter, key, method, child, caseInsensitive});
});
