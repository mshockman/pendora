import {clamp} from '../utility';


/**
 * Stores a 2 value Vector.
 */
export default class Vec2 {
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

    // noinspection JSUnusedGlobalSymbols
    scalar(value) {
        return new Vec2(this[0] * value, this[1] * value);
    }

    // noinspection JSUnusedGlobalSymbols
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

    // noinspection JSUnusedGlobalSymbols
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

    // noinspection JSUnusedGlobalSymbols
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

    // noinspection JSUnusedGlobalSymbols
    toTranslate() {
        return `translate(${this.x}px, ${this.y}px)`;
    }

    // noinspection JSUnusedGlobalSymbols
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
