import Component from "../Component";
import Arrow from "./Arrow";
import {setElementClientPosition, Rect} from "./position";
import {addClasses, removeClasses, selectElement, clamp} from "../utility";
import Animation from "./Animation";


const slideCache = Symbol('slideInCache');


export const SLIDE_IN_TOOLTIP_FX = new Animation({
    frames(element) {
        // noinspection JSUnresolvedVariable
        let cache = element[slideCache],
            placement = cache.placement;

        if(placement === 'top' || placement === 'bottom') {
            return {
                '0%': {height: cache.fxHeight},
                '100%': {height: cache.rect.height}
            };
        } else if(placement === "left" || placement === "right") {
            return {
                '0%': {width: cache.fxWidth},
                '100%': {width: cache.rect.width}
            };
        }
    },

    init(fx) {
        let cache = fx.element[slideCache];

        if(!cache) {
            let maxWidth = fx.element.style.maxWidth,
                maxHeight = fx.element.style.maxHeight,
                rect,
                placement = fx.element.dataset.placement;

            fx.element.style.maxWidth = "";
            fx.element.style.maxHeight = "";

            // Find full width and height of element.
            rect = Rect.getBoundingClientRect(fx.element);

            if(placement === "left" || placement === "right") fx.element.style.maxWidth = maxWidth;
            if(placement === "top" || placement === "bottom") fx.element.style.maxHeight = maxHeight;

            fx.element[slideCache] = {
                rect,
                fxWidth: 0,
                fxHeight: 0,
                placement,
                fx
            };
        } else {
            if(cache.fx) {
                cache.fx.cancel();
                cache.fx = null;
            }

            cache = fx.element[slideCache] = {
                ...cache,
                fx: fx
            };
        }

        fx.element[slideCache].fx = fx;
    },

    destroy(fx) {
        delete fx.element[slideCache];
    },

    applyFrame(fx, frame) {
        let cache = fx.element[slideCache],
            placement = cache.placement;

        if(placement === 'top' || placement === 'bottom') {
            fx.element.style.maxHeight = `${frame.height}px`;
            cache.fxHeight = frame.height;
        } else {
            fx.element.style.maxWidth = `${frame.width}px`;
            cache.fxWidth = frame.width;
        }
    }
});


export const SLIDE_OUT_TOOLTIP_FX = new Animation({
    init(fx) {
        let cache = fx.element[slideCache];

        if(!cache) {
            let maxWidth = fx.element.style.maxWidth,
                maxHeight = fx.element.style.maxHeight,
                rect,
                placement = fx.element.dataset.placement;

            fx.element.style.maxWidth = "";
            fx.element.style.maxHeight = "";

            // Find full width and height of element.
            rect = Rect.getBoundingClientRect(fx.element);

            if(placement === "left" || placement === "right") fx.element.style.maxWidth = maxWidth;
            if(placement === "top" || placement === "bottom") fx.element.style.maxHeight = maxHeight;

            cache = fx.element[slideCache] = {
                rect,
                fxWidth: rect.width,
                fxHeight: rect.height,
                placement,
                fx: fx
            };
        } else {
            if(cache.fx) {
                cache.fx.cancel();
                cache.fx = null;
            }

            cache = fx.element[slideCache] = {
                ...cache,
                fx: fx
            };
        }
    },

    destroy(fx) {
        delete fx.element[slideCache];
    },

    frames(element) {
        // noinspection JSUnresolvedVariable
        let cache = element[slideCache],
            placement = cache.placement;

        if(placement === 'top' || placement === 'bottom') {
            return {
                '0%': {height: cache.fxHeight},
                '100%': {height: 0}
            };
        } else if(placement === "left" || placement === "right") {
            return {
                '0%': {width: cache.fxWidth},
                '100%': {width: 0}
            };
        }
    },

    applyFrame(fx, frame) {
        let cache = fx.element[slideCache],
            placement = cache.placement;

        if(placement === 'top' || placement === 'bottom') {
            fx.element.style.maxHeight = `${frame.height}px`;
            cache.fxHeight = frame.height;
        } else {
            fx.element.style.maxWidth = `${frame.width}px`;
            cache.fxWidth = frame.width;
        }
    }
});


const PLACEMENTS = {
    top: {
        my: "bottom",
        at: "top",
        collision: "flip",
        name: "top",
        opposite: "bottom",
        method: "bottom-left"
    },

    right: {
        my: 'left',
        at: 'right',
        collision: "flip",
        name: "right",
        opposite: "left",
        method: "top-left"
    },

    bottom: {
        my: "top",
        at: "bottom",
        collision: "flip",
        name: "bottom",
        opposite: "top",
        method: "top-left"
    },

    left: {
        my: "right",
        at: "left",
        collision: "flip",
        name: "left",
        opposite: "right",
        method: "top-right"
    }
};


/**
 * Will display an element by sliding it into full width or height.
 */
export class SlideInAndOutFX {
    #element;
    #hiddenClassName;
    #visibleClassName;
    #duration;
    #fx;
    #state;
    #axis;
    #currentRenderedAxis;

    constructor(element, duration, axis, {hiddenClassName="hidden", visibleClassName=null}) {
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

    show(fx=true) {
        // Animate elements current width and height to full width and height.
        return new Promise(resolve=> {
            let axis = this.axis;

            if(fx === false && (this.#state !== 'visible' || axis !== this.#currentRenderedAxis)) {
                if(this.#fx) {
                    this.#fx.cancel();
                    this.#fx = null;
                }

                if(this.#visibleClassName) addClasses(this.#element, this.#visibleClassName);
                if(this.#hiddenClassName) removeClasses(this.#element, this.#hiddenClassName);

                let fullRect = this.getBoundingClientRect();
                this.#element.style.maxWidth = `${fullRect.width}px`;
                this.#element.style.maxHeight = `${fullRect.height}px`;

                this.#state = 'visible';
                this.#currentRenderedAxis = axis;
                resolve();
            } else if(fx && (this.#state !== 'visible' || this.#state !== 'showing' || axis !== this.#currentRenderedAxis)) {
                if(this.#fx) {
                    this.#fx.cancel();
                    this.#fx = null;
                }

                this.#state = 'showing';

                if(this.#visibleClassName) addClasses(this.#element, this.#visibleClassName);
                if(this.#hiddenClassName) removeClasses(this.#element, this.#hiddenClassName);

                let fullRect = this.getBoundingClientRect(),
                    currentRect = Rect.getBoundingClientRect(this.#element),
                    animation,
                    complete,
                    frames = {'0%': {}, '100%': {}};

                if(this.#currentRenderedAxis === "x" || this.#currentRenderedAxis === "xy") {
                    complete = clamp((1-(currentRect.width / fullRect.width)), 0, 1);
                } else {
                    complete = clamp((1-(currentRect.height / fullRect.height)), 0, 1);
                }

                if(axis === "y") {
                    frames['0%'].maxHeight = currentRect.height + "px";
                    frames['100%'].maxHeight = fullRect.height + "px";
                    this.#element.style.maxWidth = `${fullRect.width}px`;
                } else if(axis === "x") {
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

                this.#fx = animation.animate(this.#element, this.#duration * complete, {
                    onComplete: () => {
                        this.#state = 'visible';
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }

    hide(fx=true) {
        return new Promise(resolve => {
            let axis = this.axis;

            if(fx === false && (this.#state !== 'hidden' || this.#currentRenderedAxis !== axis)) {
                if(this.#fx) {
                    this.#fx.cancel();
                    this.#fx = null;
                }

                if(this.#visibleClassName) removeClasses(this.#element, this.#visibleClassName);
                if(this.#hiddenClassName) addClasses(this.#element, this.#hiddenClassName);

                if(axis === 'x') {
                    this.#element.style.maxWidth = `0px`;
                } else if(axis === 'y') {
                    this.#element.style.maxHeight = `0px`;
                } else if(axis === 'xy') {
                    this.#element.style.maxWidth = `0px`;
                    this.#element.style.maxHeight = `0px`;
                }

                this.#currentRenderedAxis = axis;
                this.#state = 'hidden';
                resolve();
            } else if(this.#state !== 'visible' || this.#state !== 'showing') {
                if(this.#fx) {
                    this.#fx.cancel();
                    this.#fx = null;
                }

                this.#state = 'hiding';
                if(this.#visibleClassName) addClasses(this.#element, this.#visibleClassName);
                if(this.#hiddenClassName) removeClasses(this.#element, this.#hiddenClassName);

                let currentRect = Rect.getBoundingClientRect(this.#element),
                    fullRect = this.getBoundingClientRect(),
                    animation,
                    frames = {'0%': {}, '100%': {}},
                    complete;

                if(this.#currentRenderedAxis === 'x' || this.#currentRenderedAxis === "xy") {
                    complete = clamp(currentRect.width / fullRect.width, 0, 1);
                } else {
                    complete = clamp(currentRect.height / fullRect.height, 0, 1);
                }

                if(axis === 'x') {
                    frames['0%'].maxWidth = currentRect.width + "px";
                    frames['100%'].maxWidth = '0px';
                    this.#element.style.maxHeight = `${fullRect.height}px`;
                } else if(axis === 'y') {
                    frames['0%'].maxHeight = currentRect.height + "px";
                    frames['100%'].maxHeight = '0px';
                    this.#element.style.maxWidth = `${fullRect.width}px`;
                } else if(axis === 'xy') {
                    frames['0%'].maxWidth = currentRect.width + "px";
                    frames['100%'].maxWidth = '0px';
                    frames['0%'].maxHeight = currentRect.height + "px";
                    frames['100%'].maxHeight = '0px';
                }

                this.#currentRenderedAxis = axis;
                animation = new Animation({frames});

                this.#fx = animation.animate(this.#element, complete * this.#duration, {
                    onComplete: () => {
                        this.#state = 'hidden';
                        resolve();
                    }
                });
            }
        });
    }

    /**
     * Cancel any currently running fx.
     */
    cancel() {
        if(this.#fx) {
            this.#fx.cancel();
            this.#fx = null;
        }
    }

    destroy() {
        if(this.#fx) {
            this.#fx.cancel();
            this.#fx = null;
        }

        this.#element.style.maxWidth = "";
        this.#element.style.maxHeight = "";
    }

    getBoundingClientRect() {
        if(this.#hiddenClassName) removeClasses(this.#element, this.#hiddenClassName);
        if(this.#visibleClassName) addClasses(this.#element, this.#visibleClassName);

        let maxWidth = this.#element.style.maxWidth,
            maxHeight = this.#element.style.maxHeight;

        this.#element.style.maxWidth = "";
        this.#element.style.maxHeight = "";

        let r = Rect.getBoundingClientRect(this.#element);

        this.#element.style.maxWidth = maxWidth;
        this.#element.style.maxHeight = maxHeight;

        if(this.#state === "hidden") {
            if(this.#hiddenClassName) addClasses(this.#element, this.#hiddenClassName);
            if(this.#visibleClassName) removeClasses(this.#element, this.#visibleClassName);
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
        if(typeof this.#axis === 'function') {
            return this.#axis();
        } else {
            return this.#axis;
        }
    }

    setAxis(axis) {
        this.#axis = axis;

        if(this.isVisible) {
            this.show(this.state === 'showing');
        } else {
            this.hide(this.state === 'hiding');
        }
    }
}


export default class Tooltip extends Component {
    #timer;
    #fx;

    constructor(text) {
        let element = document.createElement('div'),
            body = document.createElement('div'),
            label = document.createElement('div'),
            arrow = document.createElement('div');

        element.appendChild(body);
        body.appendChild(label);
        body.appendChild(arrow);
        label.innerHTML = text;

        element.className = "tooltip";
        body.className = "tooltip__body";
        label.className = "tooltip__label";
        arrow.className = "arrow";

        super(element);

        this.#timer = null;

        this.#fx = new SlideInAndOutFX(this.element, 200, () => {
            let placement = this.element.dataset.placement;

            if(placement === "right" || placement === "left") {
                return "x";
            } else {
                return "y";
            }
        }, {hiddenClassName: "hidden"});

        this.#fx.hide(false);
    }

    position(placement, target) {
        let pos,
            rect,
            targetRect = Rect.getBoundingClientRect(target),
            containerRect = Rect.getClientRect(),
            collision;

        placement = PLACEMENTS[placement];
        collision = placement.collision;

        this.element.dataset.placement = placement.name;

        if(!rect) rect = this.getBoundingClientRect();

        pos = rect.position({
            my: placement.my,
            at: placement.at,
            of: targetRect
        });

        // Check if position is inside container.
        if(containerRect.contains(pos)) {
            setElementClientPosition(this.element, pos, placement.method);
            return pos;
        }

        // Try flipping it.
        if(collision === "flip" || collision === "flipfit") {
            placement = PLACEMENTS[placement.opposite];

            this.element.dataset.placement = placement.name;
            rect = this.getBoundingClientRect();

            pos = rect.position({
                my: placement.my,
                at: placement.at,
                of: targetRect
            });

            if(containerRect.contains(pos)) {
                setElementClientPosition(this.element, pos, placement.method);
                return pos;
            }
        }

        // Try fitting it.
        if(collision === "fit" || collision === "flipfit") {
            pos = pos.fit(containerRect);
        }

        setElementClientPosition(this.element, pos, placement.method);
        return pos;
    }

    async show(target, placement, timeout=null) {
        if(this.#fx.state === "showing" || this.#fx.state === "visible") {
            return;
        }

        if(this.#timer) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }

        this.position(placement, target);

        let promise = this.#fx.show();

        if(typeof timeout === 'number' && timeout >= 0) {
            await promise;

            this.#timer = setTimeout(() => {
                this.hide();
            }, timeout);
        }
    }

    hide() {
        if(this.#timer) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }

        if(this.#fx.state === "hiding" || this.#fx.state === "hidden") {
            return;
        }

        return this.#fx.hide();
    }

    get isActive() {
        return this.#fx.state === "visible" || this.#fx.state === "showing";
    }

    get state() {
        return this.#fx.state;
    }

    getBoundingClientRect() {
        return this.#fx.getBoundingClientRect();
    }
}
