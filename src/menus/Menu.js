import MenuNode from './MenuNode';
import {getMenuNode, getClosestMenu, getClosestMenuItem, getClosestMenuNode, isMenuItem} from './core';
import {parseBoolean, parseBooleanOrInt, validateChoice} from 'core/utility';
import MenuItem from "./MenuItem";


export default class Menu extends MenuNode {
    static POSITIONERS = {};

    constructor({target=null, closeOnBlur=false, timeout=false, autoActivate=0, delay=false, multiple=false,
                toggleItem='both', toggleMenu='off', closeOnSelect=false, nodeName='ul', position=null}={}) {
        let element;

        if(!target) {
            element = document.createElement(nodeName);
        } else if(typeof target === 'string') {
            element = document.querySelector(target);
        } else {
            element = target;
        }

        element.classList.add('c-menu');
        element.dataset.role = 'menu';

        super(element);

        /**
         * Controls how long after the user moves off the menu that it will timeout.
         * @type {boolean|Number}
         */
        this.timeout = parseBooleanOrInt(timeout, 10);

        /**
         * If a number greater then or equal to 0, this property controls how long the user must hover over an item
         * for the menu to activate.  If the value is false or a negative number the menu will never auto activate.
         * If true or 0 the menu will activate immediately.
         * @type {boolean|Number}
         */
        this.autoActivate = parseBooleanOrInt(autoActivate, 10);
        this.delay = parseBooleanOrInt(delay, 10);
        this.multiple = parseBoolean(multiple);
        this.position = position;

        this.toggleItem = validateChoice(toggleItem, ['on', 'off', 'both', 'none']);
        this.toggleMenu = validateChoice(toggleMenu, ['on', 'off', 'both', 'none']);

        this.menuNodeType = "menu";
        this.isMenu = true;

        this.visible = false;

        this._onMouseOver = this.onMouseOver.bind(this);
        this._onMouseOut = this.onMouseOut.bind(this);
        this._onClick = this.onClick.bind(this);
        this.element.addEventListener('mouseover', this._onMouseOver);
        this.element.addEventListener('mouseout', this._onMouseOut);
        this.element.addEventListener('click', this._onClick);

        this.closeOnBlur = parseBoolean(closeOnBlur);
        this.closeOnSelect = parseBoolean(closeOnSelect);
    }

    activate() {
        if(!this.isActive) {
            this.isActive = true;

            let parent = this.parent;

            if(parent && !parent.isActive) {
                parent.activate();
            }

            this.trigger('activate', this);
        }
    }

    deactivate() {
        if(this.isActive) {
            this.isActive = false;

            for(let child of this.activeItems) {
                child.deactivate();
            }

            this.trigger('deactivate', this);
        }
    }

    show() {
        if(!this.visible) {
            this.visible = true;

            if(this.position) {
                let position = this.position;

                if(typeof position === 'string') {
                    position = Menu.POSITIONERS[position];
                }

                position.call(this, this);
            }

            this.trigger('show', this);
        }
    }

    hide() {
        if(this.visible) {
            this.visible = false;
            this.trigger("hide", this);
        }
    }

    add(item) {
        this.element.appendChild(item.element);
        return item;
    }

    onMouseOver(event) {
        // Clear the timeout timer if it exists.
        if(this._timeoutTimer) {
            clearTimeout(this._timeoutTimer);
            this._timeoutTimer = null;
        }

        let targetMenu = getClosestMenu(event.target);

        // Ignore event if the menu was not the primary target.
        if(!targetMenu) {
            return;
        }

        let targetItem = getClosestMenuItem(event.target);

        if(targetItem && !targetItem.element.contains(event.relatedTarget)) {
            targetItem.onMouseEnter(event);
        }
    }

    onMouseOut(event) {
        if(this.isActive && typeof this.timeout === 'number' && this.timeout >= 0 && !this.element.contains(event.relatedTarget)) {
            this._timeoutTimer = setTimeout(() => {
                this._timeoutTimer = null;
                this.deactivate();
            }, this.timeout);
        }

        let targetItem = getClosestMenuItem(event.target, this.element);

        if(targetItem && targetItem.parent === this && !targetItem.element.contains(event.relatedTarget)) {
            targetItem.onMouseLeave(event);
        }
    }

    onClick(event) {
        let target = getClosestMenuNode(event.target, this.element);

        if(this.isActive && target === this && (this.toggleMenu === 'off' || this.toggleMenu === 'both')) {
            this.deactivate();
        } else if(!this.isActive && target === this && (this.toggleMenu === 'on' || this.toggleMenu === 'both')) {
            this.activate();
        }

        if(target.parent === this && isMenuItem(target)) {
            target.onClick(event);
        }
    }

    get activeItems() {
        let r = [];

        for(let child of this.children) {
            if(child.isActive) {
                r.push(child);
            }
        }

        return r;
    }

    get children() {
        let r = [];

        for(let element of this.element.querySelectorAll('[data-role="menuitem"], [data-role="menu"]')) {
            let menuNode = getMenuNode(element);

            if(menuNode && menuNode.parent === this) {
                r.push(menuNode);
            }
        }

        return r;
    }

    get visible() {
        return !this.element.classList.contains('hidden');
    }

    set visible(value) {
        if(value && !this.visible) {
            this.element.classList.remove('hidden');
            this.element.classList.add('visible');
        } else if(!value && this.visible) {
            this.element.classList.add('hidden');
            this.element.classList.remove('visible');
        }
    }

    get closeOnBlur() {
        return !!this._closeOnBlurEvents;
    }

    set closeOnBlur(value) {
        value = !!value;

        if(value && !this.closeOnBlur) {
            let doc = document;

            this._closeOnBlurEvents = {doc: doc, clickCaptured: false};

            this._closeOnBlurEvents.onDocumentClick = (event) => {
                if(!this.element.contains(event.target)) {
                    this.deactivate();

                    // Just in case the menu ended up deactivated for whatever reason and the onDeactivate trigger
                    // didn't run.
                    if(this._closeOnBlurEvents.clickCaptured) {
                        doc.removeEventListener('click', this._closeOnBlurEvents.onDocumentClick);
                        this._closeOnBlurEvents.clickCaptured = false;
                    }
                }
            };

            this._closeOnBlurEvents.onActivate = () => {
                if(!this._closeOnBlurEvents.clickCaptured) {
                    doc.addEventListener('click', this._closeOnBlurEvents.onDocumentClick);
                    this._closeOnBlurEvents.clickCaptured = true;
                }
            };

            this._closeOnBlurEvents.onDeactivate = () => {
                doc.removeEventListener('click', this._closeOnBlurEvents.onDocumentClick);
                this._closeOnBlurEvents.clickCaptured = false;
            };

            this.on('activate', this._closeOnBlurEvents.onActivate);
            this.on('deactivate', this._closeOnBlurEvents.onDeactivate);
        } else if(!value && this.closeOnBlur) {
            this.off('activate', this._closeOnBlurEvents.onActivate);
            this.off('deactivate', this._closeOnBlurEvents.onDeactivate);
            this._closeOnBlurEvents.doc.removeEventListener('click', this._closeOnBlurEvents.onDocumentClick);
            this._closeOnBlurEvents = null;
        }
    }

    get closeOnSelect() {
        return this._closeOnSelect;
    }

    set closeOnSelect(value) {
        if((value === 'child' || value === true) && !this._closeOnSelectHandler) {
            this._closeOnSelectHandler = (event) => {
                if(this.closeOnSelect === true || this.closeOnSelect === 'child' && event.detail.item.parent === this) {
                    this.deactivate();
                }
            };

            this.element.addEventListener('item-select', this._closeOnSelectHandler);
        } else if(value === false && this._closeOnSelectHandler) {
            this.element.removeEventListener('item-select', this._closeOnSelectHandler);
            this._closeOnSelectHandler = null;
        }

        this._closeOnSelect = value;
    }

    static buildFromHTML(selector, {submenus=null, items=null, options=null}={}) {
        if(typeof selector === 'string') {
            selector = document.querySelector(selector);
        }

        submenus = submenus || {};
        items = items || {};
        options = options || {};
        let root = new this({target: selector, ...selector.dataset, ...options});

        for(let element of root.element.querySelectorAll('[data-role="menu"]')) {
            new Menu({target: element, ...element.dataset, ...submenus});
        }

        for(let element of root.element.querySelectorAll('[data-role="menuitem"]')) {
            new MenuItem({target: element, ...element.dataset, ...items});
        }

        return root;
    }
}
