import ComboBox from "../../../../../src/menu2/ComboBox";
import {SelectMenuOption} from "../../../../../src/menu2/SelectMenu";


export default class Test_combobox2 {
    load() {
        let cont1 = document.querySelector("#menu1-cont"),
            comboBox = new ComboBox();

        for(let i = 0; i < 10; i++) {
            let item = new SelectMenuOption({text: `Item ${i}`, value: i});
            comboBox.addOption(item);
        }

        comboBox.appendTo(cont1);
    }
}