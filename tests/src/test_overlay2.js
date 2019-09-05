import Overlay from 'ui/Overlay';
import Draggable, {CONTAINERS} from 'ui/Draggable';
import {getPointOnElement} from 'core/position';


// noinspection JSUnusedGlobalSymbols
window.getPointOnElement = getPointOnElement;


export default class OverlayTestPage {
    constructor() {

    }

    load() {
        this.draggable = new Draggable('#overlay-reference1');
        this.overlay1 = new Overlay(document.querySelector('#tooltip1'), document.querySelector('#overlay-reference1'), {
            positions: ['top', 'left', 'bottom', 'right'],
            sticky: false,
            container: '#overlay-container'
        });

        this.overlay1.referenceObject.addEventListener('drag-move', () => {
            this.overlay1.refresh();
        });

        window.overlay = this.overlay1;
        this.overlay1.refresh();
    }
}
