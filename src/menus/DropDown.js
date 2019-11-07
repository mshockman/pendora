import MenuNode from "./MenuNode";
import Menu from "./Menu";
import {getMenu, getMenuNode} from "./core";
import {
    findChild,
    parseBoolean,
    parseBooleanOrInt,
    validateChoice,
    choice,
    emptyElement,
    parseIntValue
} from 'core/utility';
import MenuItem from "./MenuItem";
import AutoLoader from 'autoloader';
import {SelectMenu} from "./Selectable";
import Attribute from "core/attributes";


export default class DropDown extends MenuNode {
    constructor({target=null, text='', closeOnBlur=true, timeout=false, autoActivate=false, toggle="both",
                    closeOnSelect=true, position=null}={}) {
        let element,
            btn;

        if(!target) {
            element = document.createElement('div');
            btn = document.createElement("button");
            btn.type = 'button';
            btn.innerHTML = text;

            element.appendChild(btn);
        } else if(typeof target === 'string') {
            element = document.querySelector(target);
        } else {
            element = target;
        }

        super(element, 'dropdown');

        this.on('item-select', (topic, message) => {
            this.onItemSelect(message);
        });

        this.element.classList.add('c-dropdown');
        this.element.dataset.role = 'dropdown';

        this.closeOnBlur = closeOnBlur;
        this.closeOnSelect = closeOnSelect;
        this.timeout = timeout;
        this.autoActivate = autoActivate;
        this.toggle = toggle;
        this.position = position;

        this.initEvents();
    }

    initEvents() {
        if(!this.isMenuController) {
            this.isMenuController = true;
            this.boundEvents = {};
            this.boundEvents.onMouseOver = this.onMouseOver.bind(this);
            this.boundEvents.onMouseOut = this.onMouseOut.bind(this);
            this.boundEvents.onClick = this.onClick.bind(this);

            this.element.addEventListener('mouseover', this.boundEvents.onMouseOver);
            this.element.addEventListener('mouseout', this.boundEvents.onMouseOut);
            this.element.addEventListener('click', this.boundEvents.onClick);
        }
    }

    destroyEvents() {
        if(this.isMenuController) {
            this.isMenuController = false;

            this.element.removeEventListener('mouseover', this.boundEvents.onMouseOver);
            this.element.removeEventListener('mouseout', this.boundEvents.onMouseOut);
            this.element.removeEventListener('click', this.boundEvents.onClick);

            this.boundEvents = null;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // METHODS
    //------------------------------------------------------------------------------------------------------------------

    activate() {
        if(!this.isActive) {
            this.isActive = true;

            if(this._autoActivateTimer) {
                clearTimeout(this._autoActivateTimer);
                this._autoActivateTimer = null;
            }

            let overlay = this.overlayElement,
                parent = this.parent,
                submenu = getMenu(overlay);

            if(parent) {
                if(!parent.isActive) {
                    parent.activate();
                }

                if(parent.setActiveItem) {
                    parent.setActiveItem(this, true);
                }
            }

            if(submenu) {
                submenu.show();
            } else if(overlay) {
                overlay.classList.remove('hidden');
                overlay.classList.add('visible');
            }

            if(this.closeOnBlur && !this._captureDocumentClick) {
                let doc = document;
                this._captureDocumentClick = {
                    doc: doc,
                    onDocumentClick: (event) => {
                        if(!this.element.contains(event.target)) {
                            this.deactivate();
                        }
                    }
                };

                // noinspection JSUnresolvedFunction
                doc.addEventListener('click', this._captureDocumentClick.onDocumentClick);
            }

            this.trigger('activate', this);
        }
    }

    deactivate() {
        if(this.isActive) {
            this.isActive = false;

            if(this._captureDocumentClick) {
                // noinspection JSUnresolvedFunction
                this._captureDocumentClick.doc.removeEventListener('click', this._captureDocumentClick.onDocumentClick);
                this._captureDocumentClick = null;
            }

            if(this._timeoutTimer) {
                clearTimeout(this._timeoutTimer);
                this._timeoutTimer = null;
            }

            let overlay = this.overlayElement,
                submenu = getMenu(overlay);

            if(submenu) {
                submenu.deactivate();
                submenu.hide();
            } else if(overlay) {
                overlay.classList.remove('visible');
                overlay.classList.add('hidden');
            }

            this.trigger('deactivate', this);
        }
    }

    startTimeoutTimer(timeout=null) {
        if(!this.isActive) return;

        if(timeout === null) timeout = this.timeout;

        this.clearTimeoutTimer();

        this._timeoutTimer = setTimeout(() => {
            this._timeoutTimer = null;
            this.deactivate();
        }, timeout);

        return this._timeoutTimer;
    }

    clearTimeoutTimer() {
        if(this._timeoutTimer) {
            clearTimeout(this._timeoutTimer);
            this._timeoutTimer = null;
        }
    }

    startAutoActivateTimer(time=null) {
        this.clearAutoActivateTimer();

        if(this.isActive) return;

        if(time === null) time = this.autoActivate;

        this._autoActivateTimer = setTimeout(() => {
            this._autoActivateTimer = null;
            this.activate();
        }, time);
    }

    clearAutoActivateTimer() {
        if(this._autoActivateTimer) {
            clearTimeout(this._autoActivateTimer);
            this._autoActivateTimer = null;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // EVENT HANDLING METHODS
    //------------------------------------------------------------------------------------------------------------------

    /**
     * Event handler for on mouse over events.
     * @param event
     */
    onMouseOver(event) {
        this.clearTimeoutTimer();

        if(this.getDisabled()) return;

        if(!this.isActive) {
            if(this.autoActivate === true) {
                this.activate();
            } else if(typeof this.autoActivate === 'number' && this.autoActivate >= 0) {
                this.startAutoActivateTimer(this.autoActivate);
            }
        }
    }

    onMouseOut(event) {
        if(this.getDisabled()) return;

        // true mouse out event.  Mouse left the dropdown.
        if(!this.element.contains(event.relatedTarget)) {
            this.clearAutoActivateTimer();

            if(this.isActive && typeof this.timeout === 'number' && this.timeout >= 0) {
                this.startTimeoutTimer(this.timeout);
            }
        }
    }

    onClick(event) {
        // Prevent action and url anchor clicks.
        if(this.getDisabled()) {
            event.preventDefault();
            return;
        }

        let isActive = this.isActive;

        let stop = event.target.closest('.js-prevent-item-action');

        if(stop) {
            return;
        }

        if(event.target === this.buttonElement || this.buttonElement.contains(event.target)) {
            if(!isActive && (this.toggle === "on" || this.toggle === 'both')) {
                this.activate();
            } else if(isActive && (this.toggle === "off" || this.toggle === "both")) {
                this.deactivate();
            }
        }

        // Handle cases where a link is clicked inside the menu.
        // For design reasons this is considered equivent to selecting
        // an item.
        if(this.closeOnSelect && isActive) {
            let o = event.target;

            while (o) {
                if (o.nodeName === 'A' && o.href) {
                    this.deactivate();
                    break;
                } else if(o === this.element) {
                    break;
                }

                o = o.parentNode;
            }
        }
    }

    onItemSelect(message) {
        if(this.closeOnSelect === true || (this.closeOnSelect === 'child' && message.parent === this)) {
            this.deactivate();
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // GETTERS AND SETTERS METHODS
    //------------------------------------------------------------------------------------------------------------------

    get submenu() {
        let overlayElement = this.overlayElement;

        if(overlayElement) {
            return getMenu(overlayElement);
        }
    }

    get overlayElement() {
        return findChild(this.element, (child) => child.dataset.role === 'menu');
    }

    get buttonElement() {
        return findChild(this.element, (child) => child.dataset.role === 'button' || child.nodeName === 'BUTTON' || child.nodeName === 'A');
    }

    //------------------------------------------------------------------------------------------------------------------
    // STATIC FUNCTIONS
    //------------------------------------------------------------------------------------------------------------------

    static FromHTML(selector, config={}) {
        if(typeof selector === 'string') {
            selector = document.querySelector(selector);
        }

        let node = getMenuNode(selector);

        // Element already initialized.
        if(node) {
            return node;
        }

        let attributes = {};

        if(selector.dataset.closeOnBlur) {
            attributes.closeOnBlur = parseBoolean(selector.dataset.closeOnBlur);
        }
        if(selector.dataset.closeOnSelect) {
            attributes.closeOnSelect = parseBoolean(selector.dataset.closeOnSelect);
        }
        if(selector.dataset.timeout) {
            attributes.timeout = parseBooleanOrInt(selector.dataset.timeout, 10);
        }
        if(selector.dataset.autoActivate) {
            attributes.autoActivate = parseBooleanOrInt(selector.dataset.autoActivate, 10);
        }
        if(selector.dataset.toggle) {
            attributes.toggle = validateChoice(selector.dataset.toggle, ['on', 'off', 'both']);
        }

        return new this({...attributes, ...config, target: selector});
    }

    static widget({target, subItemConfig={}, subMenuConfig={}, config={}, dropDownConfig={}}) {
        let root = this.FromHTML(target, config);

        for(let element of root.element.querySelectorAll('[data-role="menu"]')) {
            Menu.FromHTML(element, subMenuConfig);
        }

        for(let element of root.element.querySelectorAll('[data-role="menuitem"]')) {
            MenuItem.FromHTML(element, subItemConfig);
        }

        for(let element of root.element.querySelectorAll('[data-role="dropdown"]')) {
            DropDown.FromHTML(element, dropDownConfig);
        }

        return root;
    }
}


class SelectDropDown extends DropDown {
    constructor({delimiter=', ', placeholder='', maxItems=-1, ...props}) {
        super(props);

        this.delimiter = delimiter;
        this.placeholder = placeholder;
        this.maxItems = maxItems;

        this._onSubmenuChange = () => {
            this._refreshLabel();
        };
    }

    _refreshLabel() {
        let selectedItems = this.submenu.selectable.getSelectedItems(),
            labels = [],
            btn = this.buttonElement;

        for(let item of selectedItems) {
            labels.push(SelectDropDown.getItemLabel(item));
        }

        if(!labels.length) {
            this.setText(this.placeholder);
            btn.classList.add('has-placeholder');
        } else {
            if(this.maxItems >= 0 && this.maxItems < labels.length) {
                if(labels.length === 1) {
                    this.setText("1 Item Selected")
                } else {
                    this.setText(`${labels.length} Items Selected`);
                }
            } else {
                this.setText(labels.join(this.delimiter));
            }

            btn.classList.remove('has-placeholder');
        }
    }

    setText(value) {
        let button = this.buttonElement,
            label = button.querySelector('label, [data-role="label"]');

        label = label || button;

        emptyElement(label);
        label.appendChild(document.createTextNode(value));
    }

    attachMenu(submenu) {
        submenu.on('selectable.change', this._onSubmenuChange);
        this._refreshLabel();
    }

    detachMenu() {
        let submenu = this.submenu;

        if(submenu) {
            submenu.off('selectable.change', this._onSubmenuChange);
        }

        return submenu;
    }

    static getItemLabel(item) {
        let button = findChild(item, (child) => child.matches('button, input[type="button"], a, [data-role="button"]')),
            label = button.querySelector('[data-role="label"]');

        if(label) {
            return label.textContent;
        } else {
            return button.textContent;
        }
    }

    get multiple() {
        return this.submenu.selectable.multiple;
    }

    set multiple(value) {
        this.submenu.selectable.multiple = value;
    }

    get deselectOn() {
        return this.submenu.selectable.deselectOn;
    }

    set deselectOn(value) {
        this.submenu.selectable.deselectOn = value;
    }

    get multiSelectOn() {
        return this.submenu.selectable.multiSelectOn;
    }

    set multiSelectOn(value) {
        this.submenu.selectable.multiSelectOn = value;
    }

    get rangeSelectOn() {
        return this.submenu.selectable.rangeSelectOn;
    }

    set rangeSelectOn(value) {
        this.submenu.selectable.rangeSelectOn = value;
    }

    getValue() {
        return this.submenu.getValue();
    }

    setValue(value) {
        this.submenu.setValue(value);
    }

    /**
     *
     * @param element
     * @constructor
     */
    static FromSelect(element) {
        console.log("Building from select.");
    }

    static FromHTML(element) {
        console.log("Building select dropdown from markup");

        if(typeof element === 'string') {
            element = document.querySelector(element);
        }

        let options = Attribute.deserialize(element.dataset, {
            closeOnBlur: new Attribute(parseBoolean),
            closeOnSelect: new Attribute(parseBoolean),
            timeout: new Attribute(parseBooleanOrInt),
            autoActivate: new Attribute(parseBooleanOrInt),
            toggle: new Attribute(choice("on", "off", "both")),
            delimiter: null,
            placeholder: null,
            multiple: new Attribute(parseBoolean),
            maxItems: new Attribute(parseIntValue)
        });

        options.target = element;

        let multiple = options.multiple || false;
        delete options.multiple;

        let menu = findChild(element, (child) => child.dataset.role === 'menu');

        if(!menu) {
            throw new Error("Couldn't initialize select.  Couldn't find child menu.  Did you forget to add data-role?");
        }

        let select = new SelectDropDown(options);
        select.attachMenu(new SelectMenu({target: menu}));

        console.log(multiple);
        select.multiple = multiple;

        return select;
    }
}


AutoLoader.register('dropdown', (element) => {
    return DropDown.widget({target: element});
});


AutoLoader.register('select', (element) => {
    if(element.nodeName === "SELECT") {
        return SelectDropDown.FromSelect(element);
    } else {
        return SelectDropDown.FromHTML(element);
    }
});
