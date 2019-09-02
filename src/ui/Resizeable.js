import {isSuperset} from 'core/set';
import {rectToDocumentSpace, getTranslation, setElementClientPosition, setTranslation} from 'core/position';
import {clamp} from 'core/utility';


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
    constructor(element, {handles="bottom-right", helper=null, minWidth=null, maxWidth=null, minHeight=null, maxHeight=null, keepAspectRatio=false, autoHide=false, container=null}={}) {
        if(typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
        }

        this.handles = {};
        this.element.classList.add('ui-resizeable');

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
            handle.classList.add(`ui-resizeable-${direction}`);
            handle.dataset.direction = direction;
            this.handles[direction] = handle;
            this.element.appendChild(handle);
        }

        this._onMouseDown = (event) => {
            this._startResizing(event);
        };

        this.element.addEventListener('mousedown', this._onMouseDown);

        this.helper = helper;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
        this.keepAspectRatio = keepAspectRatio;
        this.container = container;
        this.isResizing = false;
    }

    _startResizing(event) {
        if(this.isResizing) return;
        let handle = event.target.closest('.ui-resizeable-handle');
        if(!handle || !this.element.contains(handle)) return;
        let resizeable = handle.closest('.ui-resizeable');
        if(!resizeable || resizeable !== this.element) return;

        let direction = handle.dataset.direction,
            startPosX = event.clientX + window.scrollX,
            startPosY = event.clientY + window.scrollY,
            doc = document,
            startBox = rectToDocumentSpace(this.element.getBoundingClientRect());

        let onMouseMove = event => {
            let width = startBox.width,
                height = startBox.height,
                deltaX = event.clientX - (startPosX - window.scrollX),
                deltaY = event.clientY - (startPosY - window.scrollY),
                left = startBox.left,
                top = startBox.top,
                right = startBox.right - window.scrollX,
                bottom = startBox.bottom - window.scrollY;

            if(direction === 'right' || direction === 'bottom-right' || direction === 'top-right') {
                width += deltaX;
                width = clamp(width, this.minWidth, this.maxWidth);
                width = Math.max(0, width);
            } else if(direction === 'left' || direction === 'top-left' || direction === 'bottom-left') {
                width -= deltaX;
                width = clamp(width, this.minWidth, this.maxWidth);
                width = Math.max(0, width);
                left = right - width;
            }

            if(direction === 'bottom' || direction === 'bottom-right' || direction === 'bottom-left') {
                height += deltaY;

                if(this.keepAspectRatio) {
                    height = width * this.keepAspectRatio;
                } else {
                    height = clamp(height, this.minHeight, this.maxHeight);
                    height = Math.max(0, height);
                }
            } else if(direction === 'top' || direction === 'top-left' || direction === 'top-right') {
                height -= deltaY;

                if(this.keepAspectRatio) {
                    height = width * this.keepAspectRatio;
                } else {
                    height = clamp(height, this.minHeight, this.maxHeight);
                    height = Math.max(0, height);
                }

                top = bottom - height;
            }

            setElementClientPosition(this.element, {left, top}, 'translate3d');
            this.element.style.width = `${width}px`;
            this.element.style.height = `${height}px`;
        };

        let onMouseUp = event => {
            doc.removeEventListener('mousemove', onMouseMove);
            doc.removeEventListener('mouseup', onMouseUp);
            this.isResizing = false;
        };

        this.isResizing = true;
        doc.addEventListener('mousemove', onMouseMove);
        doc.addEventListener('mouseup', onMouseUp);
    }
}