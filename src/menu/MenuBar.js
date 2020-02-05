import Menu, {AbstractMenu} from "./Menu";
import MenuItem from './MenuItem';
import * as positioners from "./positioners";
import {createFragment, findChild} from "../core/utility";


export class MenuBarItem extends MenuItem {
    render({target, text, nodeName='div', href=null}={}) {
        let content = null;

        if(target) {
            this.element = target;

            let btn = findChild(this.element, '[data-button]');

            if(!btn) {
                content = document.createDocumentFragment();

                while(this.element.firstChild) {
                    content.appendChild(this.element.firstChild);
                }

                this.element.appendChild(createFragment(`
                <a class="menuitem__button" data-button>${text}</a>`));
            }
        } else {
            let element = document.createElement(nodeName);
            element.appendChild(createFragment(`<a class="menuitem__button" data-button>${text}</a>`));
            this.element = element;
        }

        this.button = this.element.querySelector("[data-button]");
        this.textContainer = this.element.querySelector("[data-text]") || this.button;
        this.element.classList.add('menuitem');

        if(content) {
            this.textContainer.appendChild(content);
        }

        if(text !== null && text !== undefined) {
            this.text = text;
        }

        if(href !== null) this.href = href;
        this.element.tabIndex = -1;
    }
}


export default class MenuBar extends AbstractMenu {
    constructor({target=null, closeOnBlur=true, timeout=false, autoActivate=false, multiple=false, openOnHover=true,
                    toggle=true, closeOnSelect=true, delay=false, enableKeyboardNavigation=true, ...context}={}) {

        if(!target) {
            target = document.createElement('div');
        }

        super({
            closeOnBlur, timeout, autoActivate, openOnHover, toggle, closeOnSelect, delay,
            positioner: positioners.DROPDOWN,
            direction: 'horizontal',
            target,
            ...context
        });

        this.element.classList.add('menubar');
        this.isVisible = true;
        this.parseDOM();
        this.registerTopics();
        this.init();

        this.initKeyboardNavigation();
    }

    getMenuBody() {
        return [this.element];
    }

    constructMenuItem(config) {
        return new MenuBarItem(config);
    }

    constructSubMenu(config) {
        return new Menu(config);
    }
}


export class SideMenuBar extends MenuBar {
    constructor(config={}) {
        super(config);
        this.direction = 'vertical';
        this.positioner = positioners.SIDE_MENU;

        this.element.classList.remove('menubar');
        this.element.classList.add('side-menu-bar');
    }

    constructMenuItem(config) {
        return new MenuItem(config);
    }
}
