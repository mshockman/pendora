import Rect from "../vectors/Rect";
import {getDistanceBetweenRects, getSubBoundingBox, setElementClientPosition} from "core/ui/position";
import {selectElement} from "../utility";


export default class Overlay {
    constructor(element) {
        this.placements = [];
        this.sticky = true;
        this.fit = false;
        this.container = null;
        this.referenceTarget = null;

        this._currentIndex = 0; // The index of the current placement.

        this.element = selectElement(element);
    }

    addPlacement(name, options) {
        this.placements.push({
            name,
            my: options.my,
            at: options.at,
            of: options.of,
            paddingLeft: options.paddingLeft || 0,
            paddingTop: options.paddingTop || 0,
            paddingRight: options.paddingRight || 0,
            paddingBottom: options.paddingBottom || 0
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
            currentPos;

        if(this.sticky) {
            startingIndex = this._currentIndex;
        }

        // Position Overlay
        for(let i = 0; i < this.placements.length; i++) {
            let index = (startingIndex + i) % this.placements.length,
                position = this.getPlacement(index),
                rect = null,
                space = targetRect,
                pos;

            this.element.dataset.placement = position.name;

            rect = this.getBoundingClientRect();
            pos = rect;

            if(position.of) {
                space = getSubBoundingBox(space, position.of);
            }

            space = space.add(new Rect(
                position.paddingLeft || 0,
                position.paddingTop || 0,
                -position.paddingRight || 0,
                -position.paddingBottom || 0
            ));

            pos = pos.position({
                my: position.my,
                at: position.at,
                of: space
            });

            if(containerRect) {
                pos = pos.fit(containerRect);
            }

            pos = pos.clamp(space, position.my);

            // noinspection JSCheckFunctionSignatures
            if(!currentPos || containerRect.contains(pos) || getDistanceBetweenRects(pos, containerRect) < getDistanceBetweenRects(currentPos, containerRect)) {
                currentPos = pos;
                let breakFlag = false;

                if(!containerRect || containerRect.contains(pos)) {
                    breakFlag = true;
                } else if(containerRect) {
                    if(this.fit === true || this.fit === "xy") {
                        pos = pos.fit(containerRect);
                    } else if(this.fit === "y") {
                        pos = pos.fitY(containerRect);
                    } else if(this.fit === "x") {
                        pos = pos.fitX(containerRect);
                    }
                }

                setElementClientPosition(this.element, pos, position.method || "top-left");
                this._currentIndex = index;

                if(!containerRect || containerRect.contains(pos)) {
                    break;
                }
            }
        }
    }

    appendTo(element) {
        if(typeof element === 'string') {
            document.querySelector(element).appendChild(this.element);
        } else if(element.appendChild) {
            element.appendChild(this.element);
        } else if(element.append) {
            element.append(this.element);
        }
    }

    getBoundingClientRect() {
        return Rect.getBoundingClientRect(this.element);
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

    //------------------------------------------------------------------------------------------------------------------
    // Properties

    get isVisible() {

    }

    set isVisible(value) {

    }

    get disabled() {
        return this.isDisabled;
    }

    set disabled(value) {
        this.isDisabled = value;
    }

    get isDisabled() {
        return this.element.classList.contains('disabled');
    }

    set isDisabled(value) {
        let disabled = this.isDisabled;

        if(value && !disabled) {
            this.element.classList.add('disabled');
        } else if(disabled) {
            this.element.classList.remove('disabled');
        }
    }
}
