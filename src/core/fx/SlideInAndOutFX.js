import {addClasses, clamp, removeClasses, selectElement} from "../utility";
import {Rect} from "../vectors";
import Animation from "./Animation";
import FX from "./FX";


/**
 * Will display an element by sliding it into full width or height.
 */
export default class SlideInAndOutFX {
    #element;
    #hiddenClassName;
    #visibleClassName;
    #duration;
    #fx;
    #state;
    #axis;
    #currentRenderedAxis;

    constructor(element, duration, axis, {hiddenClassName = null, visibleClassName = null}) {
        this.#element = selectElement(element);
        this.#hiddenClassName = hiddenClassName;
        this.#visibleClassName = visibleClassName;
        this.#duration = duration;
        this.#fx = null;
        this.#axis = axis;

        this.#state = undefined;
        this.#currentRenderedAxis = undefined;
        this.hide(false);
    }

    show(fx = true) {
        // Animate elements current width and height to full width and height.
        return new Promise(resolve => {
            let axis = this.axis;

            if (fx === false && (this.#state !== 'visible' || axis !== this.#currentRenderedAxis)) {
                if (this.#fx) {
                    this.#fx.cancel();
                    this.#fx = null;
                }

                if (this.#visibleClassName) addClasses(this.#element, this.#visibleClassName);
                if (this.#hiddenClassName) removeClasses(this.#element, this.#hiddenClassName);

                let fullRect = this.getBoundingClientRect();
                this.#element.style.maxWidth = `${fullRect.width}px`;
                this.#element.style.maxHeight = `${fullRect.height}px`;

                this.#state = 'visible';
                this.#currentRenderedAxis = axis;
                resolve(FX.complete);
            } else if (fx && (this.#state !== 'visible' || this.#state !== 'showing' || axis !== this.#currentRenderedAxis)) {
                if (this.#fx) {
                    this.#fx.cancel();
                    this.#fx = null;
                }

                this.#state = 'showing';

                if (this.#visibleClassName) addClasses(this.#element, this.#visibleClassName);
                if (this.#hiddenClassName) removeClasses(this.#element, this.#hiddenClassName);

                let fullRect = this.getBoundingClientRect(),
                    currentRect = Rect.getBoundingClientRect(this.#element),
                    animation,
                    complete,
                    frames = {'0%': {}, '100%': {}};

                if (this.#currentRenderedAxis === "x" || this.#currentRenderedAxis === "xy") {
                    complete = clamp((1 - (currentRect.width / fullRect.width)), 0, 1);
                } else {
                    complete = clamp((1 - (currentRect.height / fullRect.height)), 0, 1);
                }

                if (axis === "y") {
                    frames['0%'].maxHeight = currentRect.height + "px";
                    frames['100%'].maxHeight = fullRect.height + "px";
                    this.#element.style.maxWidth = `${fullRect.width}px`;
                } else if (axis === "x") {
                    frames['0%'].maxWidth = currentRect.width + "px";
                    frames['100%'].maxWidth = fullRect.width + "px";
                    this.#element.style.maxHeight = `${fullRect.height}px`;
                } else {
                    frames['0%'].maxHeight = currentRect.height + "px";
                    frames['100%'].maxHeight = fullRect.height + "px";
                    frames['0%'].maxWidth = currentRect.width + "px";
                    frames['100%'].maxWidth = fullRect.width + "px";
                }

                animation = new Animation({frames});

                this.#currentRenderedAxis = axis;

                this.#fx = animation.animate(this.#element, {
                    duration: this.#duration * complete,

                    onComplete: () => {
                        this.#state = 'visible';
                        resolve(FX.complete);
                    }
                });
            } else {
                resolve(FX.complete);
            }
        });
    }

    hide(fx = true) {
        return new Promise(resolve => {
            let axis = this.axis;

            if (fx === false && (this.#state !== 'hidden' || this.#currentRenderedAxis !== axis)) {
                if (this.#fx) {
                    this.#fx.cancel();
                    this.#fx = null;
                }

                if (this.#visibleClassName) removeClasses(this.#element, this.#visibleClassName);
                if (this.#hiddenClassName) addClasses(this.#element, this.#hiddenClassName);

                if (axis === 'x') {
                    this.#element.style.maxWidth = `0px`;
                } else if (axis === 'y') {
                    this.#element.style.maxHeight = `0px`;
                } else if (axis === 'xy') {
                    this.#element.style.maxWidth = `0px`;
                    this.#element.style.maxHeight = `0px`;
                }

                this.#currentRenderedAxis = axis;
                this.#state = 'hidden';
                resolve(FX.complete);
            } else if (this.#state !== 'visible' || this.#state !== 'showing') {
                if (this.#fx) {
                    this.#fx.cancel();
                    this.#fx = null;
                }

                this.#state = 'hiding';
                if (this.#visibleClassName) addClasses(this.#element, this.#visibleClassName);
                if (this.#hiddenClassName) removeClasses(this.#element, this.#hiddenClassName);

                let currentRect = Rect.getBoundingClientRect(this.#element),
                    fullRect = this.getBoundingClientRect(),
                    animation,
                    frames = {'0%': {}, '100%': {}},
                    complete;

                if (this.#currentRenderedAxis === 'x' || this.#currentRenderedAxis === "xy") {
                    complete = clamp(currentRect.width / fullRect.width, 0, 1);
                } else {
                    complete = clamp(currentRect.height / fullRect.height, 0, 1);
                }

                if (axis === 'x') {
                    frames['0%'].maxWidth = currentRect.width + "px";
                    frames['100%'].maxWidth = '0px';
                    this.#element.style.maxHeight = `${fullRect.height}px`;
                } else if (axis === 'y') {
                    frames['0%'].maxHeight = currentRect.height + "px";
                    frames['100%'].maxHeight = '0px';
                    this.#element.style.maxWidth = `${fullRect.width}px`;
                } else if (axis === 'xy') {
                    frames['0%'].maxWidth = currentRect.width + "px";
                    frames['100%'].maxWidth = '0px';
                    frames['0%'].maxHeight = currentRect.height + "px";
                    frames['100%'].maxHeight = '0px';
                }

                this.#currentRenderedAxis = axis;
                animation = new Animation({frames});

                this.#fx = animation.animate(this.#element, {
                    duration: complete * this.#duration,

                    onComplete: () => {
                        this.#state = 'hidden';
                        resolve(FX.complete);
                    }
                });
            } else {
                resolve(FX.complete);
            }
        });
    }

    /**
     * Cancel any currently running fx.
     */
    cancel() {
        if (this.#fx) {
            this.#fx.cancel();
            this.#fx = null;
        }
    }

    destroy() {
        if (this.#fx) {
            this.#fx.cancel();
            this.#fx = null;
        }

        this.#element.style.maxWidth = "";
        this.#element.style.maxHeight = "";
    }

    getBoundingClientRect() {
        if (this.#hiddenClassName) removeClasses(this.#element, this.#hiddenClassName);
        if (this.#visibleClassName) addClasses(this.#element, this.#visibleClassName);

        let currentState = {};

        for(let i = 0; i < this.#element.style.length; i++) {
            let key = this.#element.style[i];
            currentState[key] = this.#element.style[key];
            this.#element.style[key] = "";
        }

        let r = Rect.getBoundingClientRect(this.#element);

        Object.assign(this.#element.style, currentState);

        if (this.#state === "hidden") {
            if (this.#hiddenClassName) addClasses(this.#element, this.#hiddenClassName);
            if (this.#visibleClassName) removeClasses(this.#element, this.#visibleClassName);
        }

        return r;
    }

    get isVisible() {
        return this.#state === 'visible' || this.#state === 'showing';
    }

    get isOpen() {
        return this.#state === "visible";
    }

    get state() {
        return this.#state;
    }

    get element() {
        return this.#element;
    }

    get axis() {
        if (typeof this.#axis === 'function') {
            return this.#axis();
        } else {
            return this.#axis;
        }
    }

    setAxis(axis) {
        this.#axis = axis;

        if (this.isVisible) {
            this.show(this.state === 'showing');
        } else {
            this.hide(this.state === 'hiding');
        }
    }
}
