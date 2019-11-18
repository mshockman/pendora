import {ColorPickerWheel, ColorPanel, ColorPicker, ColorPallet} from "../../src/ui/ColorPicker";
import {hslToRGB, hsvToRGB} from "../../src/core/utility";
import {HSV} from "../../src/core/vectors";


window.HSV = HSV;


export default class TestColorPickerPage {
    load() {
        let picker = new ColorPicker(false);
        let pallet = new ColorPallet(false);
        picker.appendTo(document.body);
        pallet.appendTo(document.body);

        pallet.addColor("#ffffff");
        pallet.addColor("#000000");
        pallet.addColor("#ff0000");
        pallet.addColor("#00ff00");
        pallet.addColor("#0000ff");
        window.picker = picker;
        window.pallet = pallet;

        document.getElementById("add-to-pallet").addEventListener('click', () => {
            pallet.addColor(picker.value);
            pallet.selectColor(picker.value);
        });

        document.getElementById('remove-to-pallet').addEventListener('click', () => {
            pallet.removeColor(picker.value);
            pallet.clearSelection();
        });

        pallet.on('color-click', topic => {
            picker.value = topic.color;
        });
    }
}
