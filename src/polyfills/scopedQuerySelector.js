/**
 * Adds support for the :self psuedo css selector for querySelector and querySelectorAll for browser that don't support it.
 */


if(!HTMLElement.prototype.querySelectorAll) {
    throw new Error("This polyfill will only work on browsers that support querySelectorAll");
}


let scopeReg = /\s*:scope/gi,
    container = document.createElement('div');


function overrideProperty(prototype, propName) {
    let oldMethod = prototype[propName];

    prototype[propName] = function(query) {
        if(query.match(scopeReg)) {
            query = query.replace(scopeReg, '');

            let removeFromContainer = false,
                removeId = false,
                results;

            if(!this.parentNode) {
                container.appendChild(this);
                removeFromContainer = true;
            }

            if(!this.id) {
                this.id = 'tempQSID_' + (new Date()).getTime();
                removeId = true;
            }

            results = oldMethod.call(this.parentNode, `#${this.id} ${query}`);

            if(removeId) {
                this.id = '';
            }

            if(removeFromContainer) {
                container.removeChild(this);
            }

            return results;
        } else {
            return oldMethod.call(this, query);
        }
    };
}


try {
    container.querySelector(":scope div");
} catch(e) {
    overrideProperty(HTMLElement.prototype, 'querySelector');
    overrideProperty(HTMLElement.prototype, 'querySelectorAll');
}
