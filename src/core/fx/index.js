/**
 * Simple animation library that transitions properties from keyframe 1 to keyframe 2 over the duration.
 *
 * This library doesn't directly handle animated elements.  Instead it takes two objects filled with properties.
 * During each frame the class constructs a new object filled with each property transitioned to the property at
 * the given position.  It then passes that object to the onFrame callback handler that is responsible for applying
 * the properties to the element.
 *
 * Example Usage:
 * let target = document.querySelector('#id');
 *
 * let animation = new Animation({opacity: 1}, (opacity: 0}, 1000, (frame) => {
 *      Object.assign(target.style, frame);
 * });
 *
 * @author Matthew J. Shockman
 */

import Animation from "./Animation";
import {EASING} from "./easing";
import {defaultApplyFrame} from "./frame";
import FX, {DeadFXError} from "./FX";


export {
    Animation, EASING, defaultApplyFrame, FX, DeadFXError
};
