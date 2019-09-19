import {setElementClientPosition, getSubBoundingBox, getDistanceBetweenRects} from 'core/position';
import {Vec4, Vec2} from "core/vectors";
import {clamp} from "core/utility";


const DIRECTIONS = {
    top: {my: 'bottom', at: 'top', of: 'border-top', padding: {left: '50%', right: '50%'}, point: 'down', arrowAlign: 'middle'},
    right: {my: 'left', at: 'right', of: 'border-right', padding: {top: '50%', bottom: '50%'}, point: 'left', arrowAlign: 'middle'},
    bottom: {my: 'top', at: 'bottom', of: 'border-bottom', padding: {left: '50%', right: '50%'}, point: 'up', arrowAlign: 'middle'},
    left: {my: 'right', at: 'left', of: 'border-left', padding: {top: '50%', bottom: '50%'}, point: 'right', arrowAlign: 'middle'},
};


/**
 * #Overlay
 *
 * A class that positions an element relative to a another reference element.  This "Overlay" can be configured to
 * position itself within the specified bounds provided by the container parameter.  Container is responsible for
 * providing a DomRect like object that defines the containing rect in client space.  Container by be one of several
 * types.  First it can be a css selector string that will be used to find the containing element and call it's
 * getBoundingClientRect method.  Next, it can be a function that will be called with the parameters
 * function.call(overlayClass, overlayElement, overlayClass).  This function should return a DomRect like object.
 * Next, it can be any object with the getBoundingClientRect interface.  This can be an element or a custom object
 * as long as it has the method.  Finally, it can be a DomRect directly.  This probably should not be used as client
 * space will only be static if the page has now scrolling.  One of the other methods are better.
 *
 * ---
 *
 * #Positioning
 *
 * The position of the element is determined by the positions parameter.  "positions" accepts an array of positioning
 * objects with the following properties: {my, at, of, padding, point, arrowAlign} or one of the following strings
 * top, right, bottom or left.
 *
 * left - Overlay is positioned left of the reference with arrow pointing right.
 * right - Overlay is positioned right of the reference with arrow pointing left.
 * bottom - Overlay is positioned at the bottom of the reference with arrow pointing up.
 * top - Overlay is positioned at the top of the reference with arrow pointing down.
 *
 * ##my
 * <i>Determines the anchor point on the element we are positioning from.  Defaults to the top-left point.</i>
 *
 * <b>Options</b>
 * - top-left
 * - top
 * - top-right
 * - left
 * - middle
 * - right
 * - bottom-left
 * - bottom
 * - bottom-right
 *
 * Or it can be a Vec2 object the with offset x and y position of the anchor set relative to the top-left corner of the
 * element.
 *
 * ##at
 * <i>Similar to my, but determines the anchor on the reference element.</i>
 *
 * <b>Options</b>
 * - top-left
 * - top
 * - top-right
 * - left
 * - middle
 * - right
 * - bottom-left
 * - bottom
 * - bottom-right
 *
 * Or it can be a Vec2 object the with offset x and y position of the anchor set relative to the top-left corner of the
 * element.
 *
 * ##of
 * <i>Used to determine a subspace on the reference element.</i>
 *
 * <b>Options</b>
 * - border-top
 * - border-left
 * - border-right
 * - border-bottom
 *
 * ##padding
 * <i>Used to add additional space in pixels to the reference rect.</i>
 *
 * Percentage strings are calculated as a percent of the width and height of the overlay element.
 *
 * ##point
 * <i>Determines what direction the arrow is pointing if an arrow is available.</i>
 *
 * ##arrowAlign
 * <i>Determines the desired position of the arrow before being constrained by the position of the reference and overlay element.</i>
 *
 * <b>Options:</b>
 * - start
 * - middle
 * - end
 *
 * ---
 *
 * #arrow
 * <i>Determines the amount of spacing that is needed for the arrow.</i>
 *
 * Property should be set to an {width, height} object.  If null no arrow will be added.
 *
 * ---
 * #sticky
 * <i>If true, on refresh the element will determine it's position with the first valid position starting at the last available index.</i>
 *
 * For example if false, when determining the position, position object will be checked starting from the begging.
 *
 * ---
 * #Styling the arrow
 *
 * When styling the arrow of the overlay a div element will be created with the class "arrow-element".  The
 * data-direction attribute will be set to whatever direction the arrow is pointing.  Possible values for data-direction
 * are:
 *
 * - down
 * - left
 * - up
 * - right
 *
 * @class
 */
export default class Overlay {
    /**
     * @constructor
     * @param element
     * @param reference
     * @param positions
     * @param container
     * @param arrow
     * @param sticky
     * @param clampTop
     * @param clampBottom
     * @param clampLeft
     * @param clampRight
     * @param magnetic
     */
    constructor(element, reference, {positions=null, container=null, arrow=null, sticky=false, clampTop=false, clampBottom=false, clampLeft=false, clampRight=false, magnetic=false}={}) {
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
        this.sticky = sticky;
        this.arrow = arrow;
        this.arrowElement = null;
        this.clampTop = clampTop;
        this.clampBottom = clampBottom;
        this.clampLeft = clampLeft;
        this.clampRight = clampRight;
        this.magnetic = magnetic;

        this._insideContainer = false;

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
                break;
            } else {
                // Determine which space had the closest position.
                if(closestPositionDistance === null || (applied < closestPositionDistance)) {
                    closestPositionDistance = applied;
                    closestPosition = position;
                }
            }
        }

        if(!flag) {
            this._applyPosition(closestPosition, rect, elementBB, container, true);
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

    /**
     * Sets the position of the arrow.
     *
     * @param position
     * @param overlay
     * @param reference
     * @private
     */
    _positionArrow(position, overlay, reference) {
        if(!this.arrowElement || !this.arrow) return;
        let style = {left: null, right: null, top: null, bottom: null},
            arrowPosition = 0,
            paddingX = this.arrow.paddingX || 0,
            paddingY = this.arrow.paddingY || 0;

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

            style.left = clamp(Math.round(clamp(arrowPosition, min, max)), paddingX, overlay.width - paddingX - this.arrow.width);
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

            style.top = clamp(Math.round(clamp(arrowPosition, min, max)), paddingY, overlay.height - paddingY - this.arrow.height);
        }

        this.arrowElement.dataset.direction = position.point;
        this.arrowElement.style.left = style.left !== null ? `${style.left}px` : '';
        this.arrowElement.style.right = style.right !== null ? `${style.right}px` : '';
        this.arrowElement.style.top = style.top !== null ? `${style.top}px` : '';
        this.arrowElement.style.bottom = style.bottom !== null ? `${style.bottom}px` : '';
    }

    /**
     * Applies the position to the overlay element if it falls within the containing space.
     *
     * If it doesn't fall inside the containing space the distance in pixels outside of the containing space will be
     * returned.  If inside the space -1 will be returned.  If applyMinPos is true then the overlay will be positioned
     * at the closest possible position and -2 will be returned.
     *
     * @param position
     * @param referenceElementRect
     * @param overlayElementRect
     * @param containerRect
     * @param applyMinPos
     * @returns {Number|number}
     * @private
     */
    _applyPosition(position, referenceElementRect, overlayElementRect, containerRect, applyMinPos=false) {
        let reference = getSubBoundingBox(referenceElementRect, position.of), // Bounding of of the object we are being position relative to.
            collisionBox = this._getCollisionBox(position, overlayElementRect), // Collision box of the overlay element.
            anchor = getSubBoundingBox(collisionBox, position.my).toPoint(),
            method = 'top-left'; // The method to position by. See setElementClientPosition()

        let offset = new Vec2(-(anchor.left - collisionBox.left), -(anchor.top - collisionBox.top)),
            containerSpace = containerRect;

        let arrowPadding = new Vec4(0, 0, 0, 0);

        if(this.arrow) {
            let paddingX = this.arrow.paddingX || 0,
                paddingY = this.arrow.paddingY || 0;

            if(position.point === 'down' || position.point === 'up') {
                arrowPadding = new Vec4(this.arrow.width + paddingX, 0, -this.arrow.width - paddingX, 0);
            } else if(position.point === 'left' || position.point === 'right') {
                arrowPadding = new Vec4(0, this.arrow.height + paddingY, 0, -this.arrow.height - paddingY);
            }
        }

        if(position.my === 'left' || position.my === 'top-left' || position.my === 'middle' || position.my === 'top') {
            method = 'top-left';
        } else if(position.my === 'right' || position.my === 'top-right') {
            method = 'top-right';
        } else if(position.my === 'bottom-right') {
            method = 'bottom-right';
        } else if(position.my === 'bottom-left' || position.my === 'bottom') {
            method = 'bottom-left';
        }

        let space = _calculatePositionSpace(position, collisionBox, null, reference, offset);

        if(space) {
            space = space.add(arrowPadding);
        }

        // Pad so that the top left corner never goes outside the true space.
        containerSpace = containerSpace.add(new Vec4(
            -offset.left,
            -offset.top,
            -(collisionBox.right - collisionBox.left) - offset.left,
            -(collisionBox.bottom - collisionBox.top) - offset.top
        ));

        if(!applyMinPos) {
            let unboundedSpace = space;

            space = space.intersection(containerSpace);

            // Overlay within container.
            if (space && space.getArea() >= 0) {
                let pos = getSubBoundingBox(reference, position.at).toPoint();
                pos = pos.clamp(space);
                pos = pos.add(offset);
                pos = pos.add(new Vec2(collisionBox.paddingLeft, collisionBox.paddingTop));
                let overlay = overlayElementRect.moveTo(pos);

                this._positionArrow(position, overlay, reference);
                setElementClientPosition(this.element, overlay, method);
                this._insideContainer = true;
                return -1;
            }

            // Overlay not in container, return distance outside.
            return getDistanceBetweenRects(unboundedSpace, containerSpace);
        } else {
            space = _clampToMinimumDistance(space, offset, reference, containerSpace);
            let pos = getSubBoundingBox(reference, position.at).toPoint();
            pos = pos.clamp(space);
            pos = pos.add(offset);
            pos = pos.add(new Vec2(collisionBox.paddingLeft, collisionBox.paddingTop));
            let overlay = overlayElementRect.moveTo(pos);

            overlay = this._clampToContainer(position, overlay, containerRect);
            this._positionArrow(position, overlay, reference);

            this._insideContainer = containerRect.contains(overlay);

            setElementClientPosition(this.element, overlay, method);
            return -2;
        }
    }

    _clampToContainer(position, overlayRect, containerRect) {
        // if(!this._insideContainer && !this.magnetic) return overlayRect;

        let space = new Vec4(-Infinity, -Infinity, Infinity, Infinity);

        let arrowPadding = new Vec4(0, 0, 0, 0, 0);

        if(this.arrow) {
            if(position.point === 'down') {
                arrowPadding = new Vec4(0, 0, 0, -this.arrow.height);
            } else if(position.point === 'up') {
                arrowPadding = new Vec4(0, this.arrow.height, 0, 0);
            } else if(position.point === 'left') {
                arrowPadding = new Vec4(this.arrow.width, 0, 0, 0);
            } else if(position.point === 'right') {
                arrowPadding = new Vec4(0, 0, -this.arrow.width, 0);
            }
        }

        containerRect = containerRect.add(new Vec4(
            0, 0,
            -overlayRect.width,
            -overlayRect.height
        )).add(arrowPadding);

        let deltaLeft = overlayRect.left - containerRect.left,
            deltaRight = containerRect.right - overlayRect.left,
            deltaTop = overlayRect.top - containerRect.top,
            deltaBottom = containerRect.bottom - overlayRect.top;

        if(deltaLeft < 0 && (this.clampLeft === true || (typeof this.clampLeft === 'number' && Math.abs(deltaLeft) < this.clampLeft))) {
            space.left = containerRect.left;
        }

        if(deltaRight < 0 && (this.clampRight === true || (typeof this.clampRight === 'number' && Math.abs(deltaRight) < this.clampRight))) {
            space.right = containerRect.right;
        }

        if(deltaTop < 0 && (this.clampTop === true || (typeof this.clampTop === 'number' && Math.abs(deltaTop) < this.clampTop))) {
            space.top = containerRect.top;
        }

        if(deltaBottom < 0 && (this.clampBottom === true || (typeof this.clampBottom === 'number' && Math.abs(deltaBottom) < this.clampBottom))) {
            space.bottom = containerRect.bottom;
        }

        return overlayRect.clampXY(space);
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