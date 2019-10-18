import MenuNode from "./MenuNode";
import {inherit, publishTargetEvent} from "./decorators";


export default class MenuItem extends MenuNode {
    @inherit toggle;
    @inherit autoActivate;
    @inherit openOnHover;

    constructor({text, action, href=null, target, classes, nodeName="div", ...context}={}) {
        super();

        if(target) {
            this.element = target;
        } else {
            this.element = this.render({text, nodeName, href, ...context});
        }

        if(classes) {
            this.addClass(classes);
        }

        if(action) this.addAction(action);

        this.toggle = 'inherit';
        this.autoActivate = 'inherit';
        this.openOnHover = 'inherit';

        this.on('event.click', (target, event) => this.onClick(target, event));
        this.on('event.mouseover', (target, event) => this.onMouseOver(target, event));
        this.on('event.mouseout', (target, event) => this.onMouseOut(target, event));
    }

    render({text, nodeName="div", href=null}={}) {
        let element = document.createElement(nodeName),
            button = document.createElement('a');

        element.className = "menuitem";
        button.type = "button";
        button.innerHTML = text;
        button.className = "menuitem__button";

        if(href) {
            button.href = href;
        }

        element.appendChild(button);
        return element;
    }

    activate() {
        if(this.isActive) return;
        this.isActive = true;

        this.clearTimer('activateItem');

        if(this.submenu) {
            this.submenu.show();
        }

        this.publish('activate', this);

        if(this.parent) {
            this.parent.publish('activate', this);
        }

        this.element.dispatchEvent(new CustomEvent('menuitem.activate', {
            detail: this,
            bubbles: true
        }));
    }

    deactivate() {
        if(!this.isActive) return;
        this.isActive = false;

        if(this.submenu) {
            this.submenu.deactivate();
            this.submenu.hide();
        }

        this.publish('deactivate', this);
        if(this.parent) this.parent.publish('deactivate', this);

        this.element.dispatchEvent(new CustomEvent('menuitem.deactivate', {
            detail: this,
            bubbles: true
        }));
    }

    select() {
        this.publish('selected');
        this.dispatchTopic('menuitem.selected', this);

        this.element.dispatchEvent(new CustomEvent('menuitem.selected', {
            detail: this,
            bubbles: true
        }));
    }

    isMenuItem() {
        return true;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Action management

    addAction(action) {
        if(typeof action === 'string') {
            let fn = () => {
                window.location = action;
            };

            this.on('selected', fn);
            return fn;
        } else {
            this.on('selected', action);
            return action;
        }
    }

    removeAction(action) {
        this.off('selected', action);
    }

    hasAction(action) {
        return this.hasEvent('selected', action);
    }

    clearActions() {
        this.off('selected');
    }

    //------------------------------------------------------------------------------------------------------------------
    // Manage submenu

    attachSubMenu(submenu) {
        if(this.submenu) {
            throw new Error("MenuItem can only have one submenu.");
        }

        if(submenu.parent) {
            submenu.parent.detachSubMenu();
        }

        submenu._parent = this;
        this._children = [submenu];

        if(!submenu.element.parentElement) {
            submenu.appendTo(this.element);
        }
    }

    detachSubMenu(remove=true) {
        let submenu = this.submenu;

        if(submenu) {
            this._children = [];
            submenu._parent = null;
            if(remove) submenu.remove();
        }

        return submenu;
    }

    hasSubMenu() {
        return !!this.submenu;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event handlers

    onClick(target, event) {
        console.log("hello");

        if(this.isDisabled) {
            event.preventDefault();
        }

        if(target !== this) return;

        if(this.parent) {
            this.parent.publish('click-item', this, event);
        }

        if(!this.isActive && this.toggleOn) {
            this.activate();
        } else if(this.isActive && this.toggleOff && this.hasSubMenu()) {
            this.deactivate();
        }

        if(this.isActive && !this.hasSubMenu()) {
            this.select();
        }
    }

    onMouseOver(target, event) {
        if(this.element.contains(event.relatedTarget)) return;

        // When the mouse moves on an item clear any active items in it's submenu.
        if(this.submenu) {
            this.submenu.clearItems();
        }

        let activate = this.parent && this.parent.isActive ? this.openOnHover : this.autoActivate;

        if(this.parent) {
            this.parent.publish('mouse-enter-item', this, event);
        }

        if(!this.isActive && !this.isDisabled) {
            if(activate === true) {
                this.activate();
            } else if(typeof activate === 'number' && activate >= 0) {
                this.startTimer('activateItem', () => {
                    if(!this.isDisabled) {
                        this.activate();
                    }
                }, activate);
            }
        }
    }

    onMouseOut(target, event) {
        if(this.element.contains(event.relatedTarget)) return;

        this.clearTimer('activateItem');

        if(this.parent) {
            this.parent.publish('mouse-leave-item', this, event);
        }

        if(!this.hasSubMenu() && this.isActive) {
            this.deactivate();
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Getters and Setters

    /**
     * Will return true if menu items should toggle on.
     *
     * @returns {boolean}
     */
    get toggleOn() {
        return this.toggle === 'on' || this.toggle === 'both';
    }

    /**
     * Will return true if menu items should toggle off.
     *
     * @returns {boolean}
     */
    get toggleOff() {
        return this.toggle === 'off' || this.toggle === 'both';
    }

    get submenu() {
        return this._children[0];
    }

    set submenu(value) {
        if(!value) {
            this.detachSubMenu();
        } else {
            this.attachSubMenu(value);
        }
    }
}