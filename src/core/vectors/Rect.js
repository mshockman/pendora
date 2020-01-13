import {ValueError} from "../errors";
import Vec2 from "./Vec2";
import Vec4 from "./Vec4";
import {clamp} from '../utility';
import {UnitError} from '../errors';


const regWhitespace = /\s+/,
    regPositionPart = /^([a-zA-Z]*)([+-]?\d*\.?\d*)([a-z%]*)$/; // Parses string like "left+10px" into ["left", "+10px"]


const positionShortHandValues = {
    top: 'center top',
    right: 'right middle',
    bottom: 'center bottom',
    left: 'left middle',
    topleft: 'left top',
    topright: 'right top',
    bottomleft: 'left bottom',
    bottomright: 'right bottom'
};


export default class Rect extends Vec4 {
    constructor(left, top, right, bottom, domElement=null) {
        if(typeof left === 'object' && left.getBoundingClientRect) {
            if(left.getBoundingClientRect) {
                domElement = left;
                let bb = domElement.getBoundingClientRect();
                left = bb.left;
                top = bb.top;
                right = bb.right;
                bottom = bb.bottom;
            } else {
                top = left.top;
                right = left.right;
                bottom = left.bottom;
                left = left.left;
            }
        }

        super(left, top, right, bottom);
        this.domElement = domElement;
    }

    bind(element) {
        return this._new(this.left, this.top, this.right, this.bottom, element);
    }

    _new(left, top, right, bottom, domElement=undefined) {
        return new this.constructor(left, top, right, bottom, domElement === undefined ? this.domElement : domElement);
    }

    toPoint() {
        return new Vec2(this[0], this[1]);
    }

    // noinspection JSUnusedGlobalSymbols
    getArea() {
        return this.width * this.height;
    }

    translate(x, y) {
        if(typeof x === 'object') {
            y = x.y;
            x = x.x;
        }

        return this._new(
            this[0] + x,
            this[1] + y,
            this[2] + x,
            this[3] + y
        );
    }

    addMargins({left, top, right, bottom}) {
        return this._new(
            this.left - left,
            this.top - top,
            this.right + right,
            this.bottom + bottom
        );
    }

    // noinspection JSUnusedGlobalSymbols
    addPadding({left, top, right, bottom}) {
        return this._new(
            this.left + left,
            this.top + top,
            this.right - right,
            this.bottom - bottom
        );
    }

    moveTo({left, top}) {
        let deltaX = left - this.left,
            deltaY = top - this.top;

        return this._new(
            this.left + deltaX,
            this.top + deltaY,
            this.right + deltaX,
            this.bottom + deltaY
        );
    }

    intersection({left, top, right, bottom}) {
        left = Math.max(this.left, left);
        right = Math.min(this.right, right);
        bottom = Math.min(this.bottom, bottom);
        top = Math.max(this.top, top);

        if(left > right || top > bottom) {
            return null;
        }

        return this._new(left, top, right, bottom);
    }

    contains(rect) {
        return this.left <= rect.left && this.right >= rect.right && this.top <= rect.top && this.bottom >= rect.bottom;
    }

    containsX(rect) {
        return this.left <= rect.left && this.right >= rect.right;
    }

    containsY(rect) {
        return this.top <= rect.top && this.bottom >= rect.bottom;
    }

    isXOverlapping(rect) {
        return (rect.left <= this.right && rect.right >= this.left);
    }

    isYOverlapping(rect) {
        return (rect.top <= this.bottom && rect.bottom >= this.top);
    }

    // noinspection JSUnusedGlobalSymbols
    clampXY(rect) {
        let width = this.right - this.left,
            height = this.bottom - this.top,
            left = clamp(this.left, rect.left, rect.right),
            top = clamp(this.top, rect.top, rect.bottom);

        return this._new(left, top, left + width, top + height);
    }

    clamp(rect, anchor=null) {
        rect = rect.subtract(new Rect(0, 0, this.width, this.height));

        anchor = anchor ? this.getAnchor(anchor) : new Vec2(0, 0);

        let width = this.width,
            height = this.height,
            left = clamp(this.left + anchor.left, rect.left, rect.right) - anchor.left,
            top = clamp(this.top + anchor.top, rect.top, rect.bottom) - anchor.top;

        return this._new(
            left,
            top,
            left + width,
            top + height
        );
    }

    clampX(rect, anchor=null) {
        rect = rect.subtract(new Rect(0, 0, this.width, this.height));

        anchor = anchor ? this.getAnchor(anchor) : new Vec2(0, 0);

        let width = this.width,
            height = this.height,
            left = clamp(this.left + anchor.left, rect.left, rect.right) - anchor.left,
            top = this.top;

        return this._new(
            left,
            top,
            left + width,
            top + height
        );
    }

    clampY(rect, anchor=null) {
        rect = rect.subtract(new Rect(0, 0, this.width, this.height));

        anchor = anchor ? this.getAnchor(anchor) : new Vec2(0, 0);

        let width = this.width,
            height = this.height,
            left = this.left,
            top = clamp(this.top + anchor.top, rect.top, rect.bottom) - anchor.top;

        return this._new(
            left,
            top,
            left + width,
            top + height
        );
    }

    fit(container) {
        container = new Rect(container);
        let start = container;

        container = container.add(new Rect(
            this.width,
            this.height,
            -this.width,
            -this.height
        ));

        container.left = clamp(container.left, start.left, start.right);
        container.right = clamp(container.left, start.left, start.right);
        container.top = clamp(container.top, start.top, start.bottom);
        container.bottom = clamp(container.bottom, start.top, start.bottom);

        return this.clamp(container);
    }

    fitX(container) {
        container = new Rect(container);
        let start = container;

        container = container.add(new Rect(
            this.width,
            this.height,
            -this.width,
            -this.height
        ));

        container.left = clamp(container.left, start.left, start.right);
        container.right = clamp(container.left, start.left, start.right);
        container.top = clamp(container.top, start.top, start.bottom);
        container.bottom = clamp(container.bottom, start.top, start.bottom);

        return this.clampX(container);
    }

    fitY(container) {
        container = new Rect(container);
        let start = container;

        container = container.add(new Rect(
            this.width,
            this.height,
            -this.width,
            -this.height
        ));

        container.left = clamp(container.left, start.left, start.right);
        container.right = clamp(container.left, start.left, start.right);
        container.top = clamp(container.top, start.top, start.bottom);
        container.bottom = clamp(container.bottom, start.top, start.bottom);

        return this.clampY(container);
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Returns the distance between two rects.
     * @param rect
     * @returns {number}
     */
    getDistanceBetween(rect) {
        rect = Rect.fromRect(rect);

        let isXOverlapping = this.isXOverlapping(rect),
            isYOverlapping = this.isYOverlapping(rect);

        if(isXOverlapping && isYOverlapping) {
            // Items are overlapping
            return 0;
        } else if(isXOverlapping) {
            return Math.min(
                Math.abs(this.bottom - rect.top),
                Math.abs(this.top - rect.bottom)
            );
        } else if(isYOverlapping) {
            return Math.min(
                Math.abs(this.right - rect.left),
                Math.abs(this.left - rect.right)
            );
        } else {
            let x1, y1, x2, y2;

            if(this.right <= rect.left) {
                x1 = this.right;
                x2 = rect.left;
            } else {
                x1 = this.left;
                x2 = rect.right;
            }

            if(this.bottom <= rect.top) {
                y1 = this.bottom;
                y2 = rect.top;
            } else {
                y1 = this.top;
                y2 = rect.bottom;
            }

            // Use distance formula to calculate distance.
            return Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
        }
    }

    position({my, at, of, inside=null, collision=null}) {
        if(of.getBoundingClientRect) {
            of = new Rect(of);
        }

        if(inside && inside.getBoundingClientRect) {
            inside = new Rect(inside);
        }

        // collision can be string with a space separating the x and y values.
        // for example "fit flipfit"
        // normalize it to an {x, y} object.
        if(collision && typeof collision === 'string') {
            let parts = collision.trim().split(regWhitespace);
            collision = {
                x: parts[0],
                y: parts[1]
            };
        }

        let anchor = this.evaluatePositionString(my),
            reference = of.evaluatePositionString(at),
            deltaX = reference.x - anchor.x,
            deltaY = reference.y - anchor.y;

        let rect = this.translate(deltaX, deltaY);

        if(!collision || !inside || inside.contains(rect)) {
            return rect;
        }

        let flip = false,
            collisionX = 'none',
            collisionY = 'none';

        if(!inside.containsX(rect)) {
            if(collision.x === 'flip' || collision.x === 'flipfit') {
                let center = this.left + (this.width / 2);
                anchor.x = ((anchor.x - center) * -1) + center;

                center = of.left + (of.width / 2);
                reference.x = ((reference.x - center)*-1) + center;
                flip = true;
                collisionX = 'flip';
            }
        }

        if(!inside.containsY(rect)) {
            if(collision.y === 'flip' || collision.y === 'flipfit') {
                let middle = this.top + (this.height / 2);
                anchor.y = ((anchor.y - middle)*-1) + middle;

                middle = of.top + (of.height / 2);
                reference.y = ((reference.y - middle)*-1) + middle;
                flip = true;
                collisionY = 'flip';
            }
        }

        if(flip) {
            deltaX = reference.x - anchor.x;
            deltaY = reference.y - anchor.y;
            rect = this.translate(deltaX, deltaY);

            if(inside.contains(rect)) {
                rect.collsionX = collisionX;
                rect.collsionY = collisionY;
                return rect;
            }
        }

        if(collision.x === 'fit' || collision.x === 'flipfit') {
            rect = rect.clampX(inside);
            collisionX = collisionX === 'flip' ? 'flipfit': 'fit';
        }

        if(collision.y === 'fit' || collision.y === 'flipfit') {
            rect = rect.clampY(inside);
            collisionY = collisionY === 'flip' ? 'flipfit': 'fit';
        }

        rect.collsionX = collisionX;
        rect.collsionY = collisionY;
        return rect;
    }

    evaluatePositionString(string) {
        if(positionShortHandValues[string]) {
            string = positionShortHandValues[string];
        }

        let pos = string.trim().split(regWhitespace),
            x = pos[0],
            y = pos[1],
            rx = null,
            ry = null;

        if(x) {
            rx = this._evaluatePositionStringComponent(x, 'x');
        }

        if(y) {
            ry = this._evaluatePositionStringComponent(y, 'y');
        }

        return new Vec2(rx, ry);
    }

    /**
     * Gets the anchor position relative to the element.  The anchor can be any of the following:
     *
     * A position string.
     * A [x, y, offsetX=0, offsetY=0] array.
     * An object of {left, top, offsetX=0, offsetY=0} properties.
     *
     * @param anchor
     * @returns {Vec2}
     */
    getAnchor(anchor) {
        if(positionShortHandValues[anchor]) {
            anchor = positionShortHandValues[anchor];
        }

        let x, y, offsetX = 0, offsetY = 0;

        if(typeof anchor === 'string') {
            [x, y] = anchor.trim().split(regWhitespace);
        } else if(Array.isArray(anchor)) {
            [x, y, offsetX=0, offsetY=0] = anchor;
        } else {
            x = anchor.left;
            y = anchor.top;
            offsetX = anchor.offsetX || 0;
            offsetY = anchor.offsetY || 0;
        }

        if(typeof x === 'string') {
            x = this._evaluatePositionStringComponent(x, 'x');
        }

        if(typeof y === 'string') {
            y = this._evaluatePositionStringComponent(y, 'y');
        }

        return new Vec2(x + offsetX, y + offsetY);
    }

    /**
     * Evaluates a position string value such as "left+10px" into it final position on the rect.
     * @param value - The value to evaluate.
     * @param direction - The direction type.  Should be either "x" or "y".
     * @returns {number}
     * @private
     */
    _evaluatePositionStringComponent(value, direction) {
        let parts = regPositionPart.exec(value),
            r = 0;

        if(parts[1]) {
            let p = parts[1];

            if(direction === 'x') {
                if(p === 'left') {
                    r = this.left;
                } else if(p === 'center' || p === 'middle') {
                    r = this.left + (this.width / 2);
                } else if(p === 'right') {
                    r = this.left + this.width;
                } else {
                    throw new ValueError(`Invalid Option: ${p}`);
                }
            } else {
                if(p === 'top') {
                    r = this.top;
                } else if(p === 'middle' || p === 'center') {
                    r = this.top + (this.height / 2);
                } else if(p === 'bottom') {
                    r = this.top + this.height;
                } else {
                    throw new ValueError(`Invalid Option: ${p}`);
                }
            }
        } else if(direction === 'x') {
            r = this.left;
        } else {
            r = this.top;
        }

        if(parts[2]) {
            let value = parseFloat(parts[2]),
                type = parts[3] || 'px';

            if(type === 'px') {
                r += value;
            } else if(type === '%') {
                if(direction === 'x') {
                    r += (value / 100) * this.width;
                } else {
                    r += (value / 100) * this.height;
                }
            } else {
                throw new UnitError("Invalid unit: Must be either % or px.");
            }
        }

        return r;
    }

    static fromRect({left, top, right, bottom}) {
        return new Rect(left, top, right, bottom);
    }

    static getBoundingClientRect(element) {
        return new Rect(element);
    }

    get left() {
        return this[0];
    }

    get top() {
        return this[1];
    }

    get right() {
        return this[2];
    }

    get bottom() {
        return this[3];
    }

    set left(value) {
        this[0] = value;
    }

    set top(value) {
        this[1] = value;
    }

    set right(value) {
        this[2] = value;
    }

    set bottom(value) {
        this[3] = value;
    }

    get width() {
        return this.right - this.left;
    }

    get height() {
        return this.bottom - this.top;
    }

    set width(value) {
        this.right = this.left + value;
    }

    set height(value) {
        this.bottom = this.top + value;
    }

    get x() {
        return this.left;
    }

    get y() {
        return this.top;
    }

    set x(value) {
        this.left = value;
    }

    set y(value) {
        this.top = value;
    }
}
