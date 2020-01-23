import {EASING} from "./easing";
import FX from "./FX";
import {defaultApplyFrame} from "./frame";


export default class Animation {
    static defaultApplyFrame = defaultApplyFrame;

    static complete = FX.complete;
    static canceled = FX.canceled;
    static paused = FX.paused;
    static pending = FX.pending;
    static error = FX.error;
    static playing = FX.playing;

    /**
     *
     * @param duration
     * @param frames {{}|function(Element element, Animation animation):{}}
     * @param applyFrame - The function that takes a frame and applies it to the element.
     * @param bubbleFrameEvent
     * @param finishFrame
     */
    constructor({duration=null, frames, applyFrame = defaultApplyFrame, bubbleFrameEvent = false, finishFrame = null}) {
        this.frames = frames;
        this.applyFrame = applyFrame || Animation.defaultApplyFrame;
        this.bubbleFrameEvent = bubbleFrameEvent;
        this.finishFrame = finishFrame;
        this.duration = duration;
    }

    /**
     * Creates an fx object.
     *
     * @param element
     * @param frames
     * @param duration
     * @param applyFrame
     * @param easing
     * @param onStart
     * @param onFrame
     * @param onPause
     * @param onCancel
     * @param onEnd
     * @param onComplete
     * @param bubbleFrameEvent
     * @param finishFrame
     * @returns {FX}
     */
    init({element, frames, duration, applyFrame, easing, onStart, onFrame, onPause, onCancel, onEnd, onComplete, bubbleFrameEvent, finishFrame}) {
        return new FX(element, frames, duration, {
            applyFrame,
            easing,
            animation: this,
            onStart,
            onFrame,
            onPause,
            onCancel,
            onEnd,
            onComplete,
            bubbleFrameEvent,
            finishFrame,
        });
    }

    /**
     * Ran after the fx completes.
     * @param fx
     */
    destroy(fx) {

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
     * @param position
     * @param autoPlay
     * @returns {FX}
     */
    animate(element, {duration=null, easing = EASING.linear, onStart = null, onFrame = null, onPause = null, onCancel = null, onEnd = null, onComplete = null, position=0, autoPlay=true} = {}) {
        if(duration === null) {
            duration = this.duration;
        }

        let fx = this.init({
            element: element,
            frames: this.frames,
            duration,
            applyFrame: this.applyFrame,
            easing,
            animation: this,
            onStart,
            onFrame,
            onPause,
            onCancel,
            onEnd: (fx) => {
                if(onEnd) onEnd.call(fx, fx);
                this.destroy(fx);
            },
            onComplete,
            bubbleFrameEvent: this.bubbleFrameEvent,
            finishFrame: this.finishFrame
        });

        if(position) {
            fx.goto(position);
        }

        if(autoPlay) {
            fx.play();
        }
        return fx;
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
     * @param config
     * @returns {function(HTMLElement element, Number duration, Object config): FX}
     */
    bind(element = null, config = null) {
        let defaults = {
            element,
            config
        };

        return (element = defaults, config=null) => {
            element = element === defaults ? element.defaults : element;

            let _options = {};
            if (defaults.config) Object.assign(_options, defaults.config);
            if (config) Object.assign(_options, config);

            return this.animate(element, _options);
        };
    }
}
