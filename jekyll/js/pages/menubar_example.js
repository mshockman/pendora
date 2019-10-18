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
            }

            r.push(node);
        }

        return r;
    }

    load() {
        let main = document.getElementById('content');

        let menu = new MenuBar();

        menu.createItems(
            this.buildTestMenu(3, 5)
        );

        menu.appendTo(main);
        window.menu = menu;
    }
}