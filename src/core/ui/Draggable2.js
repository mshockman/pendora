import Publisher from "../Publisher";
import {calcDistance, clamp} from "../utility";
import Rect from "../vectors/Rect";
import {getScroll} from "../utility";
import {setElementClientPosition} from "./position";


export function cursor(target, event) {
    let rect = new Rect(target);

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}


export default class Draggable2 extends Publisher {
    #element;
    #droppables;
    #boundOnMouseDown;
    #revertFX;
    #isDragging;

    constructor(element, {container=null, axis='xy', exclude='', delay=0, offset=cursor,
        resistance=0, handle=null, helper=null, revert=false, revertDuration=1000,
        scrollSpeed=0, selector=null, tolerance='intersect', setHelperSize=false, grid=null}={}) {
        super();

        if(typeof element === 'string') {
            this.#element = document.querySelector(element);
        } else {
            this.#element = element;
        }

        this.#droppables = [];
        this.#revertFX = null;
        this.#isDragging = false;

        this.container = container;
        this.axis = axis;
        this.exclude = exclude;
        this.delay = delay;
        this.offset = offset;
        this.resistance = resistance;
        this.handle = handle;
        this.helper = helper;
        this.revert = revert;
        this.revertDuration = revertDuration;
        this.scrollSpeed = scrollSpeed;
        this.selector = selector;
        this.tolerance = tolerance;
        this.setHelperSize = setHelperSize;
        this.grid = grid;

        if(typeof this.container === 'string') {
            this.container = document.querySelector(this.container);
        }

        this.#boundOnMouseDown = event => {
            return this.onMouseDown(event);
        };

        this.element.addEventListener('mousedown', this.#boundOnMouseDown);
    }

    /**
     * Starts dragging if the correct elements have been targeted and delay and resistance have been meet.
     *
     * @param event
     * @returns {Promise<void>}
     */
    async onMouseDown(event) {
        let startPosition = {x: event.clientX + window.pageXOffset, y: event.clientY + window.pageYOffset},
            currentPosition = {x: startPosition.x, y: startPosition.y},
            target = this.#element,
            cancelMouseTracking = null,
            cancelTimer = null,
            distanceBrokenPromise,
            timerPromise,
            offset;

        // Only start dragging if a draggable child of the element is targeted.
        // If selector is null then the entire element is draggable and should be the target.
        if(this.selector) {
            target = event.target.closest(this.selector);

            if(!target || !this.#element.contains(target)) {
                return;
            }
        }

        // Only start dragging if the handle was targeted.
        // If handle is null then the entire target is the handle.
        if(this.handle) {
            let handle = event.target.closest(this.handle);

            if(!handle || !target.contains(handle)) {
                return;
            }
        }

        // If any excluded elements are targeted ignore the event.
        if(this.exclude) {
            let exclude = event.target.closest(this.exclude);

            if(exclude && target.contains(exclude)) {
                return;
            }
        }

        // Find the offset of the event.
        if(typeof this.offset === 'function') {
            offset = this.offset(target, event);
        } else if(Array.isArray(this.offset)) {
            offset = {
                x: this.offset[0],
                y: this.offset[1]
            };
        } else if(typeof this.offset === 'object') {
            offset = {
                x: this.offset.x,
                y: this.offset.y
            };
        } else {
            offset = {x: 0, y: 0};
        }

        // Prevent default browser actions.
        event.preventDefault();

        // At this point we can be sure that a draggable item was
        // targeted by it's handle and no excluded items where clicked.

        // Creates a promise that both tracks the current mouse coords and resolve
        // when the user passes the given resistance.
        distanceBrokenPromise = new Promise(resolve => {
            let isDistanceBroken = this.resistance <= 0;

            if(isDistanceBroken) {
                resolve('complete');
            }

            let onMouseMove = event => {
                currentPosition.x = event.clientX + window.pageXOffset;
                currentPosition.y = event.clientY + window.pageYOffset;
                event.preventDefault();

                if(!isDistanceBroken && calcDistance(currentPosition.x, currentPosition.y, startPosition.x, startPosition.y) > this.resistance) {
                    resolve('complete');
                    isDistanceBroken = true;
                }
            };

            // Cancel mouse tracking and resolve the promise to canceled if hasn't already been resolve.
            // This function must be called or their will be a memory leak before onMouseDown completes.
            cancelMouseTracking = () => {
                if(onMouseMove) {
                    document.removeEventListener('mousemove', onMouseMove);

                    if(!isDistanceBroken) {
                        resolve('canceled');
                    }

                    onMouseMove = null;
                }
            };

            document.addEventListener('mousemove', onMouseMove);
        });

        // Creates a promise that resolve when after the delay time passes or the user cancels the drag by
        // releasing the mouse button.
        timerPromise = new Promise(resolve => {
            let timer = null;

            if(this.delay >= 0) {
                timer = setTimeout(() => {
                    resolve("complete");
                    timer = null;
                }, this.delay);
            } else {
                resolve('complete');
            }

            // cancel the timer and resolve it to canceled if it is still active.
            cancelTimer = () => {
                if(timer) {
                    clearTimeout(timer);
                    resolve('canceled');
                }
            };
        });

        // cancel the timer and mouse tracking if they are still active.
        let onMouseUp = event => {
            event.preventDefault();
            cancelTimer();
            cancelMouseTracking();
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mouseup', onMouseUp);

        // Wait until the delay time and distance have passed or failed.
        let [timerStatus, distanceStatus] = await Promise.all([timerPromise, distanceBrokenPromise]);

        // Ensure that mouse tracking has been canceled.
        if(cancelMouseTracking) cancelMouseTracking();

        // At this point both the timer and distance status should have passed or failed.
        // If either failed do nothing.
        if(timerStatus === 'complete' && distanceStatus === 'complete') {
            this.startDragging(target, {
                offsetX: offset.x,
                offsetY: offset.y,
                // Make relative to client.
                startingX: currentPosition.x - window.pageXOffset,
                startingY: currentPosition.y - window.pageYOffset
            });
        }
    }

    startDragging(element, pos) {
        if(this.#isDragging) {
            return;
        }

        this.#isDragging = true;

        if(this.#revertFX) {
            this.#revertFX.cancel();
            this.#revertFX = null;
        }

        console.log("Start Dragging");

        let target = element,
            container = this.container,
            scroller = null,
            dropTargets = [];

        if(typeof container === 'string') {
            container = document.querySelector(container);
        }

        if(this.helper) {
            if(typeof this.helper === 'function') {
                target = this.helper(element);
            } else {
                target = this.helper;
            }
        }

        if(target !== element && !target.parentElement && element.parentElement) {
            element.parentElement.appendChild(target);
        }

        let onMouseMove = event => {
            event.preventDefault();
            let rect = _moveElementToPosition(target, event.clientX, event.clientY, pos.offsetX, pos.offsetY, _selectElementRect(container, this, target, element));

            if(this.scrollSpeed > 0) {
                if(scroller) {
                    scroller.cancel();
                    scroller = null;
                }

                scroller = ScrollHelper.buildScrollHelper(element, target, rect, pos, this, event, this.scrollSpeed, container);
            }

            // drag-enter
            let currentDropTargets = this.getDropTargets();

            for(let dropTarget of currentDropTargets) {
                if(dropTargets.indexOf(dropTarget) === -1) {
                    _dispatchDropEvent(this, dropTarget, 'drag.enter', {bubbles: true, details: {clientX: event.clientX, clientY: event.clientY, target, element, originalEvent: event}});
                }
            }

            // drag-move
            for(let dropTarget of currentDropTargets) {
                _dispatchDropEvent(this, dropTarget, 'drag.move', {bubbles: false, details: {clientX: event.clientX, clientY: event.clientY, target, element, originalEvent: event}});
            }

            for(let dropTarget of dropTargets) {
                if(currentDropTargets.indexOf(dropTarget) === -1) {
                    _dispatchDropEvent(this, dropTarget, 'drag.leave', {bubbles: false, details: {clientX: event.clientX, clientY: event.clientY, target, element, originalEvent: event}});
                }
            }

            // drag-leave
            dropTargets = currentDropTargets;
        };

        let onMouseUp = event => {
            event.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            if(scroller) {
                scroller.cancel();
                scroller = null;
            }

            dropTargets = this.getDropTargets();
            let accepted = false;

            for(let dropTarget of dropTargets) {
                _dispatchDropEvent(this, dropTarget, 'drag.dropping', {
                    bubbles: true,

                    details: {
                        clientX: event.clientX,
                        clientY: event.clientY,
                        originalEvent: event,
                        target,
                        element,
                        accept() {
                            accepted = true;
                        }
                    }
                })
            }

            if(!accepted) {
                if(this.revert) {
                    _revert(element, target, this.revertDuration);
                } else {
                    if(target !== element) {
                        target.parentElement.removeChild(target);
                    }
                }
            } else {
                if(target !== element) {
                    target.parentElement.removeChild(target);
                }

                _moveElementToPosition(element, event.clientX, event.clientY, pos.offsetX, pos.offsetY, _selectElementRect(container, this, target, element));

                for(let dropTarget of dropTargets) {
                    _dispatchDropEvent(this, dropTarget, 'drag.drop', {
                        bubbles: true,

                        details: {
                            clientX: event.clientX,
                            clientY: event.clientY,
                            originalEvent: event,
                            target,
                            element
                        }
                    })
                }
            }
        };

        // Set target to starting position.
        if(pos.startingX !== undefined && pos.startingY !== undefined) {
            let rect = _moveElementToPosition(target, pos.startingX, pos.startingY, pos.offsetX, pos.offsetY, _selectElementRect(container, this, target, element));
            dropTargets = this.getDropTargets(rect, {mouseX: pos.startingX, mouseY: pos.startingY});

            for(let dropTarget of dropTargets) {
                _dispatchDropEvent(this, dropTarget, 'drag.enter', {bubbles: true, details: {initial: true, clientX: pos.startingX, clientY: pos.startingY, target, element}});
            }
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        this.#isDragging = false;
    }

    getDropTargets() {
        return [];
    }

    connect(droppable) {

    }

    disconnect(droppable) {

    }

    hasDroppable(droppable) {

    }

    get droppables() {
        return this.#droppables.slice(0);
    }

    get element() {
        return this.#element;
    }
}


function _dispatchDropEvent(self, target, name, options) {

}


function _revert(element, target, revertDuration) {

}


/**
 * Takes a client (x, y) position and some offset coords and move the element to the given position.
 *
 * @param element
 * @param x
 * @param y
 * @param offsetX
 * @param offsetY
 * @param container
 * @private
 * @returns {*|Rect}
 */
function _moveElementToPosition(element, x, y, offsetX, offsetY, container) {
    let rect = new Rect(element);
    rect = rect.moveTo({left: x, top: y});

    offsetX = offsetX || 0;
    offsetY = offsetY || 0;

    rect = rect.translate(-offsetX, -offsetY);

    if(container) {
        container = new Rect(container);
        rect = rect.fit(container);
    }

    setElementClientPosition(element, rect, 'translate3d');
    return rect;
}


// noinspection JSCommentMatchesSignature
/**
 * For module use only.  Selects the element either by css selector, if it's a string, or resolve a function.
 * If the element is already element is is returned direction.  Returns null if not element is provided.
 *
 * @param element
 * @param dragInstance
 * @param target
 * @returns {null|*}
 * @private
 */
function _selectElementRect(element, dragInstance, target, originalTarget) {
    if(element) {
        let type = typeof element;

        if(type === 'function') {
            return new Rect(element.call(dragInstance, target, originalTarget, dragInstance));
        } else if(type === 'string') {
            return new Rect(document.querySelector(element));
        }

        return new Rect(element);
    }

    return null;
}


/**
 * Returns the first scrollable parent.
 *
 * @param element
 * @returns {HTMLElement|null}
 * @private
 */
function _getScrollParent(element) {
    let o = element.parentElement;

    while(o) {
        if (o.scrollWidth > o.clientWidth || o.scrollHeight > o.clientHeight) {
            return o;
        }

        o = o.parentElement;
    }

    return null;
}


/**
 * Helper class that is used to control scrolling when the element is dragged outside of bounds.
 */
class ScrollHelper {
    constructor(element, scrollXSpeed=0, scrollYSpeed=0, onFrame=null) {
        this.frameID = null;
        this.element = element;
        this.scrollXSpeed = scrollXSpeed;
        this.scrollYSpeed = scrollYSpeed;
        this.onFrame = onFrame;
        this.timestamp = performance.now();

        let frame = timestamp => {
            let delta = (timestamp - this.timestamp) / 1000;

            // todo remove debug
            // console.log({
            //     delta,
            //     scrollXSpeed: this.scrollXSpeed,
            //     scrollYSpeed: this.scrollYSpeed,
            //     timestamp,
            //     lastTimestamp: this.timestamp
            // });

            this.timestamp = timestamp;

            this.element.scrollLeft += delta * this.scrollXSpeed;
            this.element.scrollTop += delta * this.scrollYSpeed;

            if(this.onFrame) {
                this.onFrame(this);
            }

            this.frameID = window.requestAnimationFrame(frame);
        };

        this.frameID = window.requestAnimationFrame(frame);
    }

    cancel() {
        if(this.frameID) {
            window.cancelAnimationFrame(this.frameID);
            this.frameID = null;
        }
    }

    static getScrollSpeed(rect, scrollParentRect) {
        let r = {x: 0, y: 0};

        if(rect.right > scrollParentRect.right) {
            r.x = clamp((rect.right - scrollParentRect.right) / rect.width, -1, 1);
        } else if(rect.left < scrollParentRect.left) {
            r.x = clamp((rect.left - scrollParentRect.left) / rect.width, -1, 1);
        }

        if(rect.bottom > scrollParentRect.bottom) {
            r.y = clamp((rect.bottom - scrollParentRect.bottom) / rect.width, -1, 1);
        } else if(rect.top < scrollParentRect.top) {
            r.y = clamp((rect.top - scrollParentRect.top) / rect.width, -1, 1);
        }

        return r;
    }

    static buildScrollHelper(element, target, rect, pos, dragInstance, event, scrollSpeed, container) {
        let scrollParent = _getScrollParent(element);

        if(scrollParent) {
            let scrollParentRect = new Rect(scrollParent),
                speed = ScrollHelper.getScrollSpeed(rect, scrollParentRect);

            if(speed.x || speed.y) {
                return new ScrollHelper(scrollParent, speed.x * scrollSpeed, speed.y * scrollSpeed, (scroller) => {
                    let rect = _moveElementToPosition(target, event.clientX, event.clientY, pos.offsetX, pos.offsetY, _selectElementRect(container, dragInstance, target, element));

                    let scrollRect = new Rect(scroller.element);

                    setElementClientPosition(target, rect, 'translate3d');

                    if(scrollRect.contains(rect)) {
                        scroller.cancel();
                        scroller = null;
                    }
                });
            }
        }
    }
}


export function ScrollArea(selector) {
    return function() {
        let element = selector;

        if(typeof element === 'string') {
            element = document.querySelector(element);
        }

        let rect = new Rect(element),
            scroll = getScroll(element);

        rect.left -= scroll.scrollLeft;
        rect.top -= scroll.scrollTop;
        rect.right = rect.left + element.scrollWidth;
        rect.bottom = rect.top + element.scrollHeight;

        return rect;
    }
}


export function clone(opacity=null, className=null, zIndex=null) {
    if(typeof opacity === 'object' && opacity.nodeType) {
        return opacity.cloneNode(true);
    }

    return function(element) {
        let r = element.cloneNode(true);

        if(opacity !== null) {
            r.style.opacity = opacity;
        }

        if(className) {
            r.className = className;
        }

        r.style.position = "absolute";
        if(zIndex !== null) r.style.zIndex = zIndex;

        return r;
    }
}
