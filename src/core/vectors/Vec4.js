/**
 * Class to store a 4 value vector.
 * Provides DOMRect interface.
 */
export default class Vec4 {
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

    // noinspection JSUnusedGlobalSymbols
    scalar(value) {
        return this._new(
            this[0] * value,
            this[1] * value,
            this[2] * value,
            this[3] * value
        );
    }

    // noinspection JSUnusedGlobalSymbols
    equals(vec4) {
        return vec4 === this || (vec4[0] === this[0] && vec4[1] === this[1] && vec4[2] === this[2] && vec4[3] === this[3]);
    }

    // noinspection JSUnusedGlobalSymbols
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

    // noinspection JSUnusedGlobalSymbols
    toRGBA() {
        return `rgba(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)}, ${this.a})`;
    }

    // noinspection JSUnusedGlobalSymbols
    clone() {
        return new this.constructor(this[0], this[1], this[2], this[3]);
    }

    _new(left, top, right, bottom) {
        return new this.constructor(left, top, right, bottom);
    }

    // noinspection JSUnusedGlobalSymbols
    static fromRGBAObject({r, g, b, a}) {
        return new Vec4(r, g, b, a);
    }

    // noinspection JSUnusedGlobalSymbols
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
