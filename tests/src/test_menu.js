import Menu from 'menus/Menu';
import MenuItem from 'menus/MenuItem';
import {privateCache} from 'core/data';


let menu = new Menu({closeOnBlur: true}),
    container = document.querySelector('#test-menu-area');

menu.autoActivate = true;
menu.delay = false;
menu.multiple = false;
menu.element.classList.add('c-menubar');
menu.visible = true;
menu.timeout = 3000;


container.appendChild(menu.element);
window.privateCache = privateCache;


let fileItem = new MenuItem({text: "File"}),
    editItem = new MenuItem({text: "Edit"}),
    viewItem = new MenuItem({text: "View"}),
    navigateItem = new MenuItem({text: "Navigate"}),
    codeItem = new MenuItem({text: "Code"}),
    refactorItem = new MenuItem({text: "Refactor"}),
    toolsItem = new MenuItem({text: "Tools"}),
    vcsItem = new MenuItem({text: "VCS"}),
    windowItem = new MenuItem({text: "Window"}),
    helpItem = new MenuItem({text: "Help"});


menu.add(fileItem);
menu.add(editItem);
menu.add(viewItem);
menu.add(navigateItem);
menu.add(codeItem);
menu.add(refactorItem);
menu.add(toolsItem);
menu.add(vcsItem);
menu.add(windowItem);
menu.add(helpItem);

let fileSubMenu = new Menu();
fileItem.attachSubMenu(fileSubMenu);

for(let i = 0; i < 10; i++) {
    let item = new MenuItem({text: `Sub Item ${i+1}`});
    fileSubMenu.add(item);
}
