export function defaultApplyFrame(fx, frame) {
    for (let key in frame) {
        if (frame.hasOwnProperty(key)) {
            fx.element.style[key] = frame[key].toString();
        }
    }
}
