import MultiComboBox from "../../../../../src/menu2/MultiComboBox";
import {SelectMenuOption} from "../../../../../src/menu2/SelectMenu";
import {MultiHiddenInputWidget} from "../../../../../src/forms";


export default class Test_multicombobox2 {
    load() {
        let cont = document.querySelector("#menu1-cont"),
            comboBox = new MultiComboBox({widget: new MultiHiddenInputWidget()});

        comboBox.addOption(new SelectMenuOption({text: "Grape", value: "grape"}));
        comboBox.addOption(new SelectMenuOption({text: "Cherry", value: "cherry"}));
        comboBox.addOption(new SelectMenuOption({text: "Orange", value: "orange"}));
        comboBox.addOption(new SelectMenuOption({text: "Apple", value: "apple"}));
        comboBox.addOption(new SelectMenuOption({text: "Strawberry", value: "strawberry"}));
        comboBox.addOption(new SelectMenuOption({text: "Berry", value: "berry"}));
        comboBox.addOption(new SelectMenuOption({text: "Watermelon", value: "watermelon"}));
        comboBox.addOption(new SelectMenuOption({text: "Melon", value: "melon"}));
        comboBox.addOption(new SelectMenuOption({text: "Pumpkin", value: "pumpkin"}));
        comboBox.addOption(new SelectMenuOption({text: "Banana", value: "banana"}));

        comboBox.name = "test";

        comboBox.appendTo(cont);
    }
}