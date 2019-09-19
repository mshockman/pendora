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


export default class Animation {
    constructor(frames, {getStartingFrame=null, applyFrame=null, onComplete=null, onCancel=null, onFrame=null, onStart=null, onEnd=null, bubbleFrame=false}={}) {
        this.frames = [];

        for(let key in frames) {
            if(frames.hasOwnProperty(key)) {
                let value = frames[key];
                key = parseFloat(key) / 100;
                this.frames.push({
                    position: key,
                    properties: value
                });
            }
        }

        if(getStartingFrame !== null) {
            this.getStartingFrame = getStartingFrame;
        }

        if(applyFrame !== null) {
            this.applyFrame = applyFrame;
        }

        this.onComplete = onComplete;
        this.onCancel = onCancel;
        this.onStart = onStart;
        this.onFrame = onFrame;
        this.onEnd = onEnd;
        this.bubbleFrame = bubbleFrame;

        this.frames.sort((a, b) => a.position - b.pos);
    }

    getFXKeys() {
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

    /**
     * Returns the frame properties at the given position.
     *
     * Position given is decimal format where 1.0 is 100% and 0.0 is 0%.
     * @param element
     * @param position
     */
    getFrameFX(element, position) {
        if(typeof position === 'string') {
            position = parseFloat(position) / 100;
        }

        let properties = {};

        for(let frame of this.getFrames(element)) {
            for(let key in frame.properties) {
                if(frame.properties.hasOwnProperty(key)) {
                    let value = frame.properties[key];

                    if(!properties[key]) {
                        properties[key] = {startPosition: null, startValue: null, endPosition: null, endValue: null};
                    }

                    if(frame.position <= position) {
                        properties[key].startPosition = frame.position;
                        properties[key].startValue = value;
                    } else if(frame.position > position && properties[key].endPosition === null) {
                        properties[key].endPosition = frame.position;
                        properties[key].endValue = value;
                    }
                }
            }
        }

        return properties;
    }

    /**
     * Returns all frame including starting properties of the element if needed.
     * @param element
     */
    getFrames(element) {
        let frames = [];

        if(this.getStartingFrame && element) {
            let frame = this.getStartingFrame(element);
            if(frame) frames.push({
                position: -Infinity, // position of starting value on the object are -Infinity so they are always the first values.
                properties: frame
            });
        }

        return frames.concat(this.frames);
    }

    getFrame(element, position) {
        let frame = this.getFrameFX(element, position),
            r = {};

        if(position < 0 || position > 1) {
            throw new Error("Animation can only animation between 0% and 100%");
        }

        for(let property in frame) {
            if(frame.hasOwnProperty(property)) {
                let options = frame[property];

                if((options.endPosition === null || options.endPosition <= position) && options.startValue !== null) {
                    r[property] = options.startValue;
                } else if(options.startValue !== null) {
                    if(typeof options.startValue === 'object') {
                        let pos = (position - options.startPosition),
                            delta = options.endValue.subtract(options.startValue).divide(options.endPosition - options.startPosition);

                        r[property] = options.startValue.add(delta.multiply(pos));
                    } else if(typeof options.startValue === 'number') {
                        let pos = (position - options.startPosition),
                            delta = (options.endValue - options.startValue) / (options.endPosition - options.startPosition);

                        r[property] = options.startValue + (delta * pos);
                    } else {
                        r[property] = options.startValue;
                    }
                }
            }
        }

        return r;
    }

    animate(element, duration, easing) {
        let start = performance.now(),
            running = true,
            animation = {
                status: 'pending',
                frameId: null,
                element: element,
                duration: duration,
                easing: easing,
                lastFrame: null,
                startTimestamp: start,
                animation: this,
                endTimestamp: null,
                position: null,
                easedPosition: null,

                isRunning() {
                    return running;
                },

                cancel() {
                    running = false;
                    animation.endTimestamp = performance.now();
                }
            };

        let frameFN = () => {
            if(running) {
                let timestamp = performance.now(),
                    pos = Math.min((timestamp - start) / duration, 1.0),
                    position = pos;

                if (animation.easing) {
                    position = animation.easing(position);
                }

                // The position after the easing function is applied.
                animation.easedPosition = position;
                animation.position = pos; // Position before easing function.
                animation.status = "playing";

                let frame = this.getFrame(element, position);
                this.applyFrame.call(this, element, frame, animation);
                animation.lastFrame = frame;

                if(this.onFrame) this.onFrame.call(this, animation);

                let event = new CustomEvent('animation.frame', {
                    bubbles: this.bubbleFrame,
                    detail: animation
                });

                element.dispatchEvent(event);

                if(pos < 1) {
                    animation.frameId = window.requestAnimationFrame(frameFN);
                    return;
                } else {
                    animation.status = "complete";
                    animation.endTimestamp = timestamp;

                    if(this.onComplete) this.onComplete.call(this, animation);

                    let event = new CustomEvent('animation.complete', {
                        bubbles: true,
                        detail: animation
                    });

                    element.dispatchEvent(event);
                }
            } else {
                animation.status = "canceled";
                if(this.onCancel) this.onCancel.call(this, animation);

                let event = new CustomEvent('animation.canceled', {
                    bubbles: true,
                    detail: animation
                });

                element.dispatchEvent(event);
            }

            if(this.onEnd) this.onEnd.call(this, animation);

            let event = new CustomEvent('animation.end', {
                bubbles: true,
                detail: animation
            });

            element.dispatchEvent(event);
        };

        animation.frameId = window.requestAnimationFrame(frameFN);

        if(this.onStart) {
            this.onStart.call(this, animation);
        }

        let event = new CustomEvent('animation.start', {
            bubbles: true,
            detail: animation
        });

        element.dispatchEvent(event);
    }
}
