import Resizeable from 'ui/Resizeable';
import Draggable from 'ui/Draggable';
import {rectToDocumentSpace, rectToClientSpace} from 'core/position';


window.rectToDocumentSpace = rectToDocumentSpace;
window.rectToClientSpace = rectToClientSpace;


export default class ResizeableTestPage {
    constructor() {

    }

    load() {
        let element1 = document.querySelector('#test-resizeable1');

        this.draggable = new Draggable(element1, {exclude: '.ui-resizeable-handle'});
        this.resizeable = new Resizeable(element1, {handles: 'all', helper: 'test-helper', grid: 20});
        this.element1 = element1;
    }
}
