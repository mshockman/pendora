import {addClasses} from 'core/utility';
import Observable from "core/interface/Observable";
import Animation from "core/Animation";


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
        this.revert = revert;

        this.element.addEventListener('mousedown', this._onMouseDown);
        this.isDragging = false;
        // The final position.
        this._left = 0;
        this._top = 0;

        // The position why being dragged or animated.
        this._tx = 0;
        this._ty = 0;

        this._revertFX = null;
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
            startX = event.clientX,
            startY = event.clientY,
            posX = startX,
            posY = startY;

        // Tests to see that delay and distance was met before dragging.
        let startDragging = () => {
            if(distance === 0 && delay < 0) {
                this.startDrag(startX, startY, posX, posY);
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
                posX = event.clientX;
                posY = event.clientY;

                let delta = Math.sqrt(
                    (posX - startX)**2 + (posY - startY)**2
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
     * @param posX
     * @param posY
     */
    startDrag(startMouseX, startMouseY, posX, posY) {
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

        if(this._revertFX) {
            this._revertFX.stop();
            this._revertFX = null;
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

        offsetX += this._tx;
        offsetY += this._ty;

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

            this._setPosition(posX, posY);

            this.sendMessage('drag', {
                startMouseX,
                startMouseY,
                offsetX,
                offsetY,
                mouseX: event.mouseX,
                mouseY: event.mouseY
            }, this);

            let customEvent = new CustomEvent('drag', {
                detail: {
                    startMouseX,
                    startMouseY,
                    offsetX,
                    offsetY,
                    mouseX: event.mouseX,
                    mouseY: event.mouseY,
                    draggable: this
                },

                bubbles: true
            });

            this.element.dispatchEvent(customEvent);
        };

        let onMouseUp = (event) => {
            event.preventDefault();
            doc.removeEventListener('mousemove', onMouseMove);
            doc.removeEventListener('mouseup', onMouseUp);
            doc = null;
            this.isDragging = false;

            let [posX, posY] = getPosition(event.clientX, event.clientY);
            this._tx = posX;
            this._ty = posY;

            this.element.style.transform = `translate(${posX}px, ${posY}px)`;

            if(this.revert === true) {
                this._setPosition(this._left, this._top);
                this._tx = 0;
                this._ty = 0;
            } else if(typeof this.revert === 'number') {
                let animation = new Animation({
                    left: posX,
                    top: posY
                }, {
                    left: this._left,
                    top: this._top
                }, this.revert, (frame) => {
                    this._setPosition(frame.left, frame.top);
                });

                animation.play();
                this._revertFX = animation;
            } else {
                this._left = posX;
                this._top = posY;
                this._tx = 0;
                this._ty = 0;
            }

            if(target !== this.element && target.parentElement) {
                target.parentElement.removeChild(target);
            }

            this.sendMessage('drag-end', {
                startMouseX,
                startMouseY,
                offsetX,
                offsetY,
                mouseX: event.clientX,
                mouseY: event.clientY
            }, this);

            let customEvent = new CustomEvent('drag-end', {
                detail: {
                    startMouseX,
                    startMouseY,
                    offsetX,
                    offsetY,
                    mouseX: event.mouseX,
                    mouseY: event.mouseY,
                    draggable: this
                },

                bubbles: true
            });

            this.element.dispatchEvent(customEvent);
        };

        doc.addEventListener('mousemove', onMouseMove);
        doc.addEventListener('mouseup', onMouseUp);

        let [px, py] = getPosition(posX, posY);
        this._setPosition(px, py);

        this.sendMessage('drag-start', {
            startMouseX,
            startMouseY,
            offsetX,
            offsetY,
            mouseX: posX,
            mouseY: posY
        }, this);

        let customEvent = new CustomEvent('drag-start', {
            detail: {
                startMouseX,
                startMouseY,
                offsetX,
                offsetY,
                mouseX: posX,
                mouseY: posY,
                draggable: this
            },

            bubbles: true
        });

        this.element.dispatchEvent(customEvent);
    }

    _setPosition(x, y) {
        window.requestAnimationFrame(() => {
            this._tx = x;
            this._ty = y;
            this.element.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
}
