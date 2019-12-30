import MenuItem from "./MenuItem";
import * as positioners from "./positioners";

export default class DropDown extends MenuItem {
    constructor({toggle="both", closeOnSelect=true, closeOnBlur=true, ...options}) {
        super({toggle, closeOnSelect, closeOnBlur, ...options});
        this.positioner = positioners.DROPDOWN;
        this.init();
    }
}
