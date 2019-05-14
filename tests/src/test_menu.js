import Menu from 'menus/Menu';
import MenuItem from 'menus/MenuItem';


let menu = new Menu(),
    container = document.querySelector('#test-menu-area');


container.appendChild(menu.element);


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

menu.init();