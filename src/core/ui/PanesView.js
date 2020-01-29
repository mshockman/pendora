import Component from "../Component";
import Rect from "../vectors/Rect";
import {clamp, rangeFindItem} from "../utility";
import AutoLoader from "../../autoloader";


const symbolPane = Symbol('pane');


function getClosestPaneController(element) {
    while(element) {
        if(element[symbolPane]) {
            return element[symbolPane];
        } else {
            element = element.parentElement;
        }
    }

    return null;
}


/**
 * Creates a resizable pane view.
 */
export default class PaneView extends Component {
    #onMouseMove;
    #onMouseMoveTarget;
    #onMouseUp;
    #axis;
    #frameID;

    constructor(element, axis='x') {
        super(element);

        if(this.element[symbolPane]) {
            throw new Error("Can only initialize one pane controller per element.")
        }

        this.#onMouseMove = null;
        this.#onMouseMoveTarget = null;
        this.#onMouseUp = null;
        this.#axis = this.element.dataset.axis || axis;
        this.#frameID = null;
        this.element[symbolPane] = this;

        this.element.addEventListener('mousedown', event=> {
            let handle = event.target.closest('[data-handle]');

            if(handle && getClosestPaneController(handle) === this) {
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
            next, current = startingData[index];

        if(!current.pane) {
            current = rangeFindItem(startingData, item => item.pane, index, 0);
            next = rangeFindItem(startingData, item => item.pane, index+1, null);
        } else {
            if(current.pane === '-x' || current.pane === '-y' || current.pane === '-') {
                next = rangeFindItem(startingData, item => item.pane, index-1, 0);
            } else {
                next = rangeFindItem(startingData, item => item.pane, index+1, null);
            }
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
                let x = current.pane === '-x' || current.pane === '-' ? -delta.x : delta.x,
                    maxShrink,
                    maxGrow, amount;

                maxShrink = Math.min(current.rect.width - current.minWidth, next.maxWidth - next.rect.width);
                maxGrow = Math.min(current.maxWidth - current.rect.width, next.rect.width - next.minWidth);
                amount = clamp(x, -maxShrink, maxGrow);

                if(this.#frameID) {
                    window.cancelAnimationFrame(this.#frameID);
                    this.#frameID = null;
                }

                this.#frameID = window.requestAnimationFrame(() => {
                    this.#frameID = null;
                    if(current.pane !== "fluid") current.element.style.width = `${current.rect.width + amount}px`;
                    if(next.pane !== "fluid") next.element.style.width = `${next.rect.width - amount}px`;
                });
            } else {
                let y = current.pane === '-y' || current.pane === '-' ? -delta.y : delta.y,
                    maxShrink,
                    maxGrow, amount;

                maxShrink = Math.min(current.rect.height - current.minHeight, next.maxHeight - next.rect.height);
                maxGrow = Math.min(current.maxHeight - current.rect.height, next.rect.height - next.minHeight);
                amount = clamp(y, -maxShrink, maxGrow);

                if(this.#frameID) {
                    window.cancelAnimationFrame(this.#frameID);
                    this.#frameID = null;
                }

                this.#frameID = window.requestAnimationFrame(() => {
                    this.#frameID = null;
                    if(current.pane !== "fluid") current.element.style.height = `${current.rect.height + amount}px`;
                    if(next.pane !== "fluid") next.element.style.height = `${next.rect.height - amount}px`;
                });
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

            node = node.parentElement;
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
                minHeight: parseFloat(style.minHeight) || 0,
                rect,
                element: child,
                pane: child.dataset.pane
            });
        }

        return r;
    }
}


AutoLoader.register('panes', element => {
    return new PaneView(element, element.dataset.axis || 'x');
});
