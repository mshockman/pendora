import Menu from "../../../../../src/menu2/Menu";
import MenuItem from "../../../../../src/menu2/MenuItem";
import {POSITIONERS} from "../../../../../src/menu2/positioners";
import DropDown from "../../../../../src/menu2/DropDown";


export default class TestMenuPage {
    load() {
        this.test2();
    }

    test2() {
        let cont1 = document.querySelector("#menu1-cont");

        let dropdown = new DropDown({text: "Test Dropdown"});

        for(let i = 0; i < 5; i++) {
            let menuitem = new MenuItem({text: `Item ${i}`, timeout: true});
            dropdown.submenu.appendItem(menuitem);
        }

        dropdown.appendTo(cont1);
    }

    test1() {
        let cont1 = document.querySelector("#menu1-cont");

        let menu = new Menu({timeout: 1000, closeOnBlur: true});
        menu.appendTo(cont1);

        for(let i = 0; i < 5; i++) {
            let menuitem = new MenuItem({text: `Item ${i}`, autoActivate: false, toggle: true, activateOnMouseOver: false});
            menu.appendItem(menuitem);

            let submenu = this.createSubMenu(`Submenu ${i} Item`, 5);
            menuitem.attachMenu(submenu);
        }

        menu.show();

        menu.on("menuitem.select", topic => {
            console.log(topic);
        });
    }

    createSubMenu(name, items) {
        let submenu = new Menu({positioner: POSITIONERS.submenu});

        for(let i = 0; i < items; i++) {
            let menuitem = new MenuItem({text: `${name} ${i}`, autoActivate: true, timeout: true});
            submenu.appendItem(menuitem);
        }

        return submenu;
    }
}