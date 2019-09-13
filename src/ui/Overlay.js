import {setElementClientPosition, getSubBoundingBox, getDistanceBetweenRects, getCssPosition} from 'core/position';
import {Vec4, Vec2} from "core/vectors";
import {clamp} from "core/utility";


const DIRECTIONS = {
    top: {my: 'bottom', at: 'top', of: 'border-top', padding: {left: '50%', right: '50%'}, point: 'down', arrowAlign: 'middle'},
    right: {my: 'left', at: 'right', of: 'border-right', padding: {top: '50%', bottom: '50%'}, point: 'left', arrowAlign: 'middle'},
    bottom: {my: 'top', at: 'bottom', of: 'border-bottom', padding: {left: '50%', right: '50%'}, point: 'up', arrowAlign: 'middle'},
    left: {my: 'right', at: 'left', of: 'border-left', padding: {top: '50%', bottom: '50%'}, point: 'right', arrowAlign: 'middle'},
};


// todo remove debug
let _dr = {};
function _debug_draw_rect(rect, id, color='#000000', zIndex=-10, minWidth=0, minHeight=0) {
    // Draws the provided Vec4 rectangle on the screen.
    let e;

    if(_dr[id]) {
        e = _dr[id];
    } else {
        e = document.createElement('div');
        e.id = id;
        _dr[id] = e;
        e.classList.add('debug-rect');
    }

    let width = Math.max(minWidth, rect.right - rect.left),
        height = Math.max(minHeight, rect.bottom - rect.top);

    e.style.position = 'fixed';
    e.style.zIndex = '' + zIndex;
    e.style.backgroundColor = color;
    e.style.left = `${rect.left}px`;
    e.style.top = `${rect.top}px`;
    e.style.width = `${width}px`;
    e.style.height = `${height}px`;

    if(!e.parentElement && width > 0 && height > 0) {
        document.body.appendChild(e);
    } else if(e.parentElement && (width <= 0 || height <= 0)) {
        e.parentElement.removeChild(e);
    }

    return e;
}


export default class Overlay {
    constructor(element, reference, {positions=null, container=null, arrow=null, margins=null, sticky=false}={}) {
        if(typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
        }

        if(typeof reference === 'string') {
            this.referenceObject = document.querySelector(reference);
        } else {
            this.referenceObject = reference;
        }

        this.positions = positions;
        this.container = container;
        this.margins = margins;
        this.sticky = sticky;
        this.arrow = arrow;
        this.arrowElement = null;

        if(this.arrow) {
            this.arrowElement = document.createElement('div');
            this.arrowElement.classList.add('arrow-element');
            this.element.appendChild(this.arrowElement);
        }

        this._currentIndex = 0;
    }

    refresh() {
        let rect = Vec4.fromRect(this.referenceObject.getBoundingClientRect()),
            elementBB = Vec4.fromRect(this.element.getBoundingClientRect()),
            container = this._getContainer(elementBB);

        let flag = false,
            closestPosition = null,
            closestPositionDistance = null;

        if(!this.sticky) {
            this._currentIndex = 0;
        }

        for(let i = 0; i < this.positions.length; i++) {
            let index = (this._currentIndex + i) % this.positions.length;
            let position = this.positions[index];

            if(typeof position === 'string') {
                position = DIRECTIONS[position];
            }

            let applied = this._applyPosition(position, rect, elementBB, container);

            if(applied === -1) {
                this._currentIndex = index;
                flag = true;
                this._oob = false;
                break;
            } else {
                if(closestPositionDistance === null || (applied < closestPositionDistance)) {
                    closestPositionDistance = applied;
                    closestPosition = position;
                }
            }
        }

        if(!flag) {
            this._applyPosition(closestPosition, rect, elementBB, container, true);
            this._oob = true;
        }
    }

    /**
     * Returns the bounding client rect that defines the container space.
     * Returns null if unbounded.
     * @param elementBB
     * @returns {null|{Vec4}}
     * @private
     */
    _getContainer(elementBB) {
        let container = null;

        if(this.container) {
            if(typeof this.container === 'function') {
                container = this.container.call(this, this.element);
            } else if(typeof this.container === 'string') {
                container = document.querySelector(this.container).getBoundingClientRect();
            } else if(this.container.getBoundingClientRect) {
                container = this.container.getBoundingClientRect();
            } else {
                container = this.container;
            }

            container = Vec4.fromRect(container);
        }

        return container;
    }

    /**
     * Returns the collision box for the overlay element, accounting for things like the space needed for any
     * overflowing arrows. The method should be passed the bounding client rect of the overlay element.  A new
     * Vec4 will be returned with the new left, top, bottom, and right positions.
     *
     * The returning Vec4 will also be annotated with the paddingLeft and paddingTop properties.  These properties
     * define how the original element is positioned relative to the collision box.
     *
     * @param position
     * @param elementBB {Vec4}
     * @returns {Vec4}
     * @private
     */
    _getCollisionBox(position, elementBB) {
        let collisionBox = elementBB;
        let offsetX = 0,
            offsetY = 0;

        if(this.arrow) {
            if(position.point === 'down') {
                collisionBox = collisionBox.add(new Vec4(0, 0, 0, this.arrow.height));
            } else if(position.point === 'right') {
                collisionBox = collisionBox.add(new Vec4(0, 0, this.arrow.width, 0));
            } else if(position.point === 'up') {
                collisionBox = collisionBox.add(new Vec4(0, 0, 0, this.arrow.height));
                offsetY += this.arrow.height;
            } else if(position.point === 'left') {
                collisionBox = collisionBox.add(new Vec4(0, 0, this.arrow.width, 0));
                offsetX += this.arrow.width;
            }
        }

        // The offset of the element inside the collision box.
        collisionBox.paddingLeft = offsetX;
        collisionBox.paddingTop = offsetY;

        return collisionBox;
    }

    _positionArrow(position, overlay, reference) {
        if(!this.arrowElement || !this.arrow) return;
        let arrowBox = this.arrowElement.getBoundingClientRect(),
            style = {left: null, right: null, top: null, bottom: null},
            pos = getCssPosition(this.arrowElement),
            arrowPosition = 0;

        if(position.point === 'down') {
            style.bottom = -this.arrow.height;
        } else if(position.point === 'up') {
            style.top = -this.arrow.height;
        } else if(position.point === 'left') {
            style.left = -this.arrow.width;
        } else if(position.point === 'right') {
            style.right = -this.arrow.width;
        }

        if(position.point === 'up' || position.point === 'down') {
            if(position.arrowAlign === 'middle') {
                arrowPosition = ((overlay.right - overlay.left) / 2) - ((this.arrow.width) / 2);
            } else if(position.arrowAlign === 'start') {
                arrowPosition = 0;
            } else if(position.arrowAlign === 'end') {
                arrowPosition = overlay.right - overlay.left - (this.arrow.width);
            }

            let min = Math.max(0, reference.left - overlay.left),
                max = Math.min(overlay.right - overlay.left, reference.right - overlay.left) - (this.arrow.width);

            style.left = Math.round(clamp(arrowPosition, min, max));
        } else if(position.point === 'left' || position.point === 'right') {
            if(position.arrowAlign === 'middle') {
                arrowPosition = ((overlay.bottom - overlay.top) / 2) - ((this.arrow.height) / 2);
            } else if(position.arrowAlign === 'start') {
                arrowPosition = 0;
            } else if(position.arrowAlign === 'end') {
                arrowPosition = overlay.bottom - overlay.top - (this.arrow.height);
            }

            let min = Math.max(0, reference.top - overlay.top),
                max = Math.min(overlay.bottom - overlay.top, reference.bottom - overlay.top) - (this.arrow.height);

            style.top = Math.round(clamp(arrowPosition, min, max));
        }

        this.arrowElement.dataset.direction = position.point;
        this.arrowElement.style.left = style.left !== null ? `${style.left}px` : '';
        this.arrowElement.style.right = style.right !== null ? `${style.right}px` : '';
        this.arrowElement.style.top = style.top !== null ? `${style.top}px` : '';
        this.arrowElement.style.bottom = style.bottom !== null ? `${style.bottom}px` : '';
    }

    _applyPosition(position, referenceElementRect, overlayElementRect, containerRect, applyMinPos=false) {
        let reference = getSubBoundingBox(referenceElementRect, position.of), // Bounding of of the object we are being position relative to.
            collisionBox = this._getCollisionBox(position, overlayElementRect), // Collision box of the overlay element.
            anchor = getSubBoundingBox(collisionBox, position.my).toPoint();

        let offset = new Vec2(-(anchor.left - collisionBox.left), -(anchor.top - collisionBox.top)),
            containerSpace = containerRect;

        let arrowPadding = null;

        if(this.arrow) {
            if(position.point === 'down' || position.point === 'up') {
                arrowPadding = new Vec4(this.arrow.width, 0, -this.arrow.width, 0);
            } else if(position.point === 'left' || position.point === 'right') {
                arrowPadding = new Vec4(0, this.arrow.height, 0, -this.arrow.height);
            }
        }

        let space = _calculatePositionSpace(position, collisionBox, null, reference, offset);

        if(space && arrowPadding) {
            space = space.add(arrowPadding);
        }

        containerSpace = containerSpace.add(new Vec4(
            -offset.left,
            -offset.top,
            -(collisionBox.right - collisionBox.left) - offset.left,
            -(collisionBox.bottom - collisionBox.top) - offset.top
        ));

        if(!applyMinPos) {
            let unboundedSpace = space;

            space = space.intersection(containerSpace);

            if (space && space.getArea() >= 0) {
                let pos = getSubBoundingBox(reference, position.at).toPoint();
                pos = pos.clamp(space);
                pos = pos.add(offset);
                pos = pos.add(new Vec2(collisionBox.paddingLeft, collisionBox.paddingTop));
                let overlay = overlayElementRect.moveTo(pos);

                this._positionArrow(position, overlay, reference);
                setElementClientPosition(this.element, overlay, 'translate3d');
                return -1;
            }

            return getDistanceBetweenRects(unboundedSpace, containerSpace);
        } else {
            space = _clampToMinimumDistance(space, offset, reference, containerSpace);
            let pos = getSubBoundingBox(reference, position.at).toPoint();
            pos = pos.clamp(space);
            pos = pos.add(offset);
            pos = pos.add(new Vec2(collisionBox.paddingLeft, collisionBox.paddingTop));
            let overlay = overlayElementRect.moveTo(pos);

            this._positionArrow(position, overlay, reference);
            setElementClientPosition(this.element, overlay, 'translate3d');
            return -2;
        }
    }
}


/**
 * Takes a Vec4 of potential percentage strings and calculates those percentages as fractions of the width and height
 * of the element bounding box.
 *
 * @param padding {Vec4}
 * @param elementBB {Vec4}
 * @returns {Vec4}
 * @private
 */
function _calculateVec4WithPercentages(padding, elementBB) {
    let width = elementBB.right - elementBB.left,
        height = elementBB.bottom - elementBB.top,
        r = new Vec4(padding.left || 0, padding.top || 0, padding.right || 0, padding.bottom || 0);

    if(typeof r.left === 'string') {
        r.left = ((parseFloat(r.left) / 100) * width);
    }

    if(typeof r.right === 'string') {
        r.right = ((parseFloat(r.right) / 100) * width);
    }

    if(typeof r.top === 'string') {
        r.top = ((parseFloat(r.top) / 100) * height);
    }

    if(typeof r.bottom === 'string') {
        r.bottom = ((parseFloat(r.bottom) / 100) * height);
    }

    return r;
}


function _calculatePositionSpace(position, overlay, container, reference, offset) {
    let padding = position.padding;

    // Adds extra spacing for the overlay to move around in.
    if(padding) {
        padding = _calculateVec4WithPercentages(padding, overlay);
    } else {
        padding = new Vec4(0, 0, 0, 0);
    }

    let space = reference.add(new Vec4(
        -padding.left,
        -padding.top,
        padding.right,
        padding.bottom
    ));

    if(container) {
        space = space.translate(offset).intersection(container);

        // If limit is null at this point no valid space is available.
        if(!space) return null;

        space = space.translate(offset.multiply(-1));
    }

    return space;
}


function _clampToMinimumDistance(space, offset, reference, container) {
    space = space.clone();

    if(container.top - offset.y >= reference.bottom) {
        space.top = space.bottom;
    } else if(container.bottom <= reference.top) {
        space.bottom = space.top;
    }

    if((container.left - offset.x) >= reference.right) {
        space.left = space.right;
    } else if(container.right <= reference.left) {
        space.right = space.left;
    }

    return space;
}