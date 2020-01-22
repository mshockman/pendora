import Component from "../Component";
import {Rect, setElementClientPosition} from "./position";
import Animation from "../fx/Animation";
import {SlideInAndOut, FadeInAndOut} from "../fx/effects";
import {addClasses} from "../utility";


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
    #label;
    #target;
    #timeout;
    #removeOnHide;

    #destroy;

    constructor(text, placement, {timeout=null, animation=null, animationDuration=null, classes=null, removeOnHide=true}={}) {
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

        if(classes) {
            addClasses(element, classes);
        }

        super(element);

        this.#state = Tooltip.hidden;
        this.#timer = null;
        this.#promise = null;
        this.#placement = placement;
        this.#target = null;
        this.#timeout = timeout;
        this.#removeOnHide = removeOnHide;
        this.#label = label;

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

    destroy() {
        if(this.#destroy) {
            this.#destroy();
            this.#destroy = null;
        }
    }

    init(target, event, refreshPositionOnMouseMove=false) {
        // noinspection JSUnusedLocalSymbols
        let positionTarget = event => target;

        if(this.#destroy) {
            this.destroy();
        }

        if(typeof target === 'string') {
            target = document.querySelector(target);
        }

        if(event === 'hover') {
            let onMouseOver = (event) => {
                if(this.state === Tooltip.hiding || this.state === Tooltip.hidden) {
                    this.show(positionTarget(event));
                }
            };

            let onMouseOut = (event) => {
                if(!target.contains(event.relatedTarget) && (this.state === Tooltip.visible || this.state === Tooltip.showing)) {
                    this.hide(positionTarget(event));
                }
            };

            let onMouseMove;

            target.addEventListener('mouseover', onMouseOver);

            target.addEventListener('mouseover', onMouseOut);

            if(refreshPositionOnMouseMove) {
                onMouseMove = (event) => {
                    if(this.state === Tooltip.visible || this.state === Tooltip.showing) {
                        this.position(positionTarget(event), this.#placement, this.#target, Rect.getClientRect());
                    }
                };
            }

            if(onMouseMove) {
                target.addEventListener('mousemove', onMouseMove);
            }

            this.#destroy = () => {
                if(onMouseMove) this.element.removeEventListener('mousemove', onMouseMove);
                target.removeEventListener('mouseout', onMouseOut);
                target.removeEventListener('mouseover', onMouseOver);
            };
        } else if(event === 'toggle') {
            let onMouseMove,
                onClick,
                onMouseMoveTarget,
                target = this.element;

            if(refreshPositionOnMouseMove) {
                onMouseMove = () => {
                    if(this.state === Tooltip.visible || this.state === Tooltip.showing) {
                        this.position(null, this.#placement, this.#target, Rect.getClientRect());
                    }
                };

                onMouseMoveTarget = document;
            }

            onClick = () => {
                if(this.state === 'showing' || this.state === 'visible') {
                    this.hide();
                } else {
                    this.show();
                }
            };

            target.addEventListener('click', onClick);
            if(onMouseMoveTarget) onMouseMoveTarget.addEventListener('mousemove', onMouseMove);

            this.#destroy = () => {
                if(onMouseMove) onMouseMoveTarget.removeEventListener('mousemove', onMouseMove);
                target.removeEventListener('click', onClick);
            };
        }
    }

    setText(text) {
        this.#label.innerHTML = text;
    }

    position(rect, placement, target, containerRect, element=null) {
        let pos,
            targetRect,
            collision;

        if(typeof target === 'function') {
            targetRect = Rect.getBoundingClientRect(target)
        } else {
            targetRect = new Rect(target);
        }

        placement = PLACEMENTS[placement];
        collision = placement.collision;

        this.element.dataset.placement = placement.name;

        if(rect === "full") {
            rect = Rect.getCleanBoundingClientRect(this.element);
        } else if(!rect || rect === "current") {
            rect = new Rect(this.element);
        }

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

    async show(target, immediate=false) {
        if(this.#timer) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }

        if(this.element.parentElement) {
            document.body.appendChild(this.element);
        }

        let result;

        if(immediate) {
            if(this.#animation) {
                await this.#animation.cancel(this.element);
            }

            this.element.classList.remove("hidden");
            this.#target = target;

            if(this.#animation) {
                this.#animation.show(this.element, true);
            }

            this.position("full", this.#placement, this.#target, Rect.getClientRect());

            result = Animation.complete;
            this.#state = Tooltip.visible;
            this.publish("tooltip.visible", this);
        } else if(this.state !== Tooltip.visible) {
            if(this.#animation) {
                await this.#animation.cancel(this.element);
            }

            let startingState = this.state,
                clientRect = Rect.getClientRect(),
                fx;

            this.#target = target;
            this.element.classList.remove('hidden');
            this.position("full", this.#placement, this.#target, clientRect);

            if(startingState === Tooltip.hidden) {
                await this.hide(true);
                this.element.classList.remove("hidden");
            }

            this.#state = Tooltip.showing;
            this.publish("tooltip.showing", this);

            let onFrame = () => {
                this.position("current", this.#placement, this.#target, clientRect)
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
                this.publish("tooltip.visible", this);
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
                    this.publish("tooltip.timeout", this);
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
            this.publish("tooltip.hidden", this);

            if(this.#removeOnHide) {
                this.removeFrom();
            }

            this.#target = null;
            return Animation.complete;
        } if(this.state !== Tooltip.hidden) {
            if(this.#animation) {
                await this.#animation.cancel(this.element);
            }

            let clientRect = Rect.getClientRect(),
                fx, result;

            let onFrame = () => {
                this.position("current", this.#placement, this.#target, clientRect)
            };

            if(this.#animation) {
                fx = this.#animation.hide(this.element, false, {onFrame});
            }

            this.#state = Tooltip.hiding;
            this.publish("tooltip.hiding", this);

            if(fx) {
                result = await fx;
            } else {
                result = Animation.complete;
            }

            if(result === Animation.complete) {
                this.element.classList.add('hidden');
                this.#target = null;
                this.#state = Tooltip.hidden;

                if(this.#removeOnHide) {
                    this.removeFrom();
                }

                this.publish("tooltip.hidden", this);
            }

            return result;
        } else {
            return Animation.complete;
        }
    }

    async open() {
        let show = await this.show();

        if(show === Animation.complete) {
            this.publish('tooltip.open', this);
        }
    }

    async close() {
        let hide = await this.hide();

        if(hide === Animation.complete) {
            this.publish('tooltip.close', this);
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

    static tooltip(target, text, {action="hover", animation=null, animationDuration, placement="top", timeout=null, classes=null, id=null}) {
        if(typeof target === 'string') {
            target = document.querySelector(target);
        }
    }

    static getToolTip(target) {

    }

    static removeToolTip(target) {

    }
}
