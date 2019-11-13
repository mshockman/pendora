import MenuItem, {AbstractMenuItem} from "./MenuItem";
import Menu, {AbstractMenu} from "./Menu";
import AutoLoader from "autoloader";
import * as positioners from "./positioners";
import {getMenuInstance} from "./utility";
import {parseHTML, emptyElement, parseBoolean} from "core/utility";
import {inherit} from "./decorators";
import Attribute, {DROP, TRUE} from "core/attributes";


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
        this.position = "inherit";

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


export class SelectDropDown extends AbstractMenuItem {
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
        this.position = positioners.DROPDOWN;
        this.clearSubItemsOnHover = false;
        this.widget = widget;

        this.element.classList.add('select');
        this.element.tabIndex = 0;

        this.registerTopics();
        this.parseDOM();
        this.init();
    }

    isSelect() {
        return true;
    }

    registerTopics() {
        super.registerTopics();

        this.on('option.select', () => {
            this.renderLabels();
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

            fragment.appendChild(li);
        }

        output.appendChild(fragment);

        if(this.widget) this.widget.setValue(this.getValue());
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
        return this.submenu.selection;
    }

    render(context) {
        let html = `
        <article class="dropdown select">
            <ul class="selection"></ul>
            <ul class="menu hidden" data-role="menu">
                <li data-role="menuitem" class="menuitem" data-value="1"><a href="#">Item #1</a></li>
                <li data-role="menuitem" class="menuitem" data-value="2"><a href="#">Item #2</a></li>
                <li data-role="menuitem" class="menuitem" data-value="3"><a href="#">Item #3</a></li>
                <li data-role="menuitem" class="menuitem" data-value="4"><a href="#">Item #4</a></li>
                <li data-role="menuitem" class="menuitem" data-value="5"><a href="#">Item #5</a></li>
            </ul>
        </article>
        `;

        let fragment = parseHTML(html);
        return fragment.children[0];
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
            // todo create new select instance from select html element.
        } else {
            return super.FromHTML(element);
        }
    }
}


AutoLoader.register('select', (element) => SelectDropDown.FromHTML(element));
