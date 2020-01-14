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
        // this.overlay.fit = 'xy';

        this.overlay.addPlacement('top', {
            my: "bottom",
            at: "top",
            of: "border-top"
        });

        this.overlay.addPlacement('right', {
            my: "left",
            at: "right",
            of: "border-right"
        });

        this.overlay.addPlacement('bottom', {
            my: "top",
            at: "bottom",
            of: "border-bottom"
        });

        this.overlay.addPlacement("left", {
            my: "right",
            at: "left",
            of: "border-left"
        });

        this.draggable.on('draggable.move', (data) => {
            this.overlay.render();
        });

        this.overlay.render();
    }
}
