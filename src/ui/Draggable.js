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


// Takes mouse position relative to document.
function getPosition(target, clientX, clientY, offset, container) {
    let translation = getTranslation(target),
        bb = target.getBoundingClientRect();

    let mouseX = clientX + window.scrollX,
        mouseY = clientY + window.scrollY,
        x = mouseX + offset.x,
        y = mouseY + offset.y;

    if(container) {
        if(typeof container === 'function') {
            container = container();
        }

        x = clamp(x, container.left, container.left + container.width - bb.width);
        y = clamp(y, container.top, container.top + container.height - bb.height);
    }

    // The change is position of the element.
    let deltaX = (bb.left + window.scrollX) - x,
        deltaY = (bb.top + window.scrollY) - y;

    return {
        // The starting position
        startingBoundingClientRect: bb,

        // The starting transformation that has been applied.
        startingTranslation: translation,

        // The change in position.
        deltaX: deltaX,
        deltaY: deltaY,

        // The ending transformation that needs to be applied.
        tx: translation.x - deltaX,
        ty: translation.y - deltaY,

        // The scroll of the window.
        scrollX: window.scrollX,
        scrollY: window.scrollY,

        // Position of the mouse relative to the client window.
        clientX: clientX,
        clientY: clientY,

        // Position of the mouse relative to the document.
        mouseX: mouseX,
        mouseY: mouseY,

        endingBoundingClientRect: {
            left: bb.left - deltaX,
            top: bb.top - deltaY,
            right: bb.right - deltaX,
            bottom: bb.bottom - deltaY,
            width: bb.width,
            height: bb.height
        },

        target: target
    };
}


const TOLARANCE_FUNCTIONS = {
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


export default class Draggable {
    static CLONE = clone;
    static OFFSET_CURSOR = cursor;

    constructor(element, {container=null, axis='xy', exclude="input, button, select, .js-no-drag, textarea", delay=null, offset=cursor, disabled=false,
        distance=null, handle=null, helper=null, revert=null, scroll=null, classes=null, selector=null, droppables=null, tolerance='intersect'}={}) {

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
        this.droppables = [];
        this.tolerance = tolerance;

        if(droppables) {
            this.addDroppables(droppables);
        }

        this.element.addEventListener('mousedown', this._onMouseDown);
        this.isDragging = false;

        this._revertFX = null;
    }

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
            target,
            droppables = this.getDropTargets();

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
        let startingTranslation = getTranslation(target),
            offset = {x: 0, y: 0};

        // The offset property controls how much the dragged element is offset from top left corner of the element.
        // By default it is [0, 0] but a function can be or array can be passed to control this behavior.
        if(this.offset) {
            let _offset = this.offset;

            if(typeof _offset === 'function') {
                _offset = this.offset({
                    target: target,
                    draggable: this,
                    cursorX: startMouseX,
                    cursorY: startMouseY,
                    boundingRect: startBoundingBox
                });
            }

            if(_offset) {
                offset.x -= _offset[0];
                offset.y -= _offset[1];
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

        let onMouseMove = (event) => {
            event.preventDefault();

            let position = getPosition(target, event.clientX, event.clientY, offset, container),
                dropData;

            this.translate(target, position.tx, position.ty);
            dropData = this._getDropData(droppables, position);

            for(let droppable of dropData) {
                if(!droppable.intersectsBefore && droppable.intersectsAfter) {
                    // drag-enter
                    let event = new CustomEvent('drag-enter', {
                        bubbles: true,

                        detail: {
                            draggable: this,
                            item: position.target
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
            dropData = this._getDropData(droppables, position);

            for(let droppable of dropData) {
                if(droppable.intersectsBefore && !droppable.intersectsAfter) {
                    // drag-leave
                    let event = new CustomEvent('drag-leave', {
                        bubbles: true,
                        detail: {
                            draggable: this,
                            item: position.target
                        }
                    });

                    droppable.target.dispatchEvent(event);
                }
            }
        };

        let onMouseUp = (event) => {
            event.preventDefault();
            doc.removeEventListener('mousemove', onMouseMove);
            doc.removeEventListener('mouseup', onMouseUp);
            doc = null;
            this.isDragging = false;

            let position = getPosition(target, event.clientX, event.clientY, offset, container),
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
                startMouseX,
                startMouseY,
                offset,
                mouseX: event.clientX + window.scrollX,
                mouseY: event.clientY + window.scrollY,
                clientX: event.clientX,
                clientY: event.clientY,

                originalEvent: event,
                helper: target,

                accept,
                isAccepted
            },true, {accept, isAccepted});

            if(!accepted && this.revert === true) {
                this.translate(target, startingTranslation.x, startingTranslation.y);

                if(target !== element && target.parentElement) {
                    target.parentElement.removeChild(target);
                }

                this._triggerEvent(element, 'drag-complete');
            } else if(!accepted && typeof this.revert === 'number') {
                let animation = new Animation(
                    {
                        left: position.tx,
                        top: position.ty
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
                this.translate(element, position.tx, position.ty);

                if(target !== element && target.parentElement) {
                    target.parentElement.removeChild(target);
                }

                this._triggerEvent(element, 'drag-complete');
            }
        };

        doc.addEventListener('mousemove', onMouseMove);
        doc.addEventListener('mouseup', onMouseUp);

        // let position = getPosition(posX - window.scrollX, posY - window.scrollY);
        // this.translate(target, position.tx, position.ty);
        // this._triggerEnterLeaveEvents(droppables, position);

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

    // noinspection JSMethodCanBeStatic
    translate(target, x, y) {
        target.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

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

    _getDropData(droppables, position) {
        let dropData = [];

        for(let droppable of droppables) {
            // Convert to client space.
            let dropBox = droppable.getBoundingClientRect();

            let intersectsBefore = this._intersects(droppable.dataset.tolerance, dropBox, position.startingBoundingClientRect),
                intersectsAfter = this._intersects(droppable.dataset.tolerance, dropBox, position.endingBoundingClientRect);

            dropData.push({
                intersectsBefore,
                intersectsAfter,
                target: droppable,
                ...dropBox
            });
        }

        return dropData;
    }

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

    _intersects(tolerance, droppable, item) {
        tolerance = tolerance || this.tolerance;
        return TOLARANCE_FUNCTIONS[tolerance](droppable, item);
    }
}
