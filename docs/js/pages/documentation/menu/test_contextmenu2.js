import ContextMenu from "../../../../../src/menu2/ContextMenu";
import Rect from "../../../../../src/core/vectors/Rect";
import MenuItem from "../../../../../src/menu2/MenuItem";


export default class Test_contextmenu2 {
    load() {
        let area = document.querySelector("#context-menu-area");

        let contextMenu = new ContextMenu();
        contextMenu.appendTo(area);
        contextMenu.setTarget(area);
        contextMenu.container = () => Rect.getBoundingClientRect(area);

        for(let i = 0; i < 5; i++) {
            let item = new MenuItem({text: `Item ${i}`});
            item.location = `#${i}`;
            contextMenu.appendItem(item);
        }
    }
}