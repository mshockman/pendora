import AutoLoader from "../autoloader";
import ContextMenu from "./ContextMenu";
import DropDown from "./DropDown";
import Menu from "./Menu";
import MenuBar, {SideMenuBar} from "./MenuBar";
import {ComboBox, MultiComboBox, RichSelect} from "./Select2";


AutoLoader.register('dropdown', (element) => DropDown.FromHTML(element));


AutoLoader.register('context-menu', (element) => {
    let instance = ContextMenu.FromHTML(element),
        target = document.querySelector(element.dataset.target);

    instance.setTargetMenu(target);
    instance.setContainer(target);

    return instance;
});


AutoLoader.register('menu', (element) => {
    return Menu.FromHTML(element);
});


AutoLoader.register('menubar', (element) => MenuBar.FromHTML(element));
AutoLoader.register('side-menubar', (element) => SideMenuBar.FromHTML(element));


AutoLoader.register('select', (element) => RichSelect.ConstructFromHTML(element));
AutoLoader.register('combobox', (element) => ComboBox.ConstructFromHTML(element));
AutoLoader.register('multi-combobox', (element) => MultiComboBox.ConstructFromHTML(element));
