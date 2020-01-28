import Component from "../Component";
import Rect from "../vectors/Rect";
import {clamp, rangeFindItem} from "../utility";


export default class PaneView extends Component {
    #onMouseMove;
    #onMouseMoveTarget;
    #onMouseUp;
    #axis;

    constructor(element, axis='x') {
        super(element);

        this.#onMouseMove = null;
        this.#onMouseMoveTarget = null;
        this.#onMouseUp = null;
        this.#axis = this.element.dataset.axis || axis;

        this.element.addEventListener('mousedown', event=> {
            let handle = event.target.closest('[data-handle]');

            if(handle && this.element.contains(handle)) {
                this._startResizing(event);
            }
        });
    }

    _startResizing(event) {
        if(this.#onMouseMove) {
            this.cancelResizing();
        }

        let targetChild = this.getTargetChild(event.target);
        event.stopPropagation();

        let mouse = {x: event.clientX, y: event.clientY},
            delta = {x: 0, y: 0},
            startMousePos = {...mouse},
            startingData = this.getPaneData(),
            index = startingData.findIndex(item => item.element === targetChild),
            next, previous,
            current = startingData[index];

        if(current.pane) {
            previous = current;
            next = rangeFindItem(startingData, item => item.pane, index, null);
        } else {
            previous = rangeFindItem(startingData, item => item.pane, index-1, 0);
            next = rangeFindItem(startingData, item => item.pane, index, null);
        }

        this.#onMouseMoveTarget = document;

        this.#onMouseMove = event => {
            event.preventDefault();
            mouse.x = event.clientX;
            mouse.y = event.clientY;

            delta = {
                x: mouse.x - startMousePos.x,
                y: mouse.y - startMousePos.y
            };

            if(this.#axis === 'x') {
                let maxLeft = Math.min(previous.rect.width - previous.minWidth, next.maxWidth - next.rect.width),
                    maxRight = Math.min(previous.maxWidth - previous.rect.width, next.rect.width - next.minWidth),
                    amount = clamp(delta.x, -maxLeft, maxRight);

                if(previous.pane !== "auto") previous.element.style.width = `${previous.rect.width + amount}px`;
                if(next.pane !== "auto") next.element.style.width = `${next.rect.width - amount}px`;
            } else {
                let maxUp = Math.min(previous.rect.height - previous.minHeight, next.maxHeight - next.rect.height),
                    maxDown = Math.min(previous.maxHeight - previous.rect.height, next.rect.height - next.minHeight),
                    amount = clamp(delta.x, -maxUp, maxDown);

                if(previous.pane !== "auto") previous.element.style.height = `${previous.rect.height + amount}px`;
                if(next.pane !== "auto") next.element.style.height = `${next.rect.height - amount}px`;
            }
        };

        this.#onMouseUp = () => {
            this.cancelResizing();
        };

        this.#onMouseMoveTarget.addEventListener('mousemove', this.#onMouseMove);
        this.#onMouseMoveTarget.addEventListener('mouseup', this.#onMouseUp);
    }

    cancelResizing() {
        if(this.#onMouseMove) {
            this.#onMouseMoveTarget.removeEventListener('mousemove', this.#onMouseMove);
            this.#onMouseMoveTarget.removeEventListener('mouseup', this.#onMouseUp);
            this.#onMouseMoveTarget = null;
            this.#onMouseMove = null;
            this.#onMouseUp = null;
        }
    }

    getTargetChild(element) {
        let node = element;

        while(node.parentElement) {
            if(node.parentElement === this.element) {
                return node;
            }
        }

        return null;
    }

    getPaneData() {
        let r = [];

        for(let child of this.element.children) {
            let style = getComputedStyle(child),
                rect = new Rect(child);

            r.push({
                maxWidth: parseFloat(style.maxWidth) || Infinity,
                maxHeight: parseFloat(style.maxHeight) || Infinity,
                minWidth: parseFloat(style.minWidth) || 0,
                minHeight: parseFloat(style.maxHeight) || 0,
                rect,
                element: child,
                pane: child.dataset.pane
            });
        }

        return r;
    }
}
