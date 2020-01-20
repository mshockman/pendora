import {RGBA} from "../vectors";
import {selectElement} from "../utility";
import {ExtendableError} from "../errors";


const regNumberWithUnit = /^(\d+\.?\d*)([a-z]+|%)$/i,
    regColor = /^(?:#([a-f0-9]{3})|#([a-f0-9]{6})|#([a-f0-9]{8}))$/i,
    regFunction = /^([a-z_][a-z_0-9]*)\((.+?)\)$/i;


const TYPE_FUNCTIONS = {
    hex: RGBA.parseHexColorStringArg,
    rgb: RGBA.parseRGBAColorStringArgs,
    rgba: RGBA.parseRGBAColorStringArgs
};


export function defaultApplyFrame(element, frame) {
    for(let key in frame) {
        if(frame.hasOwnProperty(key)) {
            element.style[key] = frame[key].toString();
        }
    }
}


export class NumberWithUnit {
    constructor(value, unit) {
        this.value = value;
        this.unit = unit;
    }

    add(value) {
        if(typeof value !== "number") {
            if(!(value instanceof NumberWithUnit)) {
                throw new TypeError("Cannot perform action on invalid type.");
            }

            if(this.unit !== value.unit) {
                throw new Error("Mismatched units");
            }

            value = value.value;
        }


        return new NumberWithUnit(this.value + value, this.unit);
    }

    subtract(value) {
        if(typeof value !== "number") {
            if(!(value instanceof NumberWithUnit)) {
                throw new TypeError("Cannot perform action on invalid type.");
            }

            if(this.unit !== value.unit) {
                throw new Error("Mismatched units");
            }

            value = value.value;
        }

        return new NumberWithUnit(this.value - value, this.unit);
    }

    scalar(value) {
        if(typeof value !== "number") {
            if(!(value instanceof NumberWithUnit)) {
                throw new TypeError("Cannot perform action on invalid type.");
            }

            if(this.unit !== value.unit) {
                throw new Error("Mismatched units");
            }

            value = value.value;
        }

        return new NumberWithUnit(this.value * value, this.unit);
    }

    // noinspection JSUnusedGlobalSymbols
    divide(value) {
        if(typeof value !== "number") {
            if(!(value instanceof NumberWithUnit)) {
                throw new TypeError("Cannot perform action on invalid type.");
            }

            if(this.unit !== value.unit) {
                throw new Error("Mismatched units");
            }

            value = value.value;
        }

        return new NumberWithUnit(this.value / value, this.unit);
    }

    toString() {
        return `${this.value}${this.unit}`;
    }
}


/**
 * Simple animation library that transitions properties from keyframe 1 to keyframe 2 over the duration.
 *
 * This library doesn't directly handle animated elements.  Instead it takes two objects filled with properties.
 * During each frame the class constructs a new object filled with each property transitioned to the property at
 * the given position.  It then passes that object to the onFrame callback handler that is responsible for applying
 * the properties to the element.
 *
 * Example Usage:
 * let target = document.querySelector('#id');
 *
 * let animation = new Animation({opacity: 1}, (opacity: 0}, 1000, (frame) => {
 *      Object.assign(target.style, frame);
 * });
 *
 * @author Matthew J. Shockman
 */


/**
 *
 * @param p
 * @returns {*}
 */
export function linear(p) {
    return p;
}


// noinspection JSUnusedGlobalSymbols
export const EASING = {
    linear: linear
};


class DeadFXError extends ExtendableError {}


function assertFXAlive(fx) {
    if(fx.status === FX_STATUS.complete || fx.status === FX_STATUS.error || fx.status === FX_STATUS.complete) {
        throw new DeadFXError("FX object is dead.");
    }
}


function doPromiseAction(onAction, value, resolveOrReject) {
    if(typeof onAction === 'function') {
        value = onAction(value);
    }

    resolveOrReject(value);
}


function _prepareValue(value) {
    if(typeof value === 'string') {
        value = value.trim();

        let m = regNumberWithUnit.exec(value);

        if(m) {
            return  new NumberWithUnit(parseFloat(m[1]), m[2]);
        }

        m = regColor.exec(value);

        if(m) {
            return TYPE_FUNCTIONS.hex(m[0]);
        }

        m = regFunction.exec(value);

        if(m) {
            return TYPE_FUNCTIONS[m[1]](m[2]);
        }
    }

    return value;
}


function _getFrames(fx, element, frames) {
    let r = {};

    if(typeof frames === 'function') {
        frames = frames.call(fx, element, fx);
    }

    for(let keyframeIndex in frames) {
        if(!frames.hasOwnProperty(keyframeIndex)) continue;

        let frame = frames[keyframeIndex];
        r[keyframeIndex] = {};

        for(let property in frame) {
            if(!frame.hasOwnProperty(property)) continue;
            r[keyframeIndex][property] = _prepareValue(frame[property]);
        }
    }

    return r;
}


const FX_STATUS = {
    pending: "Pending",
    complete: "Complete",
    error: "Error",
    paused: "Paused",
    canceled: "Canceled",
    playing: "Playing"
};


/**
 * @implements Promise
 */
export class FX {
    #element;
    #chained;
    #frames;
    #internalValue;

    #animation;

    #frameId;
    #status;
    #position;

    #finishFrame;
    #applyFrame;
    #easing;
    #duration;

    [Symbol.toStringTag] = "[Object FX]";

    constructor(element, frames, duration, {applyFrame=defaultApplyFrame, animation=null, easing=EASING.linear, onComplete=null, onCancel=null, onFrame=null, onStart=null, onEnd=null, bubbleFrameEvent=false, finishFrame=null, init=null, destroy=null}={}) {
        this.#frames = [];
        this.#chained = [];
        this.#element = selectElement(element);
        this.#internalValue = undefined;

        this.onComplete = onComplete;
        this.onCancel = onCancel;
        this.onFrame = onFrame;
        this.onStart = onStart;
        this.onEnd = onEnd;
        this.bubbleFrameEvent = bubbleFrameEvent;
        this.destroy = destroy;

        this.#animation = animation;
        this.#finishFrame = finishFrame;
        this.#applyFrame = applyFrame;
        this.#easing = easing;
        this.#duration = duration;

        this.#frameId = null;
        this.#status = FX_STATUS.pending;
        this.#position = 0;

        if(init) {
            init.call(this, this);
        }

        // Prepare frames
        frames = _getFrames(this, this.#element, frames);

        for(let key in frames) {
            if(frames.hasOwnProperty(key)) {
                let frame = frames[key],
                    pos = parseFloat(key) / 100;

                if(typeof frame === 'function') {
                    frame = frame.call(this, this.#element);
                }

                frame = Object.freeze(Object.assign({}, frame));

                this.#frames.push(Object.freeze({
                    position: pos,
                    properties: frame
                }));
            }
        }

        this.#frames.sort((a, b) => a.position - b.pos);
    }

    get animation() {
        return this.#animation;
    }

    // noinspection JSUnusedGlobalSymbols
    get easing() {
        return this.#easing;
    }

    get status() {
        return this.#status;
    }

    get position() {
        return this.#position;
    }

    // noinspection JSUnusedGlobalSymbols
    get duration() {
        return this.#duration;
    }

    // noinspection JSUnusedGlobalSymbols
    get frames() {
        return this.#frames.slice();
    }

    get element() {
        return this.#element;
    }

    set position(value) {
        if(typeof value === 'string') {
            value = (parseFloat(value) / 100) * this.#duration;
        }

        this.#position = Math.max(0.0, Math.min(this.#duration, value));
    }

    get state() {
        if(this.status === FX_STATUS.complete || this.status === FX_STATUS.canceled) {
            return "Fulfilled";
        } else if(this.status === FX_STATUS.error) {
            return "Rejected";
        } else {
            return "Pending";
        }
    }

    /**
     * Returns the frame options at the given position.
     * @param position
     */
    getFrameFX(position) {
        // position can either be a percentage string (aka 50%) or the time in milliseconds into the animation
        // which will be converted into a percentage.
        if(typeof position === 'string') {
            position = parseFloat(position) / 100;
        } else {
            position = position / this.#duration;
        }

        // At this point position should be a value between 0.0 and 1.0.
        // Easing functions specify that rate of change in the properties.
        // It takes the position and maps it to another value between 0.0f and 1.0f.
        // By default linear easing is used.
        if(this.#easing) {
            position = this.#easing(position);
        }

        let r = {};

        for(let frame of this.#frames) {
            for(let key in frame.properties) {
                if(frame.properties.hasOwnProperty(key)) {
                    let value = frame.properties[key];

                    if(!r[key]) {
                        r[key] = {startPosition: null, startValue: null, endPosition: null, endValue: null};
                    }

                    if(frame.position <= position) {
                        r[key].startPosition = frame.position;
                        r[key].startValue = value;
                    } else if(frame.position > position && r[key].endPosition === null) {
                        r[key].endPosition = frame.position;
                        r[key].endValue = value;
                    }
                }
            }
        }

        return r;
    }

    /**
     * Returns the final frame at the given position.  All options at this point should be parsed and there final values
     * should be available.
     *
     * @param position
     */
    getFrame(position) {
        let frame = this.getFrameFX(position),
            r = {};

        if(typeof position === 'string') {
            position = parseFloat(position) / 100;
        } else {
            position = position / this.#duration;
        }

        // Takes the frame config options and calculates the final values.
        for(let property in frame) {
            if(frame.hasOwnProperty(property)) {
                let options = frame[property];

                if((options.endPosition === null || options.endPosition <= position) && options.startValue !== null) {
                    r[property] = options.startValue;
                } else if(options.startValue !== null) {
                    if(typeof options.startValue === 'object') {
                        let p = (position - options.startPosition) / (options.endPosition - options.startPosition),
                            delta = options.endValue.subtract(options.startValue);

                        r[property] = options.startValue.add(delta.scalar(p));
                    } else if(typeof options.startValue === 'number') {
                        let duration = (options.endPosition - options.startPosition),
                            p = (position - options.startPosition) / duration,
                            delta = options.endValue - options.startValue;

                        r[property] = options.startValue + (delta * p);
                    } else {
                        r[property] = options.startValue;
                    }
                }
            }
        }

        // User provided hook that can perform the final touch ups on the frame.
        if(this.#finishFrame) {
            r = this.#finishFrame(this, frame);
        }

        return r;
    }

    play() {
        assertFXAlive(this);

        if(this.#frameId === null) {
            let tick = performance.now();

            let frameFN = () => {
                let timestamp = performance.now(),
                    delta = timestamp - tick,
                    position = this.#position + delta;

                tick = timestamp;
                let frame = this.goto(position);
                this.#status = FX_STATUS.playing;

                if (this.onFrame) this.onFrame.call(this, this, frame);

                this.#element.dispatchEvent(new CustomEvent('animation.frame', {
                    bubbles: this.bubbleFrameEvent,
                    detail: this
                }));

                if (this.#position < this.#duration) {
                    this.#frameId = window.requestAnimationFrame(frameFN);
                } else {
                    this._complete();
                    this.#frameId = null;
                }
            };

            if(this.onStart) {
                this.onStart.call(this, this);
            }

            this.#element.dispatchEvent(new CustomEvent('animation.start', {
                bubbles: true,
                detail: this
            }));

            this.#frameId = window.requestAnimationFrame(frameFN);
        }

        return this;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Pauses the animation.  Does not resolve it.
     * @returns {FX}
     */
    pause() {
        if(this.#frameId) {
            window.cancelAnimationFrame(this.#frameId);
            this.#frameId = null;
            this.#status = FX_STATUS.paused;

            this.#element.dispatchEvent(new CustomEvent('animation.paused', {
                bubbles: true,
                detail: this
            }));
        }

        return this;
    }

    cancel(complete=false) {
        if(this.#frameId) {
            window.cancelAnimationFrame(this.#frameId);
            this.#frameId = null;

            if(complete) {
                this.goto('100%');
            }

            this.#status = FX_STATUS.canceled;

            if(this.onCancel) this.onCancel.call(this, this);

            this.#element.dispatchEvent(new CustomEvent('animation.canceled', {
                bubbles: true,
                detail: this
            }));

            this._triggerEndEvent();
        }

        return this;
    }

    goto(position) {
        this.#position = position;
        return this.applyFrame(this.position);
    }

    applyFrame(position) {
        let frame = this.getFrame(position);
        this.#applyFrame.call(this, this, frame);
        return frame;
    }

    _triggerEndEvent() {
        if(this.onEnd) this.onEnd.call(this, this);

        this.#element.dispatchEvent(new CustomEvent('animation.end', {
            bubbles: true,
            detail: this
        }));

        if(this.destroy) {
            this.destroy.call(this, this);
        }

        for(let {onResolve} of this.#chained) {
            if(onResolve) onResolve(this.#internalValue);
        }
        this.#chained = [];
    }

    _complete(value) {
        if(this.state !== "Pending") {
            return;
        }

        this.#status = FX_STATUS.complete;
        this.#internalValue = value;

        if(this.onComplete) this.onComplete.call(this, this);

        this.#element.dispatchEvent(new CustomEvent('animation.complete', {
            bubbles: true,
            detail: this
        }));

        this._triggerEndEvent();
    }

    then(onResolve, onReject) {
        if(this.state === "Pending") {
            return new Promise((resolve, reject) => {
                // noinspection JSUnusedGlobalSymbols
                this.#chained.push({
                    onResolve: (value) => {
                        doPromiseAction(onResolve, value, resolve);
                    },

                    onReject: (value) => {
                        doPromiseAction(onReject, value, reject);
                    }
                });
            });
        } else if(this.state === 'Fulfilled' && typeof onResolve === 'function') {
            return new Promise((resolve) => {
                doPromiseAction(onResolve, this.#internalValue, resolve);
            });
        } else if(this.state === 'Rejected' && typeof onReject === 'function') {
            return new Promise((resolve, reject) => {
                doPromiseAction(onReject, this.#internalValue, reject);
            });
        }
    }

    // noinspection JSUnusedGlobalSymbols
    finally(onFinally) {
        onFinally = (value) => {
            if(typeof onFinally === 'function') {
                onFinally();
            }

            return value;
        };

        return this.then(onFinally, onFinally);
    }

    // noinspection JSUnusedGlobalSymbols
    catch(onReject) {
        return this.then(undefined, onReject);
    }
}


export default class Animation {
    static defaultApplyFrame = defaultApplyFrame;

    /**
     *
     * @param frames {{}|function(Element element, Animation animation):{}}
     * @param applyFrame - The function that takes a frame and applies it to the element.
     * @param init
     * @param destroy
     * @param bubbleFrameEvent
     * @param finishFrame
     */
    constructor({frames, applyFrame=defaultApplyFrame, init=null, destroy=null, bubbleFrameEvent=false, finishFrame=null}) {
        this.frames = frames;
        this.applyFrame = applyFrame || Animation.defaultApplyFrame;
        this.bubbleFrameEvent = bubbleFrameEvent;
        this.init = init;
        this.destroy = destroy;
        this.finishFrame = finishFrame;
    }

    /**
     * Animates the given element.  Returns the FX object that can be used to control the animation.
     *
     * @param element {HTMLElement|Element} The element to animate.
     * @param duration {Number} The duration of the animation in milliseconds.
     * @param easing {function(Number)} An easing function that controls the rate of change for the animation.  If null linear animation is used.
     * @param onStart {function(FX)} A callback function that is called right before the animation starts playing.
     * @param onFrame {function(FX, frame)} A callback that is called per frame.
     * @param onPause {function(FX)} A callback that is called when the FX pauses.
     * @param onCancel {function(FX)} A callback that is called when the FX cancels.
     * @param onEnd {function(FX)} A callback that is called when the animation ends.  Whether by completing, pausing, or canceling.  See Fx.status to determine what happened.
     * @param onComplete {function(FX)} A callback that is called when the animation complete successfully.
     * @param autoStart {Boolean} If true the animation will play immediately.
     * @returns {FX}
     */
    animate(element, duration, {easing=EASING.linear, onStart=null, onFrame=null, onPause=null, onCancel=null, onEnd=null, onComplete=null, autoStart=true}={}) {
        let fx = new FX(element, this.frames, duration, {
            applyFrame: this.applyFrame,
            easing,
            animation: this,
            onStart,
            onFrame,
            onPause,
            onCancel,
            onEnd,
            onComplete,
            bubbleFrameEvent: this.bubbleFrameEvent,
            finishFrame: this.finishFrame,
            init: this.init,
            destroy: this.destroy
        });

        if(autoStart) {
            return fx.play();
        } else {
            return fx;
        }
    }

    /**
     * Creates a function that calls the animate method with the bound parameters.
     * Parameters can be overridden in the created function when called.
     * Method has the same signature as the animate method.
     *
     * Usage:
     * let animation = new Animation(...),
     *     fx = animation.bind(null, 2000);
     *
     * fx(element) // Animation the element over 2000 milliseconds.
     *
     * @param element
     * @param duration
     * @param config
     * @returns {function(*=, *=, *=): *}
     */
    bind(element=null, duration=null, config=null) {
        let defaults = {
            element,
            duration,
            config
        };

        return (element=null, duration=null, config) => {
            element = element || defaults.element;
            duration = duration === null ? defaults.duration : duration;

            let _options = {};
            if(defaults.config) Object.assign(_options, defaults.config);
            if(config) Object.assign(_options, config);

            return this.animate(element, duration, _options);
        };
    }
}
