import {Rect, Vec2, Vec3} from "../vectors";
import {clamp} from "../utility";


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
 * Returns the rectangle of the client area.
 *
 * @returns {Rect}
 */
export function getClientRect() {
    return Rect.getClientRect();
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
        rect = element.getBoundingClientRect();

    return new Rect(
        rect.left - offsetRect.left,
        rect.top - offsetRect.top,
        rect.right - offsetRect.right,
        rect.bottom - offsetRect.bottom
    );
}


/**
 * Returns a bounding rect who's positions are relative to the document.
 * @param element
 * @returns {{top: number, left: number, bottom: number, width: number, x: number, y: number, right: number, height: number}}
 */
export function getBoundingDocumentRect(element) {
    let rect = element.getBoundingClientRect();

    return new Rect(
        rect.left + window.scrollX,
        rect.top + window.scrollY,
        rect.right + window.scrollX,
        rect.bottom + window.scrollY
    );
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
 * is modified.  The options are 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'translate', and 'translate3d'.
 *
 * top-left, top-right, bottom-left and bottom-right set the css left, top, right, and bottom properties of the element.
 * translate and translate3d position the element by setting the transform property.
 *
 * @param element {HTMLElement}
 * @param position {{x, y}|{left, top}|Array|Vec2}
 * @param method {'top-left'|'top-right'|'bottom-left'|'bottom-right'|'translate'|'translate3d'}
 */
export function setElementClientPosition(element, position, method='top-left') {
    position = Vec2.fromVertex(position);

    if(method === 'top-left' || method === 'top-right' || method === 'bottom-left' || method === 'bottom-right') {
        let style = getComputedStyle(element);

        // position can't be static for this operation.  Switch to relative.
        if(style.position === 'static') {
            element.style.position = 'relative';
            style = getComputedStyle(element);
        }

        let left = parseInt(style.left, 10),
            top = parseInt(style.top, 10),
            right = parseInt(style.right, 10),
            bottom = parseInt(style.bottom, 10),
            box = Rect.getBoundingClientRect(element),
            deltaX = position.left - box.left,
            deltaY = position.top - box.top;

        if(method === 'top-left') {
            element.style.left = (left + deltaX) + 'px';
            element.style.top = (top + deltaY) + 'px';
            element.style.right = '';
            element.style.bottom = '';
        } else if(method === 'top-right') {
            element.style.right = (right - deltaX) + 'px';
            element.style.top = (top + deltaY) + 'px';
            element.style.left = '';
            element.style.bottom = '';
        } else if(method === 'bottom-left') {
            element.style.left = (left + deltaX) + 'px';
            element.style.bottom = (bottom - deltaY) + 'px';
            element.style.right = '';
            element.style.top = '';
        } else { // bottom-right
            element.style.right = (right - deltaX) + 'px';
            element.style.bottom = (bottom - deltaY) + 'px';
            element.style.left = '';
            element.style.top = '';
        }
    } else if(method === 'translate') {
        let box = Rect.getBoundingClientRect(element),
            deltaX = position.left - box.left,
            deltaY = position.top - box.top,
            cssPosition = getTranslation(element);

        setTranslation(element, {
            x: cssPosition.x + deltaX,
            y: cssPosition.y + deltaY
        });
    } else if(method === 'translate3d') {
        let box = Rect.getBoundingClientRect(element),
            deltaX = position.left - box.left,
            deltaY = position.top - box.top,
            cssPosition = getTranslation(element);

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
    let r = Rect.fromRect(rect);

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
    let r = Rect.fromRect(rect);

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


/**
 * Deprecated in favor of calling Rect.fromRect() class method.
 *
 * @deprecated
 * @param domRect
 * @returns {Rect}
 */
export function convertDomRectToObject(domRect) {
    return Rect.fromRect(domRect);
}


/**
 * Returns the {x, y} point calculated relative to the reference element.
 *
 * @param referenceElement
 * @param point
 * @param offset
 * @param constrain
 * @returns {Vec2}
 */
export function getPointOnElement(referenceElement, point, offset=null, constrain=null) {
    let rect = referenceElement;

    if(rect.getBoundingClientRect) {
        rect = rect.getBoundingClientRect();
    }

    if(constrain) {
        if (typeof constrain === 'string') {
            constrain = document.querySelector(constrain);
        }

        if (constrain.getBoundingClientRect) {
            constrain = Rect.fromRect(constrain.getBoundingClientRect());
        }
    }

    // Convert array to {x, y} object.
    if(Array.isArray(point)) {
        point = {
            x: point[0],
            y: point[1]
        };
    } else if(typeof point === 'string') {
        if(point === 'top-left') {
            point = {x: 0, y: 0};
        } else if(point === 'top') {
            point = {x: '50%', y: 0};
        } else if(point === 'top-right') {
            point = {x: '100%', y: 0};
        } else if(point === 'right') {
            point = {x: '100%', y: '50%'};
        } else if(point === 'bottom-right') {
            point = {x: '100%', y: '100%'};
        } else if(point === 'bottom') {
            point = {x: '50%', y: '100%'};
        } else if(point === 'bottom-left') {
            point = {x: 0, y: '100%'};
        } else if(point === 'left') {
            point = {x: 0, y: '50%'};
        } else if(point === 'middle') {
            point = {x: '50%', y: '50%'};
        } else {
            throw new Error(`Unknown point option ${point}`);
        }
    }

    if(typeof point.x === 'string') {
        point.x = (rect.right - rect.left) * (parseFloat(point.x) / 100);
    }

    if(typeof point.y === 'string') {
        point.y = (rect.bottom - rect.top) * (parseFloat(point.y) / 100);
    }

    if(constrain) {
        if(typeof constrain.left === 'string') {
            constrain.left = (rect.right - rect.left) * (parseFloat(constrain.left) / 100);
        }

        if(typeof constrain.right === 'string') {
            constrain.right = (rect.right - rect.left) * (parseFloat(constrain.right) / 100);
        }

        if(typeof constrain.top === 'string') {
            constrain.top = (rect.bottom - rect.top) * (parseFloat(constrain.top) / 100);
        }

        if(typeof constrain.bottom === 'string') {
            constrain.bottom = (rect.bottom - rect.top) * (parseFloat(constrain.bottom) / 100);
        }

        point.x = clamp(point.x, constrain.left, constrain.right);
        point.y = clamp(point.y, constrain.top, constrain.bottom);
    }

    if(offset) {
        if(Array.isArray(offset)) {
            offset = {
                x: offset[0],
                y: offset[1]
            };
        }

        if(offset.x !== null) {
            point.x += offset.x;
        }

        if(offset.y !== null) {
            point.y += offset.y;
        }
    }

    return new Vec2(rect.left + point.x, rect.top + point.y);
}


/**
 * Gets the bounding client rect for a rectangle defined by the position rectangle with left, top, right and bottom
 * properties relative to the element's position.
 *
 * @param element {{getBoundingClientRect}|Element|String|{left, top, right, bottom}}
 * @param position {{left, top, bottom, right}}
 * @return {Rect}
 */
export function getSubBoundingBox(element, position) {
    let rect;

    // Get the bounding client rect of the element.   The user should have passed either a css selector, an object with a
    // getBoundingClientRect interface.  Or a bounding client rect directly.
    if(element.getBoundingClientRect) {
        rect = element.getBoundingClientRect();
    } else if(typeof element === 'string') {
        rect = document.querySelector(element).getBoundingClientRect();
    } else {
        rect = element;
    }

    let width = rect.right - rect.left,
        height = rect.bottom - rect.top;

    // The user can pass a rect with left, top, right and bottom properties.  The value can either be the desired
    // coordinates relative to the top-left corner of the reference element or a percentage.  Another possibility
    // is that the user passes one of the keyword properties that coorispond to a specific section of the element.
    // Map those keywords to their rectangle.
    if(typeof position === 'string') {
        if(position === 'border-top') {
            position = {left: 0, right: '100%', top: 0, bottom: 0};
        } else if(position === 'border-right') {
            position = {left: '100%', right: '100%', top: 0, bottom: '100%'};
        } else if(position === 'border-bottom') {
            position = {left: 0, right: '100%', top: '100%', bottom: '100%'};
        } else if(position === 'border-left') {
            position = {left: 0, top: 0, right: 0, bottom: '100%'};
        } else if(position === 'top-left') {
            position = {left: 0, top: 0, right: 0, bottom: 0};
        } else if(position === 'top') {
            position = {top: 0, left: '50%', right: '50%', bottom: 0};
        } else if(position === 'top-right') {
            position = {top: 0, left: '100%', right: '100%', bottom: 0};
        } else if(position === 'left') {
            position = {left: 0, top: '50%', bottom: '50%', right: 0};
        } else if(position === 'origin') {
            position = {left: '50%', right: '50%', top: '50%', bottom: '50%'};
        } else if(position === 'bottom-left') {
            position = {left: 0, right: 0, top: '100%', bottom: '100%'};
        } else if(position === 'bottom') {
            position = {left: '50%', right: '50%', top: '100%', bottom: '100%'};
        } else if(position === 'bottom-right') {
            position = {left: '100%', right: '100%', top: '100%', bottom: '100%'};
        } else if(position === 'right') {
            position = {left: '100%', right: '100%', top: '50%', bottom: '50%'};
        }
    }

    position.left = position.left || 0;
    position.right = position.right || 0;
    position.top = position.top || 0;
    position.bottom = position.bottom || 0;

    // left and right percentages are a percentage of the elements width.
    // top and bottom percentages are a percentage of the elements height.
    if(typeof position.left === 'string') {
        position.left = (parseFloat(position.left) / 100) * width;
    }

    if(typeof position.right === 'string') {
        position.right = (parseFloat(position.right) / 100) * width;
    }

    if(typeof position.bottom === 'string') {
        position.bottom = (parseFloat(position.bottom) / 100) * height;
    }

    if(typeof position.top === 'string') {
        position.top = (parseFloat(position.top) / 100) * height;
    }

    // Convert to client space.
    return new Rect(
        rect.left + position.left,
        rect.top + position.top,
        rect.left + position.right,
        rect.top + position.bottom
    );
}


/**
 * Returns the distance in between the provided Rect objects.  If the objects are touching or overlapping 0
 * will be returned.
 *
 * @param rect1 {{left, top, right, bottom}}
 * @param rect2 {{left, top, right, bottom}}
 * @returns {Number}
 */
export function getDistanceBetweenRects(rect1, rect2) {
    let vec1 = Rect.fromRect(rect1),
        vec2 = Rect.fromRect(rect2);

    let isXOverlapping = vec1.isXOverlapping(vec2),
        isYOverlapping = vec1.isYOverlapping(vec2);

    if(isXOverlapping && isYOverlapping) {
        // Items are overlapping
        return 0;
    } else if(isXOverlapping) {
        return Math.min(
            Math.abs(vec1.bottom - vec2.top),
            Math.abs(vec1.top - vec2.bottom)
        );
    } else if(isYOverlapping) {
        return Math.min(
            Math.abs(vec1.right - vec2.left),
            Math.abs(vec1.left - vec2.right)
        );
    } else {
        let x1, y1, x2, y2;

        if(vec1.right <= vec2.left) {
            x1 = vec1.right;
            x2 = vec2.left;
        } else {
            x1 = vec1.left;
            x2 = vec2.right;
        }

        if(vec1.bottom <= vec2.top) {
            y1 = vec1.bottom;
            y2 = vec2.top;
        } else {
            y1 = vec1.top;
            y2 = vec2.bottom;
        }

        // Use distance formula to calculate distance.
        return Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
    }
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
 * Sets an elements position relative to the document.
 *
 * @param element
 * @param coords
 */
export function setElementOffset(element, coords) {
    if (coords.nodeType) {
        coords = getElementOffset(element);
    } else if (Array.isArray(coords)) {
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


export {Vec2, Vec3, Rect};
