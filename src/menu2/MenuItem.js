import MenuNode from "./MenuNode";


export default class MenuItem extends MenuNode {
    constructor({text, action, target, classes, nodeName="div"}={}) {
        super();

        if(target) {
            this.element = target;
        } else {
            this.element = this.render({text, nodeName});
        }

        if(classes) {
            this.addClass(classes);
        }
    }

    render({text, nodeName="div"}) {
        let element = document.createElement(nodeName),
            button = document.createElement('a');

        element.className = "menuitem";
        button.type = "button";
        button.innerHTML = text;
        a.className = "menuitem__button";

        element.appendChild(button);
    }

    activate() {
        if(this.isActive) return;

        this.clearTimer('autoActivate');

        if(this.parent) {
            if(!this.parent.isActive) {
                this.parent.activate();
            }

            this.parent.setActiveItem(this, true);
        }

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

    }

    detachSubMenu() {

    }

    hasSubMenu() {

    }

    get submenu() {

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

    }

    onMouseOver(event) {

    }

    onMouseOut(event) {

    }

    //------------------------------------------------------------------------------------------------------------------
    // Getters and Setters
}