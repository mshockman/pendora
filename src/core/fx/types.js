export class NumberWithUnit {
    constructor(value, unit) {
        this.value = value;
        this.unit = unit;
    }

    add(value) {
        if (typeof value !== "number") {
            if (!(value instanceof NumberWithUnit)) {
                throw new TypeError("Cannot perform action on invalid type.");
            }

            if (this.unit !== value.unit) {
                throw new Error("Mismatched units");
            }

            value = value.value;
        }


        return new NumberWithUnit(this.value + value, this.unit);
    }

    subtract(value) {
        if (typeof value !== "number") {
            if (!(value instanceof NumberWithUnit)) {
                throw new TypeError("Cannot perform action on invalid type.");
            }

            if (this.unit !== value.unit) {
                throw new Error("Mismatched units");
            }

            value = value.value;
        }

        return new NumberWithUnit(this.value - value, this.unit);
    }

    scalar(value) {
        if (typeof value !== "number") {
            if (!(value instanceof NumberWithUnit)) {
                throw new TypeError("Cannot perform action on invalid type.");
            }

            if (this.unit !== value.unit) {
                throw new Error("Mismatched units");
            }

            value = value.value;
        }

        return new NumberWithUnit(this.value * value, this.unit);
    }

    // noinspection JSUnusedGlobalSymbols
    divide(value) {
        if (typeof value !== "number") {
            if (!(value instanceof NumberWithUnit)) {
                throw new TypeError("Cannot perform action on invalid type.");
            }

            if (this.unit !== value.unit) {
                throw new Error("Mismatched units");
            }

            value = value.value;
        }

        return new NumberWithUnit(this.value / value, this.unit);
    }

    toString() {
        return `${this.value}${this.unit}`;
    }
}
