import {addClasses} from 'core/utility';
import Animation from "core/Animation";
import {privateCache} from "core/data";


export function cursor({cursorX, cursorY, boundingRect}) {
    return [cursorX - boundingRect.left, cursorY - boundingRect.top];
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


function _getClientRect(element) {
    let box = element.getBoundingClientRect();

    return {
        left: box.left + window.scrollX,
        top: box.top + window.scrollY,
        width: box.width,
        height: box.height
    };
}


function debug_output(selector, message) {
    // todo remove debug
    let output = document.querySelector(selector);
    output.innerText = message;
}


export default class Draggable {
    static CLONE = clone;
    static OFFSET_CURSOR = cursor;

    constructor(element, {container=null, axis='xy', exclude="input, button, select, .js-no-drag, textarea", delay=null, offset=cursor, disabled=false,
        distance=null, handle=null, helper=null, revert=null, scroll=null, classes=null, selector=null}={}) {

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
        this.offset = offset;
        this.axis = axis;
        this.delay = delay;
        this.distance = distance;
        this.container = container;
        this.handle = handle;
        this.exclude = exclude;
        this.revert = revert;
        this.selector = selector;

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
        let element = this.element;

        if(this.selector) {
            element = event.target.closest(this.selector);

            if(!this.element.contains(element)) {
                element = null;
            }
        }

        if(!element) return;

        let data = privateCache.cache(element);

        if(data.isDragging || this.disabled) {
            return;
        }

        if(this.handle) {
            let handle = event.target.closest(this.handle);

            if(!handle || !element.contains(handle)) {
                return;
            }
        }

        if(this.exclude) {
            let excluded = event.target.closest(this.exclude);

            if(excluded && element.contains(excluded)) {
                return;
            }
        }

        event.preventDefault();

        let distance = this.distance || 0,
            delay = typeof this.delay === 'number' ? this.delay : -1,
            doc = document,
            startX = event.clientX + window.scrollX,
            startY = event.clientY + window.scrollY,
            posX = startX,
            posY = startY;

        // Tests to see that delay and distance was met before dragging.
        let startDragging = () => {
            if(distance === 0 && delay < 0) {
                this.startDrag(element, startX, startY, posX, posY);
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
                posX = event.clientX + window.scrollX;
                posY = event.clientY + window.scrollY;

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
     * @param element
     * @param startMouseX
     * @param startMouseY
     * @param posX
     * @param posY
     */
    startDrag(element, startMouseX, startMouseY, posX, posY) {
        if(this.isDragging) {
            return;
        }

        let cache = privateCache.cache(element);

        cache.isDragging = true;

        if(this._revertFX) {
            this._revertFX.cancel();
            this._revertFX = null;
        }

        let doc = document,
            target;

        if(!this.helper || this.helper === 'self') {
            target = element;
        } else if(typeof this.helper === 'function') {
            target = this.helper(this);
        } else if(this.helper) {
            target = this.helper;
        }

        if(target !== element && !target.parentElement) {
            element.parentElement.appendChild(target);
        }

        let container,
            startBoundingBox = _getClientRect(element);

        let mouseOffsetX = posX - startBoundingBox.left,
            mouseOffsetY = posY - startBoundingBox.top,
            offsetX = mouseOffsetX, // offset top left corner to mouse position by default.
            offsetY = mouseOffsetY; // offset top left corner to mouse position by default.

        // Remember starting x, y position for reverting.
        let startLeft = cache._left || 0,
            startTop = cache._top || 0;

        if(this.offset) {
            let offset = this.offset;

            if(typeof offset === 'function') {
                offset = this.offset({
                    target: target,
                    draggable: this,
                    cursorX: startMouseX,
                    cursorY: startMouseY,
                    boundingRect: startBoundingBox
                });
            }

            if(offset) {
                offsetX -= offset[0];
                offsetY -= offset[1];
            }
        }

        debug_output('#output-offset', `(${offsetX}, ${offsetY})`);

        if(this.container === 'viewport') {
            // todo: fix bug
            // this mostly likely needs to recalulated every update to viewport because of scrolling.
            container = () => {
                return {
                    left: window.scrollX,
                    top: window.scrollY,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            };
        }

        let getPosition = (mouseX, mouseY) => {
            // Calculate the change is mouse position.
            let deltaX = 0,
                deltaY = 0,
                x, y;

            if(this.axis === 'x' || this.axis === 'xy') {
                deltaX = mouseX - startMouseX;
            }

            if(this.axis === 'y' || this.axis === 'xy') {
                deltaY = mouseY - startMouseY;
            }

            x = startLeft + offsetX + deltaX + (startBoundingBox.left - startLeft);
            y = startTop + offsetY + deltaY + (startBoundingBox.top - startTop);

            let boundingBox = target.getBoundingClientRect();

            if(container) {
                if(typeof container === 'function') {
                    container = container(this);
                }

                x = Math.max(container.left, Math.min(x, container.left + container.width - boundingBox.width));
                y = Math.max(container.top, Math.min(y, container.top + container.height - boundingBox.height));
            }

            x -= (startBoundingBox.left - startLeft);
            y -= (startBoundingBox.top - startTop);

            debug_output('#output-xy', `(${x}, ${y})`);

            return [x, y];
        };

        let onMouseMove = (event) => {
            event.preventDefault();

            let [x, y] = getPosition(event.clientX + window.scrollX, event.clientY + window.scrollY);

            this.translate(target, x, y);

            let dragEvent = new CustomEvent("drag-move", {
                bubbles: true,

                detail: {
                    mouseX: event.mouseX,
                    mouseY: event.mouseY,
                    startMouseX,
                    startMouseY,
                    offsetX,
                    offsetY,
                    draggable: this
                }
            });

            element.dispatchEvent(dragEvent);
        };

        let onMouseUp = (event) => {
            event.preventDefault();
            doc.removeEventListener('mousemove', onMouseMove);
            doc.removeEventListener('mouseup', onMouseUp);
            doc = null;
            cache.isDragging = false;

            let [x, y] = getPosition(event.clientX + window.scrollX, event.clientY + window.scrollY);
            this.translate(target, x, y);

            let accepted = false;

            let dragEnd = new CustomEvent('drag-end', {
                bubbles: true,

                detail: {
                    startMouseX,
                    startMouseY,
                    offsetX,
                    offsetY,
                    mouseX: event.mouseX,
                    mouseY: event.mouseY,
                    originalEvent: event,
                    draggable: this,

                    accept: () => accepted = true,

                    isAccepted: () => { return accepted; }
                }
            });

            element.dispatchEvent(dragEnd);

            if(!accepted && this.revert === true) {
                this.translate(target, cache._tx || 0, cache._ty || 0);

                if(target !== element && target.parentElement) {
                    target.parentElement.removeChild(target);
                }
            } else if(!accepted && typeof this.revert === 'number') {
                let animation = new Animation(
                    {
                        left: x,
                        top: y
                    }, {
                        left: cache._tx || 0,
                        top: cache._ty || 0
                    },
                    this.revert,
                    {
                        onFrame: (fx) => {
                            this.translate(target, fx.frame.left, fx.frame.top);
                        },

                        onComplete: () => {
                            if (target !== element && target.parentElement) {
                                target.parentElement.removeChild(target);
                                cache._left = cache._tx || 0;
                                cache._top = cache._ty || 0;
                            }
                        },

                        onCancel: () => {
                            if (target !== element && target.parentElement) {
                                target.parentElement.removeChild(target);
                                cache._left = cache._tx || 0;
                                cache._top = cache._ty || 0;
                            }
                        }
                    }
                );

                animation.play();
                this._revertFX = animation;
            } else {
                this.translate(element, x, y);
                cache._tx = x || 0;
                cache._ty = y || 0;

                if(target !== element && target.parentElement) {
                    target.parentElement.removeChild(target);
                }
            }
        };

        doc.addEventListener('mousemove', onMouseMove);
        doc.addEventListener('mouseup', onMouseUp);

        let [px, py] = getPosition(posX, posY);
        this.translate(target, px, py);

        let dragStart = new CustomEvent('drag-start', {
            bubbles: true,
            detail: {
                startMouseY,
                startMouseX,
                offsetY,
                offsetX,
                draggable: this
            }
        });

        element.dispatchEvent(dragStart);
    }

    translate(target, x, y) {
        let cache = privateCache.cache(target);

        cache._left = x;
        cache._top = y;

        window.requestAnimationFrame(() => {
            target.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    }

    // todo debug _tx and _ty
    set _tx(value) {
        this.__tx = value;
        debug_output('#txy', `(${this._tx}, ${this._ty})`);
    }

    get _tx() {
        return this.__tx;
    }

    set _ty(value) {
        this.__ty = value;
        debug_output('#txy', `(${this._tx}, ${this._ty})`);
    }

    get _ty() {
        return this.__ty;
    }
}
