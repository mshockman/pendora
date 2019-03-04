

export class ValidationError extends Error {
    constructor(msg, field) {
        super();
        this.message = msg;
        this.name = this.constructor.name;
        this.children = [];

        // noinspection JSUnresolvedVariable
        if(typeof Error.captureStackTrace === 'function') {
            // noinspection JSUnresolvedFunction
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(msg)).stack;
        }
    }
}
