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
    template.innerHTML = html;

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
        left: box.left,
        top: box.top
    };
}
