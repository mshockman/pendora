import {privateCache} from 'core/data';
import {Menu, MenuBar, MenuItem} from 'menus';
import {getTargetChild, getClosestMenuNode} from 'menus/core';


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

    menu.append(fileItem);
    menu.append(editItem);
    menu.append(viewItem);
    menu.append(navigateItem);
    menu.append(codeItem);
    menu.append(refactorItem);
    menu.append(toolsItem);
    menu.append(vcsItem);
    menu.append(windowItem);
    menu.append(helpItem);

    let fileSubMenu = new Menu();
    fileItem.attachSubMenu(fileSubMenu);

    for(let i = 0; i < 10; i++) {
        let item = new MenuItem({text: `Sub Item ${i+1}`});
        fileSubMenu.add(item);
    }
}


function build_from_dom() {
    let root = MenuBar.widget({
        target: '#test-menubar'
    });

    window.root = root;

    return root;
}


build_from_dom();


function testMixin(superClass) {
    return class extends superClass {
        test() {
            console.log("Hello World");
        }
    }
}


class TestClass {
    constructor(msg) {
        console.log(msg);
        this.msg = msg;
    }

    test2() {
        console.log("Test class 2");
    }
}


window.testMixin = testMixin;
window.TestClass = TestClass;
window.getTargetChild = getTargetChild;
window.getClosestMenuNode = getClosestMenuNode;