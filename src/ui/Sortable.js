import {getTranslation} from "core/position";


function debug_output(selector, message) {
    // todo remove debug
    let output = document.querySelector(selector);
    output.innerText = message;
}


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


export default class Sortable {
    constructor(element, {items=".ui-sortable", placeholder=null, layout='y'}={}) {
        if(typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
        }

        this.items = items;
        this.isSorting = false;
        this.layout = layout;
        this.placeholder = placeholder;

        this.initEvents();
    }

    initEvents() {
        let placeholder,
            isOver = false,
            init = false;


        let initialize = (event) => {
            init = true;
            event.detail.item.addEventListener('drag-move', onDragMove);
            event.detail.item.addEventListener('drag-complete', onDragComplete);

            if(!placeholder && this.placeholder) {
                if(typeof this.placeholder === 'string') {
                    placeholder = document.createElement(event.detail.item.nodeName);
                    placeholder.className = this.placeholder;
                } else if(typeof this.placeholder === 'function') {
                    placeholder = this.placeholder(event.detail.item, this);
                } else if(this.placeholder === true) {
                    placeholder = document.createElement(event.detail.item.nodeName);
                } else {
                    placeholder = this.placeholder;
                }

                placeholder.classList.add('ui-placeholder');
                event.detail.item.parentElement.insertBefore(placeholder, event.detail.item);
            }
        };


        let onDragMove = (event) => {
            // If the sortable is the direct target and the sortable contains the draggable item then don't run
            // the event listener because it already ran because of the bubbling of the original event.
            if(this.element.contains(event.detail.item) && event.target === this.element) {
                return;
            }

            let items = Array.prototype.slice.call(this.element.querySelectorAll(this.items));

            let dropTarget = this.getDropTarget(items, event.detail.clientX, event.detail.clientY, event.detail.item),
                beforeBB = event.detail.helper.getBoundingClientRect(),
                index = items.indexOf(event.detail.item) - items.indexOf(dropTarget);

            if(dropTarget) {
                if(dropTarget === true) {
                    this.element.appendChild(event.detail.item);
                } else if(index < 0) {
                    event.detail.item.parentElement.insertBefore(event.detail.item, dropTarget.nextSibling);
                    if(placeholder) event.detail.item.parentElement.insertBefore(placeholder, event.detail.item);
                } else {
                    event.detail.item.parentElement.insertBefore(event.detail.item, dropTarget);
                    if(placeholder) event.detail.item.parentElement.insertBefore(placeholder, event.detail.item);
                }

                let afterBB = event.detail.helper.getBoundingClientRect(),
                    deltaLeft = afterBB.left - beforeBB.left,
                    deltaTop = afterBB.top - beforeBB.top,
                    translation = getTranslation(event.detail.helper);

                event.detail.helper.style.transform = `translate3d(${translation.x - deltaLeft}px, ${translation.y - deltaTop}px, 0)`;
            }
        };


        let onDragComplete = (event) => {
            event.detail.item.removeEventListener('drag-move', onDragMove);
            event.detail.item.removeEventListener('drag-complete', onDragComplete);
            init = false;
            isOver = false;

            if(placeholder && placeholder.parentElement) {
                placeholder.parentElement.removeChild(placeholder);
            }

            placeholder = null;

            event.detail.item.style.transform = "translate3d(0px, 0px, 0px)";
            event.detail.item.classList.remove('ui-sorting');
        };


        this.element.addEventListener('drag-enter', event => {
            isOver = true;
            event.detail.item.classList.add('ui-sorting');
            console.log("Drag Enter " + event.target.id);

            if(!init) {
                initialize(event);
            }
        });

        this.element.addEventListener('drag-leave', event => {
            isOver = false;
            console.log("Drag Leave " + event.target.id);
        });

        this.element.addEventListener('drag-start', (event) => {
            if(!init) {
                initialize(event);
            }
        });
    }

    getRelativePosition(element, x, y) {
        let box = element.getBoundingClientRect(),
            mx = box.left + (box.width / 2),
            my = box.top + (box.height / 2);

        if(this.layout === 'x') {
            return mx < x ? 'after' : 'before';
        } else if(this.layout === 'y') {
            return my < y ? 'after' : 'before';
        } else if(this.layout === 'xy') {
            return (box.bottom < y) || (mx < x && box.bottom > y && box.top < y) ? 'after' : 'before';
        }

        return null;
    }

    /**
     *
     * @param elements
     * @param x
     * @param y
     * @param target
     * @returns {Element|null|Boolean}
     */
    getDropTarget(elements, x, y, target) {
        let r,
            index = elements.indexOf(target),
            dropIndex;

        // Return true if their is not elements.
        if(!elements.length) {
            return true;
        }

        for(let i = 0; i < elements.length; i++) {
            let element = elements[i];

            if(i < index) {
                if(this.getRelativePosition(element, x, y) === 'before' && !r) {
                    r = element;
                    dropIndex = i;
                }
            } else if(i > index) {
                if(this.getRelativePosition(element, x, y) === 'after') {
                    r = element;
                    dropIndex = i;
                }
            }
        }

        if(r) {
            let box = r.getBoundingClientRect();

            if(this.layout === 'x' && box.top >= y && box.bottom <= y) {
                return r;
            } else if((this.layout === 'y' || this.layout === 'xy') && box.left <= x && box.right >= x) {
                return r;
            }
        }

        return null;
    }
}
