/**
 * Attempts to parse the value into a boolean value or a integer.  Returns the default value on failure if provided.
 * Otherwise throws a TypeError.
 * @param value
 * @param radix
 * @param defaultValue
 * @returns {boolean|number|*}
 */
export function parseBooleanOrInt(value, radix = 10, defaultValue = TypeError) {
    let type = typeof value;

    if (type === 'boolean' || type === 'number') {
        return value;
    }

    if (value === 'true') {
        return true;
    } else if (value === 'false') {
        return false;
    }

    value = parseInt(value, radix);

    if (Number.isNaN(value)) {
        if (defaultValue === TypeError) {
            throw new TypeError("Could not parse value into boolean or int.");
        } else {
            return defaultValue;
        }
    }

    return value;
}

/**
 * Attempts to parse the value into a boolean value or a float.  Returns the default value on failure if provided.
 * Otherwise throws a TypeError.
 * @param value
 * @param defaultValue
 * @returns {boolean|number|*}
 */
export function parseBooleanOrFloat(value, defaultValue = TypeError) {
    let type = typeof value;

    if (type === 'boolean' || type === 'number') {
        return value;
    }

    if (value === 'true') {
        return true;
    } else if (value === 'false') {
        return false;
    }

    value = parseFloat(value);

    if (Number.isNaN(value)) {
        if (defaultValue === TypeError) {
            throw new TypeError("Could not parse value into boolean or int.");
        } else {
            return defaultValue;
        }
    }

    return value;
}

/**
 * Attempts for parse a boolean value from a string.  Returns the defaultValue on failure if provided.  Otherwise throws
 * a TypeError.
 * @param value
 * @param defaultValue
 * @returns {boolean|*}
 */
export function parseBoolean(value, defaultValue = TypeError) {
    if (typeof value === 'boolean') {
        return value;
    } else if (value === 'true') {
        return true;
    } else if (value === 'false') {
        return false;
    } else {
        if (defaultValue === TypeError) {
            throw new TypeError("Could not parse value into boolean.");
        } else {
            return defaultValue;
        }
    }
}

/**
 * Attempts to parse a string into an integer.  Returns the default value on failure if set.  Otherwise throws a
 * TypeError.
 * @param value
 * @param radix
 * @param defaultValue
 * @returns {number}
 */
export function parseIntValue(value, radix = 10, defaultValue = TypeError) {
    value = parseInt(value, radix);

    if (Number.isNaN(value)) {
        if (defaultValue === TypeError) {
            throw new TypeError("Could not parse value into integer.");
        } else {
            // noinspection JSValidateTypes
            return defaultValue;
        }
    }

    return value;
}

/**
 * Attempts to parse a string into an integer.  Returns the default value on failure if set.  Otherwise throws a
 * TypeError.
 * @param value
 * @param defaultValue
 * @returns {number}
 */
export function parseFloatValue(value, defaultValue = TypeError) {
    value = parseFloat(value);

    if (Number.isNaN(value)) {
        if (defaultValue === TypeError) {
            throw new TypeError("Could not parse value into float.");
        } else {
            // noinspection JSValidateTypes
            return defaultValue;
        }
    }

    return value;
}

/**
 * Runs multiple parsers and returns the first one that doesn't throw a TypeError.
 * @param value
 * @param parsers
 * @returns {*}
 */
export function parseAny(value, ...parsers) {
    for (let parser of parsers) {
        try {
            return parser(value);
        } catch (e) {
            if (!(e instanceof TypeError)) {
                throw e;
            }
        }
    }

    throw new TypeError("Could not parse value.");
}

/**
 * Validates that the value is one of the given choices.
 * @param value
 * @param choices
 * @param defaultValue
 * @returns {TypeErrorConstructor|*}
 */
export function validateChoice(value, choices, defaultValue = TypeError) {
    if (choices.indexOf(value) === -1) {
        if (defaultValue === TypeError) {
            throw new TypeError("Invalid choice.");
        } else {
            return defaultValue;
        }
    }

    return value;
}

export function choice(...args) {
    return function (value) {
        if (args.indexOf(value) === -1) {
            throw new TypeError("Invalid Choice");
        }

        return value;
    }
}
