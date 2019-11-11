import {ColorPickerWheel, ColorPickerWheelSlider} from "../../src/ui/ColorPicker";
import {hslToRGB, hsvToRGB} from "../../src/core/utility";


export default class TestColorPickerPage {
    load() {
        window.wheel = this.wheel = new ColorPickerWheel(600);
        window.slider = this.slider = new ColorPickerWheelSlider(this.wheel, 300, 100);
        window.hslToRGB = hslToRGB;
        window.hsvToRGB = hsvToRGB;

        this.wheel.appendTo(document.body);
        this.slider.appendTo(document.body);
        this.wheel.render();
        this.slider.render();
    }
}
