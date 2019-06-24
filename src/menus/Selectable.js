import AutoLoader from 'autoloader';
import {getMenuItem} from "./core";
import {emptyElement} from "core/utility";
import {privateCache} from "core/data";


export function defaultPillFactory(item) {
    let pill = document.createElement('div'),
        exit = document.createElement('div'),
        label = item.buttonElement.textContent,
        text = document.createTextNode(label);

    privateCache.set(pill, 'item', item);

    pill.classList.add('c-pill-label');
    exit.classList.add('c-pill-label__deselect');
    exit.classList.add('js-prevent-item-action');

    exit.addEventListener('click', () => {
        item.deselect();
        pill.parentElement.removeChild(pill);
    });

    exit.appendChild(document.createTextNode('X'));

    pill.appendChild(exit);
    pill.appendChild(text);

    return pill;
}


/**
 * Turns a MenuItem or DropDown into a select like component that displays what items have been selected.
 */
export default class Selectable {
    constructor(item, {displayType='csv', delimiter=', ', pillFactory=defaultPillFactory, placeholder=''}={}) {
        this.item = item;
        this.item.selectController = this;
        this.placeholder = placeholder;

        if(displayType === 'csv') {
            this._onSelect = () => {
                let labels = this.getLabels().join(delimiter),
                    textNode,
                    button = this.item.buttonElement;

                if(labels) {
                    textNode = document.createTextNode(labels);
                    button.classList.remove('placeholder');
                } else {
                    textNode = document.createTextNode(this.placeholder);
                    button.classList.add('placeholder');
                }

                emptyElement(button);
                button.appendChild(textNode);
            };
        } else if(displayType === 'pill') {
            this._onSelect = () => {
                let selected = this.getSelectedChildren(),
                    button = this.item.buttonElement;

                emptyElement(button);

                if(selected.length) {
                    button.classList.remove('placeholder');

                    for(let child of selected) {
                        let pill = pillFactory(child);
                        button.appendChild(pill);
                    }
                } else {
                    button.classList.add('placeholder');
                    button.appendChild(document.createTextNode(this.placeholder));
                }
            };
        }

        this.item.on('item-select', this._onSelect);
        this.item.on('item-deselect', this._onSelect);

        this._onSelect();
    }

    getLabels() {
        let r = [];

        for(let child of this.getSelectedChildren()) {
            r.push(child.buttonElement.textContent);
        }

        return r;
    }

    getSelectedChildren() {
        return this.item.submenu.getSelectedChildren();
    }
}


AutoLoader.register('selectable', (element) => {
    let display = element.dataset.selectDisplayType || 'csv',
        delimiter = element.dataset.delimiter || ', ',
        placeholder = element.dataset.placeholder || '';

    let item = getMenuItem(element);
    new Selectable(item, {
        displayType: display,
        delimiter: delimiter,
        placeholder: placeholder
    });
});
