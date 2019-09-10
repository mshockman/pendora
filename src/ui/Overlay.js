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
function _debug_draw_rect(rect, id, color='#000000', zIndex=-10) {
    let e;

    if(_dr[id]) {
        e = _dr[id];
    } else {
        e = document.createElement('div');
        e.id = id;
        _dr[id] = e;
        e.classList.add('debug-rect');
    }

    let width = rect.right - rect.left,
        height = rect.bottom - rect.top;

    e.style.position = 'fixed';
    e.style.zIndex = '' + zIndex;
    e.style.backgroundColor = color;
    e.style.left = `${rect.left}px`;
    e.style.top = `${rect.top}px`;
    e.style.width = `${width}px`;
    e.style.height = `${height}px`;

    if(!e.parentElement) {
        document.body.appendChild(e);
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

            let reference = getSubBoundingBox(rect, position.of),
                collisionBox = this._getCollisionBox(position, elementBB),
                anchor = getSubBoundingBox(collisionBox, position.my),
                offset = new Vec2(-(anchor.left - collisionBox.left), -(anchor.top - collisionBox.top)),
                containerSpace = container;

            if(containerSpace) {
                containerSpace = containerSpace.subtract(new Vec4(
                    0,
                    0,
                    collisionBox.right - collisionBox.left,
                    collisionBox.bottom - collisionBox.top
                ));
            }

            let space = _calculatePositionSpace(position, collisionBox, containerSpace, reference, offset);

            if(space) {
                let pos = getSubBoundingBox(reference, position.at).toPoint();
                pos = pos.clamp(space).add(offset);
                pos = pos.add(new Vec2(collisionBox.paddingLeft, collisionBox.paddingTop));
                let overlay = elementBB.moveTo(pos);

                this._positionArrow(overlay, reference);
                setElementClientPosition(this.element, overlay, 'translate3d');
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

            let reference = getSubBoundingBox(rect, position.of),
                collisionBox = this._getCollisionBox(position, elementBB),
                anchor = getSubBoundingBox(collisionBox, position.my),
                offset = new Vec2(-(anchor.left - collisionBox.left), -(anchor.top - collisionBox.top));

            let space = _calculatePositionSpace(position, collisionBox, null, reference, offset);

            if(this.arrow) {
                // Create space for the arrow.
                space.left += this.arrow.width;
                space.right -= this.arrow.width;
                space.top += this.arrow.height;
                space.bottom -= this.arrow.height;

                if((space.right - space.left) < 0) {
                    let amount = (space.right - space.left) / 2;
                    space.left -= amount;
                    space.right -= amount;
                }

                if((space.bottom - space.top) < 0) {
                    let amount = (space.bottom - space.top) / 2;
                    space.top += amount;
                    space.bottom -= amount;
                }
            }

            space = _clampToMinimumDistance(space, offset, reference, container);

            let pos = getSubBoundingBox(reference, position.at).toPoint();
            pos = pos.clamp(space).add(offset).add(new Vec2(collisionBox.paddingLeft, collisionBox.paddingTop));

            let overlay = elementBB.moveTo(pos);

            setElementClientPosition(this.element, overlay, 'translate3d');
            this._positionArrow(overlay, reference);
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
        _debug_draw_rect(overlay, 'overlay-rect', 'rgba(00, 00, 255, 0.5)', 100);
        _debug_draw_rect(reference, 'reference-rect', 'rgba(00, 255, 00, 0.5)', 100);
    }
}


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