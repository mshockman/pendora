import {clamp} from 'core/utility';


export default class Overlay {
    constructor(element, reference, {positions=null, container=null, arrow=null}={}) {
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
    }

    getAllowedRect() {
        let container = this.container,
            box = this.referenceObject.getBoundingClientRect();

        if(typeof container === 'string') {
            container = document.querySelector(container).getBoundingClientRect();
        } else if(typeof container === 'function') {
            container = container.call(this, this.element);
        }

        let left = box.left,
            top = box.top,
            right = box.right,
            bottom = box.bottom;

        if(container) {
            if(box.left > container.right || box.top > container.bottom || box.bottom < container.top || box.right < container.left) {
                return null;
            }

            left = clamp(left, container.left, container.right);
            top = clamp(top, container.top, container.bottom);
            right = clamp(right, container.left, container.right);
            bottom = clamp(bottom, container.top, container.bottom);
        }

        let width = right - left,
            height = bottom - top;

        return {
            left: left,
            right: right,
            bottom: bottom,
            top: top,
            width: width,
            height: height,
            x: left,
            y: top
        };
    }

    getAllowedLine(direction) {
        let container = this.getContainerBoundingClientRect() || {left: null, top: null, right: null, bottom: null};

        if(direction === 'top') {
            let referenceObject = this.getReferenceBoundingClientRect(),
                rect = this.element.getBoundingClientRect(),
                width = rect.right - rect.left,
                height = rect.bottom - rect.top,
                y = clamp(referenceObject.top, container.top, container.bottom),
                left = clamp(referenceObject.left - width, container.left, container.right),
                right = clamp(referenceObject.right + width, container.left, container.right);

            console.log(rect);
            console.log(referenceObject);
            console.log(container);

            if(!(right < container.left || left > container.right)) {
                // todo remove test
                let d = document.createElement('div');
                d.style.position = 'fixed';
                d.style.height = '1px';
                d.style.backgroundColor = '#000000';
                d.style.left = `${left}px`;
                d.style.width = `${right - left}px`;
                d.style.top = `${y}px`;
                document.body.appendChild(d);

                return {
                    left: left,
                    right: right,
                    top: y,
                    bottom: y
                };
            }
        }

        return null;
    }

    getReferenceBoundingClientRect() {
        if(typeof this.referenceObject === 'string') {
            return document.querySelector(this.referenceObject).getBoundingClientRect();
        } else {
            return this.referenceObject.getBoundingClientRect();
        }
    }

    getContainerBoundingClientRect() {
        if(this.container) {
            if(typeof this.container === 'string') {
                return document.querySelector(this.container).getBoundingClientRect();
            } else if(typeof this.container === 'function') {
                return this.container.call(this, this.element);
            } else {
                return this.container.getBoundingClientRect();
            }
        }

        return null;
    }

    appendTo(element) {
        if(element.appendChild) {
            element.appendChild(this.element);
        } else if(element.append) {
            element.append(this.element);
        } else if(typeof element === 'string') {
            document.querySelector(element).appendChild(this.element);
        }
    }

    getPosition() {
        for(let position of this.positions) {

        }
    }

    refresh() {
        let rect = this.getAllowedRect();
    }
}