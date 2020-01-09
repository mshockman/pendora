import {isSuperset} from 'core/set';
import {clientRectToDocumentSpace, setElementClientPosition, snapToGrid} from 'core/ui/position';
import {addClasses, clamp} from 'core/utility';


const DIRECTIONS = new Set([
    'top-left',
    'top',
    'top-right',
    'right',
    'bottom-right',
    'bottom',
    'bottom-left',
    'left'
]);


export const CONTAINERS = {
    /**
     * Constrains to client area.
     * @returns {{top: number, left: number, width: number, height: number}}
     */
    client: function() {
        return {
            left: 0,
            top: 0,
            right: window.innerWidth,
            bottom: window.innerHeight,
            height: window.innerHeight,
            width: window.innerWidth
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
            height: parent.scrollHeight,
            right: (bb.left - parent.scrollLeft) + parent.scrollWidth,
            bottom: (bb.top - parent.scrollTop) + parent.scrollHeight
        };
    }
};


/**
 * Behavior class that makes an element resizeable.
 */
export default class Resizeable {
    constructor(element, {handles="bottom-right", helper=null, minWidth=null, maxWidth=null, minHeight=null, maxHeight=null,
        keepAspectRatio=false, autoHide=false, container=null, grid=null}={}) {
        if(typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
        }

        this.handles = {};
        this.element.classList.add('ui-resizeable');

        if(handles === 'all') {
            handles = new Set(DIRECTIONS);
        } else {
            handles = new Set(handles.split(/\s+/));
        }

        if(!isSuperset(DIRECTIONS, handles)) {
            throw new TypeError("Invalid direction.");
        }

        for(let direction of handles) {
            let handle = document.createElement('div');
            handle.classList.add('ui-resizeable-handle');
            handle.classList.add(`ui-resizeable-${direction}`);
            handle.dataset.direction = direction;
            this.handles[direction] = handle;
            this.element.appendChild(handle);
        }

        this._onMouseDown = (event) => {
            this._startResizing(event);
        };

        this.element.addEventListener('mousedown', this._onMouseDown);

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

        this.helper = helper;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
        this.keepAspectRatio = keepAspectRatio;
        this.isResizing = false;
        this.container = container;
    }

    _startResizing(event) {
        if(this.isResizing) return;
        let handle = event.target.closest('.ui-resizeable-handle');
        if(!handle || !this.element.contains(handle)) return;
        let resizeable = handle.closest('.ui-resizeable');
        if(!resizeable || resizeable !== this.element) return;

        event.preventDefault();

        let direction = handle.dataset.direction,
            startPosX = event.clientX + window.scrollX,
            startPosY = event.clientY + window.scrollY,
            doc = document,
            startingClientRect = this.element.getBoundingClientRect(),
            startBox = clientRectToDocumentSpace(startingClientRect),
            target = this.element,
            rect = {left: startBox.left, top: startBox.top, width: startBox.width, height: startBox.height};

        if(this.helper) {
            if(typeof this.helper === 'function') {
                target = this.helper.call(this, this.element);
            } else {
                target = document.createElement('div');
                addClasses(target, this.helper);
            }

            target.classList.add('ui-resizeable-helper');
            target.style.width = startBox.width + 'px';
            target.style.height = startBox.height + 'px';
            target.style.boxSizing = getComputedStyle(this.element).boxSizing;
            this.element.parentElement.appendChild(target);
            setElementClientPosition(target, startingClientRect, 'translate3d');
            setElementClientPosition(target, this.element.getBoundingClientRect(), 'translate3d');
        }

        let onMouseMove = event => {
            let deltaX = event.clientX - (startPosX - window.scrollX),
                deltaY = event.clientY - (startPosY - window.scrollY),
                left = startBox.left,
                top = startBox.top,
                right = startBox.right - window.scrollX,
                bottom = startBox.bottom - window.scrollY,
                minWidth = this.minWidth !== null && this.minWidth !== undefined ? this.minWidth : 0,
                maxWidth = this.maxWidth !== null && this.maxWidth !== undefined ? this.maxWidth : Infinity,
                minHeight = this.minHeight !== null && this.maxHeight !== undefined ? this.minHeight : 0,
                maxHeight = this.maxHeight !== null && this.maxHeight !== undefined ? this.maxHeight : Infinity;

            if(direction === 'right' || direction === 'bottom-right' || direction === 'top-right') {
                right += deltaX;
                right = clamp(right, left + minWidth, left + maxWidth);
            } else if(direction === 'left' || direction === 'top-left' || direction === 'bottom-left') {
                left += deltaX;
                left = clamp(left, right - maxWidth, right - minWidth);
            }

            if(direction === 'bottom' || direction === 'bottom-right' || direction === 'bottom-left') {
                bottom = clamp(bottom + deltaY, top + minHeight, top + maxHeight);
            } else if(direction === 'top' || direction === 'top-left' || direction === 'top-right') {
                top = clamp(top + deltaY, bottom - maxHeight, bottom - minHeight);
            }

            let container;

            if(this.container) {
                container = this.container.call(this, this.element, event);

                if(container) {
                    // I need to make my own object because the objects returned by Element.getBoundClientRect are readonly
                    // and Object.assign({}, rect) doesn't map over the properties.
                    let _container = {
                        left: container.left,
                        top: container.top,
                        bottom: container.bottom,
                        right: container.right
                    };

                    if(this.grid) {
                        if (this.grid.x) {
                            _container.left = snapToGrid(container.left, this.grid.x, Math.ceil);
                            _container.right = snapToGrid(container.right, this.grid.x, Math.floor);
                        }

                        if (this.grid.y) {
                            _container.top = snapToGrid(container.top, this.grid.y, Math.ceil);
                            _container.bottom = snapToGrid(container.bottom, this.grid.y, Math.floor);
                        }
                    }

                    container = _container;
                }
            }

            if(this.grid) {
                left = snapToGrid(left, this.grid.x);
                top = snapToGrid(top, this.grid.y);
                right = snapToGrid(right, this.grid.x);
                bottom = snapToGrid(bottom, this.grid.y);
            }

            console.log(left, right, bottom, top);
            console.log(container);

            if(container) {
                left = clamp(left, container.left, container.right);
                right = clamp(right, container.left, container.right);
                bottom = clamp(bottom, container.top, container.bottom);
                top = clamp(top, container.top, container.bottom);
            }

            if(this.keepAspectRatio) {
                if(direction === 'top-left' || direction === 'top-right') {
                    top = bottom - ((right - left) * this.keepAspectRatio);
                } else if(direction === 'bottom-left' || direction === 'bottom-right' || direction === 'left' || direction === 'right') {
                    bottom = top + ((right - left) * this.keepAspectRatio);
                } else if(direction === 'bottom' || direction === 'top') {
                    right = left + ((bottom - top) / this.keepAspectRatio);
                }
            }

            setElementClientPosition(target, {left, top}, 'translate3d');
            target.style.width = `${right - left}px`;
            target.style.height = `${bottom - top}px`;

            rect.left = left + window.scrollX;
            rect.top = top + window.scrollY;
            rect.width = right - left;
            rect.height = bottom - top;
            rect.right = right + window.scrollX;
            rect.bottom = bottom + window.scrollY;

            this.element.dispatchEvent(new CustomEvent('resizing', {
                bubbles: true,
                detail: {
                    resizeable: this,
                    target: target,
                    originalEvent: event,
                    clientX: event.clientX,
                    clientY: event.clientY,
                    element: this.element,

                    targetClientRect: {
                        left: left,
                        top: top,
                        right: right,
                        bottom: bottom,
                        width: right - left,
                        height: bottom - top,
                        x: left,
                        y: top
                    }
                }
            }));
        };

        let onMouseUp = event => {
            doc.removeEventListener('mousemove', onMouseMove);
            doc.removeEventListener('mouseup', onMouseUp);

            if(this.element !== target) {
                target.parentElement.removeChild(target);

                setElementClientPosition(this.element, {
                    left: rect.left - window.scrollX,
                    top: rect.top - window.scrollY
                }, 'translate3d');

                this.element.style.width = `${rect.width}px`;
                this.element.style.height = `${rect.height}px`;
            }

            this.element.classList.remove('ui-resizing');
            this.isResizing = false;

            this.element.dispatchEvent(new CustomEvent('resize-end', {
                bubbles: true,
                detail: {
                    resizeable: this,
                    element: this.element,
                    originalEvent: event,
                    clientX: event.clientX,
                    clientY: event.clientY
                }
            }));
        };

        this.isResizing = true;
        this.element.classList.add('ui-resizing');
        doc.addEventListener('mousemove', onMouseMove);
        doc.addEventListener('mouseup', onMouseUp);

        this.element.dispatchEvent(new CustomEvent('resize-start', {
            bubbles: true,
            detail: {
                resizeable: this,
                target: target,
                originalEvent: event,
                clientX: event.clientX,
                clientY: event.clientY,
                element: this.element
            }
        }));
    }
}
