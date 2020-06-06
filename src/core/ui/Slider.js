import Publisher from "../Publisher";
import {Draggable} from "./index";
import {isPercentageString, clamp} from "../utility/math";
import {Rect, setElementClientPosition} from "./position";


export default class Slider extends Publisher {
    #element;
    #handle;
    #axis;
    #draggable;

    #value;
    #sliderSize;

    constructor({id=null, className="slider", handleClassName="slider__handle", axis="x", value=0, sliderSize="10%"}={}) {
        super();

        this.#element = document.createElement("div");
        this.#handle = document.createElement("div");
        this.#element.className = className;
        this.#handle.className = handleClassName;
        this.#axis = axis;
        this.#element.classList.add(this.#axis === 'x' ? 'slider-x' : 'slider-y');

        this.#draggable = new Draggable(this.#handle, {
            container: this.#element,
            axis: this.#axis
        });

        if(id) {
            this.#element.id = id;
        }

        this.#element.appendChild(this.#handle);
        this.value = value;

        this.sliderSize = sliderSize;

        this.#draggable.on('drag.end', topic => {
            let containerRect = Rect.getBoundingClientRect(this.#element),
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

                this.publish("slide-end", {
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
            let containerRect = Rect.getBoundingClientRect(this.#element),
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

    render() {
        let containerRect = Rect.getBoundingClientRect(this.#element);

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