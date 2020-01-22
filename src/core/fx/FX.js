import {ExtendableError} from "../errors";
import {selectElement} from "../utility";
import {RGBA} from "../vectors";
import {NumberWithUnit} from "./types";
import {EASING} from "./easing";
import {defaultApplyFrame} from "./frame";


const regNumberWithUnit = /^(\d+\.?\d*)([a-z]+|%)$/i,
    regColor = /^(?:#([a-f0-9]{3})|#([a-f0-9]{6})|#([a-f0-9]{8}))$/i,
    regFunction = /^([a-z_][a-z_0-9]*)\((.+?)\)$/i;


const TYPE_FUNCTIONS = {
    hex: RGBA.parseHexColorStringArg,
    rgb: RGBA.parseRGBAColorStringArgs,
    rgba: RGBA.parseRGBAColorStringArgs
};


export class DeadFXError extends ExtendableError {}


function assertFXAlive(fx) {
    if (fx.status === FX.complete || fx.status === FX.error || fx.status === FX.complete) {
        throw new DeadFXError("FX object is dead.");
    }
}


function doPromiseAction(onAction, value, resolveOrReject) {
    if (typeof onAction === 'function') {
        value = onAction(value);
    }

    resolveOrReject(value);
}


function _prepareValue(value) {
    if (typeof value === 'string') {
        value = value.trim();

        let m = regNumberWithUnit.exec(value);

        if (m) {
            return new NumberWithUnit(parseFloat(m[1]), m[2]);
        }

        m = regColor.exec(value);

        if (m) {
            return TYPE_FUNCTIONS.hex(m[0]);
        }

        m = regFunction.exec(value);

        if (m) {
            return TYPE_FUNCTIONS[m[1]](m[2]);
        }
    }

    return value;
}


function _getFrames(fx, element, frames) {
    let r = {};

    if (typeof frames === 'function') {
        frames = frames.call(fx, element, fx);
    }

    for (let keyframeIndex in frames) {
        if (!frames.hasOwnProperty(keyframeIndex)) continue;

        let frame = frames[keyframeIndex];
        r[keyframeIndex] = {};

        for (let property in frame) {
            if (!frame.hasOwnProperty(property)) continue;
            r[keyframeIndex][property] = _prepareValue(frame[property]);
        }
    }

    return r;
}


/**
 * @implements Promise
 */
export default class FX {
    static pending = "Pending";
    static complete = "Complete";
    static error = "Error";
    static paused = "Paused";
    static canceled = "Canceled";
    static playing = "Playing";

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

    constructor(element, frames, duration, {applyFrame = defaultApplyFrame, animation = null, easing = EASING.linear, onComplete = null, onCancel = null, onFrame = null, onStart = null, onEnd = null, bubbleFrameEvent = false, finishFrame = null, init = null} = {}) {
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

        this.#animation = animation;
        this.#finishFrame = finishFrame;
        this.#applyFrame = applyFrame;
        this.#easing = easing;
        this.#frameId = null;
        this.#status = FX.pending;

        this.#duration = duration;
        this.#position = 0;

        if (init) {
            init.call(this, this);
        }

        // Prepare frames
        frames = _getFrames(this, this.#element, frames);

        for (let key in frames) {
            if (frames.hasOwnProperty(key)) {
                let frame = frames[key],
                    pos = parseFloat(key) / 100;

                if (typeof frame === 'function') {
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

    // set position(value) {
    //     if (typeof value === 'string') {
    //         value = (parseFloat(value) / 100) * this.#duration;
    //     }
    //
    //     this.#position = Math.max(0.0, Math.min(this.#duration, value));
    // }

    get state() {
        if (this.status === FX.complete || this.status === FX.canceled) {
            return "Fulfilled";
        } else if (this.status === FX.error) {
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
        if (typeof position === 'string') {
            position = parseFloat(position) / 100;
        }

        // At this point position should be a value between 0.0 and 1.0.
        // Easing functions specify that rate of change in the properties.
        // It takes the position and maps it to another value between 0.0f and 1.0f.
        // By default linear easing is used.
        if (this.#easing) {
            position = this.#easing(position);
        }

        let r = {};

        for (let frame of this.#frames) {
            for (let key in frame.properties) {
                if (frame.properties.hasOwnProperty(key)) {
                    let value = frame.properties[key];

                    if (!r[key]) {
                        r[key] = {startPosition: null, startValue: null, endPosition: null, endValue: null};
                    }

                    if (frame.position <= position) {
                        r[key].startPosition = frame.position;
                        r[key].startValue = value;
                    } else if (frame.position > position && r[key].endPosition === null) {
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

        if (typeof position === 'string') {
            position = parseFloat(position) / 100;
        }

        // Takes the frame config options and calculates the final values.
        for (let property in frame) {
            if (frame.hasOwnProperty(property)) {
                let options = frame[property];

                if ((options.endPosition === null || options.endPosition <= position) && options.startValue !== null) {
                    r[property] = options.startValue;
                } else if (options.startValue !== null) {
                    if (typeof options.startValue === 'object') {
                        let p = (position - options.startPosition) / (options.endPosition - options.startPosition),
                            delta = options.endValue.subtract(options.startValue);

                        r[property] = options.startValue.add(delta.scalar(p));
                    } else if (typeof options.startValue === 'number') {
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
        if (this.#finishFrame) {
            r = this.#finishFrame(this, frame);
        }

        return r;
    }

    play() {
        assertFXAlive(this);

        if (this.#frameId === null) {
            this.goto(this.#position);

            let tick = performance.now();

            let frameFN = () => {
                let timestamp = performance.now(),
                    delta = timestamp - tick,
                    position = this.#position + (delta / this.duration);

                tick = timestamp;
                let frame = this.goto(position);
                this.#status = FX.playing;

                if (this.onFrame) this.onFrame.call(this, this, frame);

                this.#element.dispatchEvent(new CustomEvent('animation.frame', {
                    bubbles: this.bubbleFrameEvent,
                    detail: this
                }));

                if (this.#position < 1) {
                    this.#frameId = window.requestAnimationFrame(frameFN);
                } else {
                    this._complete(FX.complete, FX.complete);
                    this.#frameId = null;
                }
            };

            if (this.onStart) {
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
        if (this.#frameId) {
            window.cancelAnimationFrame(this.#frameId);
            this.#frameId = null;
            this.#status = FX.paused;

            this.#element.dispatchEvent(new CustomEvent('animation.paused', {
                bubbles: true,
                detail: this
            }));
        }

        return this;
    }

    _cancel(complete = false, status = FX.canceled) {
        if (this.#frameId) {
            window.cancelAnimationFrame(this.#frameId);
            this.#frameId = null;

            if (complete) {
                this.goto(1);
                this._complete(status, status);
            } else {
                this.#status = status;
                this.#internalValue = status;
            }

            if (this.onCancel) this.onCancel.call(this, this);

            this.#element.dispatchEvent(new CustomEvent('animation.canceled', {
                bubbles: true,
                detail: this
            }));

            this._triggerEndEvent();
        }

        return this;
    }

    /**
     * Cancel the animation with the canceled state.   optionally sets the animation to it's final frame if
     * completeAnimation is true.
     *
     * @param completeAnimation
     * @returns {FX}
     */
    cancel(completeAnimation = false) {
        return this._cancel(completeAnimation, FX.canceled);
    }

    /**
     * Completes the animation immediately and sets is status to complete.
     * @returns {FX}
     */
    complete() {
        return this._cancel(true, FX.complete);
    }

    goto(position) {
        assertFXAlive(this);

        if (typeof position === 'string') {
            position = parseFloat(position) / 100;
        }

        this.#position = position;
        return this.applyFrame(this.position);
    }

    applyFrame(position) {
        let frame = this.getFrame(position);
        this.#applyFrame.call(this, this, frame);
        return frame;
    }

    _triggerEndEvent() {
        if (this.onEnd) this.onEnd.call(this, this);

        this.#element.dispatchEvent(new CustomEvent('animation.end', {
            bubbles: true,
            detail: this
        }));

        console.log("Running animation chained events.");
        for (let {onResolve} of this.#chained) {
            console.log(onResolve);
            if (onResolve) onResolve(this.#internalValue);
        }
        this.#chained = [];
    }

    _complete(value, status = FX.complete) {
        if (this.state !== "Pending") {
            return;
        }

        this.#status = status;
        this.#internalValue = value;

        if (this.onComplete) this.onComplete.call(this, this);

        this.#element.dispatchEvent(new CustomEvent('animation.complete', {
            bubbles: true,
            detail: this
        }));

        this._triggerEndEvent();
    }

    then(onResolve, onReject) {
        if (this.state === "Pending") {
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
        } else if (this.state === 'Fulfilled' && typeof onResolve === 'function') {
            return new Promise((resolve) => {
                doPromiseAction(onResolve, this.#internalValue, resolve);
            });
        } else if (this.state === 'Rejected' && typeof onReject === 'function') {
            return new Promise((resolve, reject) => {
                doPromiseAction(onReject, this.#internalValue, reject);
            });
        }
    }

    // noinspection JSUnusedGlobalSymbols
    finally(onFinally) {
        onFinally = (value) => {
            if (typeof onFinally === 'function') {
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
