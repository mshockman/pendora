import Animation from "./Animation";
import Rect from "../vectors/Rect";
import {clamp} from "../utility";


const fullRectSymbol = Symbol('FullRect'),
    startingRectSymbol = Symbol("StartingRect"),
    fxSymbol = Symbol('fx');


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


export class IOAnimationBase {
    #showFX;
    #hideFX;

    constructor(showFX, hideFX) {
        this.#showFX = showFX;
        this.#hideFX = hideFX;
    }

    async show(element, immediate=false, options={}) {
        if(this.hasFX(element)) {
            await this.cancel(element);
        }

        options = {...options};

        if(immediate) {
            this.#showFX.animate(element, {
                ...options,
                autoPlay: false,
                position: 1
            });

            return Animation.complete;
        } else {
            let fx = this.#showFX.animate(element, {
                ...options,
                autoPlay: true
            }), result;

            element[fxSymbol] = fx;
            result = await fx;
            delete element[fxSymbol];
            return result;
        }
    }

    async hide(element, immediate=false, options={}) {
        if(this.hasFX(element)) {
            await this.cancel(element);
        }

        if(immediate) {
            this.#hideFX.animate(element, {
                ...options,
                autoPlay: false,
                position: 1
            });

            return Animation.complete;
        } else {
            let fx = this.#hideFX.animate(element, {
                ...options,
                autoPlay: true
            }), result;

            element[fxSymbol] = fx;
            result = await fx;
            delete element[fxSymbol];

            return result;
        }
    }

    cancel(element) {
        if(element[fxSymbol]) {
            element[fxSymbol].cancel();
            delete element[fxSymbol];
        }
    }

    hasFX(element) {
        return !!element[fxSymbol];
    }
}


/**
 * Will slide an element in and out by the given axis.
 */
export class SlideInAndOut extends IOAnimationBase {
    constructor(duration, axis) {
        let showFX = new SlideIn(duration, axis),
            hideFX = new SlideOut(duration, axis);

        super(showFX, hideFX);
    }
}


export class FadeIn extends Animation {
    constructor(duration) {
        super({
            duration,

            frames: {
                '0%': {opacity: 0},
                '100%': {opacity: 1}
            }
        });
    }

    init({element, ...options}) {
        let style = getComputedStyle(element),
            complete = parseFloat(style.opacity);

        let fx = super.init({
            element,
            ...options
        });

        fx.goto(complete);

        return fx;
    }

    destroy(fx) {

    }
}


export class FadeOut extends Animation {
    constructor(duration) {
        super({
            duration,

            frames: {
                '0%': {opacity: 1},
                '100%': {opacity: 0}
            }
        });
    }

    init({element, ...options}) {
        let style = getComputedStyle(element),
            complete = parseFloat(style.opacity);

        let fx = super.init({
            element,
            ...options
        });

        complete = 1 - complete;

        fx.goto(complete);

        return fx;
    }

    destroy(fx) {

    }
}


export class FadeInAndOut extends IOAnimationBase {
    constructor(duration) {
        super(
            new FadeIn(duration),
            new FadeOut(duration)
        );
    }
}
