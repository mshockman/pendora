import {MenuBar} from "menu2";


export default class MenuBarExamplePage {
    constructor() {

    }

    load() {
        let main = document.getElementById('content');

        let menu = new MenuBar();

        menu.createItems(
            [
                {
                    text: "Root #1",
                    children: [
                        { text: "Child Item #1", href: "#"},
                        { text: "Child Item #2", href: "#"},
                        { text: "Child Item #3", href: "#"},
                        { text: "Child Item #4", href: "#"},
                        { text: "Child Item #5", href: "#"},
                    ]
                },
                {
                    text: "Root #2",
                    children: [
                        { text: "Child Item #1", href: "#"},
                        { text: "Child Item #2", href: "#"},
                        { text: "Child Item #3", href: "#"},
                        { text: "Child Item #4", href: "#"},
                        { text: "Child Item #5", href: "#"},
                    ]
                },
                {
                    text: "Root #3",
                    children: [
                        { text: "Child Item #1", href: "#"},
                        { text: "Child Item #2", href: "#"},
                        { text: "Child Item #3", href: "#"},
                        { text: "Child Item #4", href: "#"},
                        { text: "Child Item #5", href: "#"},
                    ]
                },
                {
                    text: "Root #4",
                    children: [
                        { text: "Child Item #1", href: "#"},
                        { text: "Child Item #2", href: "#"},
                        { text: "Child Item #3", href: "#"},
                        { text: "Child Item #4", href: "#"},
                        { text: "Child Item #5", href: "#"},
                    ]
                },
                {
                    text: "Root #5",
                    children: [
                        { text: "Child Item #1", href: "#"},
                        { text: "Child Item #2", href: "#"},
                        { text: "Child Item #3", href: "#"},
                        { text: "Child Item #4", href: "#"},
                        { text: "Child Item #5", href: "#"},
                    ]
                },
            ]
        );

        menu.appendTo(main);
    }
}