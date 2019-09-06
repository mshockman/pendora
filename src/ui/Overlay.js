import {clamp} from 'core/utility';
import {getPointOnElement, setElementClientPosition, getSubBoundingBox} from 'core/position';
import {Vec4, Vec2} from "core/vectors";


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

    refresh() {
        let container;

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

        let rect = this.referenceObject.getBoundingClientRect();

        for(let position of this.positions) {
            let reference = getSubBoundingBox(rect, position.of),
                anchor = Vec2.fromVertex(getSubBoundingBox(this.element, position.my)),
                limit = reference;

            console.log(anchor);

            if(container) {
                limit = limit.intersection(container);
            }

            if(!limit) continue;

            let at = getSubBoundingBox(reference, position.at);

            at.left -= anchor.left;
            at.top -= anchor.top;

            at.left = clamp(at.left, limit.left, limit.right);
            at.top = clamp(at.top, limit.top, limit.bottom);

            window.requestAnimationFrame(() => {
                setElementClientPosition(this.element, at, 'translate3d');
            });
        }
    }
}