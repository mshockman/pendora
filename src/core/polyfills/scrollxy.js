/**
 * Adds scrollX and scrollY to the window object.
 */

if(window.scrollX === undefined) {
    Object.defineProperty(window, 'scrollX', {
        get() {
            return window.pageXOffset
        }
    });

    Object.defineProperty(window, 'scrollY', {
        get() {
            return window.pageYOffset
        }
    });
}
