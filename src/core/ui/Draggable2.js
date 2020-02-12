import Publisher from "../Publisher";
import {calcDistance, clamp} from "../utility";
import Rect from "../vectors/Rect";
import {getScroll} from "../utility";
import {setElementClientPosition} from "./position";
import Animation from "../fx/Animation";


const startingPosMap = new WeakMap();


export function cursor(target, event) {
    let rect = new Rect(target);

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}


export const TOLERANCE = {
    intersect(element, rect) {
        let targetRect = new Rect(element);

        return targetRect.isOverlapping(rect);
    }
};


export default class Draggable2 extends Publisher {
    #element;
    #droppables;
    #boundOnMouseDown;
    #revertFX;
    #isDragging;

    constructor(element, {container=null, axis='xy', exclude='', delay=0, offset=cursor,
        resistance=0, handle=null, helper=null, revert=false, revertDuration=0,
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
                startingX: currentPosition.x,
                startingY: currentPosition.y
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

        let target = element,
            container = this.container,
            scroller = null,
            dropTargets = [],
            startPosition = new Rect(element);

        startPosition = startPosition.translate(
            window.pageXOffset,
            window.pageYOffset
        );

        if(!startingPosMap.get(element)) {
            startingPosMap.set(element, startPosition);
        }

        if(typeof container === 'string') {
            container = document.querySelector(container);
        }

        if(this.helper) {
            if(typeof this.helper === 'function') {
                target = this.helper(element);
            } else {
                target = this.helper;
            }

            if(this.setHelperSize) {
                target.style.width = startPosition.width + "px";
                target.style.height = startPosition.height + "px";
            }

            target.style.pointerEvents = 'none';
        }

        if(target !== element && !target.parentElement && element.parentElement) {
            element.parentElement.appendChild(target);
        }

        let onMouseMove = event => {
            event.preventDefault();
            let rect = _moveElementToPosition(this, target, event.clientX, event.clientY, pos.offsetX, pos.offsetY, _selectElementRect(container, this, target, element));

            if(this.scrollSpeed > 0) {
                if(scroller) {
                    scroller.cancel();
                    scroller = null;
                }

                scroller = ScrollHelper.buildScrollHelper(element, target, rect, pos, this, event, this.scrollSpeed, container);
            }

            // drag-enter
            let currentDropTargets = this.getDropTargets(rect, {mouseX: event.clientX, mouseY: event.clientY});

            for(let dropTarget of currentDropTargets) {
                if(dropTargets.indexOf(dropTarget) === -1) {
                    _dispatchDropEvent(this, dropTarget, 'drag.enter', {bubbles: true, detail: {clientX: event.clientX, clientY: event.clientY, target, element, originalEvent: event}});
                }
            }

            for(let dropTarget of dropTargets) {
                if(currentDropTargets.indexOf(dropTarget) === -1) {
                    _dispatchDropEvent(this, dropTarget, 'drag.leave', {bubbles: false, detail: {clientX: event.clientX, clientY: event.clientY, target, element, originalEvent: event}});
                }
            }

            // drag-leave
            dropTargets = currentDropTargets;

            this.publish('drag.move', {
                draggable: this,
                name: 'drag.enter',
                target: target,
                element: element,
                originalEvent: event,
                clientX: event.clientX,
                clientY: event.clientY
            });
        };

        let onMouseUp = async event => {
            event.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            if(scroller) {
                scroller.cancel();
                scroller = null;
            }

            dropTargets = this.getDropTargets();
            let accepted = false,
                isDefaultPrevented = false,
                reverted = false;

            this.publish('drag.drop', {
                name: 'drag.drop',
                draggable: this,
                target,
                element,
                originalEvent: event,
                clientX: event.clientX,
                clientY: event.clientY,

                isDefaultPrevented() {
                    return isDefaultPrevented;
                },

                isAccepted() {
                    return accepted;
                },

                accept() {
                    accepted = true;
                },

                preventDefault() {
                    isDefaultPrevented = true;
                }
            });

            if(this.revert && !accepted) {
                if(!this.revertDuration) {
                    if(target !== element) {
                        target.parentElement.removeChild(target);
                    } else {
                        let pos = startPosition.translate(
                            -window.pageXOffset,
                            -window.pageYOffset
                        );

                        setElementClientPosition(target, pos, 'translate3d');
                    }

                    startingPosMap.delete(element);
                } else {
                    let pos = startingPosMap.get(element);

                    this.#revertFX = _revert(target, pos, this.revertDuration);

                    if(await this.#revertFX === Animation.complete) {
                        startingPosMap.delete(element);
                    }

                    this.#revertFX = null;

                    if(target !== element) {
                        target.parentElement.removeChild(target);
                        startingPosMap.delete(element); // don't need to save.
                    }
                }

                reverted = true;
            } else {
                if(target !== element) {
                    target.parentElement.removeChild(target);
                }

                if(isDefaultPrevented) _moveElementToPosition(this, element, event.clientX, event.clientY, pos.offsetX, pos.offsetY, _selectElementRect(container, this, target, element));
                startingPosMap.delete(element);
            }

            this.publish('drag.end', {
                draggable: this,
                name: 'drag.end',
                target: target,
                element: element,
                originalEvent: event,
                clientX: event.clientX,
                clientY: event.clientY,
                accepted: accepted,
                reverted: reverted
            });
        };

        // Set target to starting position.
        if(pos.startingX !== undefined && pos.startingY !== undefined) {
            let rect = _moveElementToPosition(this, target, pos.startingX - window.pageXOffset, pos.startingY - window.pageYOffset, pos.offsetX, pos.offsetY, _selectElementRect(container, this, target, element));
            dropTargets = this.getDropTargets(rect, {mouseX: pos.startingX - window.pageXOffset, mouseY: pos.startingY - window.pageYOffset});

            for(let dropTarget of dropTargets) {
                _dispatchDropEvent(this, dropTarget, 'drag.enter', {bubbles: true, detail: {initial: true, clientX: pos.startingX - window.pageXOffset, clientY: pos.startingY - window.pageYOffset, target, element}});
            }
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        this.#isDragging = false;

        this.publish('drag.start', {
            draggable: this,
            element,
            target,
            clientX: pos.startingX - window.pageXOffset,
            clientY: pos.startingY - window.pageYOffset,
            name: 'drag.start',
            originalEvent: null
        });
    }

    getDropTargets(rect, mousePos) {
        let r = [];

        let testFunction = this.tolerance;

        if(typeof testFunction === 'string') {
            testFunction = TOLERANCE[testFunction];
        }

        for(let droppable of this.#droppables) {
            if(testFunction(droppable, rect, mousePos, this)) {
                r.push(droppable);
            }
        }

        return r;
    }

    connect(droppable) {
        if(typeof droppable === 'string') {
            droppable = document.querySelector(droppable);
        }

        this.#droppables.push(droppable);
    }

    // noinspection JSUnusedGlobalSymbols
    disconnect(droppable) {
        if(typeof droppable === 'string') {
            droppable = document.querySelector(droppable);
        }

        let i = this.#droppables.indexOf(droppable);

        if(i !== -1) {
            this.#droppables.splice(i, 1);
        }
    }

    // noinspection JSUnusedGlobalSymbols
    hasDroppable(droppable) {
        if(typeof droppable === 'string') {
            droppable = document.querySelector(droppable);
        }

        return this.#droppables.indexOf(droppable) !== -1;
    }

    // noinspection JSUnusedGlobalSymbols
    get droppables() {
        return this.#droppables.slice(0);
    }

    get element() {
        return this.#element;
    }
}


function _dispatchDropEvent(self, target, name, options) {
    let customEvent = new CustomEvent(name, {
        bubbles: options.bubble,

        detail: {
            name,
            target,
            draggable: self,
            ...options.detail
        }
    });

    target.dispatchEvent(customEvent);
}


function _revert(target, position, revertDuration) {
    let starting = new Rect(target);

    let animation = new Animation({
        frames: {
            '0%': {
                left: starting.left + window.pageXOffset,
                top: starting.top + window.pageYOffset
            },

            '100%': {
                left: position.left,
                top: position.top
            }
        },

        applyFrame(fx, frame) {
            setElementClientPosition(fx.element, {
                left: frame.left - window.pageXOffset,
                top: frame.top - window.pageYOffset
            }, 'translate3d');
        }
    });

    return animation.animate(target, {duration: revertDuration});
}


/**
 * Takes a client (x, y) position and some offset coords and move the element to the given position.
 *
 * @param self
 * @param element
 * @param x
 * @param y
 * @param offsetX
 * @param offsetY
 * @param container
 * @private
 * @returns {*|Rect}
 */
function _moveElementToPosition(self, element, x, y, offsetX, offsetY, container) {
    let rect = new Rect(element),
        startingRect = rect;

    rect = rect.moveTo({left: x, top: y});

    offsetX = offsetX || 0;
    offsetY = offsetY || 0;

    rect = rect.translate(-offsetX, -offsetY);

    if(self.axis === 'y') {
        rect = new Rect(
            startingRect.left,
            rect.top,
            startingRect.right,
            rect.bottom
        );
    } else if(self.axis === 'x') {
        rect = new Rect(
            rect.left,
            startingRect.top,
            rect.right,
            startingRect.bottom
        );
    }

    if(typeof self.grid === 'number' && self.grid) {
        let left = Math.floor(rect.left / self.grid) * self.grid,
            top = Math.floor(rect.top / self.grid) * self.grid;

        rect = new Rect(left, top, left + startingRect.width, top + startingRect.height);
    }

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
                    let rect = _moveElementToPosition(this, target, event.clientX, event.clientY, pos.offsetX, pos.offsetY, _selectElementRect(container, dragInstance, target, element));

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
