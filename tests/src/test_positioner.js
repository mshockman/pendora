import {Rect} from "../../src/core/vectors";
import {setElementClientPosition} from "../../src/core/position";
import Draggable from "../../src/ui/Draggable";


window.Rect = Rect;
window.setElementClientPosition = setElementClientPosition;


export default class TestPositionerPage {
    constructor() {

    }

    load() {
        this.referenceElement = document.getElementById('referenceElement');
        this.container = document.getElementById('container');
        this.overlay = document.getElementById('testOverlay');
        let controls = document.getElementById('controls');

        this.draggable = new Draggable(this.referenceElement, {

        });

        this.reposition = () => {
            let myX = this.getSelectValue('my-x'),
                myY = this.getSelectValue('my-y'),
                atX = this.getSelectValue('at-x'),
                atY = this.getSelectValue('at-y'),
                flipX = this.getSelectValue('flip-x'),
                flipY = this.getSelectValue('flip-y');

            let rect = new Rect(this.overlay);

            rect = rect.position({
                my: `${myX} ${myY}`,
                at: `${atX} ${atY}`,
                of: this.referenceElement,
                inside: this.container,
                collision: `${flipX} ${flipY}`
            });

            setElementClientPosition(this.overlay, rect);
        };

        this.referenceElement.addEventListener('drag-move', (event) => {
            this.reposition();
        });

        controls.addEventListener('change', () => {
            this.reposition();
        });

        this.reposition();
    }

    getSelectValue(name) {
        let select = document.querySelector(`[name="${name}"]`);
        return select.value;
    }
}
