import {addClasses, clamp} from 'core/utility';
import Animation from "core/Animation";
import {privateCache} from "core/data";
import {getTranslation} from "core/position";


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
            startMouseDocumentX = event.clientX + window.scrollX,
            startMouseDocumentY = event.clientY + window.scrollY,
            mouseDocumentX = startMouseDocumentX,
            mouseDocumentY = startMouseDocumentY;

        // Tests to see that delay and distance was met before dragging.
        let startDragging = () => {
            if(distance === 0 && delay < 0) {
                this.startDrag(element, startMouseDocumentX, startMouseDocumentY, mouseDocumentX, mouseDocumentY);
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
                mouseDocumentX = event.clientX + window.scrollX;
                mouseDocumentY = event.clientY + window.scrollY;

                let delta = Math.sqrt(
                    (mouseDocumentX - startMouseDocumentX)**2 + (mouseDocumentY - startMouseDocumentY)**2
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
        // todo is this doing anything?  Check to make sure flag gets set.
        if(this.isDragging) {
            return;
        }

        this.isDragging = true;

        // Cancel any animation that are running.
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

        // If the target doesn't have a parentElement it needs to be added to the page.
        if(!target.parentElement) {
            element.parentElement.appendChild(target);
        }

        let container,
            startBoundingBox = _getClientRect(element);

        // mouseOffsetX and mouseOffsetY is the mouses offset relative to the top left corner of the element
        // being dragged.

        // offsetX and offsetY is how much the dragged element is offset from the cursor.
        // By default it is at the top left of the element.
        let offsetX = 0, // offset top left corner to mouse position by default.
            offsetY = 0, // offset top left corner to mouse position by default.
            startingTranslation = getTranslation(target);

        // The offset property controls how much the dragged element is offset from top left corner of the element.
        // By default it is [0, 0] but a function can be or array can be passed to control this behavior.
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

        // The container property constrains the draggable element to a specific area.
        if(this.container === 'viewport') {
            container = () => {
                return {
                    left: window.scrollX,
                    top: window.scrollY,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            };
        }

        // Takes mouse position relative to document.
        let getPosition = (mouseX, mouseY) => {
            let translation = getTranslation(target),
                bb = target.getBoundingClientRect();

            let x = mouseX + offsetX,
                y = mouseY + offsetY;

            if(container) {
                if(typeof container === 'function') {
                    container = container();
                }

                x = clamp(x, container.left, container.left + container.width - bb.width);
                y = clamp(y, container.top, container.top + container.height - bb.height);
            }

            let deltaX = (bb.left + window.scrollX) - x,
                deltaY = (bb.top + window.scrollY) - y;

            return [
                translation.x - deltaX,
                translation.y - deltaY
            ];
        };

        let onMouseMove = (event) => {
            event.preventDefault();

            let [x, y] = getPosition(event.clientX + window.scrollX, event.clientY + window.scrollY);

            this.translate(target, x, y);

            let dragEvent = new CustomEvent("drag-move", {
                bubbles: true,

                detail: {
                    mouseX: event.clientX + window.scrollX,
                    mouseY: event.clientY + window.scrollY,
                    clientX: event.clientX,
                    clientY: event.clientY,
                    startMouseX,
                    startMouseY,
                    offsetX,
                    offsetY,
                    draggable: this,
                    helper: target,
                    originalEvent: event
                }
            });

            element.dispatchEvent(dragEvent);
        };

        let onMouseUp = (event) => {
            event.preventDefault();
            doc.removeEventListener('mousemove', onMouseMove);
            doc.removeEventListener('mouseup', onMouseUp);
            doc = null;
            this.isDragging = false;

            let [x, y] = getPosition(event.clientX + window.scrollX, event.clientY + window.scrollY);
            this.translate(target, x, y);

            let accepted = null;

            function accept(element) {
                if(!accepted) {
                    accepted = element;
                } else {
                    throw new Error("Draggable has already been accepted.");
                }
            }

            function isAccepted() {
                return !!accepted;
            }

            let dragEnd = new CustomEvent('drag-end', {
                bubbles: true,

                detail: {
                    startMouseX,
                    startMouseY,
                    offsetX,
                    offsetY,
                    mouseX: event.clientX + window.scrollX,
                    mouseY: event.clientY + window.scrollY,
                    clientX: event.clientX,
                    clientY: event.clientY,

                    originalEvent: event,
                    draggable: this,
                    helper: target,

                    accept: accept,
                    isAccepted: isAccepted
                }
            });

            dragEnd.accept = accept;
            dragEnd.isAccepted = isAccepted;

            element.dispatchEvent(dragEnd);

            if(!accepted && this.revert === true) {
                this.translate(target, startingTranslation.x, startingTranslation.y);

                if(target !== element && target.parentElement) {
                    target.parentElement.removeChild(target);
                }

                let dragComplete = new CustomEvent('drag-complete', {
                    bubbles: true,
                    detail: {
                        draggable: this
                    }
                });

                element.dispatchEvent(dragComplete);
            } else if(!accepted && typeof this.revert === 'number') {
                let animation = new Animation(
                    {
                        left: x,
                        top: y
                    }, {
                        left: startingTranslation.x,
                        top: startingTranslation.y
                    },
                    this.revert,
                    {
                        onFrame: (fx) => {
                            this.translate(target, fx.frame.left, fx.frame.top);
                        },

                        onComplete: () => {
                            if (target !== element && target.parentElement) {
                                target.parentElement.removeChild(target);
                            }

                            let dragComplete = new CustomEvent('drag-complete', {
                                bubbles: true,
                                detail: {
                                    draggable: this
                                }
                            });

                            element.dispatchEvent(dragComplete);
                        },

                        onCancel: () => {
                            if (target !== element && target.parentElement) {
                                target.parentElement.removeChild(target);
                            }
                        }
                    }
                );

                animation.play();
                this._revertFX = animation;
            } else {
                this.translate(element, x, y);

                if(target !== element && target.parentElement) {
                    target.parentElement.removeChild(target);
                }

                let dragComplete = new CustomEvent('drag-complete', {
                    bubbles: true,
                    detail: {
                        draggable: this
                    }
                });

                element.dispatchEvent(dragComplete);
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
                mouseX: posX,
                mouseY: posY,
                clientX: posX - window.scrollX,
                clientY: posY - window.scrollY,
                draggable: this,
                helper: target
            }
        });

        element.dispatchEvent(dragStart);
    }

    // noinspection JSMethodCanBeStatic
    translate(target, x, y) {
        target.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
}
