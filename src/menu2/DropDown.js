import MenuItem from "./MenuItem";
import AutoLoader from "autoloader";
import * as positioners from "./positioners";


export default class DropDown extends MenuItem {
    constructor({toggle="both", closeOnSelect=true, closeOnBlur=true, ...options}) {
        super({toggle, closeOnSelect, closeOnBlur, ...options});
        this.position = positioners.DROPDOWN;
        this.init();
    }
}


AutoLoader.register('dropdown', (element) => DropDown.FromHTML(element));
