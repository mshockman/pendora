

/**
 * Stores a 3 value vector.
 */
export default class Vec3 {
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

    // noinspection JSUnusedGlobalSymbols
    scalar(value) {
        return new Vec3(
            this[0] * value,
            this[1] * value,
            this[2] * value
        );
    }

    // noinspection JSUnusedGlobalSymbols
    equals(vec3) {
        return vec3 === this || (vec3[0] === this[0] && vec3[1] === this[1] && vec3[2] === this[2]);
    }

    // noinspection JSUnusedGlobalSymbols
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

    // noinspection JSUnusedGlobalSymbols
    clone() {
        return new Vec3(this[0], this[1], this[2]);
    }

    // noinspection JSUnusedGlobalSymbols
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

    // noinspection JSUnusedGlobalSymbols
    toRGB() {
        return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
    }

    // noinspection JSUnusedGlobalSymbols
    toTranslate3d() {
        return `translate3d(${this.x}px, ${this.y}px, ${this.z}px)`;
    }

    // noinspection JSUnusedGlobalSymbols
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

    // noinspection JSUnusedGlobalSymbols
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
