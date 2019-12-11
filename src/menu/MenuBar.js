import Menu, {AbstractMenu} from "./Menu";
import MenuItem from './MenuItem';
import AutoLoader from "autoloader";
import * as positioners from "./positioners";


export default class MenuBar extends AbstractMenu {
    constructor({target=null, closeOnBlur=true, timeout=false, autoActivate=false, multiple=false, openOnHover=true,
                    toggle=true, closeOnSelect=true, delay=false, enableKeyboardNavigation=true, ...context}={}) {

        class SubMenuClass extends Menu {
            constructor(args={}) {
                super({
                    delay,
                    SubMenuClass: SubMenuClass,
                    MenuItemClass: MenuItemClass,
                    ...args
                });
            }
        }

        class MenuItemClass extends MenuItem {
            constructor(args={}) {
                super({
                    MenuItemClass: MenuItemClass,
                    SubMenuClass: SubMenuClass,
                    ...args
                })
            }
        }

        super({
            closeOnBlur, timeout, autoActivate, openOnHover, toggle, closeOnSelect, delay,
            positioner: positioners.DROPDOWN,
            direction: 'horizontal',
            SubMenuClass: SubMenuClass,
            MenuItemClass: MenuItemClass
        });

        this.positioner = positioners.DROPDOWN;
        this.direction = 'horizontal';

        if(target) {
            this.element = target;
        } else {
            this.element = this.render(context);
        }

        this.isVisible = true;

        this.registerTopics();
        this.parseDOM();
        this.init();

        this.initKeyboardNavigation();
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
