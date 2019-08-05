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

    /**
     * Responsible for detecting dragging and starting the drag depending on delay and distance.
     * @param event
     */
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

        let distance = this.distance || 0,
            delay = typeof this.delay === 'number' ? this.delay : -1,
            doc = document,
            x = event.clientX,
            y = event.clientY;

        // Tests to see that delay and distance was met before dragging.
        let startDragging = () => {
            if(distance === 0 && delay < 0) {
                this.startDrag(x, y);
            }
        };

        // Delay dragging.
        if(delay >= 0) {
            let timer;

            let onTimeout = () => {
                delay = -1;
                doc.removeEventListener('mouseup', onMouseUp);
                startDragging();
            };

            let onMouseUp = () => {
                doc.removeEventListener('mouseup', onMouseUp);
                clearTimeout(timer);
            };

            doc.addEventListener('mouseup', onMouseUp);
            timer = setTimeout(onTimeout, delay);
        }

        // Delay by distance.
        if(distance > 0) {
            let onMouseUp = () => {
                doc.removeEventListener('mouseup', onMouseUp);
                doc.removeEventListener('mousemove', onMouseMove);
            };

            let onMouseMove = (event) => {
                let delta = Math.sqrt(
                    (event.clientY - y)**2 + (event.clientX - x)**2
                );

                if(delta > distance) {
                    distance = 0;
                    doc.removeEventListener('mouseup', onMouseUp);
                    doc.removeEventListener('mousemove', onMouseMove);
                    startDragging();
                }
            };

            doc.addEventListener('mouseup', onMouseUp);
            doc.addEventListener('mousemove', onMouseMove);
        }

        startDragging();
    }

    /**
     * Starts the drag animation at the given x, y origin.
     * @param startMouseX
     * @param startMouseY
     */
    startDrag(startMouseX, startMouseY) {
        if(this.isDragging) {
            return;
        }

        this.isDragging = true;

        let doc = document,
            target;

        if(!this.helper || this.helper === 'self') {
            target = this.element;
        } else if(typeof this.helper === 'function') {
            target = this.helper(this);
        }

        if(target !== this.element) {
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

            let [posX, posY] = getPosition(event.clientX, event.clientY);

            target.style.transform = `translate(${posX}px, ${posY}px)`;
        };

        let onMouseUp = (event) => {
            event.preventDefault();
            doc.removeEventListener('mousemove', onMouseMove);
            doc.removeEventListener('mouseup', onMouseUp);
            doc = null;
            this.isDragging = false;

            let [posX, posY] = getPosition(event.clientX, event.clientY);

            this._left = posX;
            this._top = posY;
            this.element.style.transform = `translate(${this._left}px, ${this._top}px)`;

            if(target !== this.element && target.parentElement) {
                target.parentElement.removeChild(target);
            }
        };

        doc.addEventListener('mousemove', onMouseMove);
        doc.addEventListener('mouseup', onMouseUp);
    }
}