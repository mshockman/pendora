import {SelectMenu, SelectOption} from 'menu/Select2';


export default class MenuPageIndex {
    constructor() {

    }

    load() {

    }

    createSelectMenuTest(container) {
        let testMenu = new SelectMenu();
        testMenu.isVisible = true;
        testMenu.multiSelect = true;
        testMenu.toggle = "ctrl";
        testMenu.clearOldSelection = true;
        testMenu.enableShiftSelect = true;
        testMenu.enableCtrlToggle = true;

        for(let i = 0; i < 10; i++) {
            let option = new SelectOption({text: `Option #${i+1}`, value: i+1});
            testMenu.append(option);
        }

        window.testMenu = testMenu;
        testMenu.appendTo(container);
        console.log("Debugging SelectMenu as testMenu");
        console.log(testMenu);
    }
}
