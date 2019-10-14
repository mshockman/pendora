import MenuNode from "./MenuNode";


export default class Menu extends MenuNode {
    constructor() {
        super();
        this.menuNodeType = "menu";
    }

    render() {
        return `
            <div class="menu">
                <div class="menu__arrow"></div>
                <ul class="menu__body">
                    {% for item in this.children %}
                        {{ item }}
                    {% endfor %}
                </ul>
            </div>
        `;
    }

    activate() {
        if(!this.isActive) {
            this.isActive = true;

            if(this.parent) {
                this.parent.trigger('submenu.activate', this);
            }

            this.element.trigger(new CustomEvent('menu.activate', {
                detail: this,
                bubbles: true
            }));
        }
    }

    deactivate() {
        if(this.isActive) {
            this.isActive = false;

            this.element.trigger(new CustomEvent('menu.deactivate', {
                detail: this,
                bubbles: true
            }));
        }
    }

    show() {

    }

    hide() {

    }

    //------------------------------------------------------------------------------------------------------------------
    //

    addItem(text, action) {

    }

    removeItem(item) {

    }

    hasItem(item) {

    }

    append(item) {

    }

    get activeItems() {

    }

    clearItems() {

    }
}