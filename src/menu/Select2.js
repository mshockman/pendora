import MenuItem, {AbstractMenuItem} from "./MenuItem";
import Menu, {AbstractMenu} from "./Menu";
import AutoLoader from "autoloader";
import * as positioners from "./positioners";
import {getMenuInstance, getClosestMenuByElement} from "./utility";
import {parseHTML, parseBoolean} from "core/utility";
import {inherit} from "./decorators";
import Attribute, {DROP, TRUE} from "core/attributes";
import {SelectInputWidget, HiddenInputWidget, MultiHiddenInputWidget} from "../forms/";
import ItemFilter from "../ui/ItemFilter";


/**
 * The class SelectOption is used to construct an item contained in SelectMenu object.
 */
export class SelectOption extends AbstractMenuItem {
    constructor({target, text, value=null}={}) {
        super();

        if(target) {
            this.element = target;
        } else {
            this.element = this.render({text});
        }

        this.textNode = this.element.querySelector('[data-text], button, a');
        if(!this.textNode) this.textNode = this.element;

        this.element.setAttribute('aria-role', 'option');

        this.toggle = "inherit";
        this.autoActivate = true;
        this.openOnHover = true;
        this.delay = 0;
        this.closeOnSelect = false;
        // noinspection JSUnusedGlobalSymbols
        this.closeOnBlur = false;
        this.timeout = false;
        // noinspection JSUnusedGlobalSymbols
        this.clearSubItemsOnHover = true;

        // noinspection JSUnusedGlobalSymbols
        this.MenuItemClass = null;
        // noinspection JSUnusedGlobalSymbols
        this.SubMenuClass = null;

        this.autoDeactivateItems = "auto";

        this.element.classList.add("option");

        this.registerTopics();
        this.parseDOM();

        if(value !== null && value !== undefined) {
            this.value = value;
        }
    }

    /**
     * Creates the dom elements for the SelectOption.
     * @param text
     * @returns {Element}
     */
    render({text}) {
        let html = `<div data-role="menuitem" class="menuitem">
            <span class="checkmark"><i class="fas fa-check"></i></span>
            <a data-text>${text}</a>
        </div>`,
            fragment = parseHTML(html);

        return fragment.children[0];
    }

    /**
     * Selects the options and publishes a [option.select] topic.
     *
     * @param topicData
     */
    select(topicData={}) {
        super.select();

        if(this.isSelected) return;

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

    onClick(event) {
        let isDisabled = this.getDisabled();

        if(isDisabled) {
            event.originalEvent.preventDefault();
            return;
        }

        if(event.target !== this) {
            return;
        }

        // Implements an event preventDefault like interface for the topic
        // so that other handlers can prevent the default action why the topic
        // bubble up the menu tree.

        let isDefaultPrevented = false;

        // Notify every parent node that an item was clicked.
        this.dispatchTopic('menuitem.click', {
            ...event,
            target: this,
            relatedTarget: event.target,

            preventDefault() {
                isDefaultPrevented = true;
            },

            isDefaultPrevented() {
                return isDefaultPrevented;
            }
        });

        let toggle = this.toggle,
            isSelected = this.isSelected;

        isDisabled = this.getDisabled();

        // If the default action wasn't prevented either select or deselect the item.
        if(!isDefaultPrevented && !isDisabled) {
            if (isSelected) {
                if (toggle === true || (toggle === 'ctrl' && event.originalEvent.ctrlKey)) {
                    this.deselect();
                }
            } else {
                this.select();
            }
        }
    }

    isSelectMenu() {
        return true;
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

    // noinspection JSUnusedGlobalSymbols
    get isFiltered() {
        return this.classList.contains('filtered');
    }

    // noinspection JSUnusedGlobalSymbols
    set isFiltered(value) {
        if(value) {
            this.classList.add('filtered');
        } else {
            this.classList.remove('filtered');
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
     * Returns the options parent select-menu or null.
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


// noinspection JSUnusedGlobalSymbols
export const FILTERS = {
    startsWith(value) {
        return function(item) {
            return item.text.indexOf(value) !== 0;
        }
    },

    istartsWith(value) {
        return function(item) {
            return item.text.toLowerCase().indexOf(value.toLowerCase()) !== 0;
        }
    },

    contains(value) {
        return function(item) {
            return item.text.indexOf(value) !== -1;
        }
    },

    icontains(value) {
        return function(item) {
            return item.text.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        }
    }
};


/**
 * Creates a menu that contains SelectOptions.
 */
export class SelectMenu extends AbstractMenu {
    @inherit multiSelect;

    constructor({
                target, filter=null, placeholder="No Items Found", filterDelay=500,
                filterPlaceholderText="Search", toggle=false, enableShiftSelect=true, enableCtrlToggle=true, clearOldSelection=false, ...context
    }={}) {
        super();
        // noinspection JSUnusedGlobalSymbols
        this.MenuItemClass = SelectOption;

        if(target) {
            this.element = target;
        } else {
            this.element = this.render(context);
        }

        // noinspection JSUnusedGlobalSymbols
        this.closeOnBlur = false;
        this.timeout = false;
        // noinspection JSUnusedGlobalSymbols
        this.autoActivate = true;
        // noinspection JSUnusedGlobalSymbols
        this.openOnHover = false;
        this.multiSelect = "inherit";
        this.closeOnSelect = false;
        // noinspection JSUnusedGlobalSymbols
        this.delay = 0;
        this.positioner = "inherit";

        this.enableShiftSelect = enableShiftSelect;
        this.enableCtrlToggle = enableCtrlToggle;
        this.clearOldSelection = clearOldSelection;

        this.element.classList.add('select-menu');

        this.placeholder = document.createElement('div');
        this.placeholder.classList.add('placeholder');
        this.placeholder.innerHTML = placeholder;

        this.isVisible = false;

        this.registerTopics();
        this.parseDOM();
        this.init();

        if(filter) {
            this.filterDelay = filterDelay;
            this.placeholder = placeholder;
            this._initFilter(filter, filterPlaceholderText);
        }
    }

    show() {
        if(!this.isVisible) {
            this.clearFilter();

            if(!this.multiSelect && !this.activeChild) {
                for (let child of this.children) {
                    if (child.isSelected && !child.isActive) {
                        child.activate();
                    }
                }
            }

            super.show();
        }
    }

    render({arrow=false}={}) {
        let html = `
            <div class="select-menu">
                <div class="select-menu__header"></div>
                <div class="select-menu__body menu__body"></div>
                <div class="select-menu__footer"></div>
            </div>
        `;

        let fragment = parseHTML(html);
        return fragment.children[0];
    }

    registerTopics() {
        super.registerTopics();

        this.on('option.select', topic => {
            if(!this.multiSelect) {
                for(let item of this.selection) {
                    if(item !== topic.target) {
                        item.deselect();
                    }
                }
            }

            this.dispatchTopic('selection.change', this);
        });

        this.on('option.deselect', topic => {
            this.dispatchTopic('selection.change', this);
        });

        this.on('menuitem.click', topic => {
            if(topic.target.parent !== this) return;

            let event = topic.originalEvent;

            if(this._lastClick && event.shiftKey && this.enableShiftSelect) {
                topic.preventDefault();

                let children = this.children,
                    targetIndex = children.indexOf(topic.target),
                    lastIndex = children.indexOf(this._lastClick);

                if(targetIndex !== -1 && lastIndex !== -1) {
                    let startIndex = Math.min(targetIndex, lastIndex),
                        endingIndex = Math.max(targetIndex, lastIndex),
                        change = false;

                    for(let i = 0, l = children.length; i < l; i++) {
                        let child = children[i];

                        if(i >= startIndex && i <= endingIndex && !child.isDisabled) {
                            if(!child.isSelected) {
                                child.isSelected = true;
                                change = true;
                            }
                        } else if(child.isSelected) {
                            child.isSelected = false;
                            change = true;
                        }
                    }

                    if(change) {
                        this.dispatchTopic('selection.change', this);
                    }
                }
            } else if(event.ctrlKey && this.enableCtrlToggle) {
                topic.preventDefault();

                let change = false;

                if(!topic.target.isSelected && !topic.deselected) {
                    event.target.isSelected = true;
                    change = true
                } else if(topic.target.isSelected && !topic.selected) {
                    event.target.isSelected = false;
                    change = true;
                }

                this._lastClick = topic.target;

                if(change) {
                    this.dispatchTopic('selection.change', this);
                }
            } else if(this.clearOldSelection) {
                for(let child of this.children) {
                    if(child !== topic.target && child.isSelected) {
                        child.isSelected = false;
                    }
                }

                this._lastClick = topic.target;
            } else {
                this._lastClick = topic.target;
            }
        });
    }

    isSelectMenu() {
        return true;
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

    onClick(topic) {
        let event = topic.originalEvent,
            target = topic.target,
            isDisabled = target.getDisabled();

        super.onClick(topic);

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

    filter(fn) {
        if(fn === null) {
            return this.clearFilter();
        }

        this.element.classList.add('items-filtered');

        for(let option of this.options) {
            option.isFiltered = fn(option);
        }

        if(this.placeholder) {
            if(this.getFilteredItems().length < this.options.length) {
                if(this.placeholder.parentElement) {
                    this.placeholder.parentElement.removeChild(this.placeholder);
                }
            } else {
                let container = this.element.querySelector('.select-menu__body') || this.element;
                container.appendChild(this.placeholder);
            }
        }
    }

    clearFilter() {
        for(let option of this.options) {
            option.classList.remove('filtered');
        }

        if(this.placeholder && this.placeholder.parentElement && this.getFilteredItems().length < this.options.length) {
            this.placeholder.parentElement.removeChild(this.placeholder);
        }

        if(this.filterInput) {
            this.filterInput.value = "";
        }

        this.element.classList.remove('items-filtered');
    }

    getFilteredItems() {
        let r = [];

        for(let option of this.options) {
            if(option.isFiltered) {
                r.push(option);
            }
        }

        return r;
    }

    _initFilter(fn, filterPlaceholderText) {
        // let filterInput = this.element.querySelectorAll('[data-filter]');
        let filterInput = Array.prototype.slice.call(document.querySelectorAll('[data-filter]')).find(node => getClosestMenuByElement(node) === this);

        if(!filterInput) {
            this.filterInput = document.createElement('input');
            this.filterInput.type = 'text';
            this.filterInput.placeholder = filterPlaceholderText || "";

            let filterContainer = document.createElement('div');
            filterContainer.className = "select-menu__filter";
            filterContainer.appendChild(this.filterInput);

            let container = this.element.querySelector(".select-menu__header") || this.element;
            container.insertBefore(filterContainer, container.firstChild);
        } else {
            this.filterInput = filterInput;
        }

        let _timer = null;

        this.filterInput.addEventListener('keydown', () => {
            if(_timer) {
                clearTimeout(_timer);
                _timer = null;
            }

            _timer = setTimeout(() => {
                _timer = null;
                this.filter(fn(this.filterInput.value));
            }, this.filterDelay);
        });
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
        // noinspection JSUnusedGlobalSymbols
        this.closeOnBlur = true;
        this.timeout = timeout;
        this.multiSelect = multiSelect;
        // noinspection JSUnusedGlobalSymbols
        this.MenuItemClass = SelectOption;
        // noinspection JSUnusedGlobalSymbols
        this.SubMenuClass = SelectMenu;
        this.positioner = positioners.DROPDOWN;
        // noinspection JSUnusedGlobalSymbols
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

                this.filter.appendTo(this.submenu.element.querySelector('.select-menu__header'));
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

            this.filter.input.addEventListener('focus', () => {
                this.element.classList.add('select-highlight');
            });

            this.filter.input.addEventListener('blur', event => {
                // noinspection JSCheckFunctionSignatures
                if(!this.element.contains(event.relatedTarget)) {
                    this.element.classList.remove('select-highlight');
                    if(this.isActive) this.deactivate();
                }
            });
        }

        this.addEventListener('focus', () => {
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

    // noinspection JSUnusedGlobalSymbols
    getValue() {
        return this.widget.getValue();
    }

    // noinspection JSUnusedGlobalSymbols
    setValue(value) {
        this.widget.setValue(value);
    }

    // noinspection JSUnusedGlobalSymbols
    getName() {
        return this.widget.getName();
    }

    // noinspection JSUnusedGlobalSymbols
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

        // noinspection JSUnresolvedFunction
        if(topic.target === this && event.target.closest('.exit-button')) {
            // noinspection JSUnresolvedFunction
            let li = event.target.closest('li'),
                item = this.labelToItemMap.get(li);

            item.deselect();
        } else {
            if(this.filter) {
                // noinspection JSCheckFunctionSignatures
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


/**
 * @implements FormWidgetBase
 * @abstract
 */
export class AbstractSelect extends AbstractMenuItem {
    isSelect() {
        return true;
    }

    /**
     * @abstract
     * @param context
     */
    render(context={}) {

    }

    /**
     * Refresh ui
     *
     * @abstract
     * @private
     */
    refreshUI() {

    }

    registerTopics() {
        super.registerTopics();

        this.on('menuitem.click', topic => {
            // Close the select if the user clicks a disabled select item.
            if(this.closeOnSelect && this.isActive) {
                if(topic.target.isDisabled) {
                    topic.preventDefault();
                    this.deactivate();
                }
            }
        });

        this.on('option.select', () => {
            if(this.closeOnSelect && this.isActive) {
                this.deactivate();
            }
        });

        this.on('option.deselect', () => {
            if(this.closeOnSelect && this.isActive) {
                this.deactivate();
            }
        });

        this.on('selection.change', () => {
            this.refreshUI();
            this.submenu.position();
        });
    }

    append(option) {
        return this.submenu.append(option);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Properties

    get options() {
        return this.submenu.options;
    }

    get selectedOptions() {
        return this.submenu.selectedOptions;
    }

    getName() {
        return this.widget.name;
    }

    setName(value) {
        this.widget.name = value;
    }

    getValue() {
        return this.widget.value;
    }

    /**
     * Sets the value of the widget and updates the ui without triggering any topics.
     *
     * @abstract
     * @param value
     */
    setValue(value) {

    }

    get value() {
        return this.getValue();
    }

    set value(value) {
        this.setValue(value);
    }

    get name() {
        return this.getName();
    }

    set name(value) {
        this.setName(value);
    }

    //------------------------------------------------------------------------------------------------------------------
    //

    static FromHTML(element) {
        if(typeof element === 'string') {
            element = document.querySelector(element);
        }

        let instance = new this();

        for(let child of element.querySelectorAll('li')) {
            let option = new SelectOption({text: child.innerHTML.trim(), value: child.dataset.value || null});
            instance.append(option);
        }

        element.parentElement.replaceChild(instance.element, element);

        return instance;
    }
}


export class ComboBox extends AbstractSelect {
    constructor({target=null, timeout=false, submenu=null, widget=null, wait=500, filter=FILTERS.istartsWith}={}) {
        super();

        if(target) {
            this.element = target;

            if(this.element.nodeName === 'INPUT') {
                this.textbox = this.element;
            } else {
                this.textbox = this.element.querySelector('[data-text]');
            }
        } else {
            let {element, textbox} = this.render();
            this.element = element;
            this.textbox = textbox;
        }

        this.toggle = true;
        this.autoActivate = false;
        this.openOnHover = false;
        this.delay = false;
        this.timeout = timeout;
        // noinspection JSUnusedGlobalSymbols
        this.closeOnBlur = true;
        this.positioner = positioners.DROPDOWN;
        this.closeOnSelect = true;
        this._label = '';
        // noinspection JSUnusedGlobalSymbols
        this.clearSubItemsOnHover = false;

        this.SubMenuClass = SelectMenu;

        this.element.tabIndex = 0;

        this.parseDOM();

        if(submenu) {
            if(typeof submenu === 'string') {
                submenu = document.querySelector(submenu);
            }

            if(!submenu.isSelectMenu || !submenu.isSelectMenu()) {
                submenu = new this.SubMenuClass({target: submenu});
                this.attachSubMenu(submenu);
            }
        } else {
            let submenu = new this.SubMenuClass();
            this.attachSubMenu(submenu);
        }

        this.submenu.classList.add('combobox__menu');

        if(!widget) {
            this.widget = new HiddenInputWidget();
            this.widget.appendTo(this.element);
        } else {
            this.widget = widget;
        }

        this.textbox.addEventListener('blur', event => {
            if(!this.containsElement(event.relatedTarget)) {
                this.textbox.value = this._label;
            }
        });

        let _timer = null;

        let applyFilter = () => {
            _timer = null;
            this.submenu.filter(filter(this.textbox.value));

            // Flag if we found a select item.
            let f = false;

            // Activate the selected items.
            if (!this.multiSelect) {
                for (let option of this.submenu.options) {
                    if (!option.isDisabled && !option.isFiltered && option.isSelected) {
                        option.activate();
                        f = true;
                        break;
                    }
                }
            }

            if (!f) {
                for (let option of this.submenu.options) {
                    if (!option.isDisabled && !option.isFiltered) {
                        option.activate();
                        break;
                    }
                }
            }
        };

        this.textbox.addEventListener('input', () => {
            if(_timer) {
                clearTimeout(_timer);
                _timer = null;
            }

            if(wait === false || wait < 0) {
                applyFilter();
            } else {
                _timer = setTimeout(applyFilter, wait);
            }
        });

        this.textbox.addEventListener('keydown', event => {
            // Apply the filter immediately on enter.
            if(event.key === "Enter" && _timer) {
                clearTimeout(_timer);
                _timer = null;
                applyFilter();
            }
        });

        this.initKeyboardNavigation();
        this.registerTopics();
        this.init();
    }

    render(context) {
        let element = `
        <div class="combobox">
            <input type="text" class="combobox__input" data-text />
            <span class="combobox__caret"><i class="fas fa-caret-down"></i></span>
        </div>
        `;

        element = parseHTML(element).children[0];
        return {
            element: element,
            textbox: element.querySelector('[data-text]')
        };
    }

    //------------------------------------------------------------------------------------------------------------------
    // Private methods

    refreshUI() {
        let options = this.selectedOptions,
            labels = options.map(item => item.text);

        this.value = options.length ? options[0].value || options[0].text || '' : '';
        this._label = labels.join(", ");
        this.textbox.value = this._label;
    }

    _rootKeyDown(topic) {
        if(this.isRoot) {
            let key = topic.originalEvent.key;

            if(key === 'ArrowLeft' || key === 'ArrowRight') {
                return;
            }

            return super._rootKeyDown(topic);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Properties

    setValue(value) {
        this.widget.value = value;
    }

    get placeholder() {
        return this.textbox.placeholder;
    }

    set placeholder(value) {
        this.textbox.placeholder = value;
    }
}


export class MultiComboBox extends AbstractSelect {
    constructor({target=null, timeout=false, widget=null, filter=FILTERS.istartsWith, wait=500}={}) {
        super();

        this.optionToPillMap = new WeakMap();
        this.pilltoOptionMap = new WeakMap();

        if(target) {
            this.element = target;
            this.textbox = this.element.querySelector('[data-text]');
            this.body = this.element.querySelector('.multi-combo-box__body');
        } else {
            let {element, textbox, body} = this.render();
            this.element = element;
            this.textbox = textbox;
            this.body = body;
        }

        this.toggle = true;
        this.autoActivate = false;
        this.openOnHover = false;
        this.delay = false;
        this.timeout = timeout;
        this.closeOnBlur = true;
        this.positioner = positioners.DROPDOWN;
        this.closeOnSelect = false;
        this.multiSelect = true;
        this.clearSubItemsOnHover = false;

        this.SubMenuClass = SelectMenu;

        this.parseDOM();

        if(!this.submenu) {
            this.submenu = new this.SubMenuClass();
            this.attachSubMenu(this.submenu);
        }

        this.submenu.multiSelect = true;
        this.submenu.toggle = true;
        this.submenu.enableShiftSelect = true;

        if(!widget) {
            this.widget = new MultiHiddenInputWidget();
            this.widget.appendTo(this.element);
        } else {
            this.widget = widget;

            if(!this.widget.element.parentElement) {
                this.widget.appendTo(this.element);
            }
        }

        this.initKeyboardNavigation();
        this.registerTopics();
        this.init();

        let _timer = null;

        let applyFilter = () => {
            _timer = null;
            this.submenu.filter(filter(this.textbox.value));

            for(let option of this.options) {
                if(!option.isFiltered && !option.isDisabled) {
                    option.activate();
                    break;
                }
            }
        };

        this.textbox.addEventListener('keydown', event => {
            if(!this.isActive) {
                this.activate();
                return;
            }

            if(event.key === "Backspace" && this.textbox.value === "") {
                let pills = this.body.querySelectorAll('.multi-combo-box__pill'),
                    pill = pills[pills.length-1],
                    option = pill ? this.pilltoOptionMap.get(pill) : null;

                if(option) {
                    option.deselect();
                }
            } else if(event.key === 'Enter') {
                if(_timer) {
                    clearTimeout(_timer);
                    _timer = null;
                    applyFilter();
                } else {
                    let targetOption = null;

                    for(let option of this.options) {
                        if(!option.isFiltered && option.isActive) {
                            targetOption = option;
                        }
                    }

                    if(targetOption && !targetOption.isSelected) {
                        targetOption.select();
                        targetOption.deactivate();
                        this.textbox.value = "";
                        this.submenu.clearFilter();
                    } else if(targetOption) {
                        targetOption.deselect();
                    } else {
                        for(let option of this.options) {
                            if(!option.isFiltered && !option.isDisabled) {
                                option.activate();
                                break;
                            }
                        }
                    }
                }
            }
        });

        this.textbox.addEventListener('input', () => {
            if(_timer) {
                clearTimeout(_timer);
                _timer = null;
            }

            if(wait === false || wait < 0) {
                applyFilter();
            } else {
                _timer = setTimeout(applyFilter, wait);
            }
        });
    }

    registerTopics() {
        super.registerTopics();

        this.on('event.click', topic => {
            let exitButton = topic.originalEvent.target.closest('.pill__exit-button'),
                pill = exitButton ? exitButton.closest('.multi-combo-box__pill') : null,
                option = pill ? this.pilltoOptionMap.get(pill) : null;

            if(option) {
                option.deselect();
            }

            this.textbox.focus();
        });
    }

    render(context) {
        let html = `
            <div class="multi-combo-box">
                <div class="multi-combo-box__body">
                    <input type="text" class="multi-combo-box__input" data-text />
                </div>
            </div>
        `;

        let element = parseHTML(html).children[0];

        return {
            element: element,
            textbox: element.querySelector('[data-text]'),
            body: element.querySelector('.multi-combo-box__body')
        };
    }

    _buildChoicePill(text) {
        let pill = document.createElement('div');
        pill.className = "multi-combo-box__pill";

        let exitButton = document.createElement('div'),
            textContainer = document.createElement('div');

        exitButton.className = "pill__exit-button";
        exitButton.innerHTML = `<i class="far fa-times-circle"></i>`;
        textContainer.className = "pill__text";
        textContainer.innerHTML = text;

        pill.appendChild(textContainer);
        pill.appendChild(exitButton);

        return pill;
    }

    _rootKeyDown(topic) {
        let event = topic.originalEvent,
            key = event.key;

        if(this.isRoot) {
            if(key === 'ArrowLeft' || key === 'ArrowRight' || key === "Enter") {
                return;
            }

            return super._rootKeyDown(topic);
        }
    }

    refreshUI() {
        let fragment = document.createDocumentFragment(),
            _new = false,
            values = [];

        for(let option of this.options) {
            let pill = this.optionToPillMap.get(option);

            if(option.isSelected) {
                if(!pill) {
                    pill = this._buildChoicePill(option.text);
                    this.pilltoOptionMap.set(pill, option);
                    this.optionToPillMap.set(option, pill);
                    fragment.appendChild(pill);
                    _new = true;
                }

                values.push(option.value || option.text);
            } else if(pill) {
                if(pill.parentElement) pill.parentElement.removeChild(pill);
                this.optionToPillMap.delete(option);
                this.pilltoOptionMap.delete(pill);
            }
        }

        if(_new) {
            this.body.insertBefore(fragment, this.textbox);
        }

        if(this.widget) {
            this.widget.setValue(values);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Properties

    setValue(values) {
        let changed = false;

        for(let option of this.options) {
            let index = values.indexOf(option.value);
            if(index !== -1) {
                if(!option.isSelected && !option.isDisabled) {
                    option.isSelected = true;
                    changed = true;
                }

                values.splice(index, 1);
            } else {
                if(option.isSelected) {
                    option.isSelected = false;
                    changed = true;
                }
            }
        }

        this._renderLabel();
    }
}


AutoLoader.register('select', (element) => Select2.FromHTML(element));
AutoLoader.register('combobox', (element) => ComboBox.FromHTML(element));
AutoLoader.register('multi-combobox', (element) => MultiComboBox.FromHTML(element));
