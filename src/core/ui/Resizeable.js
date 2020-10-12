import Publisher from "../Publisher";
import {addClasses, selectElement, clamp} from "../utility";
import PointerTracker from "./PointerTracker";
import Rect from "../vectors/Rect";
import Vec2 from "../vectors/Vec2";
import {setElementClientPosition} from "./position";


/**
 * Creates a resizable component.
 *
 * Publisher Events
 *
 * resize-start
 * resize
 * resize-complete
 * resize-cancel
 */
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

    constructor(element, {minWidth=null, maxWidth=null, minHeight=null, maxHeight=null, axis='xy', keepAspectRatio=false, container=null, grid=null, handles='.ui-resize-handle', helper=null, exclude='.no-resize', className='ui-resizeable', position="top-left", disable=null}={}) {
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

        this.#tracker = new PointerTracker(this.#element, {capture: true, context: document, target: handles, exclude: exclude, disable});

        this.#initResizing();
    }

    #initResizing() {
        let config,
            startingRect,
            target,
            finalRect = null;

        // todo pointer-cancel, resize-cancel

        this.#tracker.on('pointer-capture', event => {
            this.#isResizing = true;
            config = this.#getHandleConfig(event.handle);
            startingRect = new Rect(this.#element);
            target = this.#element;

            if(this.#helper) {
                if(typeof this.#helper === 'function') {
                    target = this.#helper.call(this, this.#element);
                } else {
                    target = this.#helper;
                }

                if(target.nodeType) {
                    target = buildHelperFromElement(target, this.#element);
                }
            } else {
                target = buildHelperFromElement(this.#element, this.#element);
            }

            let topic = {topic: "resize-start", resizeable: this, element: this.#element, position: this.#position, config, startingRect, event};
            this.#element.classList.add("ui-resizing");

            if(target.onResizeStart) {
                target.onResizeStart({...topic});
            }

            this.publish('resize-start', {...topic})
        });

        this.#tracker.on('pointer-move', event => {
            let rect = new Rect(startingRect),
                centerX = rect.left + (rect.width/2),
                centerY = rect.top + (rect.height/2),
                scaleX = config.scale === 'scale-x' || config.scale === 'scale-xy',
                scaleY = config.scale === 'scale-y' || config.scale === 'scale-xy',
                ratio = rect.width / rect.height,
                pointer = new Vec2(event.clientX, event.clientY);

            if(this.#grid) {
                pointer.x = Math.floor(pointer.x / this.#grid) * this.#grid;
                pointer.y = Math.floor(pointer.y / this.#grid) * this.#grid;
            }

            if(this.#container) {
                pointer = pointer.clamp(Rect.getBoundingClientRect(this.#container));
            }

            let minWidth = Math.max(0, this.minWidth || 0),
                maxWidth = this.maxWidth || Infinity,
                minHeight = Math.max(0, this.minHeight || 0),
                maxHeight = this.maxHeight || Infinity,
                width, height;

            if(this.#axis === 'x' || this.#axis === 'xy') {
                if(config.resize === 'bottom-left' || config.resize === 'top-left' || config.resize === 'left') {
                    if(scaleX) {
                        width = clamp(2*(centerX - pointer.x), minWidth, maxWidth);
                        rect.left = centerX - (width/2);
                        rect.right = centerX + (width/2);
                    } else {
                        width = clamp(rect.right - pointer.x, minWidth, maxWidth);
                        rect.left = rect.right - width;
                    }
                } else if(config.resize === 'bottom-right' || config.resize === 'top-right' || config.resize === 'right') {
                    if(scaleX) {
                        width = clamp(2*(pointer.x - centerX), minWidth, maxWidth);
                        rect.left = centerX - (width/2);
                        rect.right = centerX + (width/2);
                    } else {
                        width = clamp(pointer.x - rect.left, minWidth, maxWidth);
                        rect.right = rect.left + width;
                    }
                }
            }

            if(this.#axis === 'y' || this.#axis === 'xy') {
                if(config.resize === 'bottom-right' || config.resize === 'bottom-left' || config.resize === 'bottom') {
                    if(scaleY) {
                        height = clamp(2*(pointer.y - centerY), minHeight, maxHeight);
                        rect.bottom = centerY + (height / 2);
                        rect.top = centerY - (height / 2);
                    } else {
                        height = clamp(pointer.y - rect.top, minHeight, maxHeight);
                        rect.bottom = rect.top + height;
                    }
                } else if(config.resize === 'top-left' || config.resize === 'top-right' || config.resize === 'top') {
                    if(scaleY) {
                        height = clamp(2*(centerY - pointer.y), minHeight, maxHeight);
                        rect.bottom = centerY + (height / 2);
                        rect.top = centerY - (height / 2);
                    } else {
                        height = clamp(rect.bottom - pointer.y, minHeight, maxHeight);
                        rect.top = rect.bottom - height;
                    }
                }
            }

            if(this.#keepAspectRatio) {
                if(this.#axis === 'x' || this.#axis === 'xy') {
                    rect.bottom = rect.top + (rect.width / ratio);
                } else {
                    rect.right = rect.left + (rect.height * ratio);
                }
            }

            finalRect = rect;

            let topic = {topic: "resize", rect, resizeable: this, position: this.#position, element: this.#element, event: event, config, startingRect};

            if(target && target.onResize) {
                target.onResize({...topic});
            }

            this.publish(topic.topic, {...topic});
        });

        this.#tracker.on('pointer-release', event => {
            this.#isResizing = false;

            if(this.#position) {
                this.applyRect(this.#element, finalRect);
            }

            this.#element.style.width = `${finalRect.width}px`;
            this.#element.style.height = `${finalRect.height}px`;

            let topic = {topic: "resize-complete", finalRect, resizeable: this, element: this.#element, position: this.#position, event, config, startingRect, rect: finalRect};
            this.#element.classList.remove("ui-resizing");

            if(target && target.onResizeComplete) {
                target.onResizeComplete({...topic});
            }

            this.publish(topic.topic, {...topic});
        });
    }

    applyRect(element, rect) {
        if(this.#position === 'width-height') {
            element.style.width = rect.width + "px";
            element.style.height = rect.height + "px";
        } else if(this.#position === "width") {
            element.style.width = rect.width + "px";
        } else if(this.#position === "height") {
            element.style.height = rect.height + "px";
        } else {
            setElementClientPosition(element, rect, this.#position);
        }
    }

    /**
     * Returns the resize config object from the given handle element.
     * To specify options for resizing the handle should have a [data-resize] property in the format:
     * <resize>; <scale>
     *
     * resize: Specifies the direction to resize in.  Can be top, right, bottom, left, top-left, top-right, bottom-left, bottom-right.
     * scale: If specified it tells the instance to scale that object in the given axis.  Can be either none, scale-x, scale-y, scale-xy.  Defaults to none.
     * @param handle
     * @returns {{resize: string, scale: string}}
     */
    #getHandleConfig(handle) {
        let resize = handle.dataset.resize.trim().split(/\s*;\s*/);

        return {
            resize: resize[0],
            scale: resize[1] || "none"
        };
    }

    get position() {
        return this.#position;
    }
}


function buildHelperFromElement(helper, element) {
    return {
        helper,
        element,

        onResizeStart(e) {
            if(helper !== element && !helper.parentElement) {
                element.parentElement.appendChild(helper);
            }
        },

        onResize(e) {
            if(e.position) {
                e.resizeable.applyRect(helper, e.rect);
            }

            helper.style.width = `${e.rect.width}px`;
            helper.style.height = `${e.rect.height}px`;
        },

        onResizeComplete(e) {
            if(helper !== element && helper.parentElement) {
                helper.parentElement.removeChild(helper);
            }
        }
    }
}


export function cloneHelperFactory(zIndex, opacity) {
    return function(element) {
        let r = element.cloneNode(true);
        r.style.zIndex = zIndex;
        r.style.opacity = opacity;
        return r;
    }
}