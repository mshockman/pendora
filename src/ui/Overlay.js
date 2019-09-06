import {clamp} from 'core/utility';
import {getPointOnElement, setElementClientPosition, getSubBoundingBox} from 'core/position';
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
        let container;

        let rect = this.referenceObject.getBoundingClientRect(),
            elementBB = this.element.getBoundingClientRect();

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

            let pos = this._calculatePosition(position, rect, elementBB, container);

            if(pos) {
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
                anchor = Vec2.fromVertex(getSubBoundingBox(elementBB, position.my)),
                padding = position.padding;

            let offset = new Vec2(-(anchor.left - elementBB.left), -(anchor.top - elementBB.top));

            // Adds extra spacing for the overlay to move around in.
            if(padding) {
                padding = this._calculateVec4WithPercentages(padding, elementBB);
            } else {
                padding = new Vec4(0, 0, 0, 0);
            }

            let at = getSubBoundingBox(reference, position.at).toPoint();

            let space = reference.add(new Vec4(
                -padding.left,
                -padding.top,
                padding.right,
                padding.bottom
            ));

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

            setElementClientPosition(this.element, at.clamp(space).add(offset), 'translate3d');
            this._oob = true;
        }
    }

    _calculateVec4WithPercentages(padding, elementBB) {
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

    _calculatePosition(position, rect, elementBB, container) {
        if(typeof position === 'string') {
            position = DIRECTIONS[position];
        }

        let reference = getSubBoundingBox(rect, position.of),
            anchor = Vec2.fromVertex(getSubBoundingBox(elementBB, position.my)),
            limit = reference,
            padding = position.padding;

        let offset = new Vec2(-(anchor.left - elementBB.left), -(anchor.top - elementBB.top));

        // Adds extra spacing for the overlay to move around in.
        if(padding) {
            padding = this._calculateVec4WithPercentages(padding, elementBB);
        } else {
            padding = new Vec4(0, 0, 0, 0);
        }

        limit = limit.add(new Vec4(
            -padding.left,
            -padding.top,
            padding.right,
            padding.bottom
        ));

        if(container) {
            limit = limit.translate(offset).intersection(container);

            // If limit is null at this point no valid space is available.
            if(!limit) return null;

            limit = limit.translate(offset.multiply(-1));
        }

        let at = getSubBoundingBox(reference, position.at).toPoint();
        at = at.clamp(limit).add(offset);

        return at;
    }
}