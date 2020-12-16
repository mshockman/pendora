import {InvalidErrorBase, InvalidNode} from "./errors";


function _throw(message) {
    throw new InvalidNode(null, message);
}


export class Validator {
    constructor(message) {
        this.message = message;
    }

    /**
     * @abstract
     * @param value
     */
    validate(value) {

    }

    static call(validator, value) {
        if(typeof validator === "function") {
            return validator(value);
        } else if(typeof validator.validate === "function") {
            return validator.validate(value);
        } else {
            throw new Error("Invalid Validator");
        }
    }
}


export class ExactValidator extends Validator {
    constructor(value, message="Invalid value.") {
        super(message);
        this.value = value;
    }

    validate(value) {
        if(value !== this.value) {
            _throw(this.message);
        }

        return value;
    }
}


export class PatternValidator extends Validator {
    constructor(pattern, flags="", message="Invalid pattern") {
        super(message);
        this.regex = new RegExp(pattern, flags);
    }

    validate(value) {
        if(!this.regex.test(value)) {
            _throw(this.message);
        }

        return value;
    }
}


// noinspection RedundantIfStatementJS
export class RangeValidator extends Validator {
    constructor(minValue=null, maxValue=null, message="Out of Range") {
        super(message);
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    validate(value) {
        if(this.minValue !== null && value < this.minValue) {
            _throw(this.message);
        } else if(this.maxValue !== null && value > this.maxValue) {
            _throw(this.message);
        } else {
            return value;
        }
    }
}


export class ChoiceValidator extends Validator {
    constructor(choices, message="Invalid Choice") {
        super(message);
        this.choices = choices;
    }

    validate(value) {
        if(this.choices.indexOf(value) === -1) {
            _throw(this.message);
        }
    }
}


// noinspection RedundantIfStatementJS
export class LengthValidator extends Validator {
    constructor(minLength, maxLength, message="Invalid Length") {
        super(message);
        this.minLength = minLength;
        this.maxLength = maxLength;
    }

    validate(value) {
        if(this.minLength !== null && value.length < this.minLength) {
            _throw(this.message);
        } else if(this.maxLength !== null && value.length > this.maxLength) {
            _throw(this.message);
        } else {
            return value;
        }
    }
}


export class Any extends Validator {
    constructor(validators, message="Value failed all tests.") {
        super(message);
        this.validators = validators;
    }

    validate(value) {
        for(let validator of this.validators) {
            try {
                Validator.call(validator, value);
            } catch (e) {
                if(e instanceof InvalidErrorBase) {
                    continue;
                } else {
                    throw e;
                }
            }

            return value;
        }

        _throw(this.message);
    }
}


export class All extends Validator {
    constructor(validators, message=null) {
        super(message);
        this.validators = validators;
    }

    validate(value) {
        for(let validator of this.validators) {
            try {
                Validator.call(validator, value);
            } catch (e) {
                if(e instanceof InvalidErrorBase) {
                    if(this.message !== null) {
                        _throw(this.message);
                    } else {
                        throw e;
                    }
                } else {
                    throw e;
                }
            }
        }

        return value;
    }
}


export class Not extends Validator {
    constructor(validator, message="Invalid") {
        super(message);
        this.validator = validator;
    }

    validate(value) {
        try {
            Validator.call(this.validator, value);
        } catch (e) {
            if(e instanceof InvalidErrorBase) {
                return value;
            } else {
                throw e;
            }
        }

        _throw(this.message);
    }
}