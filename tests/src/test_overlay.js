import Overlay from 'ui/Overlay';
import Draggable, {CONTAINERS} from 'ui/Draggable';
import {getPointOnElement, getSubBoundingBox, getDistanceBetweenRects} from 'core/position';
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
                'top', 'left', 'bottom', 'right',
                // 'left'
                // 'top'
                // {my: 'bottom', at: 'top', of: 'border-top', padding: {left: '50%', right: '50%'}}
                // {my: 'right', at: 'left', of: 'border-left'}
            ],
            sticky: false,
            container: '#overlay-container',
            arrow: {width: 10, height: 10}
        });

        this.overlay1.referenceObject.addEventListener('drag-move', () => {
            this.overlay1.refresh();
        });

        let cordsOutput = document.querySelector('#cords-output'),
            distanceOutput = document.querySelector('#distance-output'),
            container = document.querySelector('#overlay-container'),
            reference = document.querySelector('#overlay-reference1');

        window.addEventListener('mousemove', (event) => {
            let distance = getDistanceBetweenRects(reference.getBoundingClientRect(), container.getBoundingClientRect());

            cordsOutput.innerText = `(${event.clientX}, ${event.clientY})`;
            distanceOutput.innerText = `${distance} px`;
        });

        window.overlay = this.overlay1;
        this.overlay1.refresh();


    }
}
