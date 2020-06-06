import Publisher from "../Publisher";
import {Draggable} from "./index";
import {isPercentageString, clamp} from "../utility/math";
import {Rect, setElementClientPosition} from "./position";
import {addClasses} from "../utility";


/**
 * Topics:
 *  slide
 *  slide-start
 *  slide-complete
 *  change
 */
export default class Slider extends Publisher {
    #element;
    #body;
    #handle;
    #axis;
    #draggable;

    #value;
    #sliderSize;
    #clickScrollHandler;

    constructor({id=null, className="slider", handleClassName="slider__handle", axis="x",
                 value=0, sliderSize="10%", classes=null, bodyClassName="slider__body", clickScrollHandler=gotoClickPosition}={}) {
        super();

        this.#element = document.createElement("div");
        this.#body = document.createElement("div");
        this.#handle = document.createElement("div");
        this.#element.className = className;
        this.#body.className = bodyClassName;
        this.#handle.className = handleClassName;
        this.#axis = axis === "x" ? "x" : "y";
        this.#element.classList.add(this.#axis === 'x' ? 'slider-x' : 'slider-y');
        this.#clickScrollHandler = clickScrollHandler;

        this.#draggable = new Draggable(this.#handle, {
            container: this.#element,
            axis: this.#axis
        });

        if(id) {
            this.#element.id = id;
        }

        if(classes) {
            addClasses(this.#element, classes);
        }

        this.#element.appendChild(this.#body);
        this.#body.appendChild(this.#handle);
        this.value = value;

        this.sliderSize = sliderSize;

        this.#draggable.on('drag.end', topic => {
            let containerRect = Rect.getBoundingClientRect(this.#body),
                handleRect = Rect.getBoundingClientRect(this.#handle),
                startingValue = this.#value;

            if(this.#axis === 'x') {
                this.#value = (handleRect.left - containerRect.left) / (containerRect.width - handleRect.width);
            } else {
                this.#value = (handleRect.top - containerRect.top) / (containerRect.height - handleRect.height);
            }

            if(startingValue !== this.#value) {
                this.publish('change', {
                    topic: "change",
                    slider: this,
                    value: this.#value,
                    startingValue: startingValue
                });

                this.publish("slide-complete", {
                    ...topic,
                    topic: "slide-end",
                    slider: this,
                    value: this.#value,
                    startingValue: startingValue
                })
            }
        });

        this.#draggable.on("drag.start", topic => {
            this.publish("slide-start", {
                ...topic,
                topic: "slide-start",
                slider: this,
                value: this.#value,
                staringValue: this.#value
            });
        });

        this.#draggable.on("drag.move", topic => {
            let containerRect = Rect.getBoundingClientRect(this.#body),
                handleRect = Rect.getBoundingClientRect(this.#handle),
                value;

            if(this.#axis === 'x') {
                value = (handleRect.left - containerRect.left) / (containerRect.width - handleRect.width);
            } else {
                value = (handleRect.top - containerRect.top) / (containerRect.height - handleRect.height);
            }

            this.publish("slide", {
                ...topic,
                topic: "sliding",
                value: value,
                slider: this,
                startingValue: this.#value
            });
        });

        this.#body.addEventListener('pointerdown', event => {
            if(event.target === this.#body && this.#clickScrollHandler) {
                let resolve = (value) => {
                    let startingValue = this.value;
                    this.value = value;

                    this.publish('change', {
                        topic: "change",
                        slider: this,
                        value: this.#value,
                        startingValue: startingValue
                    });
                };

                event.preventDefault();
                this.#clickScrollHandler.call(this, this, event, resolve);
            }
        });
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.#element);
        } else if(selector.nodeType && selector.appendChild) {
            selector.appendChild(this.#element);
        } else {
            selector.append(this.#element);
        }

        this.render();
    }

    get element() {
        return this.#element;
    }

    get body() {
        return this.#body;
    }

    get handle() {
        return this.#handle;
    }

    get value() {
        return this.#value;
    }

    set value(value) {
        if(isPercentageString(value)) {
            value = parseFloat(value) / 100;
        }

        this.#value = clamp(value, 0, 1);
        this.render();
    }

    get sliderSize() {
        return this.#sliderSize;
    }

    set sliderSize(value) {
        if(isPercentageString(value)) {
            value = parseFloat(value) / 100;
        }

        this.#sliderSize = clamp(value, 0, 1);
        this.render();
    }

    get axis() {
        return this.#axis;
    }

    render() {
        let containerRect = Rect.getBoundingClientRect(this.#body);

        if(this.#axis === 'x') {
            this.#handle.style.width = (this.#sliderSize * containerRect.width) + "px";

            let handleRect = Rect.getBoundingClientRect(this.#handle);

            let width = containerRect.width - handleRect.width;
            width = width * this.value;
            handleRect.left = containerRect.left + width;
            setElementClientPosition(this.#handle, handleRect, "translate3DX");
        } else {
            this.#handle.style.height = (this.#sliderSize * containerRect.height) + "px";

            let handleRect = Rect.getBoundingClientRect(this.#handle);

            let height = containerRect.height - handleRect.height;
            height = height * this.value;
            handleRect.top = containerRect.top + height;
            setElementClientPosition(this.#handle, handleRect, "translate3DY");
        }
    }
}


export class Scrollbar extends Slider {
    constructor({id=null, axis="x", value=0, sliderSize="10%", classes=null}={}) {
        super({
            id,
            className: "scrollbar",
            bodyClassName: "scrollbar__body",
            handleClassName: "scrollbar__handle",
            axis,
            value,
            sliderSize,
            classes
        });
    }
}


export function gotoClickPosition(self, event, resolve) {
    let rect = Rect.getBoundingClientRect(self.body),
        value;

    if(self.axis === 'x') {

    } else {
        value = (event.clientY - rect.top) / rect.height;
    }

    resolve(value);
}