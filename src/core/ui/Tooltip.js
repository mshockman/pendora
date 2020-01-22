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
        method: "top-left"
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
        method: "top-left"
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
    #promise;
    #placement;
    #target;
    #timeout;

    constructor(text, placement, target, timeout=null) {
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
        this.#promise = null;
        this.#placement = placement;
        this.#target = target;
        this.#timeout = timeout;

        let axis = (element) => {
            let placement = element.dataset.placement;

            if(placement === 'top' || placement === 'bottom') {
                return 'y';
            } else {
                return 'x';
            }
        };

        this.#showFX = new SlideIn(200, axis);
        this.#hideFX = new SlideOut(200, axis);
    }

    _position(rect, placement, target, containerRect, element=null) {
        let pos,
            targetRect = Rect.getBoundingClientRect(target),
            collision;

        placement = PLACEMENTS[placement];
        collision = placement.collision;

        this.element.dataset.placement = placement.name;

        if(!rect) rect = Rect.getCleanBoundingClientRect(this.element);
        if(!element) element = this.element;

        pos = rect.position({
            my: placement.my,
            at: placement.at,
            of: targetRect
        });

        // Check if position is inside container.
        if(!containerRect || containerRect.contains(pos)) {
            setElementClientPosition(element, pos, placement.method);
            return pos;
        }

        // Try flipping it.
        if(collision === "flip" || collision === "flipfit") {
            placement = PLACEMENTS[placement.opposite];

            element.dataset.placement = placement.name;
            rect = this.getBoundingClientRect();

            pos = rect.position({
                my: placement.my,
                at: placement.at,
                of: targetRect
            });

            if(containerRect.contains(pos)) {
                setElementClientPosition(element, pos, placement.method);
                return pos;
            }
        }

        // Try fitting it.
        if(collision === "fit" || collision === "flipfit") {
            pos = pos.fit(containerRect);
        }

        setElementClientPosition(element, pos, placement.method);
        return pos;
    }

    async show(immediate=false) {
        if(this.#timer) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }

        let result;

        if(immediate) {
            if(this.#fx) {
                await this.#fx.cancel();
            }

            this.element.classList.remove("hidden");

            if(typeof this.#showFX === 'function') {
                this.#showFX(this.element, {position: 1, autoPlay: false});
            } else if(this.#showFX) {
                this.#showFX.animate(this.element, {position: 1, autoPlay: false});
            }

            this._position(null, this.#placement, this.#target, Rect.getClientRect());

            result = Animation.complete;
        } else if(this.state === Tooltip.hidden || this.state === Tooltip.hiding) {
            if(this.#fx) {
                await this.#fx.cancel();
            }

            let startingState = this.state,
                clientRect = Rect.getClientRect(),
                fx;

            this.element.classList.remove('hidden');
            this._position(null, this.#placement, this.#target, clientRect);

            if(startingState === Tooltip.hidden) {
                this.hide(true);
                this.element.classList.remove("hidden");
            }

            this.#state = Tooltip.showing;

            let onFrame = () => {
                this._position(Rect.getBoundingClientRect(this.element), this.#placement, this.#target, clientRect)
            };

            if(typeof this.#showFX === 'function') {
                fx = this.#showFX(this.element, {onFrame});
            } else if(this.#showFX) {
                fx = this.#showFX.animate(this.element, {onFrame});
            }

            if(fx) {
                this.#fx = fx;
                result = await fx;
                this.#fx = null;
            } else {
                result = Animation.complete;
            }

            if(result === Animation.complete) {
                this.#state = Tooltip.visible;
            }
        } else if(this.state === Tooltip.showing) {
            result = await this.#fx;
        } else if(this.state === Tooltip.visible) {
            result = Animation.complete;
        }

        if(result === Animation.complete) {
            if (this.#timer) {
                clearTimeout(this.#timer);
                this.#timer = null;
            }

            if (typeof this.#timeout === 'number' && this.#timeout >= 0) {
                this.#timer = setTimeout(() => {
                    this.hide();
                }, this.#timeout);
            }
        }

        return result;
    }

    async hide(immediate=false) {
        if(this.#timer) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }

        let result;

        if(immediate) {
            if(this.#fx) {
                await this.#fx.cancel();
            }

            if(typeof this.#hideFX === 'function') {
                this.#hideFX(this.element, {position: 1, autoPlay: false});
            } else if(this.#hideFX) {
                this.#hideFX.animate(this.element, {position: 1, autoPlay: false});
            }

            this.element.classList.add('hidden');
            this.#state = Tooltip.hidden;
            result = Animation.complete;
        } else if(this.state === Tooltip.hiding) {
            result = await this.#fx;
        } else if(this.state === Tooltip.visible || this.state === Tooltip.showing) {
            if(this.#fx) {
                await this.#fx.cancel();
            }

            let clientRect = Rect.getClientRect();

            let onFrame = () => {
                this._position(Rect.getBoundingClientRect(this.element), this.#placement, this.#target, clientRect)
            };

            if(typeof this.#hideFX === 'function') {
                this.#fx = this.#hideFX(this.element, {onFrame});
            } else if(this.#hideFX) {
                this.#fx = this.#hideFX.animate(this.element, {onFrame});
            }

            this.#state = Tooltip.hiding;

            if(this.#fx) {
                result = await this.#fx;
                this.#fx = null;
            } else {
                result = Animation.complete;
            }

            if(result === Animation.complete) {
                this.element.classList.add('hidden');
                this.#state = Tooltip.hidden;
            }
        } else {
            result = Animation.complete;
        }

        return result;
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

    get fx() {
        return this.#fx;
    }
}
