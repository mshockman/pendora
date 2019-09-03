import Resizeable, {CONTAINERS} from 'ui/Resizeable';
import Draggable from 'ui/Draggable';
import {clientRectToDocumentSpace, documentRectToClientSpace} from 'core/position';


window.clientRectToDocumentSpace = clientRectToDocumentSpace;
window.documentRectToClientSpace = documentRectToClientSpace;


export default class ResizeableTestPage {
    constructor() {

    }

    load() {
        let element1 = document.querySelector('#test-resizeable1');

        this.draggable = new Draggable(element1, {exclude: '.ui-resizeable-handle', container: CONTAINERS.client});
        this.resizeable = new Resizeable(element1, {handles: 'all', helper: 'test-helper', container: CONTAINERS.client, keepAspectRatio: 0.5625});
        this.element1 = element1;
    }
}
