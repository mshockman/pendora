import {setElementClientPosition, getSubBoundingBox} from 'core/position';
import {Vec4, Vec2} from "core/vectors";


const DIRECTIONS = {
    top: {my: 'bottom', at: 'top', of: 'border-top', padding: {left: '50%', right: '50%'}, point: 'down'},
    right: {my: 'left', at: 'right', of: 'border-right', padding: {top: '50%', bottom: '50%'}, point: 'left'},
    bottom: {my: 'top', at: 'bottom', of: 'border-bottom', padding: {left: '50%', right: '50%'}, point: 'up'},
    left: {my: 'right', at: 'left', of: 'border-left', padding: {top: '50%', bottom: '50%'}, point: 'right'},
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

        let flag = false;

        if(!this.sticky) {
            this._currentIndex = 0;
        }

        for(let i = 0; i < this.positions.length; i++) {
            let index = (this._currentIndex + i) % this.positions.length;
            let position = this.positions[index];

            if(typeof position === 'string') {
                position = DIRECTIONS[position];
            }

            if(this._applyPosition(position, rect, elementBB, container)) {
                this._currentIndex = index;
                flag = true;
                this._oob = false;
                break;
            }
        }

        if(!flag && !this._oob) {
            let position = this.positions[this._currentIndex];

            if(typeof position === 'string') {
                position = DIRECTIONS[position];
            }

            // this._applyPosition(position, rect, elementBB, container, true);
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

    _positionArrow(overlay, reference) {
        // _debug_draw_rect(overlay, 'overlay-rect', 'rgba(00, 00, 255, 0.5)', 100);
        // _debug_draw_rect(reference, 'reference-rect', 'rgba(00, 255, 00, 0.5)', 100);
    }

    _applyPosition(position, referenceElementRect, overlayElementRect, containerRect, applyMaxPos=false) {
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

        if(!applyMaxPos) {
            let space = _calculatePositionSpace(position, collisionBox, null, reference, offset);

            _debug_draw_rect(space, 'space', 'rgba(0, 0, 255, 1.0)', 10, 4, 4);

            if(space && arrowPadding) {
                space = space.add(arrowPadding);
                _debug_draw_rect(space, 'space-sub1', 'rgba(255, 0, 0, 1.0)', 10, 4, 4);
            }

            containerSpace = containerSpace.add(new Vec4(
                -offset.left,
                -offset.top,
                -(collisionBox.right - collisionBox.left) - offset.left,
                -(collisionBox.bottom - collisionBox.top) - offset.top
            ));

            space = space.intersection(containerSpace);

            if (space && space.getArea() >= 0) {
                _debug_draw_rect(space, 'space-sub2', 'rgba(0, 255, 0, 1.0)', 10, 4, 4);
                let pos = getSubBoundingBox(reference, position.at).toPoint();
                pos = pos.clamp(space);
                pos = pos.add(offset);
                pos = pos.add(new Vec2(collisionBox.paddingLeft, collisionBox.paddingTop));
                let overlay = overlayElementRect.moveTo(pos);

                this._positionArrow(overlay, reference);
                setElementClientPosition(this.element, overlay, 'translate3d');
                return true;
            }

            return false;
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