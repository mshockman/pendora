import {MenuBar, Menu, MenuItem} from "menu2";


export default class MenuBarExamplePage {
    constructor() {

    }

    buildTestMenu(deep, items, _n=0) {
        let text = (x) => `Child Item #${x}`;
        if(_n === 0) text = (x) => `Root Item #${x}`;

        let r = [];

        for(let i = 0; i < items; i++) {
            let node = {
                text: text(i)
            };

            if(_n < deep) {
                node.submenu = {
                    children: this.buildTestMenu(deep, items, _n+1)
                };
            } else {
                node.href = '#';
                node.action = () => alert(`${node.text} clicked`);
            }

            r.push(node);
        }

        return r;
    }

    load() {
        let main = document.getElementById('content');

        let menu = new MenuBar({timeout: 2000, delay: 1000, autoActivate: false, multiple: false});

        let data = this.buildTestMenu(3, 5);
        menu.createItems(data);

        menu.appendTo("#menubar_1");
        window.menu = menu;

        this.initFromJsonExample();
        this.initImperativelyExample();
    }

    initImperativelyExample() {
        let container = document.getElementById('init-menu-imperatively');

        let menu = new Menu();

        menu.append(new MenuItem({text: "Item #1", action: () => alert("Item #1 Clicked")}));
        menu.append(new MenuItem({text: "Item #2", action: () => alert("Item #2 Clicked")}));
        menu.append(new MenuItem({text: "Item #3", action: () => alert("Item #3 Clicked")}));
        menu.append(new MenuItem({text: "Item #4", action: () => alert("Item #4 Clicked")}));
        menu.append(new MenuItem({text: "Item #5", action: () => alert("Item #5 Clicked")}));

        menu.isVisible = true;
        menu.addClass('vertical-menu');
        menu.removeClass('menu');

        menu.appendTo(container);
    }

    initFromJsonExample() {
        let menu = new Menu({
            closeOnBlur: true,
            closeOnSelect: true
        });
        menu.isVisible = true;

        menu.createItems([
            {
                text: "Item #1",
                submenu: {
                    children: [
                        {text: "SubItem #1", href: "#"},
                        {text: "SubItem #2", href: "#"},
                        {text: "SubItem #3", href: "#"},
                        {text: "SubItem #4", href: "#"},
                        {text: "SubItem #5", href: "#"}
                    ]
                }
            },
            {
                text: "Item #2",
                submenu: {
                    children: [
                        {text: "SubItem #1", href: "#"},
                        {text: "SubItem #2", href: "#"},
                        {text: "SubItem #3", href: "#"},
                        {text: "SubItem #4", href: "#"},
                        {text: "SubItem #5", href: "#"}
                    ]
                }
            },
            {
                text: "Item #3",
                submenu: {
                    children: [
                        {text: "SubItem #1", href: "#"},
                        {text: "SubItem #2", href: "#"},
                        {text: "SubItem #3", href: "#"},
                        {text: "SubItem #4", href: "#"},
                        {text: "SubItem #5", href: "#"}
                    ]
                }
            },
            {
                text: "Item #4",
                submenu: {
                    children: [
                        {text: "SubItem #1", href: "#"},
                        {text: "SubItem #2", href: "#"},
                        {text: "SubItem #3", href: "#"},
                        {text: "SubItem #4", href: "#"},
                        {text: "SubItem #5", href: "#"}
                    ]
                }
            },
            {
                text: "Item #5",
                submenu: {
                    children: [
                        {text: "SubItem #1", href: "#"},
                        {text: "SubItem #2", href: "#"},
                        {text: "SubItem #3", href: "#"},
                        {text: "SubItem #4", href: "#"},
                        {text: "SubItem #5", href: "#"}
                    ]
                }
            }
        ]);

        menu.style.position = 'static';
        menu.style.width = '16rem';

        menu.appendTo("#init-menu-from-json");
    }
}