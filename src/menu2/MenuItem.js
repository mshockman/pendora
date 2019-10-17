import MenuNode from "./MenuNode";


export default class MenuItem extends MenuNode {
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

        if(this.parent) {
            if(!this.parent.isActive) {
                this.parent.activate();
            }

            this.parent.setActiveItem(this);
        }

        this.clearTimer('activateItem');

        if(this.submenu) {
            this.submenu.show();
        }

        this.publish('activate', this);

        if(this.parent) {
            this.publish('menuitem.activate', this);
        }

        this.element.dispatchEvent(new CustomEvent('menuitem.activate', {
            detail: this,
            bubbles: true
        }));
    }

    deactivate() {
        if(!this.isActive) return;

        if(this.submenu) {
            this.submenu.deactivate();
            this.submenu.hide();
        }

        this.publish('deactivate', this);
        if(this.parent) this.parent.publish('menuitem.deactivate', this);

        this.element.dispatchEvent(new CustomEvent('menuitem.deactivate', {
            detail: this,
            bubbles: true
        }));
    }

    select() {
        let o = this;

        while(o) {
            o.publish('menuitem.selected', this);
            o = o.parent;
        }

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

    }

    removeAction(action) {

    }

    hasAction(action) {

    }

    clearActions() {

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

    //------------------------------------------------------------------------------------------------------------------
    // Event handlers

    onClick(event) {
        console.log("click");

        if(this.isDisabled) {
            event.preventDefault();
        }

        if(this.hasSubMenu()) {
            if(this.isActive && this.toggleOff) {
                this.deactivate();
            } else if(!this.isActive && this.toggleOn) {
                this.activate();
            }
        } else {
            if(!this.isActive && this.toggleOn) {
                this.activate();
            }

            this.select();
        }
    }

    onMouseOver(event) {
        if(!this.element.contains(event.relatedTarget)) return;

        let parent = this.parent;

        if(!this.isActive && !this.isDisabled) {
            if(parent.isActive) {
                if(parent.openOnHover === true) {
                    this.activate();
                } else if(typeof parent.openOnHover === 'number' && parent.openOnHover >= 0) {
                    this.startTimer('activateItem', () => {
                        if(!this.isDisabled) {
                            this.activate();
                        }
                    }, parent.openOnHover);
                }
            } else {
                if(parent.autoActivate === true) {
                    this.activate();
                } else if(typeof parent.autoActivate === 'number' && parent.autoActivate >= 0) {
                    this.startTimer('activateItem', () => {
                        if(!this.isDisabled) {
                            this.activate();
                        }
                    }, parent.autoActivate);
                }
            }
        }

        if(!parent.multiple && parent.deactivateOnItemHover) {
            this.clearItems();
        }
    }

    onMouseOut(event) {
        if(this.isActive && !this.hasSubMenu()) {

        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Getters and Setters

    get autoActivate() {

    }

    set autoActivate(value) {

    }

    get openOnHover() {

    }

    set openOnHover(value) {

    }

    get timeout() {

    }

    set timeout(value) {

    }

    get closeOnBlur() {

    }

    set closeOnBlur(value) {

    }

    get toggle() {

    }

    set toggle(value) {

    }

    get closeOnSelect() {

    }

    set closeOnSelect(value) {

    }
}