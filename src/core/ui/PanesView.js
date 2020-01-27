import Component from "../Component";
import Rect from "../vectors/Rect";


export default class PaneView extends Component {
    #onMouseMove;
    #onMouseMoveTarget;
    #onMouseUp;

    constructor(element) {
        super(element);

        this.#onMouseMove = null;
        this.#onMouseMoveTarget = null;
        this.#onMouseUp = null;

        console.log(element);
        this.element.addEventListener('mousedown', event=> {
            let handle = event.target.closest('.pane-handle');

            if(handle && this.element.contains(handle)) {
                this._startResizing(event);
            }
        });
    }

    _startResizing(event) {
        if(this.#onMouseMove) {
            this.cancelResizing();
        }

        let pane = this.getTargetPane(event.target);
        event.stopPropagation();

        console.log(pane);
        let mouse = {x: event.clientX, y: event.clientY},
            delta = {x: 0, y: 0};

        this.#onMouseMoveTarget = document;

        this.#onMouseMove = event => {
            delta.x = event.clientX - mouse.x;
            delta.y = event.clientY - mouse.y;
            mouse.x = event.clientX;
            mouse.y = event.clientY;
            console.log(this.getPaneData());
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

    getOverflow() {

    }

    getTargetPane(element) {
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
                maxWidth: style.maxWidth,
                maxHeight: style.maxHeight,
                minWidth: style.minWidth,
                minHeight: style.maxHeight,
                rect
            });
        }

        return r;
    }
}
