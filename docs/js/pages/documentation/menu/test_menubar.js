import MenuBar, {MenuBarItem} from "../../../../../src/menu2/MenuBar";
import MenuItem, {ACTIVATE} from "../../../../../src/menu2/MenuItem";
import Menu from "../../../../../src/menu2/Menu";


export default class TestMenuBar {
    load() {
        let cont1 = document.querySelector("#menu1-cont"),
            menubar = new MenuBar();

        for(let i = 0; i < 5; i++) {
            let menuBarItem = new MenuBarItem({text: `Root ${i}`});

            this.createSubMenu(menuBarItem.submenu, 2, 5);

            menubar.appendItem(menuBarItem);
        }

        menubar.appendTo(cont1);
    }

    createSubMenu(submenu, depth=0, items=5) {
        for(let i = 0; i < items; i++) {
            let item = new MenuItem({text: `D${depth} I${i}`});

            if(depth > 0) {
                item.attachMenu(this.createSubMenu(new Menu(), depth-1, items));
            } else {
                item.href = `#${depth}${i}`;
            }

            submenu.appendItem(item);
        }

        return submenu;
    }
}