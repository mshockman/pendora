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


export const EASING = {
    linear: linear
};


export class FX {
    constructor(element, frames, applyFrame, duration, {animation=null, easing=null, onComplete=null, onCancel=null, onFrame=null, onStart=null, onEnd=null, bubbleFrameEvent=false}={}) {
        this.frames = [];

        this.element = element;

        this.applyFrame = applyFrame;
        this.onComplete = onComplete;
        this.onCancel = onCancel;
        this.onFrame = onFrame;
        this.onStart = onStart;
        this.onEnd = onEnd;
        this.bubbleFrameEvent = bubbleFrameEvent;
        this.easing = easing;
        this.animation = animation;

        this.frameId = null;
        this.lastFrame = null;

        this.status = 'pending';
        this._position = 0;
        this.duration = duration;

        for(let key in frames) {
            if(frames.hasOwnProperty(key)) {
                let frame = frames[key],
                    pos = parseFloat(key) / 100;

                if(typeof frame === 'function') {
                    frame = frame.call(this, this.element);
                }

                this.frames.push({
                    position: pos,
                    properties: frame
                });
            }
        }

        this.frames.sort((a, b) => a.position - b.pos);
    }

    getProperties() {
        let keys = [];

        for(let frame of this.frames) {
            for(let key in frame.properties) {
                if(frame.properties.hasOwnProperty(key)) {
                    if(keys.indexOf(key) === -1) {
                        keys.push(key);
                    }
                }
            }
        }

        return keys;
    }

    getFrameFX(position) {
        // position can either be a percentage string (aka 50%) or the time in milliseconds into the animation
        // which will be converted into a percentage.
        if(typeof position === 'string') {
            position = parseFloat(position) / 100;
        } else {
            position = position / this.duration;
        }

        // At this point position should be a value between 0.0 and 1.0.
        // Easing functions specify that rate of change in the properties.
        // It takes the position and maps it to another value between 0.0f and 1.0f.
        // By default linear easing is used.
        if(this.easing) {
            position = this.easing(position);
        }

        let r = {};

        for(let frame of this.frames) {
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

    getFrame(position) {
        let frame = this.getFrameFX(position),
            r = {};

        if(typeof position === 'string') {
            position = parseFloat(position) / 100;
        } else {
            position = position / this.duration;
        }

        for(let property in frame) {
            if(frame.hasOwnProperty(property)) {
                let options = frame[property];

                if((options.endPosition === null || options.endPosition <= position) && options.startValue !== null) {
                    r[property] = options.startValue;
                } else if(options.startValue !== null) {
                    if(typeof options.startValue === 'object') {
                        let p = (position - options.startPosition) / (options.endPosition - options.startPosition),
                            delta = options.endValue.subtract(options.startValue);

                        r[property] = options.startValue.add(delta.multiply(p));
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

        return r;
    }

    play() {
        if(this.frameId === null) {
            let tick = performance.now();

            let frameFN = () => {
                let timestamp = performance.now(),
                    delta = timestamp - tick,
                    position = this.position + delta;

                tick = timestamp;
                this.runFrame(position);

                if (this.position < this.duration) {
                    this.frameId = window.requestAnimationFrame(frameFN);
                } else {
                    this._triggerEndEvent();
                    this.frameId = null;
                }
            };

            if(this.onStart) {
                this.onStart.call(this, this);
            }

            this.element.dispatchEvent(new CustomEvent('animation.start', {
                bubbles: true,
                detail: this
            }));

            this.frameId = window.requestAnimationFrame(frameFN);
        }

        return this;
    }

    pause() {
        if(this.frameId) {
            window.cancelAnimationFrame(this.frameId);
            this.frameId = null;
            this.status = 'paused';

            this.element.dispatchEvent(new CustomEvent('animation.paused', {
                bubbles: true,
                detail: this
            }));

            this._triggerEndEvent();
        }

        return this;
    }

    restart() {
        this.cancel(false);
        this.position = 0;
        this.play();
        return this;
    }

    cancel(complete=false) {
        if(this.frameId) {
            window.cancelAnimationFrame(this.frameId);
            this.frameId = null;

            if(complete) {
                this.runFrame('100%');
            }

            this.status = 'canceled';

            if(this.onCancel) this.onCancel.call(this, this);

            this.element.dispatchEvent(new CustomEvent('animation.canceled', {
                bubbles: true,
                detail: this
            }));

            this._triggerEndEvent();
        }

        return this;
    }

    runFrame(position) {
        this.position = position;
        let frame = this.getFrame(this.position);

        this.status = 'playing';
        this.applyFrame.call(this, this.element, frame, this);
        this.lastFrame = frame;

        if (this.onFrame) this.onFrame.call(this, this);

        this.element.dispatchEvent(new CustomEvent('animation.frame', {
            bubbles: this.bubbleFrameEvent,
            detail: this
        }));

        if(this.position === this.duration) {
            this.status = "complete";

            if(this.onComplete) this.onComplete.call(this, this);

            this.element.dispatchEvent(new CustomEvent('animation.complete', {
                bubbles: true,
                detail: this
            }));
        }
    }

    set position(value) {
        if(typeof value === 'string') {
            value = (parseFloat(value) / 100) * this.duration;
        }

        this._position = Math.max(0.0, Math.min(this.duration, value));
    }

    get position() {
        return this._position;
    }

    _triggerEndEvent() {
        if(this.onEnd) this.onEnd.call(this, this);

        this.element.dispatchEvent(new CustomEvent('animation.end', {
            bubbles: true,
            detail: this
        }));
    }
}


export default class Animation {
    constructor(frames, applyFrame, prepare=null, bubbleFrameEvent=false) {
        this.frames = frames;
        this.applyFrame = applyFrame;
        this.bubbleFrameEvent = bubbleFrameEvent;
        this.prepare = prepare;
    }

    animate(element, duration, easing=null, {onStart=null, onFrame=null, onPause=null, onCancel=null, onEnd=null, onComplete=null}={}) {
        if(this.prepare) {
            this.prepare.call(this, element, this);
        }

        let fx = new FX(element, this.frames, this.applyFrame, duration, {
            easing,
            animation: this,
            onStart,
            onFrame,
            onPause,
            onCancel,
            onEnd,
            onComplete,
            bubbleFrameEvent: this.bubbleFrameEvent
        });

        return fx.play();
    }
}
