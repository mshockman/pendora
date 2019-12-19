import MenuItem, {AbstractMenuItem} from "./MenuItem";
import Menu, {AbstractMenu} from "./Menu";
import AutoLoader from "autoloader";
import * as positioners from "./positioners";
import {getClosestMenuByElement} from "./utility";
import {findChild, createFragment} from "core/utility";
import {inherit} from "./decorators";
import {MultiHiddenInputWidget} from "../forms/";
import {AttributeSchema, Attribute, Bool, Integer} from "../core/serialize";


/**
 * The class SelectOption is used to construct an item contained in SelectMenu object.
 */
export class SelectOption extends AbstractMenuItem {
    constructor({target, text, value=null, targetKey=null}={}) {
        super({
            toggle: "inherit",
            autoActivate: true,
            openOnHover: true,
            delay: 0,
            closeOnSelect: false,
            closeOnBlur: false,
            timeout: false,
            clearSubItemsOnHover: true,
            autoDeactivateItems: "auto",
            targetKey
        });

        let targetChildren = null;

        if(target) {
            if(typeof target === 'string') {
                target = document.querySelector(target);
            }

            // Save target children to add to the text output later.
            targetChildren = document.createDocumentFragment();

            while(target.firstChild) {
                targetChildren.appendChild(target.firstChild);
            }

            this.element = target;
        } else {
            this.element = document.createElement('div');
            this.element.classList.add('select-option');
        }

        let fragment = createFragment(`
            <a class="select-option__body">
                <span class="select-option__check" data-check><i class="fas fa-check"></i></span>
                <span data-text class="select-option__text"></span>
                <span data-alt-text class="select-option__alt"></span>
            </a>
        `);

        this.element.appendChild(fragment);
        this.textNode = this.element.querySelector('[data-text]');

        // If initializing the object from a target element
        // the label text is gathered from the children of the target
        if(targetChildren) {
            this.textNode.appendChild(targetChildren);
        } else if(text) {
            let textNode = document.createTextNode(text);
            this.textNode.appendChild(textNode);
        }

        this.element.setAttribute('aria-role', 'option');

        this.registerTopics();
        // this.parseDOM();

        if(value !== null && value !== undefined) {
            this.value = value;
        }
    }

    registerTopics() {
        super.registerTopics();

        this.on('menuitem.select', topic => {
            if(this.isSelected && this.toggle) {
                this.isSelected = false;

                this.dispatchTopic('option.deselect', {
                    ...topic,
                    target: this,
                    menu: this,
                    relatedTarget: topic.target,
                    trigger: topic
                });
            } else if(!this.isSelected) {
                this.isSelected = true;

                this.dispatchTopic('option.select', {
                    ...topic,
                    target: this,
                    menu: this,
                    relatedTarget: topic.target,
                    trigger: topic
                });
            }
        });
    }

    /**
     * Creates the dom elements for the SelectOption.
     * @param text
     * @returns {Element}
     */
    render({text}) {
        let html = `
        <div data-role="menuitem" class="menuitem">
            <span class="checkmark"><i class="fas fa-check"></i></span>
            <a data-text>${text}</a>
        </div>`;

        let fragment = createFragment(html);

        return fragment.children[0];
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Selects the options and publishes a [option.select] topic.
     *
     * @param topicData
     */
    optionSelect(topicData={}) {
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
    optionDeselect(topicData={}) {
        if(!this.isSelected) return;
        this.isSelected = false;
        if(this.isActive) this.deactivate();
        this.dispatchTopic('option.deselect', {target: this, menu: this, ...topicData});
    }

    // noinspection JSUnusedGlobalSymbols
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
            this.isVisible = false;
        } else {
            this.classList.remove('filtered');
            this.isVisible = true;
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

    get isNavigable() {
        return !this.isDisabled && this.isVisible && !this.isFiltered;
    }

    constructMenuItem(config) {
        return new MenuItem(config);
    }

    constructSubMenu(config) {
        return new Menu(config);
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
        super({
            closeOnBlur: false,
            timeout: false,
            autoActivate: true,
            openOnHover: false,
            multiSelect: "inherit",
            closeOnSelect: false,
            delay: 0,
            positioner: "inherit",
        });

        if(target) {
            if(typeof target === 'string') {
                target = document.querySelector(target);
            }

            this.element = target;
        } else {
            this.element = this.render(context);
        }

        this.header = findChild(this.element, '[data-header]');
        this.body = findChild(this.element, '[data-body]');
        this.footer = findChild(this.element, '[data-footer]');
        this.filterInput = null;

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

    render({arrow=false}={}) {
        let html = `
            <div class="select-menu">
                <div class="select-menu__header" data-header></div>
                <div class="select-menu__body menu__body" data-body></div>
                <div class="select-menu__footer" data-footer></div>
            </div>
        `;

        let fragment = createFragment(html);
        return fragment.children[0];
    }

    registerTopics() {
        super.registerTopics();

        this.on('option.select', topic => {
            if(!this.multiSelect) {
                for(let item of this.selection) {
                    if(item !== topic.target) {
                        item.isSelected = false;
                    }
                }
            }

            this.dispatchTopic('selection.change', this);
        });

        this.on('option.deselect', topic => {
            this.dispatchTopic('selection.change', {
                target: this,
                trigger: topic
            });
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

                let changed = false;

                if(topic.target.isSelected) {
                    event.target.isSelected = false;
                    changed = true;
                } else {
                    event.target.isSelected = true;
                    changed = true;
                }

                this._lastClick = topic.target;

                if(changed) {
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

        this.on('menu.show', () => {
            this.clearFilter();

            if(!this.multiSelect && !this.activeChild) {
                for (let child of this.children) {
                    if (child.isSelected && !child.isActive) {
                        child.activate();
                    }
                }
            }
        });
    }

    // noinspection JSUnusedGlobalSymbols
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
            option.isFiltered = false;
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
            this.filterInput.setAttribute('data-filter', "");

            let filterContainer = document.createElement('div');
            filterContainer.className = "select-menu__filter";
            filterContainer.appendChild(this.filterInput);

            let container = this.header || this.element;
            container.insertBefore(filterContainer, container.firstChild);
        } else {
            this.filterInput = filterInput;
        }

        let _timer = null;

        this.element.addEventListener('input', event => {
            if(event.target.hasAttribute('data-filter') && getClosestMenuByElement(event.target) === this) {
                if(_timer) {
                    clearTimeout(_timer);
                    _timer = null;
                }

                _timer = setTimeout(() => {
                    _timer = null;
                    this.filter(fn(this.filterInput.value));
                }, this.filterDelay);
            }
        });
    }

    constructMenuItem(config) {
        return new SelectOption(config);
    }

    constructSubMenu(config) {
        return new SelectMenu(config);
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

    /**
     * @returns {SelectOption}
     */
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

        let config = this.getAttributes(element);

        let instance = new this(config);

        for(let child of element.querySelectorAll('li')) {
            let option = new SelectOption({text: child.innerHTML.trim(), value: child.dataset.value || null});
            instance.append(option);
        }

        element.parentElement.replaceChild(instance.element, element);

        return instance;
    }

    static ConstructFromHTML(element) {
        if(typeof element === 'string') {
            element = document.querySelector(element);
        }

        // todo move into constructor.
        let config = this.getAttributes(element),
            children = [];

        for(let child of [...element.children]) {
            if(!child.hasAttribute('data-button') && !child.hasAttribute('data-menu')) {
                element.removeChild(child);
                children.push(child);
            }
        }

        let instance = new this({
           ...config,
           target: element
        });

        for(let child of children) {
            if(child.hasAttribute('data-menuitem')) {
                let item = instance.constructMenuItem({target: child});
                instance.append(item);
            } else {
                instance.append(child);
            }
        }

        return instance;
    }

    /**
     * @abstract
     * @param config
     */
    constructMenuItem(config) {}

    /**
     * @abstract
     * @param config
     */
    constructSubMenu(config) {}
}


const RICH_SELECT_SCHEMA = new AttributeSchema({
    multiple: new Attribute(Bool, Attribute.DROP, Attribute.DROP),
    maxItems: new Attribute(Integer, Attribute.DROP, Attribute.DROP)
});


export class RichSelect extends AbstractSelect {
    constructor({target=null, timeout=false, widget=null, multiple=false, maxItems=5}={}) {
        super({
            toggle: true,
            autoActivate: false,
            openOnHover: false,
            delay: false,
            timeout,
            closeOnBlur: true,
            clearSubItemsOnHover: false,
            positioner: positioners.DROPDOWN,
            closeOnSelect: true
        });

        let submenu = null;

        if(target) {
            if(typeof target === 'string') target = document.querySelector(target);

            submenu = findChild(target, '[data-menu]');

            if(submenu) {
                target.removeChild(submenu);
            }

            this.element = target;

            if(this.element.nodeName === 'INPUT') {
                this.textbox = this.element;
            } else {
                let button = findChild(this.element, '[data-button]');

                if(!button) {
                    this.element.appendChild(this.render());
                }
            }
        } else {
            this.element = document.createElement('div');
            this.element.appendChild(this.render());
        }

        if(!this.textbox) {
            this.textbox = this.element.querySelector('input, [data-text]');
        }

        this.textbox.readOnly = true;

        this._label = '';

        this.element.tabIndex = 0;

        this.attachSubMenu(this.constructSubMenu({target: submenu}));

        this.classList.add('rich-select');

        if(!widget) {
            this.widget = new MultiHiddenInputWidget();
            this.widget.appendTo(this.element);
        } else {
            this.widget = widget;
        }

        this.textbox.addEventListener('blur', event => {
            if(!this.containsElement(event.relatedTarget)) {
                this.textbox.value = this._label;
            }
        });

        this.initKeyboardNavigation();
        this.registerTopics();
        this.init();

        this.multiple = multiple;
        this.maxItems = maxItems;
    }

    render(context) {
        return createFragment(`
        <div class="select-button">
            <input type="text" class="select-button__input" data-text />
            <span class="select-button__caret"><i class="fas fa-caret-down"></i></span>
        </div>
        `);
    }

    refreshUI() {
        let options = this.selectedOptions,
            labels = options.map(item => item.text);

        let values = [];

        for(let option of options) {
            values.push(option.value || option.text || '');
        }

        this.value = values;

        if(labels.length <= this.maxItems) {
            this._label = labels.join(", ");
        } else {
            this._label = `${labels.length} Items Selected`;
        }

        this.textbox.value = this._label;
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

    get multiple() {
        return this.submenu.multiSelect;
    }

    set multiple(value) {
        value = !!value;

        if(value) {
            this.submenu.multiSelect = true;
            this.submenu.toggle = true;
            this.closeOnSelect = false;
        } else {
            this.submenu.multiSelect = false;
            this.submenu.toggle = false;
            this.closeOnSelect = true;
        }
    }

    get maxItems() {
        return this._maxItems;
    }

    set maxItems(value) {
        this._maxItems = value;
        this.refreshUI();
    }

    static getAttributes(element) {
        return {
            ...super.getAttributes(element),
            ...RICH_SELECT_SCHEMA.deserialize(element.dataset)
        };
    }

    constructMenuItem(config) {
        return new SelectOption(config);
    }

    constructSubMenu(config) {
        return new SelectMenu(config);
    }
}


export class MultiComboBox extends AbstractSelect {
    constructor({target=null, timeout=false, widget=null, filter=FILTERS.istartsWith, wait=500}={}) {
        super({
            toggle: true,
            autoActivate: false,
            openOnHover: false,
            delay: false,
            timeout,
            closeOnBlur: true,
            positioner: positioners.DROPDOWN,
            closeOnSelect: false,
            multiSelect: true,
            clearSubItemsOnHover: false
        });

        this.optionToPillMap = new WeakMap();
        this.pilltoOptionMap = new WeakMap();

        let submenu = null;

        if(target) {
            if(typeof target === 'string') target = document.querySelector(target);

            submenu = findChild(target, '[data-menu]');

            if(submenu) {
                target.removeChild(submenu);
            }

            this.element = target;

            let button = findChild(this.element, '[data-button]');

            if(!button) {
                this.element.appendChild(this.render());
            }
        } else {
            this.element = document.createElement('div');
            this.element.appendChild(this.render());
        }

        this.textbox = this.element.querySelector('[data-text]');
        this.body = this.element.querySelector('[data-body]');
        this.element.classList.add('multi-combo-box');

        this.parseDOM();

        this.attachSubMenu(this.constructSubMenu({target: submenu}));

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

        this._filterTimer = null;

        this._applyFilter = () => {
            this._filterTimer = null;

            this.submenu.filter(filter(this.textbox.value));

            if(this.submenu.activeItem) this.submenu.activeItem.deactivate();
        };

        this.textbox.addEventListener('input', () => {
            if(this._filterTimer) {
                clearTimeout(this._filterTimer);
                this._filterTimer = null;
            }

            if(wait === false || wait < 0) {
                this._applyFilter();
            } else {
                this._filterTimer = setTimeout(this._applyFilter, wait);
            }
        });
    }

    registerTopics() {
        super.registerTopics();

        this.on('event.click', topic => {
            // noinspection JSUnresolvedFunction
            let exitButton = topic.originalEvent.target.closest('.pill__exit-button'),
                pill = exitButton ? exitButton.closest('.multi-combo-box__pill') : null,
                option = pill ? this.pilltoOptionMap.get(pill) : null;

            if(option) {
                option.optionDeselect();
            }

            this.textbox.focus();
        });
    }

    render(context) {
        let html = `
            <div class="multi-combo-box__button" data-body>
                <input type="text" class="multi-combo-box__input" data-text />
            </div>
        `;

        return createFragment(html);
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

    onKeyDown(topic) {
        if(!this._keyboardNavigationEnabled || !this.isRoot) {
            return;
        }

        let event = topic.originalEvent;

        if(!this.isActive) {
            this.activate();
            return;
        }

        if(event.key === "Backspace" && this.textbox.value === "") {
            let pills = this.body.querySelectorAll('.multi-combo-box__pill'),
                pill = pills[pills.length-1],
                option = pill ? this.pilltoOptionMap.get(pill) : null;

            if(option) {
                option.optionDeselect();
            }
        } else if(event.key === 'Enter') {
            if(this._filterTimer) {
                clearTimeout(this._filterTimer);
                this._filterTimer = null;
                this._applyFilter();
            } else {
                /**
                 * @type {null|SelectOption}
                 */
                let activeItem = null,
                    /**
                     * @type {null|SelectOption}
                     */
                    firstItem = null;

                // Find both the first none filtered item and the active item.
                for(let option of this.options) {
                    if(!option.isFiltered && firstItem === null) {
                        firstItem = option;
                    }

                    if(!option.isFiltered && option.isActive) {
                        activeItem = option;
                    }
                }

                if(!activeItem) {
                    this.textbox.value = "";
                    this.submenu.clearFilter();
                    this.submenu.position();

                    if(firstItem && !firstItem.isSelected) {
                        firstItem.select();
                    }

                    firstItem.deactivate();
                } else {
                    activeItem.select();
                }
            }
        } else if(event.key === "ArrowUp" || event.key === "ArrowDown") {
            return super.onKeyDown(topic);
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

        this.refreshUI();
    }

    constructMenuItem(config) {
        return new SelectOption(config);
    }

    constructSubMenu(config) {
        return new SelectMenu(config);
    }
}


export class ComboBox extends RichSelect {
    constructor({target=null, timeout=false, submenu=null, widget=null, wait=500, filter=FILTERS.istartsWith}={}) {
        super({
            target,
            timeout,
            submenu,
            widget,
            multiple: false,
            filter: null
        });

        this.element.classList.add('combo-box');
        this.element.classList.remove('rich-select');

        this.wait = wait;
        this.filter = filter;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Private methods

    _rootKeyDown(topic) {
        if(this.isRoot) {
            let key = topic.originalEvent.key;

            if(this.hasFilter && (key === 'ArrowLeft' || key === 'ArrowRight')) {
                return;
            }

            return super._rootKeyDown(topic);
        }
    }

    set filter(method) {
        if(this._destroyFilter) {
            this._destroyFilter();
            this._destroyFilter = null;
        }

        if(!method) return;

        this._filterMethod = method;

        let _timer = null;

        let applyFilter = () => {
            _timer = null;
            this.submenu.filter(this._filterMethod(this.textbox.value));

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

        let onInput = () => {
            if(_timer) {
                clearTimeout(_timer);
                _timer = null;
            }

            if(this.wait === false || this.wait < 0) {
                applyFilter();
            } else {
                _timer = setTimeout(applyFilter, this.wait);
            }
        };

        let onKeyDown = event => {
            // Apply the filter immediately on enter.
            if(event.key === "Enter" && _timer) {
                clearTimeout(_timer);
                _timer = null;
                applyFilter();
            }
        };

        this.textbox.addEventListener('input', onInput);
        this.textbox.addEventListener('keydown', onKeyDown);
        this.textbox.readOnly = false;

        // Create method to destroy event listener.
        this._destroyFilter = () => {
            this.textbox.removeEventListener('input', onInput);
            this.textbox.removeEventListener('keydown', onKeyDown);
            this.textbox.readOnly = true;

            this._destroyFilter = null;
        };
    }

    get filter() {
        return !!this._filterMethod;
    }

    get hasFilter() {
        return !!this._destroyFilter;
    }

    static getAttributes(element) {
        return {
            ...super.getAttributes(element),
            multiple: false
        };
    }
}


AutoLoader.register('select', (element) => RichSelect.ConstructFromHTML(element));
AutoLoader.register('combobox', (element) => ComboBox.ConstructFromHTML(element));
AutoLoader.register('multi-combobox', (element) => MultiComboBox.ConstructFromHTML(element));
