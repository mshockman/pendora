import MenuNode from "./MenuNode";


export default class DropDown extends MenuNode {
    constructor({target, text, closeOnBlur=true, timeout=false, autoActivate=false, toggle="both", closeOnSelect=true}) {
        super();

        this.menuNodeType = "dropdown";

        this.closeOnBlur = closeOnBlur;
        this.timeout = timeout;
        this.autoActivate = autoActivate;
        this.toggle = toggle;
        this.closeOnSelect = closeOnSelect;

        if(target) {
            this.element = target;
        } else {
            this.element = this.render(text);
        }

        this.init();
    }

    render(text) {
        let element = document.createElement('div'),
            button = document.createElement('button');

        button.type = "button";
        button.innerHTML = text;

        element.appendChild(button);

        return element;
    }

    activate() {
        if(this.isActive) return; // Already active

        this.isActive = true;

        this.clearTimer('autoActivate');

        if(this.parent) {
            if(!this.parent.isActive) {
                this.parent.activate();
            }

            this.parent.setActiveItem(this, true);
        }
    }

    deactivate() {

    }

    onMouseOver(event) {

    }

    onMouseOut(event) {

    }

    onClick(event) {

    }
}
