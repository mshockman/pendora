import MenuNode from './MenuNode';
import {getMenuNode, getClosestMenu, getClosestMenuItem, getClosestMenuNode, isMenuItem} from './core';


export default class Menu extends MenuNode {
    constructor({target=null, closeOnBlur=false, timeout=false, autoActivate=0, delay=false, multiple=false,
                toggleItem='both', toggleMenu='off'}={}) {
        let element;

        if(!target) {
            element = document.createElement('ul');
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
        this.timeout = timeout;

        /**
         * If a number greater then or equal to 0, this property controls how long the user must hover over an item
         * for the menu to activate.  If the value is false or a negative number the menu will never auto activate.
         * If true or 0 the menu will activate immediately.
         * @type {boolean|Number}
         */
        this.autoActivate = autoActivate;
        this.delay = delay;
        this.multiple = multiple;

        this.toggleItem = toggleItem;
        this.toggleMenu = toggleMenu;

        this.menuNodeType = "menu";

        this.visible = false;

        this._onMouseOver = this.onMouseOver.bind(this);
        this._onMouseOut = this.onMouseOut.bind(this);
        this._onClick = this.onClick.bind(this);
        this.element.addEventListener('mouseover', this._onMouseOver);
        this.element.addEventListener('mouseout', this._onMouseOut);
        this.element.addEventListener('click', this._onClick);

        if(closeOnBlur) {
            let doc = document,
                clickCaptured = false;

            this._closeOnBlurEvents = {};

            this._closeOnBlurEvents.onDocumentClick = () => {
                if(!this.element.contains(event.target)) {
                    this.deactivate();

                    // Just in case the menu ended up deactivated for whatever reason and the onDeactivate trigger
                    // didn't run.
                    if(clickCaptured) {
                        doc.removeEventListener('click', this._closeOnBlurEvents.onDocumentClick);
                        clickCaptured = false;
                    }
                }
            };

            this._closeOnBlurEvents.onActivate = () => {
                if(!clickCaptured) {
                    doc.addEventListener('click', this._closeOnBlurEvents.onDocumentClick);
                    clickCaptured = true;
                }
            };

            this._closeOnBlurEvents.onDeactivate = () => {
                doc.removeEventListener('click', this._closeOnBlurEvents.onDocumentClick);
                clickCaptured = false;
            };

            this.on('activate', this._closeOnBlurEvents.onActivate);
            this.on('deactivate', this._closeOnBlurEvents.onDeactivate);
        }
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
        if(this.visible !== !!value) {
            this.element.classList.toggle('hidden');
        }
    }
}
