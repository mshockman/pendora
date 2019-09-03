import Resizeable, {CONTAINERS} from 'ui/Resizeable';
import Draggable from 'ui/Draggable';
import {rectToDocumentSpace, rectToClientSpace} from 'core/position';


window.rectToDocumentSpace = rectToDocumentSpace;
window.rectToClientSpace = rectToClientSpace;


export default class ResizeableTestPage {
    constructor() {

    }

    load() {
        let element1 = document.querySelector('#test-resizeable1');

        this.draggable = new Draggable(element1, {exclude: '.ui-resizeable-handle', container: CONTAINERS.client, grid: 20});
        this.resizeable = new Resizeable(element1, {handles: 'all', helper: 'test-helper', grid: 20, container: CONTAINERS.client});
        this.element1 = element1;
    }
}
