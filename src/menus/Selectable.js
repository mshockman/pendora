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
    constructor(item, {displayType='csv', delimiter=', ', maxItems=3, pillFactory=defaultPillFactory, placeholder=''}={}) {
        this.item = item;
        this.item.selectController = this;
        this.placeholder = placeholder;
        this.maxItems = maxItems;

        if(displayType === 'csv') {
            this._onSelect = () => {
                let labels = this.getLabels(),
                    textNode,
                    button = this.item.buttonElement;

                if(labels.length <= this.maxItems) {
                    if (labels) {
                        textNode = document.createTextNode(labels.join(delimiter));
                        button.classList.remove('placeholder');
                    } else {
                        textNode = document.createTextNode(this.placeholder);
                        button.classList.add('placeholder');
                    }
                } else {
                    if(labels.length !== 1) {
                        textNode = document.createTextNode(`${labels.length} Items Selected`)
                    } else {
                        textNode = document.createTextNode('1 Item Selected');
                    }
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
    let options = {};

    options.delimiter = element.dataset.delimiter || ', ';
    options.placeholder = element.dataset.placeholder || '';
    options.displayType = element.dataset.selectDisplayType || 'csv';

    if(element.dataset.maxItems) {
        options.maxItems = parseInt(element.dataset.maxItems, 10);
    }

    let item = getMenuItem(element);
    new Selectable(item, options);
});
