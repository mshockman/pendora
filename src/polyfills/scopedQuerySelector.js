/**
 * Adds support for the :self psuedo css selector for querySelector and querySelectorAll for browser that don't support it.
 */


if(!HTMLElement.prototype.querySelectorAll) {
    throw new Error("This polyfill will only work on browsers that support querySelectorAll and querySelector");
}


let scopeReg = /\s*:scope/gi,
    container = document.createElement('div');


try {
    container.querySelector(":scope div");
} catch(e) {
    function overrideProperty(prototype, propName) {
        let oldMethod = prototype[propName];

        prototype[propName] = function(query) {
            if(query.match(scopeReg)) {
                query = query.replace(scopeReg, '');

                let results;

                let key = `${(new Date()).getTime()}_${Math.round(Math.random()*10000)}`;

                this.setAttribute('scope_temp_uuid', key);

                results = oldMethod.call(this.parentNode, `[scope_temp_uuid="${key}"] ${query}`);

                this.removeAttribute('scope_temp_uuid');

                return results;
            } else {
                return oldMethod.call(this, query);
            }
        };
    }

    overrideProperty(HTMLElement.prototype, 'querySelector');
    overrideProperty(HTMLElement.prototype, 'querySelectorAll');
}
