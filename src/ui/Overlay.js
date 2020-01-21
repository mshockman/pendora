/**
 * @deprecated
 */

import {setElementClientPosition, getSubBoundingBox, getDistanceBetweenRects} from 'core/ui/position';
import {Rect, Vec2} from "core/vectors";
import {privateCache} from "core/data";
import {addClasses, assignAttributes} from "../core/utility/dom";
import Animation from "../core/fx/Animation";


// arrow controls the alignment of the arrow.
// position control the property that is used to position the element.
// placement is an attribute that is applied to the element.
// of is used to in a sub box of the bounding box.
const PLACEMENTS = {
    top: {my: 'bottom', at: 'top', of: 'border-top', arrow: 'bottom', placement: 'top', position: 'bottom-left'},
    right: {my: 'left', at: 'right', of: 'border-right', arrow: 'left', placement: 'right', position: 'top-left'},
    bottom: {my: 'top', at: 'bottom', of: 'border-bottom', arrow: 'top', placement: 'bottom', position: 'top-left'},
    left: {my: 'right', at: 'left', of: 'border-left', arrow: 'right', placement: 'left', position: 'top-right'}
};


function getArrowSide(align) {
    return align.split('-')[0];
}


function getArrowFloat(align) {
    let s = align.split('-');
    return s[1] || 'middle';
}



export default class Overlay {
    constructor(element, reference, {timeout=false, placements=null, container=null, sticky=false, magnetic=false, hideFX=null, showFX=null, showDuration=null, hideDuration=null, removeOnHide=false}={}) {
        if(typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
        }

        if(typeof reference === 'string') {
            this.referenceObject = document.querySelector(reference);
        } else {
            this.referenceObject = reference;
        }

        this.placements = null;

        if(placements) {
            if(!Array.isArray(placements)) {
                placements = [placements];
            }

            this.placements = placements;
        } else {
            this.placements = [];
        }

        this.container = container;
        this.sticky = sticky;
        this.magnetic = magnetic;
        this.isVisible = false;
        this.hideFX = hideFX;
        this.showFX = showFX;
        this.showDuration = showDuration;
        this.hideDuration = hideDuration;
        this.removeOnHide = removeOnHide;
        this.timeout = timeout;

        this._currentIndex = 0;
    }

    /**
     * The placement configuration and refreshes the overlays position.
     * @param placements
     */
    setPlacements(placements) {
        if(!Array.isArray(placements)) {
            placements = [placements];
        }

        this.placements = placements;
        this.refresh();
    }

    /**
     * Gets the overlays dom element's bounding client rect as a Rect object.
     * @returns {Rect}
     */
    getBoundingClientRect() {
        return Rect.getBoundingClientRect(this.element);
    }

    /**
     * Gets the reference target's bounding client rect as a Rect object.
     * @returns {null|Rect}
     */
    getReferenceRect() {
        if(this.referenceObject) {
            return Rect.fromRect(this.referenceObject.getBoundingClientRect());
        } else {
            return null;
        }
    }

    /**
     * Sets the reference target.
     *
     * @param target
     */
    setReferenceTarget(target) {
        if(typeof target === 'string') {
            this.referenceObject = document.querySelector(target);
        } else {
            this.referenceObject = target;
        }
    }

    /**
     * Refreshes the overlay position.
     */
    refresh() {
        let rect = this.getReferenceRect(), // The reference objects rect.
            elementBB = Rect.fromRect(this.element.getBoundingClientRect()),
            container = this._getContainer(elementBB),
            arrowElement = this.element.querySelector('.arrow-element');

        let flag = false,
            closestPosition = null;

        // Start with the last valid placement the loop though entire list if sticky is true.
        // Otherwise start at the begging and find the first valid placement.
        if(!this.sticky) {
            this._currentIndex = 0;
        }

        for(let i = 0; i < this.placements.length; i++) {
            let index = (this._currentIndex + i) % this.placements.length;
            let position = this.placements[index];

            // If position is a string retrieve it's options from the PLACEMENTS dictionary.
            if(typeof position === 'string') {
                position = PLACEMENTS[position];
            }

            // This forces a reflow.
            // Needed to determine any custom css that might be effecting the element.
            this.element.dataset.placement = position.placement;

            let overlay = Rect.getBoundingClientRect(this.element),
                arrowBB = arrowElement ? Rect.getBoundingClientRect(arrowElement) : null,
                anchorPoint = getSubBoundingBox(overlay, position.my).subtract(overlay).toPoint(), // The anchor point on the target element relative to the top-left corner of the element.
                space = getSubBoundingBox(rect, position.of),
                unBoundedSubspace = this._getAllowedSubspace(position, space, rect, arrowElement, overlay, anchorPoint, arrowBB),
                subspace = unBoundedSubspace;

            if(container) {
                // Pad container to account for anchor point offset.
                let paddedContainer = container.add(new Rect(
                    anchorPoint.x,
                    anchorPoint.y,
                    -(overlay.width) + anchorPoint.x,
                    -(overlay.height) + anchorPoint.y
                ));

                subspace = subspace.intersection(paddedContainer);
            }

            if(subspace) {
                let pos = this._getDefaultPosition(position, rect);

                pos = pos.clamp(subspace);

                pos = pos.subtract(anchorPoint);
                overlay = overlay.moveTo(pos);

                this._applyPosition(position, overlay, arrowElement, arrowBB, rect);
                flag = true;
                this._currentIndex = index;

                break;
            } else {
                // No subspace.  See if it's the closest position.
                let anchorSpacePadding = this._getAnchorSpacePadding(position, overlay, anchorPoint);

                let paddedSpace = unBoundedSubspace.subtract(anchorSpacePadding);

                if(this.magnetic instanceof Rect) {
                    paddedSpace = paddedSpace.addMargins(this.magnetic);
                }

                let delta = getDistanceBetweenRects(container, paddedSpace);

                if(closestPosition === null || closestPosition.distance > delta) {
                    closestPosition = {
                        distance: delta,
                        space: space,
                        subspace: unBoundedSubspace,
                        position: position,
                        overlay: overlay,
                        anchorPoint: anchorPoint,
                        arrowElement: arrowElement,
                        arrowBB: arrowBB,
                        rect: rect,
                        container: container
                    };
                }
            }
        }

        // Apply the closest valid position.
        if(!flag && closestPosition) {
            // This forces a reflow.
            this.element.dataset.placement = closestPosition.position.placement;

            let overlay;

            if(this.magnetic === true) {
                let pos = this._getDefaultPosition(closestPosition.position, closestPosition.rect);

                pos = pos.clamp(container).clamp(closestPosition.subspace).subtract(closestPosition.anchorPoint);
                overlay = closestPosition.overlay.moveTo(pos);

                overlay = overlay.clamp(container);
            } else if(this.magnetic instanceof Rect) {
                let pos = this._getDefaultPosition(closestPosition.position, closestPosition.rect);

                let paddedContainer = container.addMargins(this.magnetic);

                pos = pos.clamp(paddedContainer).clamp(closestPosition.subspace).subtract(closestPosition.anchorPoint);
                overlay = closestPosition.overlay.moveTo(pos);

                overlay = overlay.clamp(paddedContainer);
            } else {
                let pos = this._getDefaultPosition(closestPosition.position, closestPosition.rect);

                pos = pos.clamp(container).clamp(closestPosition.subspace).subtract(closestPosition.anchorPoint);
                overlay = closestPosition.overlay.moveTo(pos);
            }

            this._applyPosition(closestPosition.position, overlay, closestPosition.arrowElement, closestPosition.arrowBB, closestPosition.rect);
        }
    }

    appendTo(element) {
        if(typeof element === 'string') {
            document.querySelector(element).appendChild(this.element);
        } else if(element.appendChild) {
            element.appendChild(this.element);
        } else if(element.append) {
            element.append(this.element);
        }
    }

    remove() {
        if(this.element && this.element.parentElement) {
            this.element.parentElement.removeChild(this.element);
            return true;
        }

        return false;
    }

    /**
     * Shows the overlay, triggering animation and then call the callback after the animation finishes.
     * @param callback
     */
    show(callback) {
        if(!this.isVisible) {
            this.clearTimeout();

            if(this._fx) {
                this._fx.cancel(true);
                this._fx = null;
            }

            this.isVisible = true;

            // Append to document if not in tree.
            if(!this.element.parentElement && this.referenceObject && this.referenceObject.parentElement) {
                this.referenceObject.parentElement.appendChild(this.element);
            }

            this.element.classList.remove('hidden');

            if(typeof this.hideFX === 'string') {
                this.element.classList.remove(this.hideFX);
            }

            // In order to calculate the position.  We need to clear any style properties effecting the true
            // width and height of the element.  Slide in and slide out effects should use the maxWidth and maxHeight
            // properties to control it's size.  Save and then clear them off the element; then calculate the position;
            // finally restore the original properties.
            let properties = ['maxWidth', 'maxHeight'],
                save = {};

            for(let p of properties) {
                save[p] = this.element.style[p];
                this.element.style[p] = '';
            }

            this.refresh();

            for(let p of properties) {
                this.element.style[p] = save[p];
            }

            let onEnd = (animation) => {
                if(callback) callback.call(this, animation);

                if (typeof this.timeout === 'number' && this.timeout >= 0) {
                    this._timeoutTimer = setTimeout(() => {
                        this._timeoutTimer = null;
                        this.hide();
                    }, this.timeout);
                }
            };

            if(this.showFX) {
                if(typeof this.showFX === 'string') {
                    this.element.classList.add(this.showFX);
                    if(callback) callback.call(this);

                    if (typeof this.timeout === 'number' && this.timeout >= 0) {
                        this._timeoutTimer = setTimeout(() => {
                            this._timeoutTimer = null;
                            this.hide();
                        }, this.timeout);
                    }
                } else if(typeof this.showFX === 'function') {
                    this._fx = this.showFX(this.element, this.showDuration, {onEnd});
                } else {
                    this._fx = this.showFX.animate(this.element, this.showDuration, {onEnd});
                }
            }
        }
    }

    /**
     * Hides the overlay, triggering animation and then calls the callback after the animation finishes.
     * @param callback
     */
    hide(callback) {
        if(this.isVisible) {
            this.isVisible = false;

            if(this._fx) {
                this._fx.cancel(true);
                this._fx = null;
            }

            if(typeof this.showFX === 'string') {
                this.element.classList.remove(this.showFX);
            }

            if(typeof this.hideFX === 'string') {
                this.element.classList.add(this.hideFX);
                this.element.classList.add('hidden');
                if(callback) callback.call(this);

                if(this.removeOnHide) {
                    this.remove();
                }
            } else if(typeof this.hideFX === 'function') {
                this._fx = this.hideFX(this.element, this.hideDuration, {
                    onEnd: (animation) => {
                        this.element.classList.add('hidden');
                        this._fx = null;
                        if(callback) callback.call(this, animation);

                        if(this.removeOnHide) {
                            this.remove();
                        }
                    }
                });
            } else if(this.hideFX && typeof this.hideFX.animate === 'function') {
                this._fx = this.hideFX.animate(this.element, this.hideDuration, {
                    onEnd: (animation) => {
                        this.element.classList.add('hidden');
                        this._fx = null;
                        if(callback) callback.call(this, animation);

                        if(this.removeOnHide) {
                            this.remove();
                        }
                    }
                });
            } else {
                this.element.classList.add('hidden');
                if(callback) callback.call(this);

                if(this.removeOnHide) {
                    this.remove();
                }
            }

            this.clearTimeout();
        }
    }

    /**
     * Clears the timeout timer.
     */
    clearTimeout() {
        if(this._timeoutTimer) {
            clearTimeout(this._timeoutTimer);
            this._timeoutTimer = null;
        }
    }

    /**
     * Toggles the overlay visible or hidden.  Will trigger animations!  Callback is called after the animation has finished.
     * @param callback
     */
    toggle(callback) {
        if(this.isVisible) {
            if(callback) {
                callback = () => {
                    callback.call(this, 'hide');
                };
            }

            return this.hide(callback);
        } else {
            if(callback) {
                callback = () => {
                    callback.call(this, 'show');
                };
            }

            return this.show(callback);
        }
    }

    /**
     * Returns the bounding client rect that defines the container space.
     * Returns null if unbounded.
     * @param elementBB
     * @returns {null|{Rect}}
     * @private
     */
    _getContainer(elementBB) {
        let container = null;

        if(this.container) {
            if(typeof this.container === 'function') {
                container = this.container.call(this, this.element);
            } else if(typeof this.container === 'string') {
                container = document.querySelector(this.container).getBoundingClientRect();
            } else if(this.container.getBoundingClientRect) {
                container = this.container.getBoundingClientRect();
            } else {
                container = this.container;
            }

            container = Rect.fromRect(container);
        }

        return container;
    }

    /**
     * Applies the position to the overlay and arrow dom elements.
     *
     * @param position - The position configuration object.
     * @param overlay - The final position for the overlay to be applied.
     * @param arrowElement - The arrow dom element.
     * @param arrowBB - The arrows current rect.
     * @param reference - The reference targets rect.
     * @private
     */
    _applyPosition(position, overlay, arrowElement, arrowBB, reference) {
        // Set the dom element to the overlay position from the position point.
        setElementClientPosition(this.element, overlay, position.position); // position.position will be the method to position the element, aka top-left.

        // Set the arrow elements position if needed.
        if(arrowElement && arrowBB) {
            let arrowPos = new Vec2(arrowBB.left, arrowBB.top),
                arrowSide = getArrowSide(position.arrow),
                arrowAlign = getArrowFloat(position.arrow);

            if (arrowSide === 'top' || arrowSide === 'bottom') {
                arrowPos.left = overlay.left;

                if (arrowAlign === 'middle') {
                    arrowPos.left += (overlay.width / 2) - (arrowBB.width / 2);
                } else if (arrowAlign === 'end') {
                    arrowPos.left += (overlay.width - arrowBB.width);
                }
            } else if (arrowSide === 'left' || arrowSide === 'right') {
                arrowPos.top = overlay.top;

                if (arrowAlign === 'middle') {
                    arrowPos.top += (overlay.height / 2) - (arrowBB.height / 2);
                } else if (arrowAlign === 'end') {
                    arrowPos.top += (overlay.height - arrowBB.height);
                }
            }

            arrowPos = arrowPos.clamp(reference.subtract(new Rect(0, 0, arrowBB.width, arrowBB.height)));
            arrowPos = arrowPos.clamp(overlay.subtract(new Rect(0, 0, arrowBB.width, arrowBB.height)));
            arrowPos = arrowPos.subtract(overlay); // Convert to overlay space as it should be the offset parent.

            if (arrowSide === 'top' || arrowSide === 'bottom') {
                arrowElement.style.left = arrowPos.left + 'px';
                arrowElement.style.top = '';
            } else if (arrowSide === 'left' || arrowSide === 'right') {
                arrowElement.style.top = arrowPos.top + 'px';
                arrowElement.style.left = '';
            }
        }
    }

    _getDefaultPosition(position, referenceElementRect) {
        let reference = getSubBoundingBox(referenceElementRect, position.of),
            pos = getSubBoundingBox(reference, position.at);

        return new Rect(pos.left, pos.top, pos.left, pos.top);
    }

    /**
     * Subtracts the space needed for the anchor offset and arrow element from the allowed space.
     *
     * @param position - Position configuration object.
     * @param space - The currently allowed space.
     * @param referenceBB - Reference element rectangle.
     * @param arrowElement - The arrow dom element.
     * @param overlay - The overlay elements bounding box.
     * @param anchorPoint - The offset point of the overlay we are positioning from .
     * @param arrowBB - The arrow dom elements bounding box.
     * @returns {*}
     * @private
     */
    _getAllowedSubspace(position, space, referenceBB, arrowElement, overlay, anchorPoint, arrowBB) {
        let arrowSpacePadding = this._getArrowSpacePadding(position, arrowBB),
            anchorSpacePadding = this._getAnchorSpacePadding(position, overlay, anchorPoint);

        return space.add(arrowSpacePadding).add(anchorSpacePadding);
    }

    /**
     * Determine the padding that needs to be removed because of the anchor point of the element we are positioning.
     *
     * @param position
     * @param overlay
     * @param anchorPoint
     * @returns {Rect}
     * @private
     */
    _getAnchorSpacePadding(position, overlay, anchorPoint) {
        let anchorSpacePadding = new Rect(0, 0, 0, 0);

        // Calculate container padding because of arrows and the offset of the overlays anchor point.
        if(position.of === 'border-top' || position.of === 'border-bottom') {
            anchorSpacePadding = new Rect(
                -(overlay.width) + anchorPoint.x,
                0,
                anchorPoint.x,
                0
            );
        } else if(position.of === 'border-left' || position.of === 'border-right') {
            anchorSpacePadding = new Rect(
                0,
                -(overlay.height) + anchorPoint.y,
                0,
                anchorPoint.y
            );
        }

        return anchorSpacePadding;
    }

    /**
     * Returns the padding that is needed to account for the arrow.
     *
     * @param position
     * @param arrowBB
     * @returns {Rect}
     * @private
     */
    _getArrowSpacePadding(position, arrowBB) {
        let arrowSpacePadding = new Rect(0, 0, 0, 0);

        if(arrowBB) {
            // Calculate container padding because of arrows and the offset of the overlays anchor point.
            if (position.of === 'border-top' || position.of === 'border-bottom') {
                arrowSpacePadding = new Rect(arrowBB.width, 0, -arrowBB.width, 0);
            } else if (position.of === 'border-left' || position.of === 'border-right') {
                arrowSpacePadding = new Rect(0, arrowBB.height, 0, -arrowBB.height);
            }
        }

        return arrowSpacePadding;
    }
}


export function notificationTemplate(context) {
    let element = document.createElement('div'),
        body = document.createElement('div'),
        textContainer = document.createElement('div');


    element.className = 'notification';
    body.className = 'notification__body';
    textContainer.className = 'notification__text';
    textContainer.innerHTML = context.message;

    body.appendChild(textContainer);

    if(context.button) {
        let cancel = document.createElement('button'),
            confirm = document.createElement('button'),
            controls = document.createElement('div');

        cancel.type = 'button';
        confirm.type = 'button';

        cancel.dataset.action = 'dismiss';
        cancel.innerHTML = 'Cancel';
        confirm.innerHTML = context.button;

        controls.className = 'notifications__controls';
        controls.appendChild(cancel);
        controls.appendChild(confirm);
        body.appendChild(controls);
    }

    if(context.arrow) {
        let arrowElement = document.createElement('div');
        arrowElement.className = 'arrow-element notification__arrow';
        body.appendChild(arrowElement);
    }

    element.appendChild(body);

    return element;
}


export function tooltipTemplate(context) {
    let element = document.createElement('div'),
        body = document.createElement('div'),
        textContainer = document.createElement('div');


    element.className = 'tooltip';
    body.className = 'tooltip__body';
    textContainer.className = 'tooltip__text';
    textContainer.innerHTML = context.text;

    body.appendChild(textContainer);

    if(context.arrow) {
        let arrowElement = document.createElement('div');
        arrowElement.className = 'arrow-element tooltip__arrow';
        body.appendChild(arrowElement);
    }

    element.appendChild(body);

    return element;
}


const slideInTooltipFX = new Animation({
    /**
     * @param element {HTMLElement}
     * @returns {{"100%": {maxWidth: *}, "0%": {maxWidth: *}}|{"100%": {maxHeight: *}, "0%": {maxHeight: *}}}
     */
    frames(element) {
        let cache = privateCache.cache(element),
            placement = element.dataset.placement;

        if (placement === 'top' || placement === 'bottom') {
            return {
                '0%': {
                    maxHeight: cache.fxHeight,
                },

                '100%': {
                    maxHeight: cache.fxMaxHeight
                }
            };
        } else {
            return {
                '0%': {
                    maxWidth: cache.fxWidth,
                },

                '100%': {
                    maxWidth: cache.fxMaxWidth
                }
            };
        }
    },

    applyFrame(element, frame) {
        let cache = privateCache.cache(element),
            placement = element.dataset.placement;

        if (placement === 'top' || placement === 'bottom') {
            element.style.maxHeight = `${frame.maxHeight}px`;
            cache.fxHeight = frame.maxHeight;
        } else {
            element.style.maxWidth = `${frame.maxWidth}px`;
            cache.fxWidth = frame.maxWidth;
        }
    },

    init(element, animation) {
        let cache = privateCache.cache(element),
            placement = element.dataset.placement;

        if (cache.fxSlidePlacement !== placement) {
            // Get max width and height
            element.style.maxWidth = '';
            element.style.maxHeight = '';

            let box = Rect.getBoundingClientRect(element);
            cache.fxMaxHeight = box.bottom - box.top;
            cache.fxMaxWidth = box.right - box.left;

            // When slide in starts, fxWidth and fxHeight are set to 0 at first so that the first animation
            // starts at the beginning.
            cache.fxHeight = 0;
            cache.fxWidth = 0;

            // Set the current placement so we no when the overlay changes position
            // and fx data needs to be recalculated.
            cache.fxSlidePlacement = placement;
        }

        cache.slideFX = animation;
    },

    destroy(element) {
        let cache = privateCache.cache(element);
        cache.slideFX = null;
    }
});


const slideOutTooltipFX = new Animation({
    /**
     * @param element {HTMLElement}
     * @returns {{"100%": {maxWidth: number}, "0%": {maxWidth: *}}|{"100%": {maxHeight: number}, "0%": {maxHeight: *}}}
     */
    frames(element) {
        let cache = privateCache.cache(element),
            placement = element.dataset.placement;

        if (placement === 'top' || placement === 'bottom') {
            return {
                '0%': {
                    maxHeight: cache.fxHeight,
                },

                '100%': {
                    maxHeight: 0
                }
            };
        } else {
            return {
                '0%': {
                    maxWidth: cache.fxWidth,
                },

                '100%': {
                    maxWidth: 0
                }
            };
        }
    },

    applyFrame(element, frame) {
        let cache = privateCache.cache(element),
            placement = element.dataset.placement;

        if (placement === 'top' || placement === 'bottom') {
            element.style.maxHeight = `${frame.maxHeight}px`;
            cache.fxHeight = frame.maxHeight;
        } else {
            element.style.maxWidth = `${frame.maxWidth}px`;
            cache.fxWidth = frame.maxWidth;
        }
    },

    init(element, animation) {
        let cache = privateCache.cache(element),
            placement = element.dataset.placement;

        if (cache.fxSlidePlacement !== placement) {
            // Get max width and height
            element.style.maxWidth = '';
            element.style.maxHeight = '';

            let box = Rect.getBoundingClientRect(element);
            cache.fxMaxHeight = box.bottom - box.top;
            cache.fxMaxWidth = box.right - box.left;

            // Start at max height and width.
            cache.fxHeight = cache.fxMaxHeight;
            cache.fxWidth = cache.fxMaxWidth;

            // Set the current placement so we no when the overlay changes position
            // and fx data needs to be recalculated.
            cache.fxSlidePlacement = placement;
        }

        cache.slideFX = animation;
    },

    destroy(element) {
        let cache = privateCache.cache(element);
        cache.slideFX = null;
    }
});


export const slideDownFX = new Animation({
    /**
     *
     * @param element {HTMLElement}
     */
    frames: (element) => {
        let cache = privateCache.cache(element),
            style = getComputedStyle(element);

        return {
            '0%': {
                maxHeight: style.maxHeight,
            },

            '100%': {
                maxHeight: cache.fxCache.maxHeight
            }
        };
    },

    init(element) {
        let cache = privateCache.cache(element);

        if(!cache.fxCache) {
            cache.fxCache = {};

            element.style.maxHeight = '';
            element.style.maxWidth = '';

            let box = Rect.getBoundingClientRect(element);

            cache.fxCache.maxWidth = box.width+'px';
            cache.fxCache.maxHeight = box.height+'px';

            element.style.maxWidth = '0px';
            element.style.maxHeight = '0px';
        }
    }
});


export const slideUpFX = new Animation({
    /**
     *
     * @param element {HTMLElement}
     */
    frames: (element) => {
        let box = Rect.getBoundingClientRect(element);

        return {
            '0%': {
                maxHeight: box.height + 'px'
            },

            '100%': {
                maxHeight: '0px'
            }
        };
    }
});


//----------------------------------------------------------------------------------------------------------------------
//


export class Tooltip extends Overlay {
    static styles = {};

    // noinspection JSCheckFunctionSignatures
    constructor({text, reference, style='success', placements=['top'], container=null, magnetic=true, showFX=slideInTooltipFX, hideFX=slideOutTooltipFX, showDuration=200, hideDuration=200, classes=null, removeOnHide=false, arrow=true, sticky=true, timeout=2000, ...context}) {
        let template = Tooltip.styles[style],
            templateFN = template.template || tooltipTemplate,
            element = templateFN({text, arrow, template, ...context});

        if(template.className) addClasses(element, template.className);
        if(template.style) Object.assign(element.style, template.style);
        if(template.attributes) assignAttributes(element, template.attributes);

        if(classes) addClasses(element, classes);
        element.classList.add('hidden');

        super(element, reference, {
            timeout, placements, container, sticky, magnetic, hideFX, hideDuration, showFX, showDuration, removeOnHide
        });

        if(reference && reference.offsetParent) {
            reference.offsetParent.appendChild(this.element);
        }
    }

    static notify(target, message, style, config) {
        let tooltip = new Tooltip({text: message, reference: target, classes: style, ...config});

        let currentTooltip = privateCache.get(target, 'tooltip');

        if(currentTooltip) {
            currentTooltip.remove();
        }

        privateCache.set(target, 'tooltip', tooltip);

        tooltip.appendTo(target);
        tooltip.show();
        return tooltip;
    }
}


Tooltip.styles.success = {
    template: tooltipTemplate,
    className: 'success',
    style: null,
    attributes: null
};


Tooltip.styles.error = {
    template: tooltipTemplate,
    className: 'error',
    style: null,
    attributes: null
};


Tooltip.styles.warning = {
    template: tooltipTemplate,
    className: 'warning',
    style: null,
    attributes: null
};


Tooltip.styles.info = {
    template: tooltipTemplate,
    className: 'info',
    style: null,
    attributes: null
};


export class Notification extends Overlay {
    static styles = {};

    // noinspection JSCheckFunctionSignatures
    constructor({message, classes=null, timeout=5000, style='success', showFX=slideDownFX,
                    showDuration=200, hideFX=slideUpFX, hideDuration=200, removeOnHide=true, closeOnClick=false,
                    onConfirm=null, ...context}) {
        let template = Notification.styles[style],
            templateFN = template.template || notificationTemplate;

        let element = templateFN({
            message,
            template,
            ...context
        });

        if(template.className) addClasses(element, template.className);
        if(template.style) Object.assign(element.style, template.style);
        if(template.attributes) assignAttributes(element, template.attributes);

        if(classes) addClasses(element, classes);
        element.classList.add('hidden');

        super(
            element,
            null,
            {
                timeout,
                hideFX,
                showFX,
                hideDuration,
                showDuration,
                removeOnHide,
                closeOnClick
            }
        );

        this.closeOnClick = closeOnClick;
        this.onConfirm = onConfirm;

        this.element.addEventListener('click', (event) => {
            let btn = event.target.closest('button, .btn');

            if(btn) {
                if(btn.dataset.action === 'dismiss') {
                    this.hide();
                    return;
                }

                let value = btn.value || btn.dataset.value;

                if(this.onConfirm) {
                    this.onConfirm(event, value);
                }

                this.element.dispatchEvent(new CustomEvent('notification.confirm', {
                    bubbles: true,
                    detail: {
                        notification: this,
                        value: value
                    }
                }));

                this.hide();
                return;
            }

            if(this.closeOnClick) {
                this.hide();
            }
        });
    }

    appendTo(element) {
        if(typeof element === 'string') {
            element = element.trim();

            if(element[0] === '.' || element[0] === '#') {
                super.appendTo(element);
            } else {
                let parentId = `nc-${element}`;

                let parent = document.getElementById(parentId);

                if(!parent) {
                    parent = document.createElement('div');
                    parent.id = parentId;
                    parent.className = 'notification-container';
                }

                document.body.appendChild(parent);
                super.appendTo(parent);
            }
        } else if(element) {
            super.appendTo(element);
        }
    }

    static notify(message, style, placement, config) {
        if(typeof style === 'object') {
            config = style;
            style = config.style || 'success';
            placement = config.placement || 'top-right';
        }

        let notification = new Notification({
            message,
            classes: style,
            ...config
        });

        notification.appendTo(placement);
        notification.show();
        return notification;
    }
}


Notification.styles.success = {
    template: notificationTemplate,
    className: 'success',
    style: null,
    attributes: null
};


Notification.styles.error = {
    template: notificationTemplate,
    className: 'error',
    style: null,
    attributes: null
};


Notification.styles.warning = {
    template: notificationTemplate,
    className: 'warning',
    style: null,
    attributes: null
};


Notification.styles.info = {
    template: notificationTemplate,
    className: 'info',
    style: null,
    attributes: null
};
