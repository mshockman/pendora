import Overlay from 'ui/Overlay';
import {getPointOnElement} from 'core/position';


// noinspection JSUnusedGlobalSymbols
window.getPointOnElement = getPointOnElement;


export default class OverlayTestPage {
    constructor() {

    }

    load() {
        this.overlay1 = new Overlay('#test_popup1', "#test_overlay1__button", {
            positions: [
                {my: 'bottom', at: 'top'}
            ],

            container: '#test_overlay_viewport1'
        });
    }
}
