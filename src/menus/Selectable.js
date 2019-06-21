import AutoLoader from 'autoloader';
import {getMenuItem} from "./core";
import {emptyElement} from "core/utility";


export default class Selectable {
    constructor(item, {displayType='csv', delimiter=', ', pillFactory=null, placeholder=null}={}) {
        this.item = item;
        this.item.selectController = this;

        if(displayType === 'csv') {
            this._onSelect = () => {
                let textNode = document.createTextNode(this.getLabels().join(delimiter)),
                    button = this.item.buttonElement;

                emptyElement(button);
                button.appendChild(textNode);
            };
        }

        this.item.on('item-select', this._onSelect);
        this.item.on('item-deselect', this._onSelect);
    }

    getLabels() {
        let r = [];

        for(let child of this.item.submenu.getSelectedChildren()) {
            r.push(child.buttonElement.textContent);
        }

        return r;
    }
}


AutoLoader.register('selectable', (element) => {
    let item = getMenuItem(element);
    new Selectable(item);
});
