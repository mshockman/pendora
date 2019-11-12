import MenuItem, {AbstractMenuItem} from "./MenuItem";
import Menu, {AbstractMenu} from "./Menu";
import AutoLoader from "autoloader";
import * as positioners from "./positioners";
import {getMenuInstance} from "./utility";
import {parseHTML, emptyElement} from "core/utility";


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

        this.autoDeactivateItems = false;

        this.registerTopics();
        this.parseDOM();
    }

    render({text, value}) {
        let html = `<li data-role="menuitem" class="menuitem" data-value="${value}"><a>${text}</a></li>`,
            fragment = parseHTML(html);

        return fragment.children[0];
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
}


export class SelectMenu extends AbstractMenu {
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
        this.openOnHover = false;
        this.multiple = false;
        this.toggle = "on";
        this.closeOnSelect = true;
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


export class SelectDropDown extends AbstractMenuItem {
    constructor({target, options=null, multiple=false, timeout=false, id=null, classes=null}={}) {
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
        this.closeOnSelect = true;
        this.closeOnBlur = true;
        this.timeout = timeout;
        this.multiple = multiple;
        this.MenuItemClass = SelectOption;
        this.SubMenuClass = SelectMenu;
        this.position = positioners.DROPDOWN;
        this.clearSubItemsOnHover = false;

        this.registerTopics();
        this.parseDOM();
        this.init();
    }

    registerTopics() {
        super.registerTopics();

        this.on('option.selected', (topic) => {
            topic.target.isSelected = true;

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
        let html = `
        <article class="dropdown">
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

    get multiple() {
        return this._props.multiple;
    }

    set multiple(value) {
        value = !!value;

        if(value !== this.multiple) {
            this._props.multiple = value;

            if(value) {
                this.element.classList.add('multiple');
            } else {
                this.element.classList.remove('multiple');
            }
        }
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
