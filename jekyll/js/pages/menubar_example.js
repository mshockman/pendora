import {MenuBar} from "menu2";


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
                node.children = this.buildTestMenu(deep, items, _n + 1);
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

        menu.createItems(
            this.buildTestMenu(3, 5)
        );

        menu.children[0].submenu.children[2].isDisabled = true;

        menu.appendTo("#menubar_1");
        window.menu = menu;
    }
}