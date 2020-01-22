import Component from "../Component";
import {Rect, setElementClientPosition} from "./position";
import Animation from "../fx/Animation";
import {SlideInAndOut, FadeInAndOut} from "../fx/effects";


/**
 * A specific slide in and out animation controller for tooltips.  The axis is determined by the placement of the
 * tooltip.
 */
export class SlideInAndOutTooltip extends SlideInAndOut {
    constructor(duration) {
        let axis = (element) => {
            let placement = element.dataset.placement;

            if(placement === 'top' || placement === 'bottom') {
                return 'y';
            } else {
                return 'x';
            }
        };

        super(duration, axis);
    }
}


const ANIMATIONS = {
    slide: SlideInAndOutTooltip,
    fade: FadeInAndOut
};


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
    #animation;
    #state;
    #promise;
    #placement;
    #target;
    #timeout;

    constructor(text, placement, target, {timeout=null, animation=null, animationDuration=null}={}) {
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

        if(typeof animation === 'string') {
            animation = ANIMATIONS[animation];
        }

        if(typeof animation === 'function') {
            this.#animation = new animation(animationDuration);
        } else if(animation) {
            this.#animation = animation;
        } else {
            this.#animation = null;
        }
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
            if(this.#animation) {
                await this.#animation.cancel(this.element);
            }

            this.element.classList.remove("hidden");

            if(this.#animation) {
                this.#animation.show(this.element, true);
            }

            this._position(null, this.#placement, this.#target, Rect.getClientRect());

            result = Animation.complete;
        } else if(this.state !== Tooltip.visible) {
            if(this.#animation) {
                await this.#animation.cancel(this.element);
            }

            let startingState = this.state,
                clientRect = Rect.getClientRect(),
                fx;

            this.element.classList.remove('hidden');
            this._position(null, this.#placement, this.#target, clientRect);

            if(startingState === Tooltip.hidden) {
                await this.hide(true);
                this.element.classList.remove("hidden");
            }

            this.#state = Tooltip.showing;

            let onFrame = () => {
                this._position(Rect.getBoundingClientRect(this.element), this.#placement, this.#target, clientRect)
            };

            if(this.#animation) {
                fx = this.#animation.show(this.element, false, {onFrame});
            }

            if(fx) {
                result = await fx;
            } else {
                result = Animation.complete;
            }

            if(result === Animation.complete) {
                this.#state = Tooltip.visible;
            }
        } else {
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

        if(immediate) {
            if(this.#animation) {
                await this.#animation.cancel(this.element);
                this.#animation.hide(this.element, true);
            }

            this.element.classList.add('hidden');
            this.#state = Tooltip.hidden;
            return Animation.complete;
        } if(this.state !== Tooltip.hidden) {
            if(this.#animation) {
                await this.#animation.cancel(this.element);
            }

            let clientRect = Rect.getClientRect(),
                fx, result;

            let onFrame = () => {
                this._position(Rect.getBoundingClientRect(this.element), this.#placement, this.#target, clientRect)
            };

            if(this.#animation) {
                fx = this.#animation.hide(this.element, false, {onFrame});
            }

            this.#state = Tooltip.hiding;

            if(fx) {
                result = await fx;
            } else {
                result = Animation.complete;
            }

            if(result === Animation.complete) {
                this.element.classList.add('hidden');
                this.#state = Tooltip.hidden;
            }

            return result;
        } else {
            return Animation.complete;
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
