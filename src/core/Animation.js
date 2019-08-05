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
    /**
     * @param keyframe1 The starting keyframe
     * @param keyframe2 The ending keyframe
     * @param duration The duration of the animation.
     * @param onFrame Callback handle to handle "drawing" the frame.
     * @param easing An easing function.  Linear by default.
     */
    constructor(keyframe1, keyframe2, duration, onFrame, easing='linear') {
        this.keyframe1 = keyframe1;
        this.keyframe2 = keyframe2;
        this.easing = EASING[easing];
        this.duration = duration;
        this.onFrame = onFrame;

        this.status = 'pending';

        // The current position pointer.
        this._position = 0;

        // The starting performance.now() timestamp.
        this._start = null;

        // When the animation should finish.  this._start + this.duration
        this._end = null;
    }

    /**
     * Returns the frame properties at the given position.
     *
     * Position given is decimal format where 1.0 is 100% and 0.0 is 0%.
     * @param position
     */
    getFrame(position) {
        let frame = {};

        position = this.easing(position);

        for(let key in this.keyframe2) {
            if(this.keyframe2.hasOwnProperty(key)) {
                let from = this.keyframe1[key],
                    to = this.keyframe2[key];

                let delta = to - from;
                frame[key] = from + (position * delta);
            }
        }

        return frame;
    }

    /**
     * Starts the animation.
     */
    play() {
        let start = performance.now(),
            end = start + (this.duration - (this.duration * this._position));

        this._start = start;
        this._end = end;
        this.status = 'running';

        let running = true;

        let stopFN = () => {
            running = false;
            this._stop = null;
            this.status = 'paused';
        };

        this._stop = stopFN;

        let frame = (t) => {
            if(running) {
                this._position = Math.min(1, (t-this._start) / (this._end - this._start));
                let f = this.getFrame(this._position);
                this.onFrame(f, this);

                if(this._position >= 1) {
                    this.status = 'complete';
                    this._start = null;
                    this._end = null;

                    if(this._stop === stopFN) {
                        this._stop = null;
                    }
                } else {
                    window.requestAnimationFrame(frame);
                }
            }
        };

        window.requestAnimationFrame(frame);
    }

    /**
     * Stop the current animation.
     */
    stop() {
        if(this._stop) {
            this._stop();
        }
    }

    /**
     * Restart the animation.
     */
    restart() {
        this.stop();
        this._position = 0;
        this.play();
    }

    /**
     * Set the position pointer.
     *
     * @param position
     */
    goto(position) {
        if(this.isRunning) {
            this.stop();
            this._position = position;
            this.play();
        } else {
            this._position = position;
        }
    }

    /**
     * Returns true if the animation is running.
     * @returns {boolean}
     */
    get isRunning() {
        return !!this._stop;
    }
}
