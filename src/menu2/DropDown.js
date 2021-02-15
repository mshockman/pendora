import MenuItem from "./MenuItem";
import {createFragment} from "../core/utility";
import Menu from "./Menu";
import {POSITIONERS} from "./positioners";


export default class DropDown extends MenuItem {
    constructor({text=null, element=null}) {
        if(!element) {
            element = dropDownTemplate({text});
        }

        super({element, closeOnBlur: true, positioner: POSITIONERS.dropdown, toggle: true, autoActivate: false, activateOnMouseOver: false, closeOnSelect: true});

        this.attachMenu(new Menu());

        this.initController();
    }
}


function dropDownTemplate(context) {
    return createFragment(`
        <div class="dropdown"><button type="button">${context.text}</button></div>
    `).firstElementChild;
}