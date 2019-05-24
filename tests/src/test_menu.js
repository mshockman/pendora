import {privateCache} from 'core/data';
import {Menu, MenuBar, MenuItem} from 'menus';


window.privateCache = privateCache;


function build_test_menu_1() {
    let menu = new MenuBar(),
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

    let fileSubMenu = new Menu();
    fileItem.attachSubMenu(fileSubMenu);

    for(let i = 0; i < 10; i++) {
        let item = new MenuItem({text: `Sub Item ${i+1}`});
        fileSubMenu.add(item);
    }
}


function build_from_dom() {
    let root = MenuBar.buildFromHTML('#test-menubar', {
        submenus: {
            showDelay: 3000
        }
    });

    window.root = root;

    return root;
}


build_from_dom();
