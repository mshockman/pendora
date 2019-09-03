import {Vec2, Vec3} from "./vectors";


const regMatrix = /matrix(3d)?\(([^)]+)\)/;


/**
 * Returns the elements offset parent.
 *
 * @param element
 * @returns {HTMLElement}
 */
export function getOffsetElement(element) {
    let o = element.parentElement;

    while(o) {
        let position = getComputedStyle(o).position;
        if(position !== 'static') return o;
        o = o.parentElement;
    }
}


/**
 * Returns a bounding rect who's positions are relative to the provided offsetParent.
 * If offsetParent is null then the targets natural offsetParent is used as returned by the getOffsetElement function.
 * @param element
 * @param offsetParent
 * @returns {{top: number, left: number, bottom: number, width: number, right: number, height: number}}
 */
export function getBoundingOffsetRect(element, offsetParent=null) {
    if(!offsetParent) offsetParent = getOffsetElement(element);

    let offsetRect = offsetParent.getBoundingClientRect(),
        rect = element.getBoundingClientRect(),
        left = rect.left - offsetRect.left,
        top = rect.top - offsetRect.top;

    return {
        left: left,
        top: top,
        right: rect.right - offsetRect.right,
        bottom: rect.bottom - offsetRect.bottom,
        width: rect.width,
        height: rect.height,
        x: left,
        y: top
    };
}


/**
 * Returns a bounding rect who's positions are relative to the document.
 * @param element
 * @returns {{top: number, left: number, bottom: number, width: number, x: number, y: number, right: number, height: number}}
 */
export function getBoundingDocumentRect(element) {
    let rect = element.getBoundingClientRect(),
        left = rect.left + window.scrollX,
        top = rect.top + window.scrollY;

    return {
        left: left,
        top: top,
        right: rect.right + window.scrollX,
        bottom: rect.bottom + window.scrollY,
        width: rect.width,
        height: rect.height,
        x: left,
        y: top
    };
}


/**
 * Returns the css translation from the transformation matrix applied to the element.
 *
 * @param element
 * @returns {Vec3}
 */
export function getTranslation(element) {
    let transform = getComputedStyle(element).transform,
        m = regMatrix.exec(transform);

    if(!m) {
        return new Vec3(
            0,
            0,
            0
        );
    }

    let data = m[2].split(/\s*,\s*/);

    if(m[1]) {
        return new Vec3(
            parseFloat(data[12]),
            parseFloat(data[13]),
            parseFloat(data[14])
        );
    } else {
        return new Vec3(
            parseFloat(data[4]),
            parseFloat(data[5]),
            0
        );
    }
}


/**
 * Sets the element's transformation matrix to 2d translate with the specified left and top properties.
 *
 * @param element
 * @param x
 * @param y
 * @param z
 */
export function setTranslation(element, {x, y, z=null}) {
    if(z !== null) {
        element.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    } else {
        element.style.transform = `translate(${x}px, ${y}px)`;
    }
}


/**
 * Gets the elements left and top style properties as numbers.
 *
 * @param element
 * @returns {Vec2}
 */
export function getCssPosition(element) {
    let style = getComputedStyle(element);

    return new Vec2(
        parseInt(style.left, 10),
        parseInt(style.top, 10)
    );
}


/**
 * Sets the left and top style properties of an element.  If the element is positioned statically it will be changed to
 * relative.
 *
 * @param element
 * @param left
 * @param top
 */
export function setCssPosition(element, {left=null, top=null}) {
    let style = getComputedStyle(element);

    if(style.position === 'static') {
        style.position = 'relative';
    }

    if(left !== null && left !== undefined) {
        element.style.left = `${left}px`;
    }

    if(top !== null && top !== undefined) {
        element.style.top = `${top}px`;
    }
}


/**
 * Sets the elements position relative to the client window.  The `method` parameter controls how the elements position
 * is modified.  The options are 'position' and 'translate'.  Position uses the standard left and top properties of the
 * elements style.  'translate' uses the transform property.
 *
 * @param element
 * @param position
 * @param method
 */
export function setElementClientPosition(element, position, method='position') {
    let box = element.getBoundingClientRect(),
        deltaX = position.left - box.left,
        deltaY = position.top - box.top;

    if(method === 'position') {
        let cssPosition = getCssPosition(element);

        setCssPosition(element, {
            left: cssPosition.left + deltaX,
            top: cssPosition.top + deltaY
        });
    } else if(method === 'translate') {
        let cssPosition = getTranslation(element);

        setTranslation(element, {
            x: cssPosition.x + deltaX,
            y: cssPosition.y + deltaY
        });
    } else if(method === 'translate3d') {
        let cssPosition = getTranslation(element);

        setTranslation(element, {
            x: cssPosition.x + deltaX,
            y: cssPosition.y + deltaY,
            z: cssPosition.z
        });
    }
}


/**
 * Transforms the coordinates of a BoundingClientRect like object from client space to document space.
 * @param rect
 */
export function clientRectToDocumentSpace(rect) {
    let r = {
        left: rect.left,
        top: rect.top,
        bottom: rect.bottom,
        right: rect.right,
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y
    };

    r.left += window.scrollX;
    r.right += window.scrollX;
    if(typeof r.top === 'number') r.top += window.scrollY;
    if(typeof r.bottom === 'number') r.bottom += window.scrollY;

    return r;
}


/**
 * Transforms the coordinates of a BoundingClientRect like object from document space to client space.
 * @param rect
 */
export function documentRectToClientSpace(rect) {
    let r = {
        left: rect.left,
        top: rect.top,
        bottom: rect.bottom,
        right: rect.right,
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y
    };

    r.left -= window.scrollX;
    r.right -= window.scrollX;
    if(typeof r.top === 'number') r.top -= window.scrollY;
    if(typeof r.bottom === 'number') r.bottom -= window.scrollY;

    return r;
}


/**
 * Snaps the value to the specified grid using the provided rounding function.
 * @param value
 * @param gridSize
 * @param roundingFunction
 * @returns {number|*}
 */
export function snapToGrid(value, gridSize, roundingFunction=Math.round) {
    if(gridSize !== null && gridSize !== undefined && !Number.isNaN(gridSize)) {
        return roundingFunction(value / gridSize) * gridSize;
    }

    return value;
}
