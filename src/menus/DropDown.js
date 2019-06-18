import MenuNode from "./MenuNode";
import Menu from "./Menu";
import {getMenuNode, isMenu} from "./core";
import {findChild, parseBoolean, parseBooleanOrInt, validateChoice} from 'core/utility';
import MenuItem from "./MenuItem";
import AutoLoader from 'autoloader';


export class DropDown extends MenuNode {
    constructor({target=null, text='', closeOnBlur=false, timeout=false, autoActivate=false, toggle="both",
                    closeOnSelect=true, position=null}={}) {
        let element,
            btn,
            menu;

        if(!target) {
            element = document.createElement('div');
            btn = document.createElement("button");
            btn.type = 'button';
            btn.innerHTML = text;

            element.appendChild(btn);
            menu = new Menu();

            element.appendChild(btn);
            element.appendChild(menu.element);
        } else {
            element = target;
            btn = findChild(element, (child) => child.dataset.role === 'button');
            menu = findChild(element, (child) => child.dataset.role === 'menu');
            menu = new Menu({target: menu});
        }

        super(element, 'dropdown');
        this.menu = menu;
        this.button = btn;
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
            this.boundEvents.onSelect = this.onSelect.bind(this);

            this.element.addEventListener('mouseover', this.boundEvents.onMouseOver);
            this.element.addEventListener('mouseout', this.boundEvents.onMouseOut);
            this.element.addEventListener('click', this.boundEvents.onClick);
            this.element.addEventListener('item-select', this.boundEvents.onSelect);
        }
    }

    destroyEvents() {
        if(this.isMenuController) {
            this.isMenuController = false;

            this.element.removeEventListener('mouseover', this.boundEvents.onMouseOver);
            this.element.removeEventListener('mouseout', this.boundEvents.onMouseOut);
            this.element.removeEventListener('click', this.boundEvents.onClick);
            this.element.removeEventListener('item-select', this.boundEvents.onSelect);

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

            let submenu = this.submenu,
                parent = this.parent;

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

            let submenu = this.submenu;

            if(submenu) {
                submenu.deactivate();
                submenu.hide();
            }

            this.trigger('deactivate', this);
        }
    }

    add(item) {
        return this.menu.add(item);
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

        if(event.target === this.button || this.button.contains(event.target)) {
            let isActive = this.isActive;

            if(!isActive && (this.toggle === "on" || this.toggle === 'both')) {
                this.activate();
            } else if(isActive && (this.toggle === "off" || this.toggle === "both")) {
                this.deactivate();
            }
        }
    }

    onSelect(event) {
        if(this.closeOnSelect === true || (this.closeOnSelect === 'child' && event.detail.item.parent === this)) {
            this.deactivate();
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // GETTERS AND SETTERS METHODS
    //------------------------------------------------------------------------------------------------------------------

    get submenu() {
        for(let element of this.element.children) {
            let node = getMenuNode(element);

            if(node && isMenu(node)) {
                return node;
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // STATIC FUNCTIONS
    //------------------------------------------------------------------------------------------------------------------

    static FromHTML(selector, config={}) {
        if(typeof selector === 'string') {
            selector = document.querySelector(selector);
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


AutoLoader.register('dropdown', (element) => {
    return DropDown.widget({target: element});
});
