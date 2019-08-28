import {getTranslation, setElementClientPosition} from "core/position";


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
    constructor(element, {items=".ui-sortable", placeholder=null, layout='y', dropOnEmpty=true, accepts=null, setPlaceholderSize=false}={}) {
        if(typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
        }

        this.items = items;
        this.layout = layout;
        this.placeholder = placeholder;
        this.dropOnEmpty = dropOnEmpty;
        this.accepts = accepts;
        this.setPlaceholderSize = setPlaceholderSize;

        this.initEvents();
    }

    initEvents() {
        let placeholder,
            isOver = false,
            init = false,
            target;

        let initialize = (event) => {
            init = true;
            target = event.detail.item;
            target.addEventListener('drag-move', onDragMove);
            target.addEventListener('drag-complete', onDragComplete);
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
        };


        let destroy = () => {
            if(target) {
                target.removeEventListener('drag-move', onDragMove);
                target.removeEventListener('drag-complete', onDragComplete);
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


        let onSortAppend = event => {
            if(event.detail !== this && placeholder && placeholder.parentElement) {
                placeholder.parentElement.removeChild(placeholder);
            }
        };


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


        let onDragComplete = () => {
            destroy();
        };


        this.element.addEventListener('drag-enter', event => {
            if(this.accepts && !event.detail.item.matches(this.accepts)) {
                return;
            }

            isOver = true;

            if(!init) {
                initialize(event);
            }
        });

        this.element.addEventListener('drag-leave', () => {
            isOver = false;
        });

        this.element.addEventListener('drag-start', (event) => {
            if(!init) {
                initialize(event);
            }

            isOver = true;
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
            return (box.bottom < y) || (mx < x && box.bottom >= y && box.top <= y) ? 'after' : 'before';
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

    getItems() {
        return this.element.querySelectorAll(this.items);
    }

    _refreshPositions(target, position) {
        // helper
        let current = target.getBoundingClientRect(),
            deltaLeft = current.left - position.left,
            deltaTop = current.top - position.top,
            translation = getTranslation(target);

        target.style.transform = `translate3d(${translation.x - deltaLeft}px, ${translation.y - deltaTop}px, 0)`;
    }

    _triggerSortAppendEvent(target) {
        let event = new CustomEvent('sort-append', {
            bubbles: false,
            detail: this
        });

        target.dispatchEvent(event);
    }
}
