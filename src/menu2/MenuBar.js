import Menu from "./Menu";
import {createFragment} from "../core/utility";
import {POSITIONERS} from "./positioners";
import MenuItem, {ACTIVATE, TOGGLE} from "./MenuItem";


export default class MenuBar extends Menu {
    constructor({element, closeOnBlur=true, timeout=false, closeOnSelect=true}={}) {
        if(!element) {
            element = createFragment(`
                <div class="menubar" data-controller="menu">
                    <div class="menubar__content-wrapper">
                        <div class="menubar__body" data-controller="menu-body"></div>
                    </div>
                </div>
            `).firstElementChild;
        }

        super({element, multiple: false, closeOnBlur, timeout, closeOnSelect, positioner: POSITIONERS.dropdown});

        this.isVisible = true;
        this.element.classList.add("menubar");

        this.toggle = true;
        this.autoActivate = ACTIVATE.whenParentActive();
    }
}


export class MenuBarItem extends MenuItem {
    constructor({element, text, icon, altText}) {
        super({element, text, altText, icon});

        this.toggle = (item, topic) => {
            return TOGGLE.getComputedValue(this.parent.toggle, item, topic);
        };

        this.autoActivate = (item, topic) => {
            return ACTIVATE.getComputedValue(this.autoActivate, item, topic);
        };

        this.attachMenu(new Menu());
    }
}
