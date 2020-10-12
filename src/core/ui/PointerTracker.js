import Publisher from "../Publisher";
import {selectElement} from "../utility";
import {closest} from "../utility";


/**
 * A class that tracks mouse position oven an element or the document.
 * Will use PointerEvents if browser support is available, otherwise it will fall back to using mousedown, mouseover, and mousemove.
 */
export default class PointerTracker extends Publisher {
    #element;
    #pointerId;

    #pageX;
    #pageY;

    #type;
    #onPointerDown;
    #onPointerMove;
    #onPointerUp;
    #isTracking;

    #capture;
    #context;
    #target;
    #exclude;

    #disable;

    constructor(element, {capture=false, context=null, target=null, exclude=null, disable=null}={}) {
        super();

        this.#element = selectElement(element);

        this.#isTracking = false;
        this.#disable = disable;

        this.#capture = capture;
        this.#context = context;
        this.#target = target;
        this.#exclude = exclude;

        this.#init();
    }

    destroy() {
        this.cancel();

        if(this.#onPointerDown) {
            this.#element.removeEventListener('pointerdown', this.#onPointerDown);
        }

        this.#onPointerDown = null;
        this.#element = null;
    }

    cancel() {
        if(this.#type === 'pointer') {
            if(this.isTracking) {
                if (this.#onPointerMove) {
                    this.#element.removeEventListener('pointermove', this.#onPointerMove);
                }

                if(this.#onPointerUp) {
                    this.#element.removeEventListener('pointerup', this.#onPointerUp);
                }
            }

            if(this.#pointerId) {
                this.#element.releasePointerCapture(this.#pointerId);
            }

            this.#isTracking = false;
            this.#type = null;
            this.#onPointerUp = null;
            this.#onPointerMove = null;
            this.#pointerId = null;
        } else if(this.#type === 'mouse') {

        } else {
            throw new Error("Unknown pointer type.");
        }
    }

    get isTracking() {
        return this.#isTracking;
    }

    #init() {
        if(this.#type) return;

        if(window.PointerEvent) {
            this.#initPointerTracker();
        } else {
            this.#initMouseTracker();
        }
    }

    #initPointerTracker() {
        if(this.#type) return;
        this.#type = "pointer";

        this.#onPointerMove = event => {
            if(!this.isDisabled) {
                this.#triggerPointerEvent('pointer-move', event);
            }
        };

        if(this.#capture) {
            this.#onPointerDown = event => {
                if(this.isTracking || this.isDisabled) return;

                let targetElement = this.#target ? closest(event.target, this.#target, this.#element) : null,
                    excludedElement = this.#exclude ? closest(event.target, this.#exclude, this.#element) : null;

                if((!this.#target || targetElement) && (!this.#exclude || !excludedElement)) {
                    this.#isTracking = true;
                    this.#pointerId = event.pointerId;

                    this.#element.setPointerCapture(event.pointerId);
                    this.#element.addEventListener('pointermove', this.#onPointerMove);
                    this.#element.addEventListener('pointerup', this.#onPointerUp);

                    this.#triggerPointerEvent('pointer-capture', event, {handle: targetElement});
                }
            };

            this.#onPointerUp = event => {
                this.#isTracking = false;
                this.#element.releasePointerCapture(event.pointerId);
                this.#pointerId = null;
                this.#element.removeEventListener('pointerup', this.#onPointerUp);
                this.#element.removeEventListener('pointermove', this.#onPointerMove);
                this.#triggerPointerEvent('pointer-release', event);
            };

            this.#element.addEventListener('pointerdown', this.#onPointerDown);
        } else {
            this.#element.addEventListener('pointermove', this.#onPointerMove);
        }
    }

    #initMouseTracker() {
        this.#type = "mouse";
    }

    #triggerPointerEvent(name, event, args=null) {
        this.#pageX = event.clientX + window.pageXOffset;
        this.#pageY = event.clientY + window.pageYOffset;

        if(!args) {
            args = {};
        }

        this.publish(name, {
            type: this.#type,
            name: name,
            target: event.target,
            clientX: event.clientX,
            clientY: event.clientY,
            tracker: this,
            originalEvent: event,
            ...args
        });
    }

    get element() {
        return this.#element;
    }

    get clientX() {
        return this.#pageX - window.pageXOffset;
    }

    get clientY() {
        return this.#pageY - window.pageYOffset;
    }

    get isDisabled() {
        return this.#disable ? !!this.#element.closest(this.#disable) : false;
    }

    static DebugMouseTracker(zIndex=10000) {
        let output = document.createElement('div');

        let tracker = new PointerTracker(document.body);

        tracker.on('pointer-move', event => {
            output.innerHTML = `(${event.clientX}, ${event.clientY})`;
        });

        output.style.position = "absolute";
        output.style.right = "5px";
        output.style.top = "5px";
        output.style.padding = "5px";
        output.style.backgroundColor = "#ffffff";
        output.style.border = "1px solid #cccccc";
        output.style.zIndex = ""+zIndex;

        return {element: output, tracker: tracker};
    }
}