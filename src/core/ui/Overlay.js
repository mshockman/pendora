import Rect from "../vectors/Rect";
import {getDistanceBetweenRects, getSubBoundingBox, setElementClientPosition} from "core/ui/position";
import {selectElement} from "../utility";
import Component from "../Component";


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

    constructor(element) {
        super(element);

        this.placements = [];
        this.sticky = true;
        this.fit = false;
        this.container = null;
        this.referenceTarget = null;
        this.arrow = null;

        this.#currentIndex = 0; // The index of the current placement.
    }

    setArrow(arrow) {
        if(this.arrow) {
            this.arrow.removeFrom();
            this.arrow = null;
        }

        this.arrow = arrow;
        this.arrow.appendTo(this.element);
    }

    addPlacement(name, options=undefined) {
        if(!options) {
            options = DEFAULT_PLACEMENTS[name];
        }

        this.placements.push({
            name,
            my: options.my,
            at: options.at,
            of: options.of,
            arrow: options.arrow
        });
    }

    render() {
        let targetRect = this.getTargetRect(),
            containerRect = this.getContainerRect(),
            startingIndex = 0,
            currentPos,
            currentIntersectAmount = 0,
            currentPlacement,
            overlayOffset = new Rect(0, 0, 0, 0);

        // If sticky start searching from the last position instead of starting from the begining.
        if(this.sticky) {
            startingIndex = this.#currentIndex;
        }

        // Find the best position.
        for(let i = 0; i < this.placements.length; i++) {
            let index = (startingIndex + i) % this.placements.length,
                position = this.getPlacement(index),
                clampSpace = targetRect,
                pos,
                newIntersectAmount,
                subBoundingBox = position.of ? getSubBoundingBox(targetRect, position.of) : targetRect,
                arrowOffset = new Rect(0, 0, 0, 0),
                arrowRect;

            this.element.dataset.placement = position.name;

            pos = this.getBoundingClientRect();

            if(this.arrow && position.arrow) {
                this.arrow.setPlacement(position.arrow);
                arrowRect = this.arrow.getBoundingClientRect();
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
                if(this.arrow.placement === "top" || this.arrow.placement === "bottom") {
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
            if(!currentPos || containerRect.contains(pos) || (newIntersectAmount > currentIntersectAmount && getDistanceBetweenRects(pos, containerRect) <= getDistanceBetweenRects(currentPos, containerRect))) {
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

        if(this.arrow) {
            this.arrow.setPlacement(currentPlacement.arrow);
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
        return this.placements[index];
    }

    getTargetRect() {
        return Rect.getBoundingClientRect(this.referenceTarget);
    }

    getContainerRect() {
        if(this.container) {
            return Rect.getBoundingClientRect(this.container);
        }

        return null;
    }

    setContainer(container) {
        if(container) {
            this.container = selectElement(container);
        } else {
            this.container = null;
        }
    }

    setTarget(target) {
        if(target) {
            this.referenceTarget = selectElement(target);
        } else {
            this.referenceTarget = null;
        }
    }
}
