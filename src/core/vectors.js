import {clamp} from './utility';


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

    multiply(vec2) {
        if(typeof vec2 === 'number') {
            return new Vec2(
                this[0] * vec2,
                this[1] * vec2
            );
        } else {
            return new Vec2(
                this[0] * vec2[0],
                this[1] * vec2[1]
            );
        }
    }

    divide(vec2) {
        if(typeof vec2 === 'number') {
            return new Vec2(
                this[0] / vec2,
                this[1] / vec2
            );
        } else {
            return new Vec2(
                this[0] / vec2[0],
                this[1] / vec2[1]
            );
        }
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

    divide(vec3) {
        if(typeof vec3 === 'number') {
            return new Vec3(
                this[0] / vec3,
                this[1] / vec3,
                this[2] / vec3
            );
        } else {
            return new Vec3(
                this[0] / vec3[0],
                this[1] / vec3[1],
                this[2] / vec3[2]
            );
        }
    }

    multiply(vec3) {
        if(typeof vec3 === 'number') {
            return new Vec3(
                this[0] * vec3,
                this[1] * vec3,
                this[2] * vec3
            );
        } else {
            return new Vec3(
                this[0] * vec3[0],
                this[1] * vec3[1],
                this[2] * vec3[2]
            );
        }
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

    static fromHex(hex) {
        let m = /^#?([0-9a-f]{3})$/i.exec(hex);

        if(m) {
            hex = m[1][0] + m[1][0] + m[1][1] + m[1][1] + m[1][2] + m[1][2];
        } else {
            m = /^#?([0-9a-f]{6})$/i.exec(hex);

            if(m) {
                hex = m[1];
            } else {
                throw new Error(`Could not parse value ${hex}`);
            }
        }

        hex = parseInt(hex, 16);

        // r, g, b
        return new Vec3(
            hex & 0xff0000 >> 16,
            hex & 0x00ff00 >> 8,
            hex & 0x0000ff
        );
    }

    static fromRGB(value) {
        let m = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(value);

        if(!m) {
            throw new Error(`Could not parse rgb value ${value}`);
        }

        return new Vec3(
            parseInt(m[1], 10),
            parseInt(m[2], 10),
            parseInt(m[3], 10),
        );
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

    get width() {
        return this.right - this.left;
    }

    get height() {
        return this.bottom - this.top;
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

    set(value) {
        if(typeof value !== 'object') {
            this[0] = value;
            this[1] = value;
            this[2] = value;
            this[3] = value;
        } else {
            this[0] = value[0];
            this[1] = value[1];
            this[2] = value[2];
            this[3] = value[3];
        }
    }

    add(rect) {
        if(typeof rect === 'number') {
            return new Vec4(
                this[0] + rect,
                this[1] + rect,
                this[2] + rect,
                this[3] + rect
            );
        } else {
            return new Vec4(
                this[0] + rect[0],
                this[1] + rect[1],
                this[2] + rect[2],
                this[3] + rect[3]
            );
        }
    }

    subtract(rect) {
        if(typeof rect === 'number') {
            return new Vec4(
                this[0] - rect,
                this[1] - rect,
                this[2] - rect,
                this[3] - rect
            );
        } else {
            return new Vec4(
                this[0] - rect[0],
                this[1] - rect[1],
                this[2] - rect[2],
                this[3] - rect[3]
            );
        }
    }

    divide(rect) {
        if(typeof rect === 'number') {
            return new Vec4(
                this[0] / rect,
                this[1] / rect,
                this[2] / rect,
                this[3] / rect
            );
        } else {
            return new Vec4(
                this[0] / rect[0],
                this[1] / rect[1],
                this[2] / rect[2],
                this[3] / rect[3]
            );
        }
    }

    multiply(rect) {
        if(typeof rect === 'number') {
            return new Vec4(
                this[0] * rect,
                this[1] * rect,
                this[2] * rect,
                this[3] * rect
            );
        } else {
            return new Vec4(
                this[0] * rect[0],
                this[1] * rect[1],
                this[2] * rect[2],
                this[3] * rect[3]
            );
        }
    }

    equals(rect) {
        return rect === this || (rect[0] === this[0] && rect[1] === this[1] && rect[2] === this[2] && rect[3] === this[3]);
    }

    mod(rect) {
        if(typeof rect === 'number') {
            return new Vec4(
                this[0] % rect,
                this[1] % rect,
                this[2] % rect,
                this[3] % rect,
            );
        } else {
            return new Vec4(
                this[0] % rect[0],
                this[1] % rect[1],
                this[2] % rect[2],
                this[3] % rect[3]
            );
        }
    }

    translate(x, y) {
        if(typeof x === 'object') {
            y = x.y;
            x = x.x;
        }

        return new Vec4(
            this[0] + x,
            this[1] + y,
            this[2] + x,
            this[3] + y
        );
    }

    moveTo(vec2) {
        let deltaX = vec2.left - this.left,
            deltaY = vec2.top - this.top;

        return new Vec4(
            this.left + deltaX,
            this.top + deltaY,
            this.right + deltaX,
            this.bottom + deltaY
        );
    }

    intersection(rect) {
        let left = Math.max(this.left, rect.left),
            right = Math.min(this.right, rect.right),
            bottom = Math.min(this.bottom, rect.bottom),
            top = Math.max(this.top, rect.top);

        if(left > right || top > bottom) {
            return null;
        }

        return new Vec4(left, top, right, bottom);
    }

    toRGBA() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    clone() {
        return new Vec4(this[0], this[1], this[2], this[3]);
    }

    contains(rect) {
        return this.left <= rect.left && this.right >= rect.right && this.top <= rect.top && this.bottom >= rect.bottom;
    }

    toPoint() {
        return new Vec2(this[0], this[1]);
    }

    getArea() {
        return this.width * this.height;
    }

    isXOverlapping(vec4) {
        return (vec4.left <= this.right && vec4.right >= this.left);
    }

    isYOverlapping(vec4) {
        return (vec4.top <= this.bottom && vec4.bottom >= this.top);
    }

    clampXY(vec4) {
        let width = this.right - this.left,
            height = this.bottom - this.top,
            left = clamp(this.left, vec4.left, vec4.right),
            top = clamp(this.top, vec4.top, vec4.bottom);

        return new Vec4(left, top, left + width, top + height);
    }

    static fromRect({left, top, right, bottom}) {
        return new Vec4(left, top, right, bottom);
    }

    static fromRGBAObject({r, g, b, a}) {
        return new Vec4(r, g, b, a);
    }

    static fromRGBA(value) {
        let m = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+\.?\d*)\)$/.exec(value);

        if(!m) {
            throw new Error(`Could not parse rgba value ${value}`);
        }

        return new Vec4(
            parseInt(m[1], 10),
            parseInt(m[2], 10),
            parseInt(m[3], 10),
            parseFloat(m[4]),
        );
    }
}
