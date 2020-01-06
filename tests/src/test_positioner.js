import {Rect} from "../../src/core/vectors";
import {setElementClientPosition} from "../../src/core/position";
import Draggable from "../../src/core/interactions/Draggable";


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
            let _p = (offsetName) => {
                let value = this.getSelectValue(`${offsetName}-offset`),
                    unit = this.getSelectValue(`${offsetName}-offset-unit`);

                value = parseFloat(value);

                if(value < 0) {
                    return `${value}${unit}`;
                } else if(value > 0) {
                    return `+${value}${unit}`;
                } else {
                    return '';
                }
            };

            let myX = this.getSelectValue('my-x'),
                myY = this.getSelectValue('my-y'),
                atX = this.getSelectValue('at-x'),
                atY = this.getSelectValue('at-y'),
                flipX = this.getSelectValue('flip-x'),
                flipY = this.getSelectValue('flip-y'),
                myOffsetX = _p('my-x'),
                myOffsetY = _p('my-y'),
                atOffsetX = _p('at-x'),
                atOffsetY = _p('at-y');

            let rect = new Rect(this.overlay);

            rect = rect.position({
                my: `${myX}${myOffsetX} ${myY}${myOffsetY}`,
                at: `${atX}${atOffsetX} ${atY}${atOffsetY}`,
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
