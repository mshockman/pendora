import Draggable from "../../src/core/ui/Draggable";
import Overlay from "../../src/core/ui/Overlay";
import Arrow from "../../src/core/ui/Arrow";


export default class OverlayTestPage {
    draggable;
    overlay;

    constructor() {

    }

    load() {
        this.draggable = new Draggable('#draggable');
        this.overlay = new Overlay('#overlay1');
        this.arrow = new Arrow();
        // this.overlay.fit = 'xy';

        this.arrow.parent = this.overlay.element.querySelector('.overlay-body');
        this.arrow.target = this.draggable.element;

        this.overlay.setArrow(this.arrow);
        this.overlay.target = document.querySelector('#draggable');
        this.overlay.container = document.querySelector('#container');

        this.overlay.addPlacement('top', {
            my: "bottom",
            at: "top",
            of: "border-top",
            arrow: "bottom",
        });

        this.overlay.addPlacement('right', {
            my: "left",
            at: "right",
            of: "border-right",
            arrow: "left"
        });

        this.overlay.addPlacement('bottom', {
            my: "top",
            at: "bottom",
            of: "border-bottom",
            arrow: "top"
        });

        this.overlay.addPlacement("left", {
            my: "right",
            at: "left",
            of: "border-left",
            arrow: "right"
        });

        this.draggable.on('draggable.move', (data) => {
            this.overlay.position();
        });

        this.overlay.position();
    }
}
