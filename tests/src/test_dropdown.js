import DropDown from "menus/DropDown";
import {MenuItem} from "menus";


window.DropDown = DropDown;


export default class TestDropDown {
    load() {
        this.dropDown = new DropDown({text: "Hello World!", closeOnBlur: true, timeout: 1000, closeOnSelect: false});
        this.dropDown.appendTo("#output1");

        this.dropDown.menu.append(new MenuItem("Test 1"));
        this.dropDown.menu.append(new MenuItem("Test 2"));
        this.dropDown.menu.append(new MenuItem("Test 3"));
        this.dropDown.menu.append(new MenuItem("Test 4"));
        this.dropDown.menu.append(new MenuItem("Test 5"));
        window.test = this.dropDown;
    }
}
