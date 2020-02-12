import Publisher from "../Publisher";
import {calcDistance, clamp} from "../utility";
import Rect from "../vectors/Rect";
import {getScroll} from "../utility";
import {setElementClientPosition} from "./position";
import Animation from "../fx/Animation";


const reg_percentage_test = /\s*\d+\.?\d*%\s*/;


/**
 * Returns the offset position of the mouse relative to the target.
 *
 * @param target
 * @param event
 * @returns {{x: number, y: number}}
 */
export function cursor(target, event) {
    let rect = new Rect(target);

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}


function buildTestIntersectionFunction(amount) {
    return function(element, rect) {
        rect = new Rect(rect);

        let targetRect = new Rect(element),
            intersection = targetRect.intersection(rect),
            p = intersection ? intersection.getArea() / rect.getArea() : 0;

        return p >= amount;
    }
}


export default class Draggable2 extends Publisher {
    #element;
    #droppables;
    #boundOnMouseDown;
    #itemCache;

    constructor(element, {container=null, axis='xy', exclude='', delay=0, offset=cursor,
        resistance=0, handle=null, helper=null, revert=false, revertDuration=0,
        scrollSpeed=0, selector=null, tolerance=1, setHelperSize=false, grid=null}={}) {
        super();

        if(typeof element === 'string') {
            this.#element = document.querySelector(element);
        } else {
            this.#element = element;
        }

        this.#droppables = [];
        this.#itemCache = new WeakMap();

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

    async startDragging(element, pos) {
        let cache = this.#itemCache.get(element),
            mousePosition = {x: pos.startingX, y: pos.startingY};

        if(!cache) {
            cache = {isDragging: false, fx: null, rect: null, helper: null, element: element};
            this.#itemCache.set(element, cache);
        }

        if(cache.isDragging) {
            return;
        }

        cache.isDragging = true;

        if(cache.fx) {
            await cache.fx.cancel();
            cache.fx = null;
        }

        let target = element,
            container = this.container,
            scroller = null,
            dropTargets = [],
            startPosition = new Rect(element),
            startingClientRect = startPosition;

        startPosition = startPosition.translate(
            window.pageXOffset,
            window.pageYOffset
        );

        if(!cache.rect) {
            cache.rect = startPosition;
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

            if(!target.parentElement && element.parentElement) {
                element.parentElement.appendChild(target);
            }

            target.classList.add('ui-drag-helper');

            cache.helper = target;
        }

        let refreshDropTargets = (rect) => {
            // drag-enter
            let mouseX = mousePosition.x - window.pageXOffset,
                mouseY = mousePosition.y - window.pageYOffset,
                currentDropTargets,
                detail = {clientX: mouseX, clientY: mouseY};

            if(rect !== null) {
                currentDropTargets = this.getDropTargets(rect, {mouseX, mouseY});
            } else {
                currentDropTargets = [];
            }

            for(let dropTarget of currentDropTargets) {
                if(dropTargets.indexOf(dropTarget) === -1) {
                    dispatchDropEvent(this, 'drag.enter', element, target, null, rect, true, true, false, detail, dropTarget);
                }
            }

            for(let dropTarget of dropTargets) {
                if(currentDropTargets.indexOf(dropTarget) === -1) {
                    dispatchDropEvent(this, 'drag.leave', element, target, null, rect, true, true, false, detail, dropTarget);
                }
            }

            // drag-leave
            dropTargets = currentDropTargets;
        };

        let onMouseMove = event => {
            event.preventDefault();
            let rect = _moveElementToPosition(this, target, event.clientX, event.clientY, pos.offsetX, pos.offsetY, _selectElementRect(container, this, target, element));

            mousePosition.x = event.clientX + window.pageXOffset;
            mousePosition.y = event.clientY + window.pageYOffset;

            if(this.scrollSpeed > 0) {
                if(scroller) {
                    scroller.cancel();
                    scroller = null;
                }

                scroller = ScrollHelper.buildScrollHelper(element, target, rect, pos, this, event, this.scrollSpeed, container);
            }

            refreshDropTargets(rect);

            publishDragMoveEvent(this, element, target, event, rect);
        };

        let onMouseUp = async event => {
            event.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            cache.isDragging = false;
            element.classList.remove('ui-dragging');

            if(scroller) {
                scroller.cancel();
                scroller = null;
            }

            let accepted = false,
                isDefaultPrevented = false,
                reverted = false,
                rect = new Rect(target);

            publishDragDropEvent(this, element, target, event, rect, false, {
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
                refreshDropTargets(cache.rect);
                rect = cache.rect;

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
                } else {
                    cache.fx = _revert(target, cache.rect, this.revertDuration);

                    await cache.fx;

                    if(target !== element) {
                        target.parentElement.removeChild(target);
                    }
                }

                reverted = true;
            } else {
                if(target !== element) {
                    target.parentElement.removeChild(target);
                    setElementClientPosition(element, rect, 'translate3d');
                }
            }

            this.#itemCache.delete(element);

            dispatchDropEvent(this, 'drag.end', element, target, event, rect, true, true, true, {accepted, reverted}, element);
        };

        // Set target to starting position.
        if(mousePosition.x !== undefined && mousePosition.y !== undefined) {
            let rect = _moveElementToPosition(this, target, mousePosition.x - window.pageXOffset, mousePosition.y - window.pageYOffset, pos.offsetX, pos.offsetY, _selectElementRect(container, this, target, element));
            refreshDropTargets(rect);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        element.classList.add('ui-dragging');

        dispatchDropEvent(this, 'drag.start', element, target, null, startingClientRect, true, true, true, null);
    }

    getDropTargets(rect, mousePos) {
        let r = [];

        /**
         * @type {number|String|Function|string}
         */
        let testFunction = this.tolerance,
            type = typeof testFunction;

        if(type === 'string') {
            // noinspection JSCheckFunctionSignatures
            if(reg_percentage_test.test(testFunction)) {
                // noinspection JSCheckFunctionSignatures
                testFunction = buildTestIntersectionFunction(parseFloat(testFunction) / 100);
            }
        } else if(type === 'number') {
            testFunction = buildTestIntersectionFunction(testFunction);
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


function _revert(target, position, revertDuration, onFrame=null) {
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

            if(onFrame) onFrame(fx);
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


function _getScrollRect(element) {
    if(element === window || element.nodeName === "HTML") {
        return new Rect(0, 0, window.innerWidth, window.innerHeight);
    } else {
        return new Rect(element);
    }
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
            let scrollParentRect = _getScrollRect(scrollParent),
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


function publishDragMoveEvent(self, element, helper, event, rect, bubbles=false, options=null) {
    return dispatchDropEvent(self, 'drag.move', element, helper, event, rect, bubbles, true, true, options);
}


function publishDragDropEvent(self, element, helper, event, rect, bubbles=true, options=null) {
    return dispatchDropEvent(self, 'drag.drop', element, helper, event, rect, bubbles, true, true, options);
}


function dispatchDropEvent(self, name, element, helper, originalEvent, currentRect, bubbles=false, dispatch=true, publish=false, detail=null, target=null) {
    let eventPackage = {
        name,
        draggable: self,
        target: helper,
        element,
        originalEvent: null,
        rect: currentRect
    };

    if(originalEvent) {
        eventPackage.originalEvent = originalEvent;
        eventPackage.clientX = originalEvent.clientX;
        eventPackage.clientY = originalEvent.clientY;
    }

    if(!target) {
        target = element;
    }

    if(detail) {
        Object.assign(eventPackage, detail);
    }

    if(publish) {
        self.publish(name, eventPackage);
    }

    if(dispatch) {
        let customEvent = new CustomEvent(name, {
            bubbles,
            detail: detail
        });

        target.dispatchEvent(customEvent);
    }
}
