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
        let placeholder;

        this.element.addEventListener('drag-start', (event) => {
            this.isSorting = true;
            event.target.classList.add('ui-sorting');

            if(this.placeholder) {
                if(typeof this.placeholder === 'string') {
                    placeholder = document.createElement(event.target.nodeName);
                    placeholder.className = this.placeholder;
                } else if(typeof this.placeholder === 'function') {
                    placeholder = this.placeholder(event.target, this);
                } else if(this.placeholder === true) {
                    placeholder = document.createElement(event.target.nodeName);
                } else {
                    placeholder = this.placeholder;
                }

                placeholder.classList.add('ui-placeholder');
                event.target.parentElement.insertBefore(placeholder, event.target);
            }
        });

        this.element.addEventListener('drag-move', (event) => {
            let items = Array.prototype.slice.call(this.element.querySelectorAll(this.items)),
                dropTarget = this.getDropTarget(items, event.detail.clientX, event.detail.clientY, event.target),
                beforeBB = event.detail.helper.getBoundingClientRect(),
                index = items.indexOf(event.target) - items.indexOf(dropTarget);

            if(dropTarget) {
                if(index < 0) {
                    event.target.parentElement.insertBefore(event.target, dropTarget.nextSibling);
                    if(placeholder) event.target.parentElement.insertBefore(placeholder, event.target);
                } else {
                    event.target.parentElement.insertBefore(event.target, dropTarget);
                    if(placeholder) event.target.parentElement.insertBefore(placeholder, event.target);
                }

                let afterBB = event.detail.helper.getBoundingClientRect(),
                    deltaLeft = afterBB.left - beforeBB.left,
                    deltaTop = afterBB.top - beforeBB.top,
                    translation = getTranslation(event.detail.helper);

                event.detail.helper.style.transform = `translate3d(${translation.x - deltaLeft}px, ${translation.y - deltaTop}px, 0)`;
            }
        });

        this.element.addEventListener('drag-complete', (event) => {
            this.isSorting = false;
            event.target.style.transform = "translate3d(0px, 0px, 0px)";
            event.target.classList.remove('ui-sorting');

            if(placeholder) {
                placeholder.parentElement.removeChild(placeholder);
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

        for(let i = 0; i < elements.length; i++) {
            let element = elements[i];

            console.log(i);

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
