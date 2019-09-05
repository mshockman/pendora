import {clamp} from 'core/utility';
import {getPointOnElement, setElementClientPosition} from 'core/position';
import {Vec4} from "core/vectors";


export default class Overlay {
    constructor(element, reference, {positions=null, container=null, arrow=null, margins=null}={}) {
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
    }

    getAllowedLine(direction, float, rect, reference) {
        let left = 0, top = 0, right = 0, bottom = 0;

        float = float || 'middle';

        if(direction === 'top') {
            left = reference.left;
            top = reference.top - (rect.bottom - rect.top);
            right = reference.right;

            if(float === 'end') {
                right += (rect.right - rect.left);
            } else if(float === 'string') {
                left -= (rect.right - rect.left);
            } else {
                right += (rect.right - rect.left);
                left -= (rect.right - rect.left);
            }

            if(this.margins && this.margins.top) {
                top -= this.margins.top;
            }

            bottom = top;
        } else if(direction === 'bottom') {
            left = reference.left;
            top = reference.bottom;
            right = reference.right;

            if(float === 'end') {
                right += (rect.right - rect.left);
            } else if(float === 'start') {
                left -= (rect.right - rect.left);
            } else {
                right += (rect.right - rect.left);
                left -= (rect.right - rect.left);
            }

            if(this.margins && this.margins.top) {
                top += this.margins.top;
            }

            bottom = top;
        } else if(direction === 'left') {
            left = reference.left - (rect.right - rect.left);
            top = reference.top;
            bottom = reference.bottom;

            if(float === 'start') {
                bottom += (rect.bottom - rect.top);
            } else if(float === 'end') {
                top -= (rect.bottom - rect.top);
            } else {
                bottom += (rect.bottom - rect.top);
                top -= (rect.bottom - rect.top);
            }

            if(this.margins && this.margins.left) {
                left -= this.margins.left;
            }

            right = left;
        } else {
            left = reference.right;
            top = reference.top;
            bottom = reference.bottom;

            if(float === 'start') {
                bottom += (rect.bottom - rect.top);
            } else if(float === 'end') {
                top -= (rect.bottom - rect.top);
            } else {
                bottom += (rect.bottom - rect.top);
                top -= (rect.bottom - rect.top);
            }

            if(this.margins && this.margins.left) {
                left += this.margins.left;
            }

            right = left;
        }

        return new Vec4(left, top, right, bottom);
    }

    getPointInSpace(space, direction, float, rect) {
        let left, top;

        if(direction === 'top' || direction === 'bottom') {
            top = space.top;

            if(float === 'start') {
                left = space.right;
            } else if(float === 'end') {
                left = space.left;
            } else {
                left = space.left + ((space.right - space.left) /2) - ((rect.right - rect.left) / 2);
            }
        } else {
            left = space.left;

            if(float === 'start') {
                top = space.top;
            } else if(float === 'end') {
                top = space.bottom;
            } else {
                top = space.top + ((space.bottom - space.top) / 2) - ((rect.bottom - rect.top) / 2);
            }
        }

        return {left, top};
    }

    refresh() {
        /**
         * @type {null|Vec4}
         */
        let container = null,
            rect = this.element.getBoundingClientRect(),
            reference = this.referenceObject.getBoundingClientRect();

            if(this.container) {
            if(typeof this.container === 'string') {
                container = Vec4.fromRect(document.querySelector(this.container).getBoundingClientRect());
            } else if(typeof this.container === 'function') {
                container = Vec4.fromRect(this.container.call(this, this.element));
            } else {
                container = Vec4.fromRect(this.container.getBoundingClientRect());
            }
        }

        for(let position of this.positions) {
            position = position.split('-');
            let direction = position[0],
                float = position[1] || 'middle';

            let space = this.getAllowedLine(direction, float, rect, reference),
                allowedSpace = space;

            if(container) {
                allowedSpace = container.intersection(space);
            }

            if(!allowedSpace) {
                continue;
            }

            let point = this.getPointInSpace(space, direction, float, rect);

            point.left = clamp(point.left, allowedSpace.left, allowedSpace.right);
            point.top = clamp(point.top, allowedSpace.top, allowedSpace.bottom);

            // console.dir(allowedSpace);
            // let d = document.createElement('div');
            // d.style.position = 'absolute';
            // d.style.border = '1px solid #000';
            // d.style.zIndex = '2';
            // d.dataset.direction = direction;
            // d.dataset.float = float;
            //
            // if(direction === 'top' || direction === 'bottom') {
            //     d.style.height = '1px';
            //     d.style.width = `${allowedSpace.right - allowedSpace.left}px`;
            // } else {
            //     d.style.height = `${allowedSpace.bottom - allowedSpace.top}px`;
            //     d.style.width = `1px`;
            // }
            //
            // this.element.parentElement.appendChild(d);
            // setElementClientPosition(d, allowedSpace, 'translate3d');

            window.requestAnimationFrame(() => {
                setElementClientPosition(this.element, point, 'translate3d');
            });
            break;
        }
    }
}