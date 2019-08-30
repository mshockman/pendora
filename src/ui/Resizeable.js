import {addClasses} from "core/utility";
import {isSuperset} from 'core/set';


const DIRECTIONS = new Set([
    'top-left',
    'top',
    'top-right',
    'right',
    'bottom-right',
    'bottom',
    'bottom-left',
    'left'
]);


export default class Resizeable {
    constructor(element, {handles="bottom-right bottom right", helper=null, minWidth=null, maxWidth=null, minHeight=null, maxHeight=null, keepAspectRatio=false, autoHide=false}) {
        if(typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
        }

        this.handles = {};
        this.element.addClass('ui-resizeable');

        if(handles === 'all') {
            handles = new Set(DIRECTIONS);
        } else {
            handles = new Set(handles.split(/\s+/));
        }

        if(!isSuperset(DIRECTIONS, handles)) {
            throw new TypeError("Invalid direction.");
        }

        for(let direction of handles) {
            let handle = document.createElement('div');
            handle.classList.add('ui-resizeable-handle');
            handle.classList.add(`ui-resizeable-${handle}`);
            handle.dataset.direction = direction;
            this.handles[direction] = handle;
            this.element.appendChild(handle);
        }

        this._onMouseDown = (event) => {
            this._startResizing(event);
        };

        this.element.addEventListener('mousedown', this._onMouseDown);
    }

    _startResizing(event) {
        let handle = event.target.closest('.ui-resizeable-handle');
        if(!handle || !this.element.contains(handle)) return;
        let resizeable = handle.closest('ui-resizeable');
        if(!resizeable || resizeable !== this.element) return;

        let direction = resizeable.dataset.direction,
            posX = event.clientX + window.scrollX,
            posY = event.clientY + window.scrollY,
            doc = document;


        let onMouseMove = event => {

        };

        let onMouseUp = event => {

        };

        doc.addEventListener('mousemove', onMouseMove);
        doc.addEventListener('mouseup', onMouseUp);
    }
}