import {addClasses} from 'core/utility';
import Observable from "core/interface/Observable";


export function offsetCursor({cursorX, cursorY, boundingRect}) {
    return [boundingRect.left - cursorX, boundingRect.top - cursorY];
}


export function clone(opacity=null) {
    return function(draggable) {
        let helper = draggable.element.cloneNode(true);

        if(opacity !== null) {
            helper.style.opacity = opacity;
        }

        return helper;
    }
}


/**
 * Calculates the distance the x and y coordinates are from the origin.
 * @param x
 * @param y
 * @returns {number}
 */
function calcDistanceFromOrigin(x, y) {
    x = Math.abs(x);
    // noinspection JSSuspiciousNameCombination
    y = Math.abs(y);

    return Math.sqrt(x**2 + y**2);
}


function debug_output(selector, message) {
    // todo remove debug
    let output = document.querySelector(selector);
    output.innerText = message;
}


export default class Draggable extends Observable {
    static CLONE = clone;
    static OFFSET_CURSOR = offsetCursor;

    constructor(element, {container=null, axis='xy', exclude="input, button, select, .js-no-drag, textarea", delay=null, cursor=offsetCursor, disabled=false,
        distance=null, handle=null, helper=null, revert=null, scroll=null, classes=null}={}) {
        super();

        if(typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
        }

        if(classes) {
            addClasses(element, classes);
        }

        this._onMouseDown = this.onMouseDown.bind(this);
        this.disabled = disabled;
        this.helper = helper;
        this.cursor = cursor;
        this.axis = axis;
        this.delay = delay;
        this.distance = distance;
        this.container = container;
        this.handle = handle;
        this.exclude = exclude;

        this.element.addEventListener('mousedown', this._onMouseDown);
        this.isDragging = false;
        this._left = 0;
        this._top = 0;
    }

    onMouseDown(event) {
        if(this.isDragging || this.disabled) {
            return;
        }

        if(this.handle) {
            let handle = event.target.closest(this.handle);
            if(!handle || !this.element.contains(handle)) {
                return;
            }
        }

        if(this.exclude) {
            let excluded = event.target.closest(this.exclude);

            if(excluded) {
                return;
            }
        }

        event.preventDefault();

        if(typeof this.delay === 'number' && this.delay >= 0) {
            // Delays that starting of the drag function for the given amount of milliseconds.
            let doc = document,
                onMouseUp,
                timer;

            let fn = () => {
                doc.removeEventListener('mouseup', onMouseUp);
                this.startDrag(event.clientX, event.clientY);
            };

            onMouseUp = () => {
                // Cancel drag on mouse up.
                doc.removeEventListener('mouseup', onMouseUp);
                clearTimeout(timer);
            };

            doc.addEventListener('mouseup', onMouseUp);
            timer = setTimeout(fn, this.delay);
        } else {
            this.startDrag(event.clientX, event.clientY);
        }
    }

    startDrag(startMouseX, startMouseY) {
        if(this.isDragging) {
            return;
        }

        this.isDragging = true;

        let doc = document,
            target,
            dragging = true;

        if(!this.helper || this.helper === 'self') {
            target = this.element;
        } else if(typeof this.helper === 'function') {
            target = this.helper(this);
        }

        if(this.distance !== null) {
            dragging = false;
        }

        if(dragging && target !== this.element) {
            this.element.parentElement.appendChild(target);
        }

        let container,
            startBoundingBox = this.element.getBoundingClientRect(),
            mouseOffsetX = startMouseX - startBoundingBox.left,
            mouseOffsetY = startMouseY - startBoundingBox.top,
            offsetX = 0,
            offsetY = 0;

        if(this.cursor) {
            [offsetX, offsetY] = this.cursor({
                target: target,
                draggable: this,
                cursorX: startMouseX,
                cursorY: startMouseY,
                boundingRect: startBoundingBox
            });
        }

        // todo remove debug
        let output = document.querySelector("#offset-output");
        output.innerText = `(${offsetX}, ${offsetY})`;

        let m_output = document.querySelector('#mouse-offset-output');
        m_output.innerText = `(${mouseOffsetX}, ${mouseOffsetY})`;

        if(this.container === 'viewport') {
            container = {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }

        let getPosition = (clientX, clientY) => {
            // Calculate the mouse position relative to the starting position.
            let deltaX = 0,
                deltaY = 0;

            if(this.axis === 'x' || this.axis === 'xy') {
                deltaX = clientX - startMouseX;
            }

            if(this.axis === 'y' || this.axis === 'xy') {
                deltaY = clientY - startMouseY;
            }

            // todo remove debug
            debug_output('#mouse-output', `(${deltaX}, ${deltaY})`);

            // Turn on dragging if distance broken.
            if(!dragging) {
                let distance = calcDistanceFromOrigin(deltaX, deltaY);

                if(distance >= this.distance) {
                    dragging = true;
                }
            }

            let posX = mouseOffsetX + offsetX + deltaX + this._left,
                posY = mouseOffsetY + offsetY + deltaY + this._top;

            // todo remove debug
            debug_output('#output-pos-xy', `(${posX}, ${posY})`);

            if(container) {
                let minX = container.left - startBoundingBox.left + this._left,
                    maxX = container.left + container.width - startBoundingBox.left + this._left - startBoundingBox.width,
                    minY = container.top - startBoundingBox.top + this._top,
                    maxY = container.top + container.height - startBoundingBox.top + this._top - startBoundingBox.height;

                debug_output('#mmx', `[${minX}, ${maxX}]`);
                debug_output('#mmy', `[${minY}, ${maxY}]`);

                posX = Math.max(minX, posX);
                posX = Math.min(maxX, posX);
                posY = Math.max(minY, posY);
                posY = Math.min(maxY, posY);
            }

            return [posX, posY];
        };

        let onMouseMove = (event) => {
            event.preventDefault();

            if(dragging && !target.parentElement) {
                this.element.parentElement.appendChild(target);
            }

            let [posX, posY] = getPosition(event.clientX, event.clientY);

            if(dragging) {
                target.style.transform = `translate(${posX}px, ${posY}px)`;
            }
        };

        let onMouseUp = (event) => {
            event.preventDefault();
            doc.removeEventListener('mousemove', onMouseMove);
            doc.removeEventListener('mouseup', onMouseUp);
            doc = null;
            this.isDragging = false;

            let [posX, posY] = getPosition(event.clientX, event.clientY);

            if(dragging) {
                this._left = posX;
                this._top = posY;

                this.element.style.transform = `translate(${this._left}px, ${this._top}px)`;
            }

            if(target !== this.element && target.parentElement) {
                target.parentElement.removeChild(target);
            }
        };

        doc.addEventListener('mousemove', onMouseMove);
        doc.addEventListener('mouseup', onMouseUp);
    }
}