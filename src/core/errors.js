
export class ExtendableError extends Error {
    constructor(message) {
        // noinspection JSCheckFunctionSignatures
        super(message);
        this.name = this.constructor.name;

        // noinspection JSUnresolvedVariable
        if(typeof Error.captureStackTrace === 'function') {
            // noinspection JSUnresolvedFunction
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}


export class IndexError extends ExtendableError {

}


export class KeyError extends ExtendableError {

}


export class ValueError extends ExtendableError {

}


export class NotImplemented extends ExtendableError {

}


export class ValidationError extends ExtendableError {
    constructor(message, node) {
        super(message);
        this.node = node;
        this.children = [];
    }
}


export class AssertionError extends ExtendableError {
    constructor(message) {
        super(message);
    }
}


export class UnitError extends ExtendableError {

}


/**
 * Asserts that a condition is true or raises an AssertionError.
 * @param condition - condition to check.
 * @param message - message on fail.
 * @throws AssertionError
 */
export function assert(condition, message) {
    if (!condition) {
        throw new AssertionError(message);
    }
}
