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
}
