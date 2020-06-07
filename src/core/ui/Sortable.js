import {getTranslation, setElementClientPosition} from "./position";
import Draggable, {cursor} from './Draggable';
import Publisher from "../Publisher";


export function placeholder(className, nodeName=null) {
    return function(element) {
        let placeholder = document.createElement(nodeName || element.nodeName),
            box = element.getBoundingClientRect();

        placeholder.style.boxSizing = "border-box";
        box.style.width = `${box.width}px`;
        box.style.height = `${box.height}px`;

        if(className) {
            placeholder.className = className;
        }
    }
}


/**
 * Creates a sortable list of items.
 */
export default class Sortable extends Publisher {
    #draggable;

    constructor(element, {items=".ui-sort-item", placeholder=null, layout='y', dropOnEmpty=true, accepts=null, setPlaceholderSize=false,
        container=null, axis='xy', exclude="input, button, .ui-resizeable-handle, .no-drag", delay=null, offset=cursor,
        resistance=null, handle=null, helper=null, revert=null, revertDuration, scrollSpeed=null, tolerance=0.5,
        setHelperSize=false, grid=null, droppables=null}={}) {
        super();

        if(typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
        }

        this.#draggable = new Draggable(this.element, {container, axis, exclude, delay, offset, resistance, handle, helper, revert, revertDuration, scrollSpeed, selector: items, tolerance, setHelperSize, grid});

        this.#draggable.passTopic(this, ['drag.start', 'drag.end', 'drag.move']);

        if(droppables) {
            this.connect(droppables);
        }

        this.items = items;
        this.layout = layout;
        this.placeholder = placeholder;
        this.dropOnEmpty = dropOnEmpty;
        this.accepts = accepts;
        this.setPlaceholderSize = setPlaceholderSize;

        this.initEvents();
    }

    connect(droppables) {
        this.#draggable.connect(droppables);
    }

    disconnect(droppables) {
        this.#draggable.disconnect(droppables);
    }

    hasDroppable(droppable) {
        return this.#draggable.hasDroppable(droppable);
    }

    get droppables() {
        return this.#draggable.droppables;
    }

    /**
     * Initializes event listeners.
     */
    initEvents() {
        let placeholder,
            isOver = false,
            init = false,
            target;

        // Attaches temporary events when drag starts.
        let initialize = (event) => {
            init = true;
            target = event.detail.item;
            target.addEventListener('drag.move', onDragMove);
            target.addEventListener('drag.end', onDragComplete);
            target.addEventListener('sort-append', onSortAppend);
            let startBB = target.getBoundingClientRect();
            target.classList.add('ui-sorting');

            if(!placeholder && this.placeholder) {
                if(typeof this.placeholder === 'string') {
                    placeholder = document.createElement(target.nodeName);
                    placeholder.className = this.placeholder;
                } else if(typeof this.placeholder === 'function') {
                    placeholder = this.placeholder(target, this);
                } else if(this.placeholder === true) {
                    placeholder = document.createElement(target.nodeName);
                } else {
                    placeholder = this.placeholder;
                }

                placeholder.classList.add('ui-placeholder');

                if(this.setPlaceholderSize) {
                    if(this.setPlaceholderSize === true) {
                        placeholder.style.width = `${startBB.width}px`;
                        placeholder.style.height = `${startBB.height}px`;
                        placeholder.style.boxSizing = 'border-box';
                    } else if(Array.isArray(this.setPlaceholderSize)) {
                        placeholder.style.width = `${this.setPlaceholderSize[0]}px`;
                        placeholder.style.height = `${this.setPlaceholderSize[1]}px`;
                    } else {
                        placeholder.style.width = `${this.setPlaceholderSize.width}px`;
                        placeholder.style.height = `${this.setPlaceholderSize.height}px`;
                    }
                }

                if(this.element.contains(target)) {
                    target.parentElement.insertBefore(placeholder, target);
                }
            }

            setElementClientPosition(target, startBB, 'translate3d');

            this.publish("sort-start", {topic: "sort-start", target: this, originalEvent: event});
        };

        // Cleanup after sorting finishes.
        let destroy = () => {
            if(target) {
                target.removeEventListener('drag.move', onDragMove);
                target.removeEventListener('drag.end', onDragComplete);
                target.removeEventListener('sort-append', onSortAppend);
                init = false;
                isOver = false;

                if(placeholder && placeholder.parentElement) {
                    placeholder.parentElement.removeChild(placeholder);
                }

                placeholder = null;

                target.style.transform = "";
                target.classList.remove('ui-sorting');
                target = null;
            }
        };

        // Ensures that the placeholder is removed if the item gets moves to another sortable.
        let onSortAppend = event => {
            if(event.detail !== this && placeholder && placeholder.parentElement) {
                placeholder.parentElement.removeChild(placeholder);
            }
        };

        // Moves the item to the correct position on mouse move.
        let onDragMove = (event) => {
            if(!isOver || (this.accepts && !event.detail.item.matches(this.accepts))) {
                return;
            }

            let target = event.detail.item,
                items = Array.prototype.slice.call(this.getItems()).filter(i => i !== target);

            let before = this.getItemBeforePoint(event.detail.clientX, event.detail.clientY, items),
                after = this.getItemAfterPoint(event.detail.clientX, event.detail.clientY, items),
                beforeBB = event.detail.helper.getBoundingClientRect(),
                dropOnEmpty = target.dataset.dropOnEmpty !== null && target.dataset.dropOnEmpty !== undefined ? target.dataset.dropOnEmpty === 'true' : this.dropOnEmpty; // Allow overriding on item level.

            if(!items.length) {
                if(dropOnEmpty) {
                    this.element.appendChild(target);
                    if(placeholder) target.parentElement.insertBefore(placeholder, target);
                    this._refreshPositions(event.detail.helper, beforeBB);
                    this._triggerSortAppendEvent(target);
                }
            } else if(before && before !== target) {
                before.parentElement.insertBefore(target, before.nextSibling);
                if(placeholder) target.parentElement.insertBefore(placeholder, target);
                this._refreshPositions(event.detail.helper, beforeBB);
                this._triggerSortAppendEvent(target);
            } else if(after && after !== target) {
                after.parentElement.insertBefore(target, after);
                if(placeholder) target.parentElement.insertBefore(placeholder, target);
                this._refreshPositions(event.detail.helper, beforeBB);
                this._triggerSortAppendEvent(target);
            }
        };

        // Cleanup
        let onDragComplete = () => {
            destroy();
            this.publish("sort-complete", {topic: "sort-complete", target: this});
        };

        // Initialize sorting.
        this.element.addEventListener('drag.enter', event => {
            if(this.accepts && !event.detail.item.matches(this.accepts)) {
                return;
            }

            isOver = true;

            if(!init) {
                initialize(event);
            }
        });

        // Mark isOver state false.
        this.element.addEventListener('drag.leave', () => {
            isOver = false;
        });

        // Initialize sorting that started on another sortable.
        this.element.addEventListener('drag.start', (event) => {
            if(!init) {
                initialize(event);
            }

            isOver = true;
        });
    }

    /**
     * Tests to see if the given (x, y) point is before or after the element.  Uses layout to determine if the test
     * is for the x layout, the y layout or the xy layout.
     * @param element
     * @param x
     * @param y
     * @returns {string|null}
     */
    getRelativePosition(element, x, y) {
        let box = element.getBoundingClientRect(),
            mx = box.left + (box.width / 2),
            my = box.top + (box.height / 2);

        if(this.layout === 'x') {
            return mx < x ? 'after' : 'before';
        } else if(this.layout === 'y') {
            return my < y ? 'after' : 'before';
        } else if(this.layout === 'xy') {
            return (box.bottom < y) || (mx < x && box.bottom >= y && box.top <= y) ? 'after' : 'before';
        }

        return null;
    }

    /**
     * Returns the item immediately before the given x, y point.
     * @param x
     * @param y
     * @param items
     * @returns {*}
     */
    getItemBeforePoint(x, y, items) {
        if(!items) items = this.getItems();

        let r = null;

        for(let i = 0; i < items.length; i++) {
            let item = items[i];

            if(this.getRelativePosition(item, x, y) === 'after') {
                r = item;
            } else {
                break;
            }
        }

        if(r) {
            let box = r.getBoundingClientRect();

            if((this.layout === 'x' || this.layout === 'xy') && box.top <= y && box.bottom >= y) {
                return r;
            } else if(this.layout === 'y' && box.left <= x && box.right >= x) {
                return r;
            }
        }
    }

    /**
     * Returns the item immediately after the given (x, y) point.
     * @param x
     * @param y
     * @param items
     * @returns {null|*}
     */
    getItemAfterPoint(x, y, items) {
        if(!items) items = this.getItems();

        let r = null;

        for(let i = items.length - 1; i >= 0; i--) {
            let item = items[i];

            if(this.getRelativePosition(item, x, y) === 'before') {
                r = item;
            } else {
                break;
            }
        }

        if(r) {
            let box = r.getBoundingClientRect();

            if((this.layout === 'x' || this.layout === 'xy') && box.top <= y && box.bottom >= y) {
                return r;
            } else if(this.layout === 'y' && box.left <= x && box.right >= x) {
                return r;
            }
        }

        return null;
    }

    /**
     * Returns a list of all items for the sortable.
     * @returns {NodeListOf<SVGElementTagNameMap[string]> | NodeListOf<HTMLElementTagNameMap[string]> | NodeListOf<Element>}
     */
    getItems() {
        return this.element.querySelectorAll(this.items);
    }

    /**
     * helper method that translates the target to the provided client position.
     * @param target {{getBoundingClientRect, style} | Element}
     * @param position {{left[Number], top[Number]}}
     * @private
     */
    _refreshPositions(target, position) {
        let current = target.getBoundingClientRect(),
            deltaLeft = current.left - position.left,
            deltaTop = current.top - position.top,
            translation = getTranslation(target);

        target.style.transform = `translate3d(${translation.x - deltaLeft}px, ${translation.y - deltaTop}px, 0)`;
    }

    /**
     * Triggers the default sort-append event on the target.
     * @param target {Element}
     * @private
     */
    _triggerSortAppendEvent(target) {
        let event = new CustomEvent('sort-append', {
            bubbles: false,
            detail: this
        });

        target.dispatchEvent(event);

        this.publish("sort-append", {
            target: this
        });
    }
}
