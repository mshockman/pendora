import Overlay from 'ui/Overlay';
import Draggable, {CONTAINERS} from 'ui/Draggable';
import {getPointOnElement, getSubBoundingBox} from 'core/position';
import {Vec2} from "core/vectors";


// noinspection JSUnusedGlobalSymbols
window.getPointOnElement = getPointOnElement;
window.getSubBoundingBox = getSubBoundingBox;
window.Vec2 = Vec2;


export default class OverlayTestPage {
    constructor() {

    }

    load() {
        this.draggable = new Draggable('#overlay-reference1');
        this.overlay1 = new Overlay(document.querySelector('#tooltip1'), document.querySelector('#overlay-reference1'), {
            positions: [
                'top', 'left', 'bottom', 'right'
                // {my: 'bottom', at: 'top', of: 'border-top', padding: {left: '50%', right: '50%'}}
                // {my: 'right', at: 'left', of: 'border-left'}
            ],
            sticky: true,
            container: '#overlay-container'
        });

        this.overlay1.referenceObject.addEventListener('drag-move', () => {
            this.overlay1.refresh();
        });

        let cordsOutput = document.querySelector('#cords-output');

        window.addEventListener('mousemove', (event) => {
            cordsOutput.innerText = `(${event.clientX}, ${event.clientY})`;
        });

        window.overlay = this.overlay1;
        this.overlay1.refresh();


    }
}
