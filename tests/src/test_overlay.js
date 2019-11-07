import Overlay, {Tooltip, Notification} from 'ui/Overlay';
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
            placements: [
                'top', 'left', 'bottom', 'right',
                // 'left', 'bottom'
                // 'top'
                // {my: 'bottom', at: 'top', of: 'border-top', padding: {left: '50%', right: '50%'}}
                // {my: 'right', at: 'left', of: 'border-left'}
            ],
            sticky: true,
            container: '#overlay-container',
            arrow: false,
            // magnetic: new Vec4(Infinity, 0, Infinity, 0)
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

        this.initTooltipTest();
        this.initNotificationTest();
    }

    initTooltipTest() {
        let btn = document.getElementById('test-tt-btn1'),
            container = document.getElementById('tooltip-testarea1'),
            directionControl = document.getElementById('tt1-direction-control');

        let tooltip = new Tooltip({text: "Hello World How Are You!!!", classes: "success", timeout: 2000});
        tooltip.setReferenceTarget(btn);
        tooltip.appendTo(btn.parentElement);

        btn.addEventListener('click', event => {
            let direction = directionControl.querySelector('input:checked').value;
            // tooltip.setPlacements(direction);
            // tooltip.toggle();

            Tooltip.notify(btn, "Hello World 2!", 'success', {timeout: 2000, placements: direction});
        });
    }

    initNotificationTest() {
        Notification.notify("Hello World!", 'success', 'top-right', {timeout: false, closeOnClick: true, button: "Confirm"});
    }
}
