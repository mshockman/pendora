import {AssertionError} from './errors';
const REG_WHITESPACE = /\s+/;


/**
 * Clamps a value between a minimum and maximum values.
 * @param value
 * @param minValue
 * @param maxValue
 * @returns {*}
 */
export function clamp(value, minValue=null, maxValue=null) {
    if(minValue !== null) {
        value = Math.max(value, minValue);
    }

    if(maxValue !== null) {
        value = Math.min(value, maxValue);
    }

    return value;
}


/**
 * Takes an iterable and returns the first none null or undefined value.
 * @param args
 */
export function firstValue(args) {
    for(let item of args) {
        if(item !== null && item !== undefined) {
            return item;
        }
    }
}


/**
 * Takes an iterable and returns true if all of the values are trueish.
 * @param iterable
 */
export function all(iterable) {
    for(let item of iterable) {
        if(!item) {
            return false;
        }
    }

    return true;
}


/**
 * Takes an iterable and returns true if any of the values are trueish.
 * @param iterable
 */
export function any(iterable) {
    for(let item of iterable) {
        if(item) return true;
    }

    return false;
}


export function proto(descriptor) {
    descriptor.placement = "prototype";
    return descriptor;
}


/**
 * Returns a random value from an array.
 * @param array
 * @returns {*}
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random()*array.length)];
}


/**
 * Checks to see if 2 arrays are "equal".
 * @param array1
 * @param array2
 */
export function arraysEqual(array1, array2) {
    if(array1 === array2) return true; // The same object.
    if(array1 == null || array2 == null) return false;
    if(array1.length !== array2.length) return false;

    for(let i = 0, l = array1.length; i < l; i++) {
        if(array1[i] !== array2[i]) return false;
    }

    return true;
}


/**
 * Parses an html string into a document fragment.
 *
 * @param html
 * @return {DocumentFragment}
 */
export function parseHTML(html) {
    let template = document.createElement('template');
    template.innerHTML = html.trim();

    if(template.content) {
        return template.content;
    } else {
        // Doesn't support template tag.
        let fragment = document.createDocumentFragment();
        while(template.firstChild) fragment.appendChild(template.firstChild);
        return fragment;
    }
}


/**
 * Tests to see if the object is empty.
 *
 * @param object
 * @return {boolean}
 */
export function isEmptyObject(object) {
    // noinspection LoopStatementThatDoesntLoopJS
    for(let key in object) {
        return false;
    }

    return true;
}


/**
 * Empties a dom element.
 *
 * @param element
 */
export function emptyElement(element) {
    while(element.firstChild) element.removeChild(element.firstChild);
}


/**
 * Adds classes to an element.  Can take a space separated list of classes.
 *
 * @param element
 * @param classes
 */
export function addClasses(element, classes) {
    if(typeof classes === 'string') {
        classes = classes.split(REG_WHITESPACE);
    }

    element.classList.add(...classes);
}


/**
 * Removes classes to an element.  Can take a space separated list of classes.
 *
 * @param element
 * @param classes
 */
export function removeClasses(element, classes) {
    if(typeof classes === 'string') {
        classes = classes.split(REG_WHITESPACE);
    }

    element.classList.remove(...classes);
}


/**
 * Assigns attributes in an object to an element.
 * @param element
 * @param attributes
 */
export function assignAttributes(element, attributes) {
    for(let key in attributes) {
        if(attributes.hasOwnProperty(key)) {
            element.setAttribute(key, attributes[key]);
        }
    }
}


/**
 * Sets an elements position relative to the document.
 *
 * @param element
 * @param coords
 */
export function setElementOffset(element, coords) {
    if(coords.nodeType) {
        coords = getElementOffset(element);
    } else if(Array.isArray(coords)) {
        coords = {
            left: coords.left,
            top: coords.top
        };
    }

    let offset = element.getBoundingClientRect();

    let style = getComputedStyle(element),
        left = parseInt(style.left, 10) || 0,
        top = parseInt(style.top, 10) || 0;

    element.style.left = (left + (coords.left - offset.left)) + 'px';
    element.style.top = (top + (coords.top - offset.top)) + 'px';
}


/**
 * Returns the top and left position of an element relative to the document.
 *
 * @param element
 * @return {{top: number, left: number}}
 */
export function getElementOffset(element) {
    let box = element.getBoundingClientRect();

    return {
        left: box.left + window.pageXOffset,
        top: box.top + window.pageYOffset
    };
}


/**
 * Normalizing accessing scroll position for an element.
 *
 * Windows and elements have different ways of accessing their scroll left and scroll top values on IE.
 * This function normalizes this behavior so getScroll(variable).scrollLeft always works.
 * @param element
 * @returns {{left, top}}
 */
export function getScroll(element) {
    if(isWindow(element)) {
        return {
            scrollLeft: element.pageXOffset,
            scrollTop: element.pageYOffset
        };
    } else {
        return {
            scrollLeft: element.scrollLeft,
            scrollTop: element.scrollTop
        }
    }
}


/**
 * Test to see if the variable is a window.
 * @param variable
 * @returns {boolean}
 */
export function isWindow(variable) {
    return variable && typeof variable === 'object' && setInterval in variable;
}


/**
 * Normalizes setting a scroll position for an element.
 * Windows on ie and elements with overflow scroll have different ways of setting the scroll position.
 * This methods normalizes them.
 * @param element - The element to scroll
 * @param scroll - An object with a left or a top property or both.
 */
export function setScroll(element, scroll) {
    if(element.scrollTo) {
        element.scrollTo(scroll);
    } else {
        element.scrollLeft = scroll.left;
        element.scrollTop = scroll.top;
    }
}


/**
 * Matches a single dom element based on the given selector.
 * Can take a css selector string, a jquery object, a dom element, a document element or a document fragment.
 * If a css selector is passed it will query for the element.
 * If a jquery object is passed it will return the first matched element.
 * If an element is passed it will return that element.
 *
 * If a context is provided and the selector was a css selector, the selectors scope will be limited to that element.
 * Otherwise the context will be the document.
 *
 * @param selector
 * @param context
 * @returns {Element|Document|DocumentFragment}
 */
export function selectElement(selector, context=null) {
    if(!context) {
        context = document;
    } else {
        context = selectElement(context);
    }

    if(typeof selector === 'string') {
        return context.querySelector(selector);
    } else if(selector.jquery) {
        return selector[0];
    } else if(selector.nodeType === 1 || selector.nodeType === 9 || selector.nodeType === 11) {
        return selector;
    }
}


/**
 * Asserts that a condition is true or raises an AssertionError.
 * @param condition - condition to check.
 * @param message - message on fail.
 * @throws AssertionError
 */
export function assert(condition, message) {
    if(!condition) {
        throw new AssertionError(message);
    }
}


/**
 * Attempts to parse the value into a boolean value or a integer.  Returns the default value on failure if provided.
 * Otherwise throws a TypeError.
 * @param value
 * @param radix
 * @param defaultValue
 * @returns {boolean|number|*}
 */
export function parseBooleanOrInt(value, radix=10, defaultValue=TypeError) {
    let type = typeof value;

    if(type === 'boolean' || type === 'number') {
        return value;
    }

    if(value === 'true') {
        return true;
    } else if(value === 'false') {
        return false;
    }

    value = parseInt(value, radix);

    if(Number.isNaN(value)) {
        if(defaultValue === TypeError) {
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
export function parseBooleanOrFloat(value, defaultValue=TypeError) {
    let type = typeof value;

    if(type === 'boolean' || type === 'number') {
        return value;
    }

    if(value === 'true') {
        return true;
    } else if(value === 'false') {
        return false;
    }

    value = parseFloat(value);

    if(Number.isNaN(value)) {
        if(defaultValue === TypeError) {
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
export function parseBoolean(value, defaultValue=TypeError) {
    if(typeof value === 'boolean') {
        return value;
    } else if(value === 'true') {
        return true;
    } else if(value === 'false') {
        return false;
    } else {
        if(defaultValue === TypeError) {
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
export function parseIntValue(value, radix=10, defaultValue=TypeError) {
    value = parseInt(value, radix);

    if(Number.isNaN(value)) {
        if(defaultValue === TypeError) {
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
export function parseFloatValue(value, defaultValue=TypeError) {
    value = parseFloat(value);

    if(Number.isNaN(value)) {
        if(defaultValue === TypeError) {
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
    for(let parser of parsers) {
        try {
            return parser(value);
        } catch(e) {
            if(!(e instanceof TypeError)) {
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
export function validateChoice(value, choices, defaultValue=TypeError) {
    if(choices.indexOf(value) === -1) {
        if(defaultValue === TypeError) {
            throw new TypeError("Invalid choice.");
        } else {
            return defaultValue;
        }
    }

    return value;
}


export function choice(...args) {
    return function(value) {
        if(args.indexOf(value) === -1) {
            throw new TypeError("Invalid Choice");
        }

        return value;
    }
}


/**
 * Returns first child element that matches the test function.
 * @param element - Parent element
 * @param fn - Test Function
 * @returns {Element}
 */
export function findChild(element, fn) {
    for(let i = 0, l = element.children.length; i < l; i++) {
        let child = element.children[i];

        if(fn(child)) {
            return child;
        }
    }
}


/**
 * Creates a filtered list of element from the children that match the test function.
 * @param element - Parent element.
 * @param fn - Test function.
 * @returns {Array}
 */
export function filterChildren(element, fn) {
    let r = [];

    for(let i = 0, l = element.children.length; i < l; i++) {
        let child = element.children[i];

        if(fn(child)) {
            r.push(child);
        }
    }

    return r;
}


/**
 * Returns the object own property or the default value if it does not have that property.
 * @param obj
 * @param propName
 * @param defaultValue
 * @returns {*}
 */
export function getOwnProperty(obj, propName, defaultValue=undefined) {
    if(obj.hasOwnProperty(propName)) {
        return obj[propName];
    } else {
        return defaultValue;
    }
}


/**
 * Returns the obj value by following it's property path.  For example getPropertyByPath(a, 'b.c.d') is equivalent to
 * a.b.c.d but can be passed in string form.
 * @param obj
 * @param path
 * @returns {*}
 */
export function getPropertyByPath(obj, path) {
    let parts = path.split('.'),
        r = obj;

    for(let part of parts) {
        r = r[part];
    }

    return r;
}


/**
 * Converts hsl values to rgb values.
 *
 * @param h
 * @param s
 * @param l
 * @returns {{r: *, b: *, g: *}}
 */
export function hslToRGB(h, s, l) {
    // Must be fractions of 1
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return {r, g, b}
}


export function hsvToRGB(h, s, v) {
    // h ∈ [0°, 360°]
    // s ∈ [0, 1]
    // v ∈ [0, 1]

    let c = v*s,
        hp = h / 60,
        x = c * (1 - Math.abs((hp % 2) - 1)),
        r = 0,
        g = 0,
        b = 0,
        m = v - c;

    if(0 <= hp && hp <= 1) {
        r = c;
        g = x;
        b = 0;
    } else if(1 < hp && hp <= 2) {
        r = x;
        g = c;
        b = 0;
    } else if(2 < hp && hp <= 3) {
        r = 0;
        g = c;
        b = x;
    } else if(3 < hp && hp <= 4) {
        r = 0;
        g = x;
        b = c;
    } else if(4 < hp && hp <= 5) {
        r = x;
        g = 0;
        b = c;
    } else if(5 < hp && hp <= 6) {
        r = c;
        g = 0;
        b = x;
    } else {
        r = 255;
        g = 0;
        b = 0;
    }

    return {
        r: (r + m)*255,
        g: (g + m)*255,
        b: (b + m)*255
    };
}
