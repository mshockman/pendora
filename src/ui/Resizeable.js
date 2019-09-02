import {isSuperset} from 'core/set';
import {rectToDocumentSpace, setElementClientPosition} from 'core/position';
import {addClasses, clamp} from 'core/utility';


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


/**
 * Behavior class that makes an element resizeable.
 */
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
        this.isResizing = false;
    }

    _startResizing(event) {
        if(this.isResizing) return;
        let handle = event.target.closest('.ui-resizeable-handle');
        if(!handle || !this.element.contains(handle)) return;
        let resizeable = handle.closest('.ui-resizeable');
        if(!resizeable || resizeable !== this.element) return;

        event.preventDefault();

        let direction = handle.dataset.direction,
            startPosX = event.clientX + window.scrollX,
            startPosY = event.clientY + window.scrollY,
            doc = document,
            startingClientRect = this.element.getBoundingClientRect(),
            startBox = rectToDocumentSpace(startingClientRect),
            target = this.element,
            rect = {left: startBox.left, top: startBox.top, width: startBox.width, height: startBox.height};

        if(this.helper) {
            if(typeof this.helper === 'function') {
                target = this.helper.call(this, this.element);
            } else {
                target = document.createElement('div');
                addClasses(target, this.helper);
            }

            target.classList.add('ui-resizeable-helper');
            target.style.width = startBox.width + 'px';
            target.style.height = startBox.height + 'px';
            target.style.boxSizing = getComputedStyle(this.element).boxSizing;
            this.element.parentElement.appendChild(target);
            setElementClientPosition(target, startingClientRect, 'translate3d');
            setElementClientPosition(target, this.element.getBoundingClientRect(), 'translate3d');
        }

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

            setElementClientPosition(target, {left, top}, 'translate3d');
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;

            rect.left = left + window.scrollX;
            rect.top = top + window.scrollY;
            rect.width = width;
            rect.height = height;

            this.element.dispatchEvent(new CustomEvent('resizing', {
                bubbles: true,
                detail: {
                    resizeable: this,
                    target: target,
                    originalEvent: event,
                    clientX: event.clientX,
                    clientY: event.clientY,
                    element: this.element,

                    targetClientRect: {
                        left: left,
                        top: top,
                        right: left + width,
                        bottom: top + height,
                        width: width,
                        height: height,
                        x: left,
                        y: top
                    }
                }
            }));
        };

        let onMouseUp = event => {
            doc.removeEventListener('mousemove', onMouseMove);
            doc.removeEventListener('mouseup', onMouseUp);

            if(this.element !== target) {
                target.parentElement.removeChild(target);

                setElementClientPosition(this.element, {
                    left: rect.left - window.scrollX,
                    top: rect.top - window.scrollY
                }, 'translate3d');

                this.element.style.width = `${rect.width}px`;
                this.element.style.height = `${rect.height}px`;
            }

            this.element.classList.remove('ui-resizing');
            this.isResizing = false;

            this.element.dispatchEvent(new CustomEvent('resize-end', {
                bubbles: true,
                detail: {
                    resizeable: this,
                    element: this.element,
                    originalEvent: event,
                    clientX: event.clientX,
                    clientY: event.clientY
                }
            }));
        };

        this.isResizing = true;
        this.element.classList.add('ui-resizing');
        doc.addEventListener('mousemove', onMouseMove);
        doc.addEventListener('mouseup', onMouseUp);

        this.element.dispatchEvent(new CustomEvent('resize-start', {
            bubbles: true,
            detail: {
                resizeable: this,
                target: target,
                originalEvent: event,
                clientX: event.clientX,
                clientY: event.clientY,
                element: this.element
            }
        }));
    }
}