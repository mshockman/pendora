import Menu from "./Menu";
import MenuItem from "./MenuItem";
import {POSITIONERS} from "./positioners";
import {MenuNodeTopic} from "./MenuNode";
import {createFragment} from "../core/utility";
import DropDown from "./DropDown";


function selectOptionTemplate(context) {
    return createFragment(`
       <div data-controller="menuitem" class="select-option" aria-role="option">
            <a class="select-option__body">
                <span class="select-option__check" data-controller="checkmark"><i class="fas fa-check" aria-hidden="true"></i></span>
                <span data-controller="text" class="select-option__text">Blueberry</span>
                <span data-controller="alt" class="select-option__alt"></span>
            </a>
        </div>
    `).firstElementChild;
}


function selectMenuTemplate(context) {
    return createFragment(`
        <div class="select-menu">
            <div class="select-menu__content-wrapper">
                <div class="select-menu__header" data-controller="menu-header"></div>
                <div class="select-menu__body" data-controller="menu-body"></div>
                <div class="select-menu__footer" data-controller="menu-footer""></div>
            </div>
        </div>
    `).firstElementChild;
}


export default class SelectMenu extends Menu {
    constructor({element=null, multiple=false, closeOnBlur=false, timeout=false, positioner=POSITIONERS.inherit, closeOnSelect=false, multiSelect=false}={}) {
        if(!element) {
            element = selectMenuTemplate();
        }

        super({element, multiple, closeOnBlur, closeOnSelect, timeout, positioner});
        this.element.classList.add("select-menu");
        this.multiSelect = multiSelect;
    }

    getSelection() {
        let r = [];

        for(let child of this.children) {
            if(child.isSelected) {
                r.push(child);
            }
        }

        return r;
    }

    clearSelection() {
        this.clearActiveItems();
    }
}


export class SelectMenuOption extends MenuItem {
    constructor({element=null, text=null, value=null, toggle=false, altText=null, icon=null, checkmark=null, toggleOnCtrlClick=true, activateOnSelect=true, deactivateOnDeselect=false}) {
        if(!element) {
            element = selectOptionTemplate({text, checkmark, altText, icon});
        }

        super({element, text, autoActivate: true, toggle, timeout: false, activateOnMouseOver: true, activateOnClick: true, activateOnSelect: true});
        this.value = value;
        this.toggleOnCtrlClick = toggleOnCtrlClick;
        this.activateOnSelect = activateOnSelect;
        this.deactivateOnDeselect = deactivateOnDeselect;
        this.element.classList.add("select-option");
    }

    select(topicData=null) {
        if(this.activateOnSelect && !this.isActive) {
            this.activate();
        }

        if(!this.isSelected) {
            this.isSelected = true;
        }

        setTimeout(() => this.dispatchTopic(new MenuNodeTopic("menuitem.deselect"), topicData), 0);
    }

    deselect(topicData=null) {
        if(this.deactivateOnDeselect && this.isActive) {
            this.deactivate();
        }

        if(this.isSelected) {
            this.isSelected = false;
        }

        setTimeout(() => this.dispatchTopic(new MenuNodeTopic("menuitem.deselect", topicData)), 0);
    }

    onClick(topic) {
        if(topic.target !== this || this.getDisabled()) return;

        if(!this.isSelected) {
            this.select({trigger: topic});
        } else if(this.isSelected && (this.toggle || (topic.originalEvent.ctrlKey && this.toggleOnCtrlClick))) {
            this.deselect({trigger: topic});
        }
    }

    get isSelected() {
        return this.element.classList.contains("selected");
    }

    set isSelected(value) {
        this.element.classList[value ? "add" : "remove"]("selected");
    }
}


export class RichSelect extends DropDown {
    constructor({element=null, placeholder=null, widget=null, multiple=false}={}) {
        if(!element) {
            element = createFragment(`
                <div class="rich-select">
                    <div class="rich-select__btn"><input class="rich-select__text" type="text" data-controller="text" readonly /><span data-controller="arrow" class="rich-select__arrow"><i class="fas fa-sort-down"></i></span></div>
                </div>
            `).firstElementChild;
        }

        super({element});
        this.placeholder = placeholder;
        this.widget = widget;
        this.element.classList.add("rich-select");
        this.detachMenu();
        this.attachMenu(new SelectMenu({multiple}));
    }

    get options() {
        return this.submenu.children;
    }

    getSelection() {
        return this.submenu.getSelection();
    }

    addOption(option) {
        this.submenu.appendItem(option);
    }
}