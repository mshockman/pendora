import MenuItem, {AbstractMenuItem} from "./MenuItem";
import Menu, {AbstractMenu} from "./Menu";
import AutoLoader from "autoloader";
import * as positioners from "./positioners";
import {getMenuInstance} from "./utility";
import {parseHTML, parseBoolean} from "core/utility";
import {inherit} from "./decorators";
import Attribute, {DROP, TRUE} from "core/attributes";
import {SelectInputWidget, HiddenInputWidget} from "../forms/";
import ItemFilter from "../ui/ItemFilter";


/**
 * The class SelectOption is used to construct an item contained in SelectMenu object.
 */
export class SelectOption extends AbstractMenuItem {
    constructor({target, text, value, id=null, classes=null}={}) {
        super();

        if(target) {
            this.element = target;
        } else {
            this.element = this.render({text, value});
        }

        this.textNode = this.element.querySelector('[data-text], button, a');
        if(!this.textNode) this.textNode = this.element;

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

    /**
     * Creates the dom elements for the SelectOption.
     * @param text
     * @param value
     * @returns {Element}
     */
    render({text, value}) {
        let html = `<li data-role="menuitem" class="menuitem" data-value="${value}"><a>${text}</a></li>`,
            fragment = parseHTML(html);

        return fragment.children[0];
    }

    /**
     * Handles mousedown events.
     *
     * @param event
     */
    onMouseDown(event) {
        let isDisabled = this.getDisabled();

        if(isDisabled) {
            event.preventDefault();
            return;
        }

        if(event.target !== this) return;
        let parent = this.parent;

        if(!this.isSelected) {
            this.select({event});
        } else if(this.isSelected && parent.multiSelect) {
            this.deselect({event});
        }
    }

    /**
     * Selects the options and publishes a [option.select] topic.
     *
     * @param topicData
     */
    select(topicData={}) {
        super.select();

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

        this.dispatchTopic('option.select', {target: this, menu: this, ...topicData});
    }

    /**
     * Deselect the SelectOption if it is selected and publishes an [option.deselect] topic.
     * @param topicData
     */
    deselect(topicData={}) {
        if(!this.isSelected) return;
        this.isSelected = false;
        if(this.isActive) this.deactivate();
        this.dispatchTopic('option.deselect', {target: this, menu: this, ...topicData});
    }

    /**
     * Returns true if the option is selected.
     * @returns {boolean}
     */
    get isSelected() {
        return this.element.classList.contains('selected');
    }

    /**
     * Sets the options selected state to true or false.
     * @param value
     */
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

    /**
     * Returns the options value.
     * @returns {string}
     */
    get value() {
        return this.element.dataset.value;
    }

    /**
     * Sets the options value.
     * @param value
     */
    set value(value) {
        this.element.dataset.value = value;
    }

    /**
     * Return the options inner html.
     * @returns {*}
     */
    get text() {
        return this.textNode.innerText.trim();
    }

    /**
     * Sets the options inner html.
     * @param value
     */
    set text(value) {
        this.textNode.innerText = (value+"").trim();
    }

    /**
     * Returns the options parent select menu or null.
     * @returns {null|{isSelect}|MenuNode}
     */
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


/**
 * Creates a menu that contains SelectOptions.
 */
export class SelectMenu extends AbstractMenu {
    @inherit multiSelect;

    constructor({target, id=null, classes=null, shiftSelect=true, ...context}={}) {
        super();
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
        this.shiftSelect = shiftSelect;

        this.element.classList.add('select-menu');

        this.registerTopics();
        this.parseDOM();
        this.init();
    }

    render({arrow=false}={}) {
        let html = `
            <div class="menu">
                ${arrow ? `<div class="menu__arrow"></div>` : ""}
                <div class="menu__header"></div>
                <section class="menu__body"></section>
                <div class="menu__footer"></div>
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
            // if(this.closeOnSelect && this.isActive) {
            //     this.deactivate();
            // }
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

    get selectedOptions() {
        return this.selection;
    }

    get options() {
        return this.children;
    }

    onMouseDown(topic) {
        let event = topic.originalEvent,
            target = topic.target,
            isDisabled = target.getDisabled();

        super.onMouseDown(topic);

        if(!isDisabled && target.parent === this && target.isMenuItem && target.isMenuItem() && this.multiSelect && this.shiftSelect) {
            if(event.shiftKey) {
                let lastTarget = this.lastTarget || target,
                    children = this.children,
                    lastIndex = children.indexOf(lastTarget),
                    targetIndex = children.indexOf(target),
                    start = Math.min(lastIndex, targetIndex),
                    end = Math.max(lastIndex, targetIndex);

                for(let i = 0; i < children.length; i++) {
                    let item = children[i];

                    if(i >= start && i <= end) {
                        if(!item.isSelected) {
                            item.select();
                        }
                    } else if(item.isSelected) {
                        item.deselect();
                    }
                }
            } else {
                this.lastTarget = target;
            }
        }
    }

    isSelectMenu() {
        return true;
    }
}


/**
 * A component that can be used as an alternative to the built in <select> element.
 * @implements FormWidgetBase
 */
export class Select2 extends AbstractMenuItem {
    static __attributes__ = {
        multiSelect: new Attribute(parseBoolean, DROP, TRUE),
        ...AbstractMenuItem.__attributes__
    };

    constructor({target, multiSelect=false, timeout=false, id=null, classes=null, widget=null, filter=false, placeholder="No Items Found"}={}) {
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
        this.labelToItemMap = new WeakMap();
        this.itemToLabelMap = new WeakMap();

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

        if(filter) {
            if(this.multiSelect) {
                this.filter = new ItemFilter({
                    items: () => {
                        let r = [];

                        for(let child of this.submenu.children) {
                            r.push(child.element);
                        }

                        return r;
                    },
                    tabindex: -1
                });

                let li = document.createElement('li');
                li.className = "select-filter-container";
                this.filter.appendTo(li);
                this.filter.wrapper = li;
                this.button.appendChild(li);
            } else {
                this.filter = new ItemFilter({
                    items: () => {
                        let r = [];

                        for(let child of this.submenu.children) {
                            r.push(child.element);
                        }

                        return r;
                    },

                    placeholder: "Filter"
                });

                this.filter.appendTo(this.submenu.element.querySelector('.menu__header'));
                this.submenu.element.classList.add('has-filter');
            }

            this.filter.on('filter-change', (topic) => {
                if(topic.allItemsFiltered) {
                    this.submenu.element.classList.add('all-items-filtered');
                } else {
                    this.submenu.element.classList.remove('all-items-filtered');
                }
            });

            if(placeholder) {
                let placeholderNode = document.createElement('li');
                placeholderNode.className = "placeholder";
                placeholderNode.innerHTML = placeholder;
                let body = this.submenu.getMenuBody();
                body = body[body.length-1];
                body.appendChild(placeholderNode);
            }

            this.addEventListener('keydown', event => {
                if(this.filter && event.key === 'Backspace') {
                    if(this.filter.isFocused() && this.filter.input.value !== "") {
                        return;
                    }

                    if(!this._isChoiceElement(document.activeElement)) {
                        let choices = this.getLabels();

                        if(choices.length) {
                            choices[choices.length-1].focus();
                        }
                    } else {
                        this.labelToItemMap.get(document.activeElement).deselect();
                        this.filter.focus();
                    }
                }
            });

            this.filter.input.addEventListener('focus', event => {
                this.element.classList.add('select-highlight');
            });

            this.filter.input.addEventListener('blur', event => {
                if(!this.element.contains(event.relatedTarget)) {
                    this.element.classList.remove('select-highlight');
                    if(this.isActive) this.deactivate();
                }
            });
        }

        this.addEventListener('focus', event => {
            if(this.filter) {
                this.filter.focus();
            }

            this.element.classList.add('select-highlight');
        });

        this.addEventListener('blur', event => {
            if(!this.element.contains(event.relatedTarget)) {
                if(this.isActive) this.deactivate();
                this.element.classList.remove('select-highlight');
            }
        });
    }

    activate(show=true) {
        if(!this.isActive) {
            let r = super.activate();

            if(this.filter) {
                this.filter.clear();

                if(!this.multiSelect || !this.element.contains(document.activeElement) || !document.activeElement.classList.contains('choice')) {
                    this.filter.focus();
                }
            }

            return r;
        }
    }

    deactivate() {
        if(this.isActive) {
            let r = super.deactivate();

            if(this.filter) {
                this.filter.clear();
                this.filter.blur();
            }

            return r;
        }
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
            fragment = document.createDocumentFragment();

        for(let item of this.options) {
            if(item.isSelected) {
                let pill = this.itemToLabelMap.get(item);

                if (!pill) {
                    pill = document.createElement('li');

                    let exitButton = document.createElement('div'),
                        span = document.createElement('span');

                    pill.className = "choice";
                    exitButton.className = "exit-button";
                    span.innerText = item.text;
                    if(this.multiSelect) pill.tabIndex = -1;

                    pill.appendChild(exitButton);
                    pill.appendChild(span);
                    this.itemToLabelMap.set(item, pill);
                    this.labelToItemMap.set(pill, item);

                    fragment.appendChild(pill);
                }
            } else {
                let pill = this.itemToLabelMap.get(item);

                if(pill) {
                    pill.parentElement.removeChild(pill);
                    this.itemToLabelMap.delete(item);
                    this.labelToItemMap.delete(pill);
                }
            }
        }

        if(this.filter && this.filter.wrapper && this.filter.wrapper.parentElement === output) {
            output.insertBefore(fragment, this.filter.wrapper);
        } else {
            output.appendChild(fragment);
        }

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

    _isChoiceElement(element) {
        for(let option of this.options) {
            if(this.itemToLabelMap.get(option) === element) {
                return true;
            }
        }

        return false;
    }

    getLabels() {
        return this.button.querySelectorAll('.choice');
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

    get options() {
        return this.submenu.children;
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
                item = this.labelToItemMap.get(li);

            item.deselect();
        } else {
            if(this.filter) {
                let inFilter = this.filter.element.contains(event.target);

                if(!this.isActive && inFilter) {
                    this.activate();
                } else if(this.submenu.element.contains(event.target)) {
                    this.filter.focus();
                } else if(!inFilter) {
                    super.onClick(topic);
                }
            } else {
                super.onClick(topic);
            }
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
                widget: new SelectInputWidget(element, null, null, true),
                filter: element.dataset.filter ? element.dataset.filter.toLowerCase().trim() === 'true' : false
            });

            for(let option of element.querySelectorAll('option')) {
                let item = new SelectOption({
                    text: option.innerText.trim(),
                    value: option.value
                });

                select.append(item);

                if(option.selected) {
                    item.select();
                }
            }

            element.replaceWith(select.element);
            select.element.appendChild(select.widget.element);
            return select;
        } else {
            return super.FromHTML(element);
        }
    }
}


export class ComboBox extends AbstractMenuItem {
    constructor({target=null, timeout=false, submenu=null}) {
        super();

        if(target) {
            this.element = target;

            if(this.element.nodeName === 'INPUT') {
                this.input = this.element;
            } else {
                this.input = this.element.querySelector('input');
            }
        } else {
            let {element, input} = this.render();
            this.element = element;
            this.input = input;
        }

        this.toggle = "both";
        this.autoActivate = false;
        this.openOnHover = false;
        this.delay = false;
        this.timeout = timeout;
        this.closeOnBlur = true;
        this.positioner = positioners.DROPDOWN;
        this.closeOnSelect = true;

        this.SubMenuClass = SelectMenu;

        this.element.tabIndex = 0;
        this.element.classList.add('advanced-select');

        this.registerTopics();
        this.parseDOM();

        if(submenu) {
            if(typeof submenu === 'string') {
                submenu = document.querySelector(submenu);
            }

            if(!submenu.isSelectMenu || !submenu.isSelectMenu()) {
                submenu = new this.SubMenuClass({target: submenu});
                this.attachSubMenu(submenu);
            }
        }

        this.init();
    }

    registerTopics() {
        super.registerTopics();

        this.on('option.select', () => {
            this._renderLabel();
        });

        this.on('option.deselect', () => {
            this._renderLabel();
        });
    }

    render(context) {
        let element = `
        <div class="advanced-select">
            <input type="text" readonly="readonly" />
        </div>
        `;

        element = parseHTML(element).children[0];
        return {
            element: element,
            input: element.querySelector('input')
        };
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event & topic handling methods

    //------------------------------------------------------------------------------------------------------------------
    // Private methods

    _renderLabel() {
        let labels = this.selectedOptions.map(item => item.text);
        this.value = labels.join(", ");
    }

    //------------------------------------------------------------------------------------------------------------------
    // Properties

    get options() {
        return this.submenu.options;
    }

    get selectedOptions() {
        return this.submenu.selectedOptions;
    }

    get selectedIndex() {

    }

    set selectedIndex(index) {

    }

    get name() {
        return this.input.name;
    }

    set name(value) {
        this.input.name = value;
    }

    get value() {
        return this.input.value;
    }

    set value(value) {
        this.input.value = value;
    }

    get placeholder() {
        return this.input.placeholder;
    }

    set placeholder(value) {
        this.input.placeholder = value;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Interface methods

    isSelect() {
        return true;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Static methods

    static FromHTML(element) {
        if(typeof element === 'string') {
            element = document.querySelector(element);
        }

        if(element.nodeName === 'SELECT') {

        } else {
            let {menu} = element.dataset;

            return new ComboBox({target: element, submenu: menu});
        }
    }
}


export class MultiSelect {

}

export class MultiCombo {

}


AutoLoader.register('select', (element) => Select2.FromHTML(element));
AutoLoader.register('combo-box', (element) => ComboBox.FromHTML(element));
