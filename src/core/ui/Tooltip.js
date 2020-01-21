import Component from "../Component";
import {Rect, setElementClientPosition} from "./position";
import Animation from "../fx/Animation";
import {SlideIn, SlideOut} from "../fx/effects";


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


export default class Tooltip extends Component {
    static hiding = "Hiding";
    static showing = "Showing";
    static hidden = "Hidden";
    static visible = "Visible";

    #timer;
    #fx;
    #showFX;
    #hideFX;
    #state;

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

        this.#state = Tooltip.hidden;
        this.#timer = null;

        let axis = (element) => {
            let placement = element.dataset.placement;

            if(placement === 'top' || placement === "bottom") {
                return 'y';
            } else {
                return 'x';
            }
        };

        this.#showFX = new SlideIn(20000, axis);
        this.#hideFX = new SlideOut(20000, axis);
    }

    position(placement, target, containerRect) {
        let pos,
            rect,
            targetRect = Rect.getBoundingClientRect(target),
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
        if(!containerRect || containerRect.contains(pos)) {
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

    async show(target, placement, timeout=null, immediate=false) {
        if(this.#timer) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }

        if(this.#state === Tooltip.showing) {
            await this.#fx;

            if(this.#timer) {
                clearTimeout(this.#timer);
                this.#timer = null;
            }
        } else if(this.#state !== Tooltip.visible) {
            if(this.#fx) {
                this.#fx.cancel();
                this.#fx = null;
            }

            let containerRect = Rect.getClientRect(),
                state = this.state;

            this.#state = Tooltip.showing;
            this.element.classList.remove("hidden");
            this.position(placement, target, containerRect);

            if(this.#showFX) {
                if(!immediate) {
                    if(state === 'hidden') {
                        this.hide(true);
                    }

                    this.#fx = this.#showFX.animate(this.element);
                    await this.#fx;
                    this.#fx = null;
                } else {
                    this.#showFX.animate(this.element, {autoPlay: false, position: 1});
                }
            }

            this.#state = Tooltip.visible;
        }

        if(typeof timeout === "number" && timeout >= 0) {
            this.#timer = setTimeout(() => {
                this.hide();
            }, timeout);
        }
    }

    async hide(immediate=false) {
        if(this.#timer) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }

        if(this.#state === Tooltip.hiding) {
            await this.#fx;
        } else {
            if(this.#fx) {
                this.#fx.cancel();
                this.#fx = null;
            }

            this.#state = Tooltip.hiding;

            if(this.#hideFX) {
                if(!immediate) {
                    this.#fx = this.#hideFX.animate(this.element);
                    await this.#fx;
                    this.#fx = null;
                } else {
                    this.#hideFX.animate(this.element, {autoPlay: false, position: 1});
                }
            }

            this.element.classList.add("hidden");
            this.#state = Tooltip.hidden;
        }
    }

    /**
     * @returns {String}
     */
    get state() {
        return this.#state;
    }

    get isVisible() {
        return this.#state !== Tooltip.hidden;
    }
}
