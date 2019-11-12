import Menu from "./Menu";
import AutoLoader from "autoloader";
import * as positioners from "./positioners";


export default class MenuBar extends Menu {
    constructor({target=null, closeOnBlur=true, timeout=false, autoActivate=false, multiple=false, openOnHover=true,
                    toggle="both", closeOnSelect=true, deactivateOnItemHover=true, delay=false, ...context}={}) {
        super({
            target, closeOnBlur, timeout, autoActivate, multiple, openOnHover,
            toggle, closeOnSelect, deactivateOnItemHover, delay: false, ...context
        });

        this.position = positioners.DROPDOWN;

        this.SubMenuClass = class SubMenu extends Menu {
            constructor(args={}) {
                super({
                    delay,
                    ...args
                });

                this.SubMenuClass = SubMenu;
            }
        };

        this.isVisible = true;
    }

    render(context) {
        let element = document.createElement('div');

        element.className = "menubar";

        return element;
    }

    getMenuBody() {
        return [this.element];
    }
}


AutoLoader.register('menubar', (element) => MenuBar.FromHTML(element));
