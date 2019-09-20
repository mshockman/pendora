import {setElementClientPosition, getSubBoundingBox, getDistanceBetweenRects} from 'core/position';
import {Vec4, Vec2} from "core/vectors";


const DIRECTIONS = {
    top: {my: 'bottom', at: 'top', of: 'border-top', arrow: 'bottom', direction: 'top', position: 'bottom-left'},
    right: {my: 'left', at: 'right', of: 'border-right', arrow: 'left', direction: 'right', position: 'top-left'},
    bottom: {my: 'top', at: 'bottom', of: 'border-bottom', arrow: 'top', direction: 'bottom', position: 'top-left'},
    left: {my: 'right', at: 'left', of: 'border-left', arrow: 'right', direction: 'left', position: 'top-right'}
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
     * @param magnetic
     */
    constructor(element, reference, {positions=null, container=null, arrow=null, sticky=false, magnetic=false}={}) {
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
        this.magnetic = magnetic;

        if(arrow) {
            let arrowElement = document.createElement('div');
            arrowElement.classList.add('arrow-element');
            this.element.appendChild(arrowElement);
        }

        this._currentIndex = 0;
    }

    refresh() {
        let rect = Vec4.fromRect(this.referenceObject.getBoundingClientRect()),
            elementBB = Vec4.fromRect(this.element.getBoundingClientRect()),
            container = this._getContainer(elementBB),
            arrowElement = this.element.querySelector('.arrow-element');

        let flag = false,
            closestPosition = null;

        if(!this.sticky) {
            this._currentIndex = 0;
        }

        for(let i = 0; i < this.positions.length; i++) {
            let index = (this._currentIndex + i) % this.positions.length;
            let position = this.positions[index];

            if(typeof position === 'string') {
                position = DIRECTIONS[position];
            }

            this.element.dataset.direction = position.direction;

            let overlay = Vec4.getBoundingClientRect(this.element),
                arrowBB = Vec4.getBoundingClientRect(arrowElement),
                anchorPoint = getSubBoundingBox(overlay, position.my).subtract(overlay).toPoint(),
                space = getSubBoundingBox(rect, position.of),
                unBoundedSubspace = this._getAllowedSubspace(position, space, rect, arrowElement, overlay, anchorPoint, arrowBB),
                subspace = unBoundedSubspace;

            if(container) {
                // Pad container to account for anchor point offset.
                let paddedContainer = container.add(new Vec4(
                    anchorPoint.x,
                    anchorPoint.y,
                    -(overlay.width) + anchorPoint.x,
                    -(overlay.height) + anchorPoint.y
                ));

                subspace = subspace.intersection(paddedContainer);
            }

            if(!subspace) {
                let anchorSpacePadding = this._getAnchorSpacePadding(position, overlay, arrowBB, anchorPoint);

                let paddedSpace = unBoundedSubspace.subtract(anchorSpacePadding);

                if(this.magnetic instanceof Vec4) {
                    paddedSpace = paddedSpace.addMargins(this.magnetic);
                }

                let delta = getDistanceBetweenRects(container, paddedSpace);

                if(closestPosition === null || closestPosition.distance > delta) {
                    closestPosition = {
                        distance: delta,
                        space: space,
                        subspace: unBoundedSubspace,
                        position: position,
                        overlay: overlay,
                        anchorPoint: anchorPoint,
                        arrowElement: arrowElement,
                        arrowBB: arrowBB,
                        rect: rect,
                        container: container
                    };
                }

                continue;
            }

            let pos = this._getDefaultPosition(position, rect);

            pos = pos.clamp(subspace);

            pos = pos.subtract(anchorPoint);
            overlay = overlay.moveTo(pos);

            this._applyPosition(position, overlay, arrowElement, arrowBB, rect);
            flag = true;
            this._currentIndex = index;

            break;
        }

        if(!flag && closestPosition) {
            this.element.dataset.direction = closestPosition.position.direction;

            let overlay;

            if(this.magnetic === true) {
                let pos = this._getDefaultPosition(closestPosition.position, closestPosition.rect);

                pos = pos.clamp(container).clamp(closestPosition.subspace).subtract(closestPosition.anchorPoint);
                overlay = closestPosition.overlay.moveTo(pos);

                overlay = overlay.clamp(container);
            } else if(this.magnetic instanceof Vec4) {
                let pos = this._getDefaultPosition(closestPosition.position, closestPosition.rect);

                let paddedContainer = container.addMargins(this.magnetic);

                pos = pos.clamp(paddedContainer).clamp(closestPosition.subspace).subtract(closestPosition.anchorPoint);
                overlay = closestPosition.overlay.moveTo(pos);

                overlay = overlay.clamp(paddedContainer);
            } else {
                let pos = this._getDefaultPosition(closestPosition.position, closestPosition.rect);

                pos = pos.clamp(container).clamp(closestPosition.subspace).subtract(closestPosition.anchorPoint);
                overlay = closestPosition.overlay.moveTo(pos);
            }

            this._applyPosition(closestPosition.position, overlay, closestPosition.arrowElement, closestPosition.arrowBB, closestPosition.rect);
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

    _applyPosition(position, overlay, arrowElement, arrowBB, reference) {
        setElementClientPosition(this.element, overlay, position.position);

        let arrowPos = new Vec2(arrowBB.left, arrowBB.top),
            arrowSide = getArrowSide(position.arrow),
            arrowAlign = getArrowFloat(position.arrow);

        if(arrowSide === 'top' || arrowSide === 'bottom') {
            arrowPos.left = overlay.left;

            if(arrowAlign === 'middle') {
                arrowPos.left += (overlay.width / 2) - (arrowBB.width / 2);
            } else if(arrowAlign === 'end') {
                arrowPos.left += (overlay.width - arrowBB.width);
            }
        } else if(arrowSide === 'left' || arrowSide === 'right') {
            arrowPos.top = overlay.top;

            if(arrowAlign === 'middle') {
                arrowPos.top += (overlay.height / 2) - (arrowBB.height / 2);
            } else if(arrowAlign === 'end') {
                arrowPos.top += (overlay.height - arrowBB.height);
            }
        }

        arrowPos = arrowPos.clamp(reference.subtract(new Vec4(0, 0, arrowBB.width, arrowBB.height)));
        arrowPos = arrowPos.clamp(overlay.subtract(new Vec4(0, 0, arrowBB.width, arrowBB.height)));
        arrowPos = arrowPos.subtract(overlay);

        if(arrowSide === 'top' || arrowSide === 'bottom') {
            arrowElement.style.left = arrowPos.left + 'px';
            arrowElement.style.top = '';
        } else if(arrowSide === 'left' || arrowSide === 'right') {
            arrowElement.style.top = arrowPos.top + 'px';
            arrowElement.style.left = '';
        }
    }

    _getDefaultPosition(position, referenceElementRect) {
        let reference = getSubBoundingBox(referenceElementRect, position.of),
            pos = getSubBoundingBox(reference, position.at);

        return new Vec4(pos.left, pos.top, pos.left, pos.top);
    }

    _getAllowedSubspace(position, space, referenceBB, arrowElement, overlay, anchorPoint, arrowBB) {
        let arrowSpacePadding = this._getArrowSpacePadding(position, arrowBB),
            anchorSpacePadding = this._getAnchorSpacePadding(position, overlay, arrowBB, anchorPoint);

        return space.add(arrowSpacePadding).add(anchorSpacePadding);
    }

    _getAnchorSpacePadding(position, overlay, arrowBB, anchorPoint) {
        let anchorSpacePadding = new Vec4(0, 0, 0, 0);

        // Calculate container padding because of arrows and the offset of the overlays anchor point.
        if(position.of === 'border-top' || position.of === 'border-bottom') {
            anchorSpacePadding = new Vec4(
                -(overlay.width) + anchorPoint.x,
                0,
                anchorPoint.x,
                0
            );
        } else if(position.of === 'border-left' || position.of === 'border-right') {
            anchorSpacePadding = new Vec4(
                0,
                -(overlay.height) + anchorPoint.y,
                0,
                anchorPoint.y
            );
        }

        return anchorSpacePadding;
    }

    _getArrowSpacePadding(position, arrowBB) {
        let arrowSpacePadding = new Vec4(0, 0, 0, 0);

        if(arrowBB) {
            // Calculate container padding because of arrows and the offset of the overlays anchor point.
            if (position.of === 'border-top' || position.of === 'border-bottom') {
                arrowSpacePadding = new Vec4(arrowBB.width, 0, -arrowBB.width, 0);
            } else if (position.of === 'border-left' || position.of === 'border-right') {
                arrowSpacePadding = new Vec4(0, arrowBB.height, 0, -arrowBB.height);
            }
        }

        return arrowSpacePadding;
    }
}


function getArrowSide(align) {
    return align.split('-')[0];
}


function getArrowFloat(align) {
    let s = align.split('-');
    return s[1] || 'middle';
}
