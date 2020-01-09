/**
 * Throttles a function to only be executed after a given wait period.  If multiple calls to the debounced function
 * are made within that period the waiting period is set.
 * @param fn
 * @param wait
 * @returns {Function}
 */
export function debounce(fn, wait) {
    let timeout;

    return function() {
        let args = arguments;

        let later = () => {
            timeout = null;
            fn.apply(this, args);
        };

        if(timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(later, wait);
    }
}
