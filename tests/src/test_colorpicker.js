import {ColorPickerWheel} from "../../src/ui/ColorPicker";
import {hslToRGB, hsvToRGB} from "../../src/core/utility";


export default class TestColorPickerPage {
    load() {
        window.wheel = this.wheel = new ColorPickerWheel(600);
        window.hslToRGB = hslToRGB;
        window.hsvToRGB = hsvToRGB;

        this.wheel.appendTo(document.body);
        this.wheel.render();
    }
}
