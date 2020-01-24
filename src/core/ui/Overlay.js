import Rect from "../vectors/Rect";
import {getDistanceBetweenRects, getSubBoundingBox, setElementClientPosition} from "core/ui/position";
import {selectElement} from "../utility";
import Component from "../Component";
import Animation from "../fx/Animation";


export const symbolOnShow = Symbol("onShow"),
    symbolOnHide = Symbol("onHide");


function getXIntersectAmount(rect1, rect2) {
    let left = Math.max(rect1.left, rect2.left),
        right = Math.min(rect1.right, rect2.right);

    return left > right ? 0 : right - left;
}


function getYIntersectAmount(rect1, rect2) {
    let top = Math.max(rect1.top, rect2.top),
        bottom = Math.min(rect1.bottom, rect2.bottom);

    return top > bottom ? 0 : bottom - top;
}


const DEFAULT_PLACEMENTS = {
    top: {
        my: "bottom",
        at: "top",
        of: "border-top",
        arrow: "bottom"
    },

    bottom: {
        my: "top",
        at: "bottom",
        of: "border-bottom",
        arrow: "top"
    },

    right: {
        my: "left",
        at: "right",
        of: "border-right",
        arrow: "left"
    },

    left: {
        my: "right",
        at: "left",
        of: "border-left",
        arrow: "right"
    }
};


export default class Overlay extends Component {
    #currentIndex;
    #placements;
    #container;
    #target;
    #arrow;

    #showFX;
    #showDuration;
    #hideFX;
    #hideDuration;
    #fx;

    #timer;

    constructor(element, {target=null, container=null, sticky=true, fit=null, showFX=null, showDuration=null, hideFX=null, hideDuration=null, timeout=null}={}) {
        super(element);

        if(typeof target === 'string') {
            target = document.querySelector(target);
        }

        if(typeof container === 'string') {
            container = document.querySelector(container);
        }

        this.sticky = sticky;
        this.fit = fit;
        this.timeout = timeout;

        this.#currentIndex = 0; // The index of the current placement.
        this.#placements = [];
        this.#arrow = container;
        this.#timer = null;

        this.#fx = null;
        this.#showFX = showFX;
        this.#showDuration = showDuration;
        this.#hideFX = hideFX;
        this.#hideDuration= hideDuration;

        this.target = target;
        this.container = container;
    }

    [symbolOnHide](element) {
        element.classList.add('hidden');
    }

    [symbolOnShow](element) {
        element.classList.remove('hidden');
    }

    setArrow(arrow) {
        if(this.#arrow) {
            this.#arrow.removeFrom();
            this.#arrow = null;
        }

        this.#arrow = arrow;
        this.#arrow.appendTo(this.element);
    }

    addPlacement(name, options=undefined) {
        if(!options) {
            options = DEFAULT_PLACEMENTS[name];
        }

        let placement = {name};

        for(let key of ['my', 'at', 'of', 'arrow', 'offset', 'collision', 'method']) {
            if(options[key] !== undefined) {
                placement[key] = options[key];
            }
        }

        placement.method = placement.method || 'top-left';

        this.#placements.push(Object.freeze(placement));
    }

    setPlacement(name, options=undefined) {
        if(!options) {
            options = DEFAULT_PLACEMENTS[name];
        }

        this.#placements = [];
        this.addPlacement(name, options);
    }

    position(mode="current") {
        if(!this.#placements.length) {
            return;
        }

        let targetRect,
            containerRect,
            startingIndex = 0,
            currentPos = null,
            currentIntersectAmount = 0,
            currentPlacement;

        if(typeof this.target === 'function') {
            targetRect = this.target();
        } else if(this.target) {
            targetRect = Rect.getBoundingClientRect(this.target);
        } else {
            targetRect = Rect.getRootContainingClientRect();
        }

        if(typeof this.container === 'function') {
            containerRect = this.container();
        } else if(this.container) {
            containerRect = Rect.getBoundingClientRect(this.container);
        } else {
            containerRect = null;
        }

        // If sticky start searching from the last position instead of starting from the begining.
        if(this.sticky) {
            startingIndex = this.#currentIndex;
        }

        // Find the best position.
        for(let i = 0; i < this.#placements.length; i++) {
            let index = (startingIndex + i) % this.#placements.length,
                position = this.getPlacement(index),
                clampSpace = targetRect,
                pos,
                newIntersectAmount,
                subBoundingBox = position.of ? getSubBoundingBox(targetRect, position.of) : targetRect,
                arrowOffset = new Rect(0, 0, 0, 0),
                arrowRect;

            this.element.dataset.placement = position.name;

            if(mode === "current") {
                pos = Rect.getBoundingClientRect(this.element);
            } else {
                pos = Rect.getCleanBoundingClientRect(this.element);
            }

            if(this.#arrow && position.arrow) {
                this.#arrow.setPlacement(position.arrow);
                arrowRect = this.#arrow.getBoundingClientRect();
                let unionBox = pos.union(arrowRect);
                arrowOffset = pos.subtract(unionBox);
                pos = unionBox;
            }

            clampSpace = targetRect.add(new Rect(
                -pos.width,
                -pos.height,
                0,
                0
            ));

            if(arrowRect) {
                if(this.#arrow.placement === "top" || this.#arrow.placement === "bottom") {
                    clampSpace = clampSpace.add(new Rect(
                        arrowRect.width,
                        0,
                        -arrowRect.width,
                        0
                    ));
                } else {
                    clampSpace = clampSpace.add(new Rect(
                        0,
                        arrowRect.height,
                        0,
                        -arrowRect.height
                    ));
                }
            }

            pos = pos.position({
                my: position.my,
                at: position.at,
                of: targetRect
            });

            if(containerRect) {
                pos = pos.fit(containerRect);
            }

            if(position.of) {
                clampSpace = getSubBoundingBox(clampSpace, position.of);
            }

            pos = pos.clamp(clampSpace);

            newIntersectAmount = getXIntersectAmount(subBoundingBox, containerRect) + getYIntersectAmount(subBoundingBox, containerRect);

            // noinspection JSCheckFunctionSignatures
            if(!currentPos || (containerRect && containerRect.contains(pos)) || (newIntersectAmount > currentIntersectAmount && getDistanceBetweenRects(pos, containerRect) <= getDistanceBetweenRects(currentPos, containerRect))) {
                if(containerRect) {
                    if(this.fit === true || this.fit === "xy") {
                        pos = pos.fit(containerRect);
                    } else if(this.fit === "y") {
                        pos = pos.fitY(containerRect);
                    } else if(this.fit === "x") {
                        pos = pos.fitX(containerRect);
                    }
                }

                currentPos = pos.add(arrowOffset);
                currentIntersectAmount = newIntersectAmount;
                currentPlacement = position;

                this.#currentIndex = index;

                if(!containerRect || containerRect.contains(pos)) {
                    break;
                }
            }
        }

        // Apply the best position.
        setElementClientPosition(this.element, currentPos, currentPlacement.method || "top-left");
        this.element.dataset.placement = currentPlacement.name;

        if(this.#arrow) {
            this.#arrow.setPlacement(currentPlacement.arrow);
        }

        // Publish topics.
        this.publish("overlay.render", {
            target: this,
            name: 'overlay.render',
            position: currentPos,
            placement: currentPlacement,
            index: this.#currentIndex
        });
    }

    getPlacement(index) {
        return this.#placements[index];
    }

    async show(immediate=false) {
        if(this.#timer) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }

        if(!this.element.parentElement) {
            document.body.appendChild(this.element);
        }

        let result;

        if(immediate) {
            if(this.#fx) {
                await this.#fx.cancel();
            }

            this.element.classList.remove("hidden");

            if(this.#showFX) {
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
            this.position("full", this.#placement, target, clientRect);

            if(startingState === Tooltip.hidden && this.#animation) {
                await this.#animation.hide(this.element, true);
            }

            this.#state = Tooltip.showing;
            this.publish("tooltip.showing", this);

            let onFrame = () => {
                this.position("current", this.#placement, target, clientRect)
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

    }

    // noinspection JSUnusedGlobalSymbols
    get placements() {
        return this.#placements.slice(0);
    }

    get target() {
        return this.#target;
    }

    get container() {
        return this.#container;
    }

    set target(target) {
        if(typeof value === 'string') {
            this.#target = document.querySelector(target);
        } else {
            this.#target = target || null;
        }
    }

    set container(container) {
        if(typeof container === 'string') {
            this.#container = document.querySelector(container);
        } else {
            this.#container = container || null;
        }
    }
}
