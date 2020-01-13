import Draggable from "../../src/core/ui/Draggable";
import Overlay from "../../src/core/ui/Overlay";


export default class OverlayTestPage {
    draggable;
    overlay;

    constructor() {

    }

    load() {
        this.draggable = new Draggable('#draggable');
        this.overlay = new Overlay('#overlay1');
        this.overlay.setContainer('#container');
        this.overlay.setTarget('#draggable');

        this.draggable.on('draggable.move', (data) => {
            this.overlay.render();
        });
    }
}
