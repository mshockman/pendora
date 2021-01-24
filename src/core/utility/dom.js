const REG_WHITESPACE = /\s+/;


/**
 *
 * @param html
 * @return {DocumentFragment}
 */
export function createFragment(html) {
    let template = document.createElement('template');
    template.innerHTML = html.trim();

    if (template.content) {
        return template.content;
    } else {
        // Doesn't support template tag.
        let fragment = document.createDocumentFragment();
        while (template.firstChild) fragment.appendChild(template.firstChild);
        return fragment;
    }
}

/**
 * Adds classes to an element.  Can take a space separated list of classes.
 *
 * @param element
 * @param classes
 */
export function addClasses(element, classes) {
    if (typeof classes === 'string') {
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
    if (typeof classes === 'string') {
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
    for (let key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            element.setAttribute(key, attributes[key]);
        }
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
export function selectElement(selector, context = null) {
    if (!context) {
        context = document;
    } else {
        context = selectElement(context);
    }

    if (typeof selector === 'string') {
        return context.querySelector(selector);
    } else if (selector.jquery) {
        return selector[0];
    } else if (selector.nodeType === 1 || selector.nodeType === 9 || selector.nodeType === 11) {
        return selector;
    }
}

/**
 * Empties a dom element.
 *
 * @param element
 */
export function emptyElement(element) {
    while (element.firstChild) element.removeChild(element.firstChild);
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
    if (isWindow(element)) {
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
 * Normalizes setting a scroll position for an element.
 * Windows on ie and elements with overflow scroll have different ways of setting the scroll position.
 * This methods normalizes them.
 * @param element - The element to scroll
 * @param scroll - An object with a left or a top property or both.
 */
export function setScroll(element, scroll) {
    if (element.scrollTo) {
        element.scrollTo(scroll);
    } else {
        element.scrollLeft = scroll.left;
        element.scrollTop = scroll.top;
    }
}

/**
 * Returns first child element that matches the test function.
 * @param element - Parent element
 * @param fn {Function|String} - Test Function
 * @returns {HTMLElement|Element|null}
 */
export function findChild(element, fn) {
    if (typeof fn === 'string') {
        let selector = fn;
        fn = (child) => child.matches(selector);
    }

    for (let i = 0, l = element.children.length; i < l; i++) {
        let child = element.children[i];

        if (fn(child)) {
            return child;
        }
    }

    return null;
}


/**
 * Creates a filtered list of element from the children that match the test function.
 * @param element - Parent element.
 * @param matches - Test function or css selector.
 * @returns {Array}
 */
export function findChildren(element, matches) {
    let r = [];

    if(typeof matches === 'string') {
        let selector = matches;
        matches = (child) => child.matches(selector);
    }

    for (let i = 0, l = element.children.length; i < l; i++) {
        let child = element.children[i];

        if (matches(child)) {
            r.push(child);
        }
    }

    return r;
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
 * Returns the closest element with the context.
 * @param target
 * @param selector
 * @param context
 * @returns {MenuNode|jQuery|any|Element|null}
 */
export function closest(target, selector, context=null) {
    let closest = target.closest(selector);

    if(typeof context === 'string') {
        context = document.querySelector(context);
    }

    if(closest && (context === null || context.contains(closest))) {
        return closest;
    }

    return null;
}
