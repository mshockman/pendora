import Animation from "./Animation";
import Rect from "../vectors/Rect";
import FX from "./FX";
import {clamp} from "../utility";


const axisSymbol = Symbol("Axis"),
    fullRectSymbol = Symbol('FullRect'),
    startingRectSymbol = Symbol("StartingRect");


export class SlideIn extends Animation {
    #axis;

    constructor(duration, axis) {
        super({
            duration,

            frames: {
                '0%': {size: 0},
                '100%': {size: 1}
            },

            applyFrame: (fx, frame) => {
                let element = fx.element,
                    axis = this.getAxis(element),
                    rect = fx[fullRectSymbol];

                if(axis === 'x') {
                    element.style.maxHeight = "";
                    element.style.maxWidth = `${rect.width * frame.size}px`;
                } else if(axis === 'y') {
                    element.style.maxWidth = "";
                    element.style.maxHeight = `${rect.height * frame.size}px`;
                } else {
                    element.style.maxWidth = `${rect.width * frame.size}px`;
                    element.style.maxHeight = `${rect.height * frame.size}px`;
                }
            }
        });

        this.#axis = axis;
    }

    init({element, duration, frames, onComplete=null, ...options}) {
        let axis = this.getAxis(element),
            rect = Rect.getBoundingClientRect(element),
            fullRect = Rect.getCleanBoundingClientRect(element),
            complete;

        if(axis === 'x') {
            complete = clamp(rect.width / fullRect.width, 0, 1);
        } else if(axis === 'y') {
            complete = clamp(rect.height / fullRect.height, 0, 1);
        } else if(axis === 'xy') {
            complete = clamp(rect.width / fullRect.width, 0, 1);
        }

        let fx = super.init({
            element,
            frames,
            duration: duration,

            onComplete: (fx) => {
                  // Shouldn't be needed at this point.
                  fx.element.style.maxWidth = "";
                  fx.element.style.maxHeight = "";

                  if(onComplete) {
                      onComplete(fx);
                  }
            },

            ...options
        });

        fx[fullRectSymbol] = fullRect;
        fx[startingRectSymbol] = rect;

        fx.goto(complete);

        return fx;
    }

    destroy(fx) {

    }

    getAxis(element) {
        if(typeof this.#axis === 'function') {
            return this.#axis(element);
        } else {
            return this.#axis;
        }
    }
}


export class SlideOut extends Animation {
    #axis;

    constructor(duration, axis) {
        super({
            duration,

            frames: {
                '0%': {size: 1},
                '100%': {size: 0}
            },

            applyFrame: (fx, frame) => {
                let element = fx.element,
                    axis = this.getAxis(element),
                    rect = fx[fullRectSymbol];

                if(axis === 'x') {
                    element.style.maxHeight = "";
                    element.style.maxWidth = `${rect.width * frame.size}px`;
                } else if(axis === 'y') {
                    element.style.maxWidth = "";
                    element.style.maxHeight = `${rect.height * frame.size}px`;
                } else {
                    element.style.maxWidth = `${rect.width * frame.size}px`;
                    element.style.maxHeight = `${rect.height * frame.size}px`;
                }
            }
        });

        this.#axis = axis;
    }

    init({element, duration, frames, ...options}) {
        let axis = this.getAxis(element),
            rect = Rect.getBoundingClientRect(element),
            fullRect = Rect.getCleanBoundingClientRect(element),
            complete;

        if(axis === 'x') {
            complete = clamp(rect.width / fullRect.width, 0, 1);
        } else if(axis === 'y') {
            complete = clamp(rect.height / fullRect.height, 0, 1);
        } else if(axis === 'xy') {
            complete = clamp(rect.width / fullRect.width, 0, 1);
        }

        complete = 1 - complete;

        let fx = super.init({
            element,
            frames,
            duration: duration,
            ...options
        });

        fx[fullRectSymbol] = fullRect;
        fx[startingRectSymbol] = rect;

        fx.goto(complete);

        return fx;
    }

    destroy(fx) {

    }

    getAxis(element) {
        if(typeof this.#axis === 'function') {
            return this.#axis(element);
        } else {
            return this.#axis;
        }
    }
}
