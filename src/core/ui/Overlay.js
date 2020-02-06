import Rect from "../vectors/Rect";
import {getDistanceBetweenRects, getSubBoundingBox, setElementClientPosition} from "core/ui/position";
import Component from "../Component";
import Animation from "../fx/Animation";


export const symbolShow = Symbol("show"),
    symbolHide = Symbol("hide");


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
    static hiding = "Hiding";
    static showing = "Showing";
    static hidden = "Hidden";
    static visible = "Visible";

    #currentIndex;
    #placements;
    #container;
    #target;
    #arrow;
    #state;

    #showFX;
    #showDuration;
    #hideFX;
    #hideDuration;
    #fx;

    #visibleClassName;
    #hiddenClassName;

    #timer;

    constructor(element, {target=null, container=null, sticky=true, fit=null, showFX=null, showDuration=null, hideFX=null, hideDuration=null, timeout=null, removeOnHide=false, visibleClassName=null, hiddenClassName="hidden"}={}) {
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
        this.removeOnHide = removeOnHide;

        this.#currentIndex = 0; // The index of the current placement.
        this.#placements = [];
        this.#arrow = container;
        this.#timer = null;

        this.#visibleClassName = visibleClassName;
        this.#hiddenClassName = hiddenClassName;

        this.#state = undefined;

        if(typeof showFX === 'function') {
            showFX = new showFX();
        }
        if(typeof hideFX === 'function') {
            hideFX = new hideFX();
        }

        this.#fx = null;
        this.#showFX = showFX;
        this.#showDuration = showDuration;
        this.#hideFX = hideFX;
        this.#hideDuration= hideDuration;

        this.target = target;
        this.container = container;
    }

    // noinspection JSUnusedLocalSymbols
    [symbolHide](element) {
        if(this.#hiddenClassName) {
            this.addClass(this.#hiddenClassName);
        }

        if(this.#visibleClassName) {
            this.removeClass(this.#visibleClassName);
        }
    }

    // noinspection JSUnusedLocalSymbols
    [symbolShow](element) {
        if(this.#hiddenClassName) {
            this.removeClass(this.#hiddenClassName);
        }

        if(this.#visibleClassName) {
            this.addClass(this.#visibleClassName);
        }
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
            targetRect = new Rect(this.target());
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
        this.element.dataset.placement = currentPlacement.name;

        setElementClientPosition(this.element, currentPos, currentPlacement.method || "top-left");

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

        return currentPos;
    }

    getPlacement(index) {
        return this.#placements[index];
    }

    async show(immediate=false) {
        this.clearTimeOut();

        this.publish("overlay.show", this);

        if(!this.element.parentElement) {
            document.body.appendChild(this.element);
        }

        let result;

        if(immediate) {
            if(this.#fx) {
                await this.#fx.cancel();
            }

            this[symbolShow](this.element);

            if(this.#showFX) {
                this.#showFX.goto(this.element, 1);
            }

            this.position("current");

            result = Animation.complete;
            this.#state = Overlay.visible;
            this.publish("overlay.visible", this);
        } else if(this.state !== Overlay.visible) {
            if(this.#fx) {
                await this.#fx.cancel();
            }

            let startingState = this.state;

            this[symbolShow](this.element);
            this.position("current");

            if(startingState === Overlay.hidden && this.#hideFX) {
                await this.#hideFX.goto(this.element, 1);
            }

            this.position("current");

            this.#state = Overlay.showing;
            this.publish("overlay.showing", this);

            let onFrame = () => {
                this.position("current");
            };

            if(this.#showFX) {
                this.#fx = this.#showFX.animate(this.element, {duration: this.#showDuration, onFrame});
            }

            this.position("current");

            if(this.#fx) {
                result = await this.#fx;
                this.#fx = null;
            } else {
                result = Animation.complete;
            }

            if(result === Animation.complete) {
                this.#state = Overlay.visible;
                this.publish("overlay.visible", this);
            }
        } else {
            result = Animation.complete;
        }

        if(result === Animation.complete) {
            if (this.#timer) {
                clearTimeout(this.#timer);
                this.#timer = null;
            }

            if (typeof this.timeout === 'number' && this.timeout >= 0) {
                this.startTimeoutTimer(this.timeout);
            }
        }

        return result;
    }

    async hide(immediate=false) {
        this.clearTimeOut();

        if(immediate) {
            if(this.#fx) {
                await this.#fx.cancel();
            }

            if(this.#hideFX) {
                this.#hideFX.goto(this.element, 1);
            }

            this[symbolHide](this.element);
            this.#state = Overlay.hidden;
            this.publish("overlay.hidden", this);

            if(this.removeOnHide) {
                this.removeFrom();
            }

            return Animation.complete;
        } if(this.state !== Overlay.hidden) {
            if(this.#fx) {
                await this.#fx.cancel();
            }

            let result;

            let onFrame = () => {
                this.position("current");
            };

            if(this.#hideFX) {
                this.#fx = this.#hideFX.animate(this.element, {duration: this.#hideDuration, onFrame});
            }

            this.#state = Overlay.hiding;
            this.publish("overlay.hiding", this);

            if(this.#fx) {
                result = await this.#fx;
            } else {
                result = Animation.complete;
            }

            if(result === Animation.complete) {
                this[symbolHide](this.element);
                this.#state = Overlay.hidden;

                if(this.removeOnHide) {
                    this.removeFrom();
                }

                this.publish("overlay.hidden", this);
            }

            return result;
        } else {
            return Animation.complete;
        }
    }

    startTimeoutTimer(timeout=null) {
        if(timeout === null) {
            timeout = this.timeout;
        }

        if(typeof timeout !== "number" || timeout < 0) {
            throw new TypeError("Timeout must be a positive integer.");
        }

        this.clearTimeOut();

        this.#timer = setTimeout(() => {
            this.hide();
            this.publish("overlay.timeout", this);
        }, this.timeout);
    }

    clearTimeOut() {
        if(this.isTimingOut()) {
            clearTimeout(this.#timer);
            this.#timer = null;
            return true;
        }

        return false;
    }

    isTimingOut() {
        return !!this.#timer;
    }

    async clearFX() {
        if(this.#fx) {
            await this.#fx.cancel();
        }
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

    get fx() {
        return this.#fx;
    }

    get state() {
        return this.#state;
    }
}
