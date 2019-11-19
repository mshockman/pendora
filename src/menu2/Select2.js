import {AbstractMenuItem} from "./MenuItem";
import Menu, {AbstractMenu} from "./Menu";
import AutoLoader from "autoloader";
import * as positioners from "./positioners";
import {getMenuInstance} from "./utility";
import {parseHTML, emptyElement, parseBoolean} from "core/utility";
import {inherit} from "./decorators";
import Attribute, {DROP, TRUE} from "core/attributes";
import {SelectInputWidget, HiddenInputWidget} from "../forms/";


export class SelectOption extends AbstractMenuItem {
    constructor({target, text, value, id=null, classes=null}={}) {
        super();

        if(target) {
            this.element = target;
        } else {
            this.element = this.render({text, value});
        }

        this.element.setAttribute('aria-role', 'option');

        if(classes) {
            this.addClass(classes);
        }

        if(id) {
            this.element.id = id;
        }

        this.toggle = "both";
        this.autoActivate = true;
        this.openOnHover = true;
        this.delay = 0;
        this.closeOnSelect = false;
        this.closeOnBlur = false;
        this.timeout = false;
        this.clearSubItemsOnHover = true;

        this.MenuItemClass = SelectOption;
        this.SubMenuClass = Menu;

        this.autoDeactivateItems = "auto";

        this.element.classList.add("option");

        this.registerTopics();
        this.parseDOM();
    }

    render({text, value}) {
        let html = `<li data-role="menuitem" class="menuitem" data-value="${value}"><a>${text}</a></li>`,
            fragment = parseHTML(html);

        return fragment.children[0];
    }

    onClick(event) {
        let isDisabled = this.getDisabled();

        if(isDisabled) {
            event.preventDefault();
            return;
        }

        if(event.target !== this) return;
        let parent = this.parent;

        if(!this.isSelected) {
            this.select();
        } else if(this.isSelected && parent.multiSelect) {
            this.deselect();
        }
    }

    select() {
        if(this.isSelected) return;

        if(!this.multiSelect) {
            for (let node of this.element.querySelectorAll('.selected')) {
                let instance = getMenuInstance(node);

                if (instance && instance !== this) {
                    instance.deselect();
                }
            }
        }

        this.isSelected = true;

        if(!this.isActive) {
            this.activate();
        }

        this.dispatchTopic('option.select', {target: this, menu: this});
    }

    deselect() {
        if(!this.isSelected) return;
        this.isSelected = false;
        if(this.isActive) this.deactivate();
        this.dispatchTopic('option.deselect', {target: this, menu: this});
    }

    get isSelected() {
        return this.element.classList.contains('selected');
    }

    set isSelected(value) {
        value = !!value;

        if(value !== this.isSelected) {
            if(value) {
                this.element.classList.add('selected');
            } else {
                this.element.classList.remove('selected');
            }
        }
    }

    get value() {
        return this.element.dataset.value;
    }

    set value(value) {
        this.element.dataset.value = value;
    }

    get text() {
        return this.button.innerText.trim();
    }

    set text(value) {
        this.button.innerText = (value+"").trim();
    }

    get parentSelect() {
        let o = this.parent;

        while(o) {
            if(o.isSelect && o.isSelect()) {
                return o;
            }

            o = o.parent;
        }

        return null;
    }

    get autoDeactivateItems() {
        if(this._props.autoDeactivateItems === 'auto') {
            let parent = this.parentSelect;
            return !!(parent && parent.multiSelect);
        } else {
            return this._props.autoDeactivateItems;
        }
    }

    set autoDeactivateItems(value) {
        this._props.autoDeactivateItems = value;
    }
}


export class SelectMenu extends AbstractMenu {
    @inherit multiSelect;

    constructor({target, id=null, classes=null, ...context}={}) {
        super();
        this.isSelectMenu = true;
        this.MenuItemClass = SelectOption;

        if(target) {
            this.element = target;
        } else {
            this.element = this.render(context);
        }

        this.closeOnBlur = false;
        this.timeout = false;
        this.autoActivate = true;
        this.multiActive = false;
        this.openOnHover = false;
        this.multiSelect = "inherit";
        this.closeOnSelect = false;
        this.delay = 0;
        this.positioner = "inherit";

        this.registerTopics();
        this.parseDOM();
        this.init();
    }

    render({arrow=false}={}) {
        let html = `
            <div class="menu">
                ${arrow ? `<div class="menu__arrow"></div>` : ""}
                <div class="menu__body"></div>
            </div>
        `;

        let fragment = parseHTML(html);
        return fragment.children[0];
    }

    registerTopics() {
        super.registerTopics();

        this.on('menu.show', menu => {
            if(!this.multiSelect) {
                for (let child of menu.children) {
                    if (child.element.classList.contains('selected') && !child.isActive) {
                        child.activate();
                    }
                }
            }
        });

        this.on('option.select', topic => {
            if(!this.multiSelect) {
                for(let item of this.selection) {
                    if(item !== topic.target) {
                        item.deselect();
                    }
                }
            }

            if(this.closeOnSelect && this.isActive) {
                this.deactivate();
            }
        });
    }

    get selection() {
        let r = [];

        for(let item of this.children) {
            if(item.isSelected) {
                r.push(item);
            }
        }

        return r;
    }
}


/**
 * @implements FormWidgetBase
 */
export class Select2 extends AbstractMenuItem {
    static __attributes__ = {
        multiSelect: new Attribute(parseBoolean, DROP, TRUE),
        ...AbstractMenuItem.__attributes__
    };

    constructor({target, options=null, multiSelect=false, timeout=false, id=null, classes=null, widget=null}={}) {
        super();

        if(target) {
            this.element = target;
        } else {
            this.element = this.render();
        }

        if(classes) {
            this.addClass(classes);
        }

        if(id) {
            this.element.id = id;
        }

        this.toggle = "both";
        this.autoActivate = false;
        this.openOnHover = false;
        this.delay = false;
        this.closeOnSelect = "auto";
        this.closeOnBlur = true;
        this.timeout = timeout;
        this.multiSelect = multiSelect;
        this.MenuItemClass = SelectOption;
        this.SubMenuClass = SelectMenu;
        this.positioner = positioners.DROPDOWN;
        this.clearSubItemsOnHover = false;
        this.labelMap = new WeakMap();

        this.element.classList.add('select');
        this.element.tabIndex = 0;

        this.registerTopics();
        this.parseDOM();

        if(widget) {
            this.widget = widget;
        } else {
            this.widget = new HiddenInputWidget();
            this.widget.appendTo(this.element);
        }

        if(!this.submenu) {
            let submenu = new SelectMenu();
            submenu.isVisible = false;
            this.attachSubMenu(submenu);
        }

        this.init();
    }

    isSelect() {
        return true;
    }

    registerTopics() {
        super.registerTopics();

        this.on('option.select', () => {
            this.renderLabels();

            if(this.closeOnSelect === true && this.isActive) {
                this.deactivate();
            }
        });

        this.on('option.deselect', () => {
            this.renderLabels();
        });
    }

    renderLabels() {
        let output = this.button,
            selection = this.selection,
            fragment = document.createDocumentFragment();

        emptyElement(output);

        for(let item of selection) {
            let li = document.createElement('li'),
                exitButton = document.createElement('div'),
                span = document.createElement('span');

            li.className = "choice";
            exitButton.className = "exit-button";
            span.innerText = item.text;

            li.appendChild(exitButton);
            li.appendChild(span);
            this.labelMap.set(li, item);

            fragment.appendChild(li);
        }

        output.appendChild(fragment);

        if(this.widget) this.widget.setValue(this._getSelectedValues());
    }

    append(option) {
        this.submenu.append(option);
    }

    get button() {
        return Array.prototype.find.call(this.element.children, node => node.matches('.selection'));
    }

    _getSelectedValues() {
        let r = [];

        for(let item of this.selection) {
            r.push(item.value);
        }

        if(this.multiSelect) {
            return r;
        } else {
            return r[0];
        }
    }

    getValue() {
        return this.widget.getValue();
    }

    setValue(value) {

    }

    getName() {
        return this.widget.getName();
    }

    setName(name) {
        this.widget.setName(name);
    }

    get selection() {
        return this.submenu.selection;
    }

    render(context) {
        let html = `
        <article class="dropdown select">
            <ul class="selection"></ul>
        </article>
        `;

        let fragment = parseHTML(html);
        return fragment.children[0];
    }

    onClick(topic) {
        let event = topic.originalEvent;

        if(topic.target === this && event.target.closest('.exit-button')) {
            let li = event.target.closest('li'),
                item = this.labelMap.get(li);

            item.deselect();
        } else {
            return super.onClick(topic);
        }
    }

    get multiSelect() {
        return this._props.multiSelect;
    }

    set multiSelect(value) {
        value = !!value;

        if(value !== this.multiSelect) {
            this._props.multiSelect = value;

            if(value) {
                this.element.classList.add('multiple');
            } else {
                this.element.classList.remove('multiple');
            }
        }
    }

    get closeOnSelect() {
        if(this._props.closeOnSelect === "auto") {
            return !this.multiSelect;
        } else {
            return this._props.closeOnSelect;
        }
    }

    set closeOnSelect(value) {
        this._props.closeOnSelect = value;
    }

    static FromHTML(element) {
        if(typeof element === 'string') {
            element = document.querySelector(element);
        }

        if(element.nodeName === "SELECT") {
            // noinspection JSUnresolvedVariable
            let select = new Select2({
                multiSelect: element.multiple,
                widget: new SelectInputWidget(element, null, null, true)
            });

            for(let option of element.querySelectorAll('option')) {
                let item = new SelectOption({
                    text: option.innerText.trim(),
                    value: option.value
                });

                select.append(item);
            }

            element.replaceWith(select.element);
            select.element.appendChild(select.widget.element);
            return select;
        } else {
            return super.FromHTML(element);
        }
    }
}


AutoLoader.register('select', (element) => Select2.FromHTML(element));
