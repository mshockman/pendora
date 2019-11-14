import {ColorPickerWheel, ColorPanel, ColorPicker} from "../../src/ui/ColorPicker";
import {hslToRGB, hsvToRGB} from "../../src/core/utility";
import {HSV} from "../../src/core/vectors";


window.HSV = HSV;


export default class TestColorPickerPage {
    load() {
        let picker = new ColorPicker();
        picker.appendTo(document.body);
        window.picker = picker;
    }
}
