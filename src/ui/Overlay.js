import {setElementClientPosition, getSubBoundingBox} from 'core/position';
import {Vec4, Vec2} from "core/vectors";


const DIRECTIONS = {
    top: {my: 'bottom', at: 'top', of: 'border-top', padding: {left: '50%', right: '50%'}},
    right: {my: 'left', at: 'right', of: 'border-right', padding: {top: '50%', bottom: '50%'}},
    bottom: {my: 'top', at: 'bottom', of: 'border-bottom', padding: {left: '50%', right: '50%'}},
    left: {my: 'right', at: 'left', of: 'border-left', padding: {top: '50%', bottom: '50%'}},
};


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
                anchor = getSubBoundingBox(elementBB, position.my),
                offset = new Vec2(-(anchor.left - elementBB.left), -(anchor.top - elementBB.top)),
                space = _calculatePositionSpace(position, elementBB, container, reference, offset);

            if(space) {
                let pos = getSubBoundingBox(reference, position.at).toPoint();
                pos = pos.clamp(space).add(offset);
                setElementClientPosition(this.element, pos, 'translate3d');
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
                anchor = getSubBoundingBox(elementBB, position.my),
                offset = new Vec2(-(anchor.left - elementBB.left), -(anchor.top - elementBB.top)),
                space = _calculatePositionSpace(position, elementBB, null, reference, offset);

            if(container.top >= reference.bottom) {
                space.top = space.bottom;
            } else if(container.bottom <= reference.top) {
                space.bottom = space.top;
            }

            if(container.left >= reference.right) {
                space.left = space.right;
            } else if(container.right <= reference.left) {
                space.right = space.left;
            }

            let pos = getSubBoundingBox(reference, position.at).toPoint();
            setElementClientPosition(this.element, pos.clamp(space).add(offset), 'translate3d');
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

            container.right -= (elementBB.right - elementBB.left);
            container.bottom -= (elementBB.bottom - elementBB.top);
        }

        return container;
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
