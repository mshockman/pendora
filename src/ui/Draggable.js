import {clamp} from 'core/utility';
import Animation from "core/Animation";
import {privateCache} from "core/data";
import {
    getTranslation,
    setElementClientPosition,
    documentRectToClientSpace,
    clientRectToDocumentSpace,
    snapToGrid
} from "core/position";


/**
 * Draggable option for offset that offsets the position by the cursor.
 *
 * @param clientX
 * @param clientY
 * @param boundingRect
 * @returns {{x, y}}
 */
export function cursor({clientX, clientY, boundingRect}) {
    return {
        x: boundingRect.left - clientX,
        y: boundingRect.top - clientY
    }
}


/**
 * Draggable option that clones the draggable element for the helper element.
 *
 * @param opacity
 * @returns {function(*): (ActiveX.IXMLDOMNode | Node)}
 */
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
 * Sets the target elements x and y position by setting the translate3d translation matrix.
 *
 * @param target
 * @param x
 * @param y
 * @private
 */
function _translate(target, x, y) {
    target.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}


// Group of function that can be passed to Draggables container property that will contain a dragged element to within
// the given parameters.  Function should return a rect with {left, top, width, and height} properties relative to the
// client.  Similiar to Element.getBoundingClientRect().
export const CONTAINERS = {
    /**
     * Constrains to client area.
     * @returns {{top: number, left: number, width: number, height: number}}
     */
    client: function() {
        return {
            left: 0,
            top: 0,
            height: window.innerHeight,
            width: window.innerWidth,
            right: window.innerWidth,
            bottom: window.innerHeight
        };
    },

    /**
     * Constrains to viewport.
     * @param element
     * @returns {{top: number, left: number, width: number, height: number}}
     */
    viewport: function(element) {
        let parent = _getScrollParent(element),
            bb = parent.getBoundingClientRect();

        return {
            left: bb.left - parent.scrollLeft,
            top: bb.top - parent.scrollTop,
            width: parent.scrollWidth,
            height: parent.scrollHeight
        };
    }
};


/**
 * Takes a bounding client rect and constrains the left and top position to within the container.  Returns a new rect.
 *
 * @param rect
 * @param container
 * @param element
 * @param helper
 * @returns {{top: *, left: *}}
 * @private
 */
function _clampPositionToContainer(rect, container, element, helper) {
    let bb = helper.getBoundingClientRect();

    let x = rect.left,
        y = rect.top;

    if(container) {
        if(typeof container === 'function') {
            container = container(element, helper);
        } else if(container.getBoundingClientRect) {
            container = container.getBoundingClientRect();
        } else {
            container = element.closest(container);
            container = container.getBoundingClientRect();
        }

        if(container) {
            x = clamp(x, container.left, container.left + container.width - bb.width);
            y = clamp(y, container.top, container.top + container.height - bb.height);
        }
    }

    return {
        ...rect,
        left: x,
        top: y
    };
}


// Group of function that can be passed to the tolerance property of Draggable to control when an item is considered
// intersecting another for drop events.
const TOLERANCE_FUNCTIONS = {
    intersect: function(droppable, item) {
        let origin = {
            x: item.left + (item.width / 2),
            y: item.top + (item.height / 2)
        };

        return origin.x >= droppable.left
            && origin.x <= droppable.right
            && origin.y >= droppable.top
            && origin.y <= droppable.bottom;
    }
};


/**
 * Behavior class to add the draggable behavior to an element for group of elements.
 */
export default class Draggable {
    static CLONE = clone;
    static OFFSET_CURSOR = cursor;

    /**
     * @param element {Element|String} The element to attach the draggable behavior to.
     * @param container {string|CONTAINERS.client|CONTAINERS.viewport|function}
     *  Constrains the draggable into the given area.
     *  `container` can either be a css selector to match a parent element, a Function(element, helper)
     *  that should return a bounding box.  Or an element who's bounding box will be used.
     * @param axis {'x'|'y'|'xy'}
     *  Controls what axis the item is draggable.  x can be dragged horizontally, y vertically, and xy can be freely dragged.
     * @param exclude {String}
     *  Prevents dragging from starting on matching elements.
     * @param delay {Number}
     *  The time in milliseconds after the mouse down event occurs that dragging will begin.
     * @param offset {{x, y}|[x, y]|Function}
     *  By default when an item is dragged is position will be set relative to the drop left corner of the item.
     *  Offset is used to offset the element from the cursor.  You can pass an {x, y} object, an array with [x, y] pair,
     *  or a Function({target, draggable, clientX, clientY, boundingRect}) that will be called that return an {x, y} object.
     * @param disabled {Boolean}
     *  Disables dragging.
     * @param distance {Number}
     *  Adds resistance to drag starting.  The users must move at least `distance` amount of pixels away from the
     *  starting position for drag to start.
     * @param handle {String}
     *  If dragging will only start if the user clicks an element that matches the css selectors.
     * @param helper {Function|Element}
     *  An element to use as a helper for dragging.  Can be a Element or a Function that returns an element.
     * @param revert {Number|Boolean}
     *  Controls if the draggable reverts back to the starting position if no droppable accepts the target.
     * @param scroll {Number}
     *  Controls the speed that the draggable will scroll the scrollParent when the draggable leaves the viewable area.
     * @param selector {String}
     *  Used to delegate dragging to sub items.
     * @param droppables
     *  An array of css selectors or elements that will be used as drop targets for the draggable.
     * @param tolerance {String}
     *  Controls the function that determines if an item intersects a drop target.
     * @param setHelperSize {Boolean}
     *  If true the helpers width and height will be set by javascript to match the original element.
     * @param grid {{x, y} | [x, y] | Number}
     *  Snaps draggable movement to a grid with the given x, y dimensions.
     */
    constructor(element, {container=null, axis='xy', exclude="input, button, select, .js-no-drag, textarea", delay=null, offset=cursor, disabled=false,
        distance=null, handle=null, helper=null, revert=null, scroll=null, selector=null, droppables=null, tolerance='intersect',
        setHelperSize=false, grid=null}={}) {

        if(typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
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
        this.droppables = [];
        this.tolerance = tolerance;
        this.setHelperSize = setHelperSize;
        this.scroll = scroll;

        if(typeof grid === 'number') {
            this.grid = {
                x: grid,
                y: grid
            };
        } else if(Array.isArray(grid)) {
            this.grid = {
                x: grid[0],
                y: grid[1]
            };
        } else {
            this.grid = grid;
        }

        if(droppables) {
            this.addDroppables(droppables);
        }

        this.element.addEventListener('mousedown', this._onMouseDown);
        this.isDragging = false;

        this._revertFX = null;
    }

    /**
     * Adds a drop target item.  A `droppable` can be an element, a css selector or an array of those.
     * @param droppables
     */
    addDroppables(droppables) {
        if(Array.isArray(droppables)) {
            this.droppables = this.droppables.concat(droppables);
        } else {
            this.droppables.push(droppables);
        }
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
     *
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

        this.isDragging = true;

        // Cancel any animation that are running.
        if(this._revertFX) {
            this._revertFX.cancel();
            this._revertFX = null;
        }

        let doc = document,
            target,
            droppables = this.getDropTargets(),
            startBoundingBox = element.getBoundingClientRect(),
            startBBDocument = clientRectToDocumentSpace(startBoundingBox),
            helper,
            scrollTick;

        if(!this.helper || this.helper === 'self') {
            target = element;
        } else if(typeof this.helper === 'function') {
            target = this.helper(this);
            helper = target;
        } else if(this.helper) {
            target = this.helper;
            helper = target;
        }

        if(helper) {
            if(this.setHelperSize) {
                if(this.setHelperSize === true) {
                    helper.style.width = `${startBoundingBox.width}px`;
                    helper.style.height = `${startBoundingBox.height}px`;
                    helper.style.boxSizing = 'border-box';
                } else if(Array.isArray(this.setHelperSize)) {
                    helper.style.width = `${this.setHelperSize[0]}px`;
                    helper.style.height = `${this.setHelperSize[1]}px`;
                } else {
                    helper.style.width = `${this.setHelperSize.width}px`;
                    helper.style.height = `${this.setHelperSize.height}px`;
                }
            }
        }

        // If the target doesn't have a parentElement it needs to be added to the page.
        if(!target.parentElement) {
            element.parentElement.appendChild(target);
        }

        // mouseOffsetX and mouseOffsetY is the mouses offset relative to the top left corner of the element
        // being dragged.

        // offsetX and offsetY is how much the dragged element is offset from the cursor.
        // By default it is at the top left of the element.
        let startingTranslation = getTranslation(target),
            offset = {x: 0, y: 0};

        // The offset property controls how much the dragged element is offset from top left corner of the element.
        // By default it is [0, 0] but a function can be or array can be passed to control this behavior.
        if(this.offset) {
            let _offset = this.offset;

            if(typeof _offset === 'function') {
                offset = this.offset({
                    target: target,
                    draggable: this,
                    clientX: startMouseX - window.scrollX,
                    clientY: startMouseY - window.scrollY,
                    boundingRect: startBoundingBox
                });
            }
        }

        // Offset should be {x, y} not an array.
        if(Array.isArray(offset)) {
            offset = {
                x: offset[0],
                y: offset[1]
            };
        }

        let onMouseMove = (event) => {
            event.preventDefault();

            let startingRect = target.getBoundingClientRect(),
                position = this._getPosition(element, target, event.clientX, event.clientY, offset, this.container),
                dropData;

            setElementClientPosition(target, position, 'translate3d');
            dropData = this._getDropData(droppables, startingRect, position);

            for(let droppable of dropData) {
                if(!droppable.intersectsBefore && droppable.intersectsAfter) {
                    // drag-enter
                    let event = new CustomEvent('drag-enter', {
                        bubbles: true,

                        detail: {
                            draggable: this,
                            item: target
                        }
                    });

                    droppable.target.dispatchEvent(event);
                }
            }

            this._triggerEvent(element, 'drag-move', {
                mouseX: event.clientX + window.scrollX,
                mouseY: event.clientY + window.scrollY,
                clientX: event.clientX,
                clientY: event.clientY,
                startMouseX,
                startMouseY,
                offset,
                helper: target,
                originalEvent: event
            });

            // Refresh dropData incase something moved.
            dropData = this._getDropData(droppables, startingRect, position);

            for(let droppable of dropData) {
                if(droppable.intersectsBefore && !droppable.intersectsAfter) {
                    // drag-leave
                    let event = new CustomEvent('drag-leave', {
                        bubbles: true,
                        detail: {
                            draggable: this,
                            item: target
                        }
                    });

                    droppable.target.dispatchEvent(event);
                }
            }

            if(this.scroll && !scrollTick) {
                let parent = _getScrollParent(element);

                if(parent) {
                    let lastTick = performance.now(),
                        scrollX = parent.scrollLeft,
                        scrollY = parent.scrollTop;

                    scrollTick = timestamp => {
                        let parentBB = parent.getBoundingClientRect(),
                            helperBB = target.getBoundingClientRect(),
                            x, y,
                            delta = timestamp - lastTick,
                            isOOB = false;

                        lastTick = timestamp;

                        if (helperBB.right > parentBB.right) {
                            x = (helperBB.right - parentBB.right) / helperBB.width;
                            isOOB = true;
                            scrollX += delta * x * this.scroll;
                            parent.scrollLeft = scrollX;
                        } else if (helperBB.left < parentBB.left) {
                            x = (parentBB.left - helperBB.left) / helperBB.width;
                            isOOB = true;
                            scrollX -= delta * x * this.scroll;
                            parent.scrollLeft = scrollX;
                        }

                        if (helperBB.bottom > parentBB.bottom) {
                            y = (helperBB.bottom - parentBB.bottom) / helperBB.height;
                            isOOB = true;
                            scrollY += delta * y * this.scroll;
                            parent.scrollTop = scrollY;
                        } else if (helperBB.top < parentBB.top) {
                            y = (parentBB.top - helperBB.top) / helperBB.height;
                            isOOB = true;
                            scrollY -= delta * y * this.scroll;
                            parent.scrollTop = scrollY;
                        }

                        helperBB = _clampPositionToContainer(helperBB, this.container, element, target);
                        setElementClientPosition(target, helperBB, 'translate3d');

                        if (isOOB && this.isDragging) {
                            window.requestAnimationFrame(scrollTick);
                        } else {
                            scrollTick = null;
                        }
                    };

                    window.requestAnimationFrame(scrollTick);
                }
            }
        };

        let onMouseUp = (event) => {
            event.preventDefault();
            doc.removeEventListener('mousemove', onMouseMove);
            doc.removeEventListener('mouseup', onMouseUp);
            doc = null;
            this.isDragging = false;
            element.classList.remove('ui-dragging');

            let startingRect = target.getBoundingClientRect(),
                position = this._getPosition(element, target, event.clientX, event.clientY, offset, this.container),
                translation = getTranslation(target),
                accepted = null;

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

            this._triggerEvent(element, 'drag-end', {
                startX: startMouseX - window.scrollX,
                startMouseY,
                offset,
                clientX: event.clientX,
                clientY: event.clientY,

                originalEvent: event,
                helper: target,

                accept,
                isAccepted
            },true, {accept, isAccepted});

            if(!accepted && this.revert === true) {
                _translate(target, startingTranslation.x, startingTranslation.y);

                if(target !== element && target.parentElement) {
                    target.parentElement.removeChild(target);
                }

                this._triggerEvent(element, 'drag-complete');
            } else if(!accepted && typeof this.revert === 'number') {
                let animation = new Animation(
                    {
                        left: translation.x + (position.left - startingRect.left),
                        top: translation.y + (position.top - startingRect.top)
                    }, {
                        left: startingTranslation.x,
                        top: startingTranslation.y
                    },
                    this.revert,
                    {
                        onFrame: (fx) => {
                            _translate(target, fx.frame.left, fx.frame.top);
                        },

                        onComplete: () => {
                            if (target !== element && target.parentElement) {
                                target.parentElement.removeChild(target);
                            }

                            this._triggerEvent(element, 'drag-complete');
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
                if(target !== element && target.parentElement) {
                    target.parentElement.removeChild(target);
                }

                setElementClientPosition(element, position, 'translate3d');

                let startingRect = documentRectToClientSpace(startBBDocument),
                    dropped = [];

                for(let droppable of droppables) {
                    if(this._intersects(element.dataset.tolerance, droppable.getBoundingClientRect(), position)) {
                        let dropEvent = new CustomEvent('drop', {
                            bubbles: true,
                            detail: {
                                draggable: this,
                                originalEvent: event,
                                startingBoundingClientRect: startingRect,
                                droppable: droppable
                            }
                        });

                        dropEvent.clientX = event.clientX;
                        dropEvent.clientY = event.clientY;
                        dropEvent.relatedTarget = element;

                        droppable.dispatchEvent(dropEvent);
                    }
                }

                this._triggerEvent(element, 'drag-complete', {
                    dropped
                });
            }
        };

        doc.addEventListener('mousemove', onMouseMove);
        doc.addEventListener('mouseup', onMouseUp);
        element.classList.add('ui-dragging');

        this._triggerEvent(element, 'drag-start', {
            startMouseY,
            startMouseX,
            offset,
            mouseX: posX,
            mouseY: posY,
            clientX: posX - window.scrollX,
            clientY: posY - window.scrollY,
            helper: target
        });
    }

    /**
     * Gets an array of elements of all the drop targets.
     * If the drop target is a string, it queries for those elements.
     *
     * @returns {Array}
     */
    getDropTargets() {
        let r = [];

        for(let droppable of this.droppables) {
            let type = typeof droppable;

            if(type === 'string') {
                for(let target of document.querySelectorAll(droppable)) {
                    if(r.indexOf(target) !== -1) continue;
                    r.push(target);
                }
            } else if(type === 'function') {
                droppable = droppable.call(this, this);
                if(r.indexOf(droppable) !== -1) continue;
                r.push(droppable);
            } else {
                if(r.indexOf(droppable) !== -1) continue;
                r.push(droppable);
            }
        }

        return r;
    }

    /**
     * Takes an array of drop targets and tests to see if the target intersects the start and ending rectangles.
     *
     * Rects are objects that have the left, right, top, bottom, width and height properties defined.
     * Similar to the results received from Element.getBoundingClientRect().
     *
     * @param droppables - Array of elements to tests.
     * @param startingRect - Starting rect.
     * @param endingRect - Ending rect.
     * @returns {Array}
     * @private
     */
    _getDropData(droppables, startingRect, endingRect) {
        let dropData = [];

        for(let droppable of droppables) {
            // Convert to client space.
            let dropBox = droppable.getBoundingClientRect();

            let intersectsBefore = this._intersects(droppable.dataset.tolerance, dropBox, startingRect),
                intersectsAfter = this._intersects(droppable.dataset.tolerance, dropBox, endingRect);

            dropData.push({
                intersectsBefore,
                intersectsAfter,
                target: droppable,
                ...dropBox
            });
        }

        return dropData;
    }

    /**
     * Triggers an event on the current item.
     *
     * @param item
     * @param eventName
     * @param details
     * @param bubbles
     * @param assign
     * @private
     */
    _triggerEvent(item, eventName, details, bubbles=true, assign=null) {
        details = {
            draggable: this,
            item: item,

            ...details
        };

        let event = new CustomEvent(eventName, {
            bubbles: bubbles,
            detail: details
        });

        if(assign) {
            Object.assign(event, assign);
        }

        item.dispatchEvent(event);
    }

    /**
     * Tests to see if the item intersects the droppable with the given tolerance function.
     *
     * @param tolerance
     * @param droppable
     * @param item
     * @returns {*}
     * @private
     */
    _intersects(tolerance, droppable, item) {
        tolerance = tolerance || this.tolerance;
        return TOLERANCE_FUNCTIONS[tolerance](droppable, item);
    }

    /**
     * Retrieves the expected bound box of the helper element at the given mouse coordinates.
     *
     * @param element
     * @param helper
     * @param clientX
     * @param clientY
     * @param offset
     * @param container
     * @returns {{top: *, left: *, bottom: *, width: number, right: *, height: number, target: *}}
     */
    _getPosition(element, helper, clientX, clientY, offset, container) {
        let bb = helper.getBoundingClientRect();

        let left = clientX + offset.x,
            top = clientY + offset.y;

        if(this.grid) {
            left = snapToGrid(left, this.grid.x);
            top = snapToGrid(top, this.grid.y);
        }

        let r = {
            left: left,
            top: top,
            width: bb.width,
            height: bb.height,
            right: left + bb.width,
            bottom: top + bb.height,
            target: helper
        };

        return {...r, ..._clampPositionToContainer(r, container, element, helper)};
    }
}
