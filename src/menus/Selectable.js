import AutoLoader from 'autoloader';
import Menu from './Menu';
import {Attribute} from 'core/attributes';
import {parseBoolean} from 'core/utility';


export class Selectable {
    constructor(target, {multiple=true, selectOn='click', deselectOn="ctrl-click", multiSelectOn="ctrl-click", rangeSelectOn="shift-click"}={}) {
        if(typeof target === 'string') {
            this.element = document.querySelector(target);
        } else {
            this.element = target;
        }

        this.inputContainer = document.createElement('div');
        this.element.appendChild(this.inputContainer);

        this.multiple = multiple;
        this.deselectOn = deselectOn;
        this.multiSelectOn = multiSelectOn;
        this.rangeSelectOn = rangeSelectOn;
        this.selectOn = selectOn;

        this._lastItemSelected = null;

        this._onClick = this.onClick.bind(this);
        this.element.addEventListener('click', this._onClick);
    }

    onClick(event) {
        let item = event.target.closest('.c-menuitem'),
            isItemSelected = item.classList.contains('selected');

        if(item && this.element.contains(item)) {
            if(this.multiple && event.shiftKey) {
                if(!this._lastItemSelected) {
                    this.selectItem(item, true);
                } else {
                    let items = this.getItems(),
                        from = items.indexOf(this._lastItemSelected),
                        to = items.indexOf(item);

                    if(from > to) {
                        [to, from] = [from, to];
                    }

                    for(let i = from; i <= to; i++) {
                        this.selectItem(items[i], true);
                    }
                }
            } else if(!isItemSelected) {
                this.selectItem(item, this.multiple && event.ctrlKey);
            } else {
                if(this.multiple) {
                    if(event.ctrlKey) {
                        this.deselectItem(item);
                    } else {
                        this.selectItem(item, false);
                    }
                } else {

                }
            }
        }
    }

    selectItem(item, multiple=false) {
        if(!multiple) {
            for (let selectedItem of this.getSelectedItems()) {
                if (selectedItem !== item) {
                    this.deselectItem(selectedItem);
                }
            }
        }

        item.classList.add('selected');
        this._lastItemSelected = item;
        this._onChange();
    }

    deselectItem(item) {
        item.classList.remove('selected');
        this._lastItemSelected = null;
        this._onChange();
    }

    getItems() {
        return Array.prototype.slice.call(this.element.querySelectorAll('.c-menuitem'));
    }

    getSelectedItems() {
        return Array.prototype.slice.call(this.element.querySelectorAll('.c-menuitem.selected'));
    }

    _onChange() {
        let event = new CustomEvent('selection-change', {
            bubbles: true,
            detail: {
                selectable: this
            }
        });

        this.element.dispatchEvent(event);
    }

    getValue() {
        let r = [];

        for(let item of this.getSelectedItems()) {
            if(item.dataset.value) {
                r.push(item.dataset.value);
            }
        }

        return r;
    }

    setValue(value) {
        for(let child of this.getSelectedItems()) {
            child.classList.remove('selected');
        }

        let children = this.getItems();

        for(let val of value) {
            let child = children.find((item) => item.dataset.value === val);

            if(child) {
                child.classList.add('selected');
            }
        }
    }

    static isSelected(item) {
        return item.classList.contains('selected');
    }
}


export class SelectMenu extends Menu {
    constructor({multiple=false, selectOn='click', deselectOn="ctrl-click", multiSelectOn="ctrl-click", rangeSelectOn="shift-click", ...kwargs}) {
        super({multiple, ...kwargs});
        this.selectable = new Selectable(this.element, {multiple, selectOn, deselectOn, multiSelectOn, rangeSelectOn});
    }
}


AutoLoader.register('selectable', (element) => {
    let options = {};

    if(element.dataset.multiple) {
        options.multiple = element.dataset.multiple === true;
    }

    if(element.dataset.deselectOn) {
        options.deselectOn = element.dataset.deselectOn;
    }

    if(element.dataset.multiSelectOn) {
        options.multiSelectOn = element.dataset.multiSelectOn;
    }

    if(element.dataset.rangeSelectOn) {
        options.rangeSelectOn = element.dataset.rangeSelectOn;
    }

    if(element.dataset.selectOn) {
        options.selectOn = element.dataset.selectOn;
    }

    return new Selectable(element, options);
});



AutoLoader.register('select-menu', (element) => {
    let options = Attribute.deserialize(element.dataset, {
        multiple: new Attribute(parseBoolean, false, null),
        deselectOn: null,
        multiSelectOn: null,
        rangeSelectOn: null,
        selectOn: null
    });

    return new SelectMenu({target: element, ...options});
});
