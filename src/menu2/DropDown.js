import MenuItem from "./MenuItem";
import AutoLoader from "autoloader";
import MenuBar from "./MenuBar";


export default class DropDown extends MenuItem {
    constructor({toggle="both", ...options}) {
        super({toggle, ...options});
        this.init();
    }
}


AutoLoader.register('dropdown', (element) => DropDown.FromHTML(element));
