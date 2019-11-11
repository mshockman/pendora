import MenuItem from "./MenuItem";
import Menu from "./Menu";
import AutoLoader from "autoloader";
import * as positioners from "./positioners";
import {getMenuInstance} from "./utility";


export class SelectMenu extends Menu {
    constructor(options) {
        super(options);
        this.isSelectMenu = true;

        this.on('menuitem.selected', topic => {
            let item = topic.target;

            if(item.element.classList.contains('selected')) {
                // item.element.classList.remove('selected');
            } else {
                if(!this.multiple) {
                    for (let node of this.element.querySelectorAll('.selected')) {
                        let instance = getMenuInstance(node);

                        if (instance && instance !== item) {
                            instance.element.classList.remove('selected');
                            this.dispatchTopic('option.deselected', {target: instance, menu: this});
                        }
                    }
                }

                item.element.classList.add('selected');

                if(!item.isActive) {
                    item.activate();
                }

                this.dispatchTopic('option.selected', {target: item, menu: this});
            }
        });

        this.on('menu.show', menu => {
            for(let child of menu.children) {
                if(child.element.classList.contains('selected') && !child.isActive) {
                    child.activate();
                }
            }
        });
    }
}


export class SelectDropDown extends MenuItem {
    constructor({toggle="both", widget=null, closeOnSelect=true, closeOnBlur=true, ...options}) {
        super({toggle, closeOnSelect, closeOnBlur, ...options});
        this.position = positioners.dropdown();
        this.isSelectItem = true;
        this.widget = widget;
        this.SubMenuClass = SelectMenu;
        this.init();

        this.on('option.selected', topic => {
            this.button.innerHTML = topic.target.button.innerHTML;

            if(this.widget) {
                this.widget.setValue(this.getValue());
            }
        });
    }

    get button() {
        return Array.prototype.find.call(this.element.children, node => node.matches('.selection'));
    }

    getValue() {
        let r = [];

        for(let item of this.selection) {
            r.push(item.value);
        }

        if(this.multiple) {
            return r;
        } else {
            return r[0];
        }
    }

    get selection() {
        let r = [];

        for(let node of this.element.querySelectorAll('.selected')) {
            let instance = getMenuInstance(node);
            if(instance) r.push(instance);
        }

        return r;
    }

    render(context) {

    }
}


AutoLoader.register('select', (element) => SelectDropDown.FromHTML(element));
