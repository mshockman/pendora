const regPercentage = /[+-]?\d+.?\d*%/;


/**
 * Clamps a value between a minimum and maximum values.
 * @param value
 * @param minValue
 * @param maxValue
 * @returns {*}
 */
export function clamp(value, minValue = null, maxValue = null) {
    if (minValue !== null) {
        value = Math.max(value, minValue);
    }

    if (maxValue !== null) {
        value = Math.min(value, maxValue);
    }

    return value;
}

export function modulo(value, mod) {
    return ((value % mod) + mod) % mod;
}


export function calcDistance(x1, y1, x2, y2) {
    return Math.sqrt(
        Math.pow(x2 - x1, 2) + Math.pow(y2 - y2, 2)
    );
}


export function isPercentageString(value) {
    if(typeof value === 'string') {
        value = value.trim();
        return regPercentage.test(value);
    }

    return false;
}
