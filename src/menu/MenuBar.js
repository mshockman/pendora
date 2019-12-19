import Menu, {AbstractMenu} from "./Menu";
import MenuItem, {AbstractMenuItem} from './MenuItem';
import AutoLoader from "autoloader";
import * as positioners from "./positioners";
import {createFragment} from "../core/utility";


export class MenuBarItem extends MenuItem {
    render({text='', nodeName='div'}={}) {
        let fragment = createFragment(`
            <${nodeName} class="menuitem">
                <a class="menuitem__button" data-button>${text}</a>
            </${nodeName}>
        `);

        return fragment.children[0];
    }
}


export default class MenuBar extends AbstractMenu {
    constructor({target=null, closeOnBlur=true, timeout=false, autoActivate=false, multiple=false, openOnHover=true,
                    toggle=true, closeOnSelect=true, delay=false, enableKeyboardNavigation=true, ...context}={}) {

        super({
            closeOnBlur, timeout, autoActivate, openOnHover, toggle, closeOnSelect, delay,
            positioner: positioners.DROPDOWN,
            direction: 'horizontal'
        });

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

    constructMenuItem(config) {
        return new MenuBarItem(config);
    }

    constructSubMenu(config) {
        return new Menu(config);
    }
}


AutoLoader.register('menubar', (element) => MenuBar.FromHTML(element));
