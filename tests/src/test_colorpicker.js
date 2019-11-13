import {ColorPickerWheel} from "../../src/ui/ColorPicker";
import {hslToRGB, hsvToRGB} from "../../src/core/utility";
import {HSV} from "../../src/core/vectors";


window.HSV = HSV;


export default class TestColorPickerPage {
    load() {
        let colorPicker = new ColorPickerWheel(300, 500);

        colorPicker.appendTo(document.body);
        colorPicker.render();
    }
}
