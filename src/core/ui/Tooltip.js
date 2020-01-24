import Component from "../Component";
import {Rect, setElementClientPosition} from "./position";
import Animation from "../fx/Animation";
import {SlideIn, SlideOut, FadeIn, FadeOut} from "../fx/effects";
import {addClasses} from "../utility";
import Overlay from "./Overlay";


const tooltipSymbol = Symbol('tooltip');


function getTooltipAnimationAxis(element) {
    let placement = element.dataset.placement;

    if(placement === 'top' || placement === 'bottom') {
        return 'y';
    } else {
        return 'x';
    }
}


// /**
//  * A specific slide in and out animation controller for tooltips.  The axis is determined by the placement of the
//  * tooltip.
//  */
// export class SlideInAndOutTooltip extends SlideInAndOut {
//     constructor(duration) {
//         super(duration, getTooltipAnimationAxis);
//     }
// }


export class SlideInToolTip extends SlideIn {
    constructor(duration) {
        super(duration, getTooltipAnimationAxis);
    }
}


export class SlideOutToolTip extends SlideOut {
    constructor(duration) {
        super(duration, getTooltipAnimationAxis);
    }
}


/**
 * Common animation that can be used by tooltip.  Can be accessed by passing their key to the animation property.
 */
const ANIMATIONS = {
    slideIn: SlideInToolTip,
    slideOut: SlideOutToolTip,
    fadeIn: FadeIn,
    fadeOut: FadeOut
};


/**
 * A map of placement configuration objects that can be referenced by their name.
 *
 * @type {{top: {collision: string, at: string, method: string, name: string, opposite: string, my: string}, left: {collision: string, at: string, method: string, name: string, opposite: string, my: string}, bottom: {collision: string, at: string, method: string, name: string, opposite: string, my: string}, right: {collision: string, at: string, method: string, name: string, opposite: string, my: string}}}
 */
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


/**
 * Creates a tooltip that either targets an object or the mouse cursor.
 */
export default class Tooltip extends Component {
    #label;
    #target;

    #destroy;
    #overlay;

    constructor(text, placement, {timeout=null, showFX=null, showDuration=null, hideFX=null, hideDuration=null, classes=null, id=null, removeOnHide=true}={}) {
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

        if(id !== null) {
            element.id = id;
        }

        super(element);

        if(typeof showFX === 'string') {
            showFX = ANIMATIONS[showFX];
        }

        if(typeof hideFX === 'string') {
            hideFX = ANIMATIONS[hideFX];
        }

        this.#overlay = new Overlay(this.element, {
            removeOnHide,
            showFX,
            hideFX,
            showDuration,
            hideDuration,
            timeout
        });

        if(typeof placement === 'string') {
            placement = PLACEMENTS[placement];
        }

        if(placement) {
            this.#overlay.setPlacement(placement.name, placement);
        }

        this.#overlay.hide(true);
    }

    /**
     * Completely destroys the tooltip.  Cleaning up any registered events, timers and removing the tooltip from the dom.
     */
    async destroy() {
        this.#overlay.clearTimeOut();

        await this.#overlay.clearFX();

        if(this.#destroy) {
            this.#destroy();
            this.#destroy = null;
        }

        if(this.element.parentElement) {
            this.element.parentElement.removeChild(this.element);
        }
    }

    /**
     * Initializes the tooltip on the target.
     *
     * The tooltip can either be of type toggle or hover.  If toggle the tooltip will display/hide when the user clicks
     * the target.  If hover the tooltip will display when the user hover over the target.
     *
     * If lockToMouse is true the tooltip's position will be locked to the mouses coordanents.
     * @param target
     * @param type
     * @param lockToMouse
     */
    init(target, type, lockToMouse=false) {
        // noinspection JSUnusedLocalSymbols
        let positionTarget = event => target,
            mouseX = 0,
            mouseY = 0;

        if(this.#destroy) {
            this.#destroy();
            this.#destroy = null;
        }

        if(typeof target === 'string') {
            target = document.querySelector(target);
        }

        if(type === 'hover') {
            let onMouseOver = (event) => {
                mouseX = event.clientX;
                mouseY = event.clientY;

                if((this.state === Overlay.hiding || this.state === Overlay.hidden) && !target.contains(event.relatedTarget)) {
                    this.show(positionTarget);
                }
            };

            let onMouseOut = (event) => {
                mouseX = event.clientX;
                mouseY = event.clientY;

                if(!target.contains(event.relatedTarget) && (this.state === Overlay.visible || this.state === Overlay.showing)) {
                    this.hide();
                }
            };

            let onMouseMove;

            target.addEventListener('mouseover', onMouseOver);

            target.addEventListener('mouseout', onMouseOut);

            if(lockToMouse) {
                onMouseMove = (event) => {
                    mouseX = event.clientX;
                    mouseY = event.clientY;

                    if(this.state === Overlay.visible || this.state === Overlay.showing) {
                        this.#overlay.position("current");
                    }
                };

                positionTarget = () => {
                    return new Rect(
                        mouseX,
                        mouseY,
                        mouseX,
                        mouseY
                    );
                };
            }

            if(onMouseMove) {
                target.addEventListener('mousemove', onMouseMove);
            }

            this.#destroy = () => {
                if(onMouseMove) {
                    this.element.removeEventListener('mousemove', onMouseMove);
                }

                target.removeEventListener('mouseout', onMouseOut);
                target.removeEventListener('mouseover', onMouseOver);
            };
        } else if(type === 'toggle') {
            let onMouseMove,
                onClick,
                onMouseMoveTarget,
                isMouseMoveBound = false;

            if(lockToMouse) {
                positionTarget = () => {
                    return new Rect(
                        mouseX,
                        mouseY,
                        mouseX,
                        mouseY
                    );
                };

                onMouseMove = (event) => {
                    mouseX = event.clientX;
                    mouseY = event.clientY;

                    if(this.state === Overlay.visible || this.state === Overlay.showing) {
                        this.#overlay.position("current");
                    }
                };

                onMouseMoveTarget = document;
            }

            onClick = async (event) => {
                mouseX = event.clientX;
                mouseY = event.clientY;

                if(this.state === Overlay.showing || this.state === Overlay.visible) {
                    let result = await this.hide();

                    if(onMouseMove && isMouseMoveBound && result === Animation.complete) {
                        onMouseMoveTarget.removeEventListener('mousemove', onMouseMove);
                        isMouseMoveBound = false;
                    }
                } else {
                    this.show(positionTarget);

                    if(onMouseMove && !isMouseMoveBound) {
                        onMouseMoveTarget.addEventListener('mousemove', onMouseMove);
                        isMouseMoveBound = true;
                    }
                }
            };

            target.addEventListener('click', onClick);

            this.#destroy = () => {
                if(isMouseMoveBound) {
                    onMouseMoveTarget.removeEventListener('mousemove', onMouseMove);
                    isMouseMoveBound = false;
                }

                target.removeEventListener('click', onClick);
            };
        }
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * The the tooltips text.
     * @param text
     */
    setText(text) {
        this.#label.innerHTML = text;
    }

    /**
     * Function that sets the position of the tooltip using the provided placement.
     * @param rect - The rectangle to position by.
     * @param placement - Configuration objects that contains placement options.
     * @param target - The element to position relative to.
     * @param containerRect - The container rectangle.
     * @returns {*}
     */
    position(rect, placement, target, containerRect) {
        let pos,
            targetRect,
            collision,
            element;

        if(typeof target === 'function') {
            targetRect = Rect.getBoundingClientRect(target());
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

        element = this.element;

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

    /**
     * Shows the tooltip.
     * @param target
     * @param immediate
     * @returns {Promise<string>}
     */
    async show(target, immediate=false) {
        this.#overlay.target = target;
        this.#overlay.container = Rect.getClientRect();

        if(!this.element.parentElement) {
            document.body.appendChild(this.element);
        }

        return this.#overlay.show(immediate);
    }

    /**
     * Hides the tooltip.
     * @param immediate
     * @returns {Promise<string>}
     */
    async hide(immediate=false) {
        return this.#overlay.hide(immediate);
    }

    /**
     * @returns {String}
     */
    get state() {
        return this.#overlay.state;
    }

    get isVisible() {
        return this.state !== Overlay.hidden;
    }

    /**
     * Creates a tooltip for the target. A target can only have one tooltip created by this method.
     *
     * @param target
     * @param text
     * @param type
     * @param showFX
     * @param showDuration
     * @param hideFX
     * @param hideDuration
     * @param placement
     * @param timeout
     * @param classes
     * @param id
     * @param refreshPositionOnMouseMove
     * @returns {Tooltip}
     */
    static tooltip(target, text, {type="hover", showFX=null, showDuration=null, hideFX=null, hideDuration=null, placement="top", timeout=null, classes=null, id=null, refreshPositionOnMouseMove=false}={}) {
        if(typeof target === 'string') {
            target = document.querySelector(target);
        }

        this.removeToolTip(target);

        let tooltip = new Tooltip(text, placement || 'top', {
            timeout,
            showFX,
            showDuration,
            hideFX,
            hideDuration
        });

        if(classes) {
            tooltip.addClass(classes);
        }

        if(id) {
            tooltip.id = id;
        }

        tooltip.init(target, type, refreshPositionOnMouseMove);

        return tooltip;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Returns the bound tooltip for the target element create by calling the Tooltip.tooltip function.
     * @param target
     * @returns {*|null}
     */
    static getToolTip(target) {
        if(typeof target === 'string') {
            target = document.querySelector(target);
        }

        return target[tooltipSymbol] || null;
    }

    /**
     * Removes any tooltip created by the Tooltip.tooltip function from the target.
     * @param target
     * @returns {null|any}
     */
    static removeToolTip(target) {
        if(typeof target === 'string') {
            target = document.querySelector(target);
        }

        let tooltip = target[tooltipSymbol];

        if(tooltip) {
            tooltip.destroy();
            delete target[tooltipSymbol];
            return tooltip;
        }

        return null;
    }
}
