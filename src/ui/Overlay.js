import {setElementClientPosition, getSubBoundingBox, getDistanceBetweenRects} from 'core/position';
import {Vec4, Vec2} from "core/vectors";
import Animation from "core/Animation";
import {privateCache} from "core/data";


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



export default class Overlay {
    /**
     * @constructor
     * @param element
     * @param reference
     * @param placements
     * @param container
     * @param arrow
     * @param sticky
     * @param magnetic
     * @param hideFX
     * @param showFX
     */
    constructor(element, reference, {placements=null, container=null, arrow=null, sticky=false, magnetic=false, hideFX=null, showFX=null}={}) {
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
        }

        this.container = container;
        this.sticky = sticky;
        this.magnetic = magnetic;
        this.isVisible = false;
        this.hideFX = hideFX;
        this.showFX = showFX;

        if(arrow) {
            let arrowElement = document.createElement('div');
            arrowElement.classList.add('arrow-element');
            this.element.appendChild(arrowElement);
        }

        this._currentIndex = 0;
    }

    setPlacements(placements) {
        if(!Array.isArray(placements)) {
            placements = [placements];
        }

        this.placements = placements;
        this.refresh();
    }

    getBoundingClientRect() {
        return Vec4.getBoundingClientRect(this.element);
    }

    refresh() {
        let rect = Vec4.fromRect(this.referenceObject.getBoundingClientRect()),
            elementBB = Vec4.fromRect(this.element.getBoundingClientRect()),
            container = this._getContainer(elementBB),
            arrowElement = this.element.querySelector('.arrow-element');

        let flag = false,
            closestPosition = null;

        if(!this.sticky) {
            this._currentIndex = 0;
        }

        for(let i = 0; i < this.placements.length; i++) {
            let index = (this._currentIndex + i) % this.placements.length;
            let position = this.placements[index];

            if(typeof position === 'string') {
                position = PLACEMENTS[position];
            }

            // This forces a reflow.
            this.element.dataset.placement = position.placement;

            let overlay = Vec4.getBoundingClientRect(this.element),
                arrowBB = Vec4.getBoundingClientRect(arrowElement),
                anchorPoint = getSubBoundingBox(overlay, position.my).subtract(overlay).toPoint(),
                space = getSubBoundingBox(rect, position.of),
                unBoundedSubspace = this._getAllowedSubspace(position, space, rect, arrowElement, overlay, anchorPoint, arrowBB),
                subspace = unBoundedSubspace;

            if(container) {
                // Pad container to account for anchor point offset.
                let paddedContainer = container.add(new Vec4(
                    anchorPoint.x,
                    anchorPoint.y,
                    -(overlay.width) + anchorPoint.x,
                    -(overlay.height) + anchorPoint.y
                ));

                subspace = subspace.intersection(paddedContainer);
            }

            if(!subspace) {
                let anchorSpacePadding = this._getAnchorSpacePadding(position, overlay, arrowBB, anchorPoint);

                let paddedSpace = unBoundedSubspace.subtract(anchorSpacePadding);

                if(this.magnetic instanceof Vec4) {
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

                continue;
            }

            let pos = this._getDefaultPosition(position, rect);

            pos = pos.clamp(subspace);

            pos = pos.subtract(anchorPoint);
            overlay = overlay.moveTo(pos);

            this._applyPosition(position, overlay, arrowElement, arrowBB, rect);
            flag = true;
            this._currentIndex = index;

            break;
        }

        if(!flag && closestPosition) {
            // This forces a reflow.
            this.element.dataset.placement = closestPosition.position.placement;

            let overlay;

            if(this.magnetic === true) {
                let pos = this._getDefaultPosition(closestPosition.position, closestPosition.rect);

                pos = pos.clamp(container).clamp(closestPosition.subspace).subtract(closestPosition.anchorPoint);
                overlay = closestPosition.overlay.moveTo(pos);

                overlay = overlay.clamp(container);
            } else if(this.magnetic instanceof Vec4) {
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

    show(callback) {
        if(!this.isVisible) {
            if(this._fx) {
                this._fx.cancel(true);
                this._fx = null;
            }

            this.isVisible = true;

            // Append to document if not in tree.
            if(!this.element.parentElement && this.referenceObject && this.referenceObject.offsetParent) {
                this.referenceObject.offsetParent.appendChild(this.element);
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

            if(this.showFX) {
                if(typeof this.showFX === 'string') {
                    this.element.classList.add(this.showFX);
                    if(callback) callback.call(this);
                } else if(typeof this.showFX === 'function') {
                    this._fx = this.showFX(this.element, {
                        onEnd: (animation) => {
                            if(callback) callback.call(this, animation);
                        }
                    });
                }
            }
        }
    }

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
            } else if(typeof this.hideFX === 'function') {
                this._fx = this.hideFX(this.element, {
                    onEnd: (animation) => {
                        this.element.classList.add('hidden');
                        this._fx = null;
                        if(callback) callback.call(this, animation);
                    }
                });
            } else {
                this.element.classList.add('hidden');
                if(callback) callback.call(this);
            }
        }
    }

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
     * @returns {null|{Vec4}}
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

            container = Vec4.fromRect(container);
        }

        return container;
    }

    _applyPosition(position, overlay, arrowElement, arrowBB, reference) {
        setElementClientPosition(this.element, overlay, position.position);

        let arrowPos = new Vec2(arrowBB.left, arrowBB.top),
            arrowSide = getArrowSide(position.arrow),
            arrowAlign = getArrowFloat(position.arrow);

        if(arrowSide === 'top' || arrowSide === 'bottom') {
            arrowPos.left = overlay.left;

            if(arrowAlign === 'middle') {
                arrowPos.left += (overlay.width / 2) - (arrowBB.width / 2);
            } else if(arrowAlign === 'end') {
                arrowPos.left += (overlay.width - arrowBB.width);
            }
        } else if(arrowSide === 'left' || arrowSide === 'right') {
            arrowPos.top = overlay.top;

            if(arrowAlign === 'middle') {
                arrowPos.top += (overlay.height / 2) - (arrowBB.height / 2);
            } else if(arrowAlign === 'end') {
                arrowPos.top += (overlay.height - arrowBB.height);
            }
        }

        arrowPos = arrowPos.clamp(reference.subtract(new Vec4(0, 0, arrowBB.width, arrowBB.height)));
        arrowPos = arrowPos.clamp(overlay.subtract(new Vec4(0, 0, arrowBB.width, arrowBB.height)));
        arrowPos = arrowPos.subtract(overlay);

        if(arrowSide === 'top' || arrowSide === 'bottom') {
            arrowElement.style.left = arrowPos.left + 'px';
            arrowElement.style.top = '';
        } else if(arrowSide === 'left' || arrowSide === 'right') {
            arrowElement.style.top = arrowPos.top + 'px';
            arrowElement.style.left = '';
        }
    }

    _getDefaultPosition(position, referenceElementRect) {
        let reference = getSubBoundingBox(referenceElementRect, position.of),
            pos = getSubBoundingBox(reference, position.at);

        return new Vec4(pos.left, pos.top, pos.left, pos.top);
    }

    _getAllowedSubspace(position, space, referenceBB, arrowElement, overlay, anchorPoint, arrowBB) {
        let arrowSpacePadding = this._getArrowSpacePadding(position, arrowBB),
            anchorSpacePadding = this._getAnchorSpacePadding(position, overlay, arrowBB, anchorPoint);

        return space.add(arrowSpacePadding).add(anchorSpacePadding);
    }

    _getAnchorSpacePadding(position, overlay, arrowBB, anchorPoint) {
        let anchorSpacePadding = new Vec4(0, 0, 0, 0);

        // Calculate container padding because of arrows and the offset of the overlays anchor point.
        if(position.of === 'border-top' || position.of === 'border-bottom') {
            anchorSpacePadding = new Vec4(
                -(overlay.width) + anchorPoint.x,
                0,
                anchorPoint.x,
                0
            );
        } else if(position.of === 'border-left' || position.of === 'border-right') {
            anchorSpacePadding = new Vec4(
                0,
                -(overlay.height) + anchorPoint.y,
                0,
                anchorPoint.y
            );
        }

        return anchorSpacePadding;
    }

    _getArrowSpacePadding(position, arrowBB) {
        let arrowSpacePadding = new Vec4(0, 0, 0, 0);

        if(arrowBB) {
            // Calculate container padding because of arrows and the offset of the overlays anchor point.
            if (position.of === 'border-top' || position.of === 'border-bottom') {
                arrowSpacePadding = new Vec4(arrowBB.width, 0, -arrowBB.width, 0);
            } else if (position.of === 'border-left' || position.of === 'border-right') {
                arrowSpacePadding = new Vec4(0, arrowBB.height, 0, -arrowBB.height);
            }
        }

        return arrowSpacePadding;
    }
}


function getArrowSide(align) {
    return align.split('-')[0];
}


function getArrowFloat(align) {
    let s = align.split('-');
    return s[1] || 'middle';
}


export function slideOutEffectFactory(time) {
    return function slideOut(element, {onEnd=null}={}) {
        let placement = element.dataset.placement,
            cache = privateCache.cache(element);

        if(cache.fxSlidePlacement!== placement) {
            // Get max width and height
            element.style.maxWidth = '';
            element.style.maxHeight = '';

            let box = Vec4.getBoundingClientRect(element);
            cache.fxMaxHeight = box.bottom - box.top;
            cache.fxMaxWidth = box.right - box.left;

            // Start at max height and width.
            cache.fxHeight = cache.fxMaxHeight;
            cache.fxWidth = cache.fxMaxWidth;

            // Set the current placement so we no when the overlay changes position
            // and fx data needs to be recalculated.
            cache.fxSlidePlacement = placement;
        }

        // Only one slide in / out effect can be animating at a time.
        if(cache.slideFX) {
            cache.slideFX.cancel(false);
            cache.slideFX = null;
        }

        if(placement === 'top' || placement === 'bottom') {
            let animation = new Animation({
                '0%': {
                    maxHeight: cache.fxHeight,
                },

                '100%': {
                    maxHeight: 0
                }
            }, {
                applyFrame(element, frame) {
                    element.style.maxHeight = `${frame.maxHeight}px`;
                    cache.fxHeight = frame.maxHeight;
                },

                onEnd() {
                    if(onEnd) onEnd();
                    cache.slideFX = null;
                }
            });

            cache.slideFX = animation;

            return animation.animate(element, time);
        } else {
            let animation = new Animation({
                '0%': {
                    maxWidth: cache.fxWidth,
                },

                '100%': {
                    maxWidth: 0
                }
            }, {
                applyFrame(element, frame) {
                    element.style.maxWidth = `${frame.maxWidth}px`;
                    cache.fxWidth = frame.maxWidth;
                },

                onEnd() {
                    if(onEnd) onEnd();
                    cache.slideFX = null;
                }
            });

            cache.slideFX = animation;

            return animation.animate(element, time);
        }
    }
}



export function slideInEffectFactory(time) {
    return function(element, {onEnd=null, onStart=null}={}) {
        let cache = privateCache.cache(element),
            placement = element.dataset.placement;

        if(cache.slideFX) {
            cache.slideFX.cancel(false);
            cache.slideFX = null;
        }

        if(cache.fxSlidePlacement !== placement) {
            // Get max width and height
            element.style.maxWidth = '';
            element.style.maxHeight = '';

            let box = Vec4.getBoundingClientRect(element);
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

        if(placement === 'top' || placement === 'bottom') {
            let animation = new Animation({
                '0%': {
                    maxHeight: cache.fxHeight,
                },

                '100%': {
                    maxHeight: cache.fxMaxHeight
                }
            }, {
                applyFrame(element, frame) {
                    element.style.maxHeight = `${frame.maxHeight}px`;
                    cache.fxHeight = frame.maxHeight;
                },

                onEnd() {
                    if(onEnd) onEnd();
                    cache.slideFX = null;
                }
            });

            cache.slideFX = animation;

            return animation.animate(element, time);
        } else {
            let animation = new Animation({
                '0%': {
                    maxWidth: cache.fxWidth,
                },

                '100%': {
                    maxWidth: cache.fxMaxWidth
                }
            }, {
                applyFrame(element, frame) {
                    element.style.maxWidth = `${frame.maxWidth}px`;
                    cache.fxWidth = frame.maxWidth;
                },

                onEnd() {
                    if(onEnd) onEnd();
                    cache.slideFX = null;
                }
            });

            cache.slideFX = animation;

            return animation.animate(element, time);
        }
    }
}



export class Tooltip {
    constructor({text, reference, placements=['top'], container=null, magnetic=true, showFX=slideInEffectFactory(200), hideFX=slideOutEffectFactory(200), className=null, removeOnHide=false}) {
        this.element = document.createElement('div');
        this.tooltipBody = document.createElement('div');
        this.tooltipBody.className = "tooltip__body";
        this.textElement = document.createElement('div');
        this.textElement.className = "tooltip__text";
        this.textElement.innerHTML = text;
        this.tooltipBody.appendChild(this.textElement);

        let arrowElement = document.createElement('div');
        arrowElement.className = 'arrow-element';
        this.tooltipBody.appendChild(arrowElement);

        this.element.appendChild(this.tooltipBody);
        this.element.className = "tooltip hidden";
        this.removeOnHide = removeOnHide;

        if(className) {
            this.element.classList.add(className);
        }

        this.overlay = new Overlay(this.element, reference, {placements, container, magnetic, showFX, hideFX});

        if(reference && reference.offsetParent) {
            reference.offsetParent.appendChild(this.element);
        }
    }

    appendTo(element) {
        return this.overlay.appendTo(element);
    }

    remove() {
        return this.overlay.remove();
    }

    show(timeout=null, callback=null) {
        if(typeof timeout === 'number' && timeout >= 0) {
            this._timeoutTimer = setTimeout(() => {
                this._timeoutTimer = null;
                this.hide();
            }, timeout);
        }

        this.overlay.show(callback);
    }

    hide(callback) {
        this.cancelTimeout();

        let onHide = () => {
            if(this.removeOnHide) {
                this.remove();
            }

            if(callback) callback();
        };

        return this.overlay.hide(callback);
    }

    cancelTimeout() {
        if(this._timeoutTimer) {
            clearTimeout(this._timeoutTimer);
            this._timeoutTimer = null;
        }
    }

    toggle(timeout=null, callback=null) {
        if(this.isVisible) {
            return this.hide(callback);
        } else {
            return this.show(timeout, callback);
        }
    }

    get isVisible() {
        return this.overlay.isVisible;
    }
}