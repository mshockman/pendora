import Publisher from "../Publisher";
import {addClasses, selectElement, clamp} from "../utility";
import PointerTracker from "./PointerTracker";
import Rect from "../vectors/Rect";
import {setElementClientPosition} from "./position";


export default class Resizeable extends Publisher {
    #element;

    #isResizing;
    #isDisabled;
    #container;
    #axis;
    #grid;
    #keepAspectRatio;
    #handles;
    #helper;
    #exclude;

    minWidth;
    maxWidth;
    minHeight;
    maxHeight;

    #position;

    #tracker;

    constructor(element, {minWidth=null, maxWidth=null, minHeight=null, maxHeight=null, axis='xy', keepAspectRatio=false, container=null, grid=null, handles='.ui-resize-handle', helper=null, exclude='.no-resize', className='ui-resizeable', position="top-left"}={}) {
        super();

        this.#element = selectElement(element);

        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;

        this.#axis = axis;
        this.#keepAspectRatio = keepAspectRatio;
        this.#container = container ? selectElement(container) : null;
        this.#grid = grid;
        this.#handles = handles;
        this.#exclude = exclude;
        this.#helper = helper;
        this.#position = position;

        if(className) {
            addClasses(this.#element, className);
        }

        this.#isResizing = false;
        this.#isDisabled = false;

        this.#tracker = new PointerTracker(this.#element, {capture: true, context: document, target: handles, exclude: exclude});

        this.#initResizing();
    }

    #initResizing() {
        let config;

        this.#tracker.on('pointer-capture', event => {
            config = this.#getHandleConfig(event.handle);
        });

        this.#tracker.on('pointer-move', event => {
            let rect = new Rect(this.#element),
                centerX = rect.left + (rect.width/2),
                centerY = rect.top + (rect.height/2),
                resize = config.resize;

            let minWidth = this.minWidth || 0,
                maxWidth = this.maxWidth || Infinity,
                minHeight = this.minHeight || 0,
                maxHeight = this.maxHeight || Infinity;

            // if(config.resize === 'bottom-right' || config.resize === 'top-right' || config.resize === 'right') {
            //     rect.right = clamp(event.clientX, rect.left + minWidth, rect.left + maxWidth);
            // }
            // if(config.resize === 'bottom-right' || config.resize === 'bottom-left' || config.resize === 'bottom') {
            //     rect.bottom = clamp(event.clientY, rect.top + minHeight, rect.top + maxHeight);
            // }
            // if(config.resize === 'bottom-left' || config.resize === 'top-left' || config.resize === 'left') {
            //     rect.left = clamp(event.clientX, rect.right - maxWidth, rect.right - minWidth);
            // }
            if(config.resize === 'top-left' || config.resize === 'top-right' || config.resize === 'top') {
                rect.top = clamp(event.clientY, rect.bottom - maxHeight, rect.bottom - minHeight);
            }
            setElementClientPosition(this.#element, rect, this.#position);
            this.#element.style.width = `${rect.width}px`;
            this.#element.style.height = `${rect.height}px`;

            let c = new Rect(this.#element);

            if(rect.top !== c.top || rect.height !== c.height) {
                console.log(this.#position);
                console.log(rect.top, '==', c.top);
                console.log(rect.height, '==', c.height);
                console.log("\n\n");
            }
        });

        this.#tracker.on('pointer-release', event => {

        });
    }

    #getHandleConfig(handle) {
        let resize = handle.dataset.resize.trim().split(/\s*;\s*/);

        return {
            resize: resize[0],
            scale: resize[1]
        };
    }

    get position() {

    }

    set position(position) {

    }

    get width() {

    }

    set width(width) {

    }

    get height() {

    }

    set height(height) {

    }
}


