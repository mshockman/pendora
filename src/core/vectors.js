import {clamp, hsvToRGB, rgbToHsv} from './utility';
import {ExtendableError, ValueError} from "./errors";


const regWhitespace = /\s+/,
    regPositionPart = /^([a-zA-Z]*)([+-]?\d*\.?\d*)([a-z%]*)$/, // Parses string like "left+10px" into ["left", "+10px"]
    regTypedNumber = /^([+-]?\d+\.?\d*)([a-z%]*)$/, // parses strings like "+10px" into ["+10", "px"].  AKA, parses the unit out of a number string.
    hexString = /^#?([a-f0-9]{3})$|^#?([a-f0-9]{6})$|^#?([a-f0-9]{8})$/i,
    regRGBA = /^rgba\((.+?)\)$/;


export class UnitError extends ExtendableError {

}


const positionShortHandValues = {
    top: 'center top',
    right: 'right middle',
    bottom: 'center bottom',
    left: 'left middle'
};


/**
 * @abstract
 */
export class AbstractVector {
    constructor(size) {
        this.size = size;

        for(let i = 0; i < size; i++) {
            this[i] = 0;
        }
    }

    _new(...args) {
        return new this.constructor(...args);
    }

    clone() {
        let r = this._new();

        for(let i = 0; i < this.size; i++) {
            r[i] = this[i];
        }

        return r;
    }

    add(vectorOrNumber) {
        let r = this._new();

        if(typeof vectorOrNumber === 'number') {
            for(let i = 0; i < this.size; i++) {
                r[i] = this[i] + vectorOrNumber;
            }
        } else {
            for(let i = 0; i < this.size; i++) {
                r[i] += this[i] + vectorOrNumber[i];
            }
        }

        return r;
    }

    subtract(vectorOrNumber) {
        let r = this._new();

        if(typeof vectorOrNumber === 'number') {
            for(let i = 0; i < this.size; i++) {
                r[i] = this[i] - vectorOrNumber;
            }
        } else {
            for(let i = 0; i < this.size; i++) {
                r[i] += this[i] - vectorOrNumber[i];
            }
        }

        return r;
    }

    scalar(number) {
        let r = this._new();

        for(let i = 0; i < this.size; i++) {
            r[i] = this[i] * number;
        }

        return r;
    }

    multiply(vectorOrNumber) {
        let r = this._new();

        if(typeof vectorOrNumber === 'number') {
            for(let i = 0; i < this.size; i++) {
                r[i] = this[i] * vectorOrNumber;
            }
        } else {
            for(let i = 0; i < this.size; i++) {
                r[i] += this[i] * vectorOrNumber[i];
            }
        }

        return r;
    }

    mod(vectorOrNumber) {
        let r = this._new();

        if(typeof vectorOrNumber === 'number') {
            for(let i = 0; i < this.size; i++) {
                r[i] = this[i] % vectorOrNumber;
            }
        } else {
            for(let i = 0; i < this.size; i++) {
                r[i] += this[i] % vectorOrNumber[i];
            }
        }

        return r;
    }

    divide(vectorOrNumber) {
        let r = this._new();

        if(typeof vectorOrNumber === 'number') {
            for(let i = 0; i < this.size; i++) {
                r[i] = this[i] / vectorOrNumber;
            }
        } else {
            for(let i = 0; i < this.size; i++) {
                r[i] += this[i] / vectorOrNumber[i];
            }
        }

        return r;
    }

    set(vectorOrNumber) {
        if(typeof vectorOrNumber === 'number') {
            for(let i = 0; i < this.size; i++) {
                this[i] = vectorOrNumber;
            }
        } else {
            for(let i = 0; i < this.size; i++) {
                this[i] = vectorOrNumber[i];
            }
        }

        return this;
    }

    equals(vector) {
        if(this.size !== vector.size) return false;

        for(let i = 0; i < this.size; i++) {
            if(this[i] !== vector[i]) {
                return false;
            }
        }

        return true;
    }
}


/**
 * Stores a 2 value Vector.
 */
export class Vec2 {
    constructor(x=0, y=0) {
        this[0] = x;
        this[1] = y;
    }

    add(vec2) {
        if(typeof vec2 === 'number') {
            return new Vec2(
                this[0] + vec2,
                this[1] + vec2
            );
        } else {
            return new Vec2(
                this[0] + vec2[0],
                this[1] + vec2[1]
            );
        }
    }

    subtract(vec2) {
        if(typeof vec2 === 'number') {
            return new Vec2(
                this[0] - vec2,
                this[1] - vec2
            );
        } else {
            return new Vec2(
                this[0] - vec2[0],
                this[1] - vec2[1]
            );
        }
    }

    scalar(value) {
        return new Vec2(this[0] * value, this[1] * value);
    }

    mod(vec2) {
        if(typeof vec2 === 'number') {
            return new Vec2(
                this[0] % vec2,
                this[1] % vec2
            );
        } else {
            return new Vec2(
                this[0] % vec2[0],
                this[1] % vec2[1]
            );
        }
    }

    equals(vec2) {
        return this === vec2 || (this[0] === vec2[0] && this[1] === vec2[1]);
    }

    set(value) {
        if(typeof value !== 'object') {
            this[0] = value;
            this[1] = value;
        } else {
            this[0] = value[0];
            this[1] = value[1];
        }
    }

    clone() {
        return Vec2(this[0], this[1]);
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    get left() {
        return this[0];
    }

    get top() {
        return this[1];
    }

    set x(value) {
        this[0] = value;
    }

    set y(value) {
        this[1] = value;
    }

    set left(value) {
        this[0] = value;
    }

    set top(value) {
        this[1] = value;
    }

    get width() {
        return this[0];
    }

    set width(value) {
        this[0] = value;
    }

    get height() {
        return this[1];
    }

    set height(value) {
        this[1] = value;
    }

    toTranslate() {
        return `translate(${this.x}px, ${this.y}px)`;
    }

    toTranslate3d() {
        return `translate3d(${this.x}px, ${this.y}px, 0)`;
    }

    clamp(vec4) {
        return new Vec2(
            clamp(this.left, vec4.left, vec4.right),
            clamp(this.top, vec4.top, vec4.bottom)
        );
    }

    static fromVertex(vertex) {
        if(Array.isArray(vertex)) {
            return new Vec2(vertex[0], vertex[1]);
        } else if(vertex.hasOwnProperty('left')) {
            return new Vec2(vertex.left, vertex.top);
        } else {
            return new Vec2(vertex.x, vertex.y);
        }
    }
}


/**
 * Stores a 3 value vector.
 */
export class Vec3 {
    constructor(x=0, y=0, z=0) {
        this[0] = x;
        this[1] = y;
        this[2] = z;
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    get z() {
        return this[2];
    }

    set x(value) {
        this[0] = value;
    }

    set y(value) {
        this[1] = value;
    }

    set z(value) {
        this[2] = value;
    }

    get r() {
        return this[0];
    }

    get g() {
        return this[1];
    }

    get b() {
        return this[2];
    }

    set r(value) {
        this[0] = value;
    }

    set g(value) {
        this[1] = value;
    }

    set b(value) {
        this[2] = value;
    }

    set(value) {
        if(typeof value !== 'object') {
            this[0] = value;
            this[1] = value;
            this[2] = value;
        } else {
            this[0] = value[0];
            this[1] = value[1];
            this[2] = value[2];
        }
    }

    add(vec3) {
        if(typeof vec3 === 'number') {
            return new Vec3(
                this[0] + vec3,
                this[1] + vec3,
                this[2] + vec3
            );
        } else {
            return new Vec3(
                this[0] + vec3[0],
                this[1] + vec3[1],
                this[2] + vec3[2]
            );
        }
    }

    subtract(vec3) {
        if(typeof vec3 === 'number') {
            return new Vec3(
                this[0] - vec3,
                this[1] - vec3,
                this[2] - vec3
            );
        } else {
            return new Vec3(
                this[0] - vec3[0],
                this[1] - vec3[1],
                this[2] - vec3[2]
            );
        }
    }

    scalar(value) {
        return new Vec3(
            this[0] * value,
            this[1] * value,
            this[2] * value
        );
    }

    equals(vec3) {
        return vec3 === this || (vec3[0] === this[0] && vec3[1] === this[1] && vec3[2] === this[2]);
    }

    mod(vec3) {
        if(typeof vec3 === 'number') {
            return new Vec3(
                this[0] % vec3,
                this[1] % vec3,
                this[2] % vec3
            );
        } else {
            return new Vec3(
                this[0] % vec3[0],
                this[1] % vec3[1],
                this[2] % vec3[2]
            );
        }
    }

    clone() {
        return new Vec3(this[0], this[1], this[2]);
    }

    toHex() {
        let r = Math.round(this.r).toString(16),
            g = Math.round(this.g).toString(16),
            b = Math.round(this.b).toString(16);

        if(r.length === 1) {
            r = '0' + r;
        }

        if(g.length === 1) {
            g = '0' + g;
        }

        if(b.length === 1) {
            b = '0' + b;
        }

        return `#${r}${g}${b}`;
    }

    toRGB() {
        return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
    }

    toTranslate3d() {
        return `translate3d(${this.x}px, ${this.y}px, ${this.z}px)`;
    }
}


/**
 * Class to store a 4 value vector.
 * Provides DOMRect interface.
 */
export class Vec4 {
    /**
     * r, g, b, a
     * left, top, right, bottom
     *
     * @param left
     * @param top
     * @param right
     * @param bottom
     */
    constructor(left, top, right, bottom) {
        this[0] = left;
        this[1] = top;
        this[2] = right;
        this[3] = bottom;
    }

    set(valueOrVec4) {
        if(typeof valueOrVec4 !== 'object') {
            this[0] = valueOrVec4;
            this[1] = valueOrVec4;
            this[2] = valueOrVec4;
            this[3] = valueOrVec4;
        } else {
            this[0] = valueOrVec4[0];
            this[1] = valueOrVec4[1];
            this[2] = valueOrVec4[2];
            this[3] = valueOrVec4[3];
        }
    }

    add(valueOrVec4) {
        if(typeof valueOrVec4 === 'number') {
            return this._new(
                this[0] + valueOrVec4,
                this[1] + valueOrVec4,
                this[2] + valueOrVec4,
                this[3] + valueOrVec4
            );
        } else {
            return this._new(
                this[0] + valueOrVec4[0],
                this[1] + valueOrVec4[1],
                this[2] + valueOrVec4[2],
                this[3] + valueOrVec4[3]
            );
        }
    }

    subtract(valueOrVec4) {
        if(typeof valueOrVec4 === 'number') {
            return this._new(
                this[0] - valueOrVec4,
                this[1] - valueOrVec4,
                this[2] - valueOrVec4,
                this[3] - valueOrVec4
            );
        } else {
            return this._new(
                this[0] - valueOrVec4[0],
                this[1] - valueOrVec4[1],
                this[2] - valueOrVec4[2],
                this[3] - valueOrVec4[3]
            );
        }
    }

    scalar(value) {
        return this._new(
            this[0] * value,
            this[1] * value,
            this[2] * value,
            this[3] * value
        );
    }

    equals(vec4) {
        return vec4 === this || (vec4[0] === this[0] && vec4[1] === this[1] && vec4[2] === this[2] && vec4[3] === this[3]);
    }

    mod(valueOrVec4) {
        if(typeof valueOrVec4 === 'number') {
            return this._new(
                this[0] % valueOrVec4,
                this[1] % valueOrVec4,
                this[2] % valueOrVec4,
                this[3] % valueOrVec4,
            );
        } else {
            return this._new(
                this[0] % valueOrVec4[0],
                this[1] % valueOrVec4[1],
                this[2] % valueOrVec4[2],
                this[3] % valueOrVec4[3]
            );
        }
    }

    clone() {
        return new this.constructor(this[0], this[1], this[2], this[3]);
    }

    _new(left, top, right, bottom) {
        return new this.constructor(left, top, right, bottom);
    }
}


export class Rect extends Vec4 {
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

    addPaddings({left, top, right, bottom}) {
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

    clampXY(rect) {
        let width = this.right - this.left,
            height = this.bottom - this.top,
            left = clamp(this.left, rect.left, rect.right),
            top = clamp(this.top, rect.top, rect.bottom);

        return this._new(left, top, left + width, top + height);
    }

    clamp(rect) {
        rect = rect.subtract(new Rect(0, 0, this.width, this.height));

        let width = this.width,
            height = this.height,
            left = clamp(this.left, rect.left, rect.right),
            top = clamp(this.top, rect.top, rect.bottom);

        return this._new(
            left,
            top,
            left + width,
            top + height
        );
    }

    clampX(rect) {
        rect = rect.subtract(new Rect(0, 0, this.width, this.height));

        let width = this.width,
            left = clamp(this.left, rect.left, rect.right);

        return this._new(
            left,
            this.top,
            left + width,
            this.bottom
        );
    }

    clampY(rect) {
        rect = rect.subtract(new Rect(0, 0, this.width, this.height));

        let height = this.height,
            top = clamp(this.top, rect.top, rect.bottom);

        return this._new(
            this.left,
            top,
            this.right,
            top + height
        );
    }

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

        let flip = false;

        if(!inside.containsX(rect)) {
            if(collision.x === 'flip' || collision.x === 'flipfit') {
                let center = this.left + (this.width / 2);
                anchor.x = ((anchor.x - center) * -1) + center;

                center = of.left + (of.width / 2);
                reference.x = ((reference.x - center)*-1) + center;
                flip = true;
            }
        }

        if(!inside.containsY(rect)) {
            if(collision.y === 'flip' || collision.y === 'flipfit') {
                let middle = this.top + (this.height / 2);
                anchor.y = ((anchor.y - middle)*-1) + middle;

                middle = of.top + (of.height / 2);
                reference.y = ((reference.y - middle)*-1) + middle;
                flip = true;
            }
        }

        if(flip) {
            deltaX = reference.x - anchor.x;
            deltaY = reference.y - anchor.y;
            rect = this.translate(deltaX, deltaY);

            if(inside.contains(rect)) {
                return rect;
            }
        }

        if(collision.x === 'fit' || collision.x === 'flipfit') {
            rect = rect.clampX(inside);
        }

        if(collision.y === 'fit' || collision.y === 'flipfit') {
            rect = rect.clampY(inside);
        }

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


export class RGBA extends AbstractVector {
    constructor(r=0, g=0, b=0, a=1) {
        super(4);

        if(typeof r === 'object') {
            this.set(r);
        } else {
            this[0] = r;
            this[1] = g;
            this[2] = b;
            this[3] = a;
        }
    }

    toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    toHex() {
        let r = Math.round(this.r).toString(16),
            g = Math.round(this.g).toString(16),
            b = Math.round(this.b).toString(16);

        if(r.length === 1) r = "0" + r;
        if(g.length === 1) g = "0" + g;
        if(b.length === 1) b = "0" + b;

        return `#${r}${g}${b}`;
    }

    toHexA() {
        let r = Math.round(this.r).toString(16),
            g = Math.round(this.g).toString(16),
            b = Math.round(this.b).toString(16),
            a = Math.round(this.a*255).toString(16);

        if(r.length === 1) r = "0" + r;
        if(g.length === 1) g = "0" + g;
        if(b.length === 1) b = "0" + b;
        if(a.length === 1) a = "0" + a;

        return `#${r}${g}${b}${a}`;
    }

    static fromRBGAString(value) {
        let regResults = regRGBA.exec(value.trim());

        if(regResults) {
            let [r, g, b, a] = regResults[1].split(/\s*,\s*/);

            r = parseInt(r, 10);
            g = parseInt(g, 10);
            b = parseInt(b, 10);
            a = a ? parseFloat(a) : 1;

            return new RGBA(r, g, b, a);
        }
    }

    static fromColorString(value) {
        if(regRGBA.test(value)) {
            return this.fromRBGAString(value);
        } else {
            return this.fromHex(value);
        }
    }

    static fromHex(value) {
        let m = hexString.exec(value),
            r, g, b, a = 1.0;

        if(!m) {
            throw new Error("Invalid hex color value.  Must be a valid css hex color");
        }

        if(m[1]) {
            r = m[1][0] + m[1][0];
            g = m[1][1] + m[1][1];
            b = m[1][2] + m[1][2];
        } else if(m[2]) {
            r = m[2].substr(0, 2);
            g = m[2].substr(2, 2);
            b = m[2].substr(4, 2);
        } else {
            r = m[3].substr(0, 2);
            g = m[3].substr(2, 2);
            b = m[3].substr(4, 2);
            a = parseInt(m[3].substr(6, 2), 16) / 255;
        }

        r = parseInt(r, 16);
        g = parseInt(g, 16);
        b = parseInt(b, 16);

        return new RGBA(r, g, b, a);
    }

    get r() {
        return this[0];
    }

    set r(value) {
        this[0] = value;
    }

    get g() {
        return this[1];
    }

    set g(value) {
        this[1] = value;
    }

    get b() {
        return this[2];
    }

    set b(value) {
        this[2] = value;
    }

    get a() {
        return this[3];
    }

    set a(value) {
        this[3] = value;
    }

    toRGBAString() {
        return `rgba(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)}, ${this.a})`;
    }

    toRGB() {
        return this.clone();
    }

    toHSV() {
        let hsv = rgbToHsv(this.r, this.g, this.b);
        return new HSV(hsv.h, hsv.s, hsv.v);
    }
}


export class HSV extends AbstractVector {
    constructor(h=0, s=0, v=0) {
        super(3);

        if(typeof h === 'object') {
            this.set(h);
        } else {
            this[0] = h;
            this[1] = s;
            this[2] = v;
        }
    }

    get h() {
        return this[0]
    }

    get s() {
        return this[1]
    }

    get v() {
        return this[2]
    }

    set h(value) {
        this[0] = value;
    }

    set s(value) {
        this[1] = value;
    }

    set v(value) {
        this[2] = value;
    }

    get hue() {
        return this[0];
    }

    set hue(value) {
        this[0] = value;
    }

    get saturation() {
        return this[1];
    }

    set saturation(value) {
        this[1] = value;
    }

    get value() {
        return this[2];
    }

    set value(value) {
        this[2] = value;
    }

    toRGB() {
        let rgb = hsvToRGB(this.h, this.s, this.v);
        return new RGBA(rgb.r, rgb.g, rgb.b, 1.0);
    }

    toHSV() {
        return this.clone();
    }
}
