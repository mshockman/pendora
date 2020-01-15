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


export default class Overlay extends Component {
    constructor(element) {
        super(element);

        this.placements = [];
        this.sticky = true;
        this.fit = false;
        this.container = null;
        this.referenceTarget = null;
        this.arrow = null;

        this._currentIndex = 0; // The index of the current placement.
    }

    setArrow(arrow) {
        if(this.arrow) {
            this.arrow.removeFrom();
            this.arrow = null;
        }

        this.arrow = arrow;
        this.arrow.appendTo(this.element);
    }

    addPlacement(name, options) {
        this.placements.push({
            name,
            my: options.my,
            at: options.at,
            of: options.of,
            arrow: options.arrow
        });
    }

    show() {

    }

    hide() {

    }

    render() {
        let targetRect = this.getTargetRect(),
            containerRect = this.getContainerRect(),
            startingIndex = 0,
            currentPos,
            currentIntersectAmount = 0,
            currentPlacement;

        // If sticky start searching from the last position instead of starting from the begining.
        if(this.sticky) {
            startingIndex = this._currentIndex;
        }

        // Find the best position.
        for(let i = 0; i < this.placements.length; i++) {
            let index = (startingIndex + i) % this.placements.length,
                position = this.getPlacement(index),
                rect = null,
                clampSpace = targetRect,
                anchor,
                pos,
                newIntersectAmount,
                subBoundingBox = position.of ? getSubBoundingBox(targetRect, position.of) : targetRect;

            this.element.dataset.placement = position.name;

            rect = this.getBoundingClientRect();
            pos = rect;
            anchor = rect.getAnchor(position.my);

            pos = pos.position({
                my: position.my,
                at: position.at,
                of: subBoundingBox
            });

            if(containerRect) {
                pos = pos.fit(containerRect);
            }

            clampSpace = targetRect.add(new Rect(
                -rect.width,
                -rect.height,
                0,
                0
            ));

            if(position.of) {
                clampSpace = getSubBoundingBox(clampSpace, position.of);
            }

            pos = pos.clamp(clampSpace);

            if(this.arrow && position.arrow) {
                this.arrow.direction = position.arrow;

                let arrowPos = this.arrow.getTargetPosition(pos, targetRect),
                    newArrowPos = position.arrow === "up" || position.arrow === "down" ? arrowPos.fitX(targetRect) : arrowPos.fitY(targetRect),
                    deltaX = newArrowPos.left - arrowPos.left,
                    deltaY = newArrowPos.top - arrowPos.top;

                pos = pos.translate(deltaX, deltaY);
            }

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

                currentPos = pos;
                currentIntersectAmount = newIntersectAmount;
                currentPlacement = position;

                this._currentIndex = index;

                if(!containerRect || containerRect.contains(pos)) {
                    break;
                }
            }
        }

        // Apply the best position.
        setElementClientPosition(this.element, currentPos, currentPlacement.method || "top-left");
        this.element.dataset.placement = currentPlacement.name;

        if(this.arrow) {
            this.arrow.direction = currentPlacement.arrow;
            this.arrow.render();
        }

        // Publish topics.
        this.publish("overlay.render", {
            target: this,
            name: 'overlay.render',
            position: currentPos,
            placement: currentPlacement,
            index: this._currentIndex
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
