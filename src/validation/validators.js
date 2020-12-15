import {InvalidErrorBase, InvalidNode} from "./errors";


export class Validator {
    constructor(test, message) {
        this.test = test;
        this.message = message;
    }

    validate(value) {
        if(!this.test(value)) {
            this._throw();
        }

        return value;
    }

    _throw() {
        throw new InvalidNode(null, this.message);
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
        super(function(value) {
            return value === this.value;
        }, message);

        this.value = value;
    }
}


export class PatternValidator extends Validator {
    constructor(pattern, flags="", message="Invalid pattern") {
        let regex = new RegExp(pattern, flags);

        super(function(value) {
            return this.regex.test(value);
        }, message);

        this.regex = regex;
    }
}


// noinspection RedundantIfStatementJS
export class RangeValidator extends Validator {
    constructor(minValue=null, maxValue=null, message="Out of Range") {
        super(function(value) {
            if(this.minValue !== null && value < this.minValue) {
                return false;
            } else if(this.maxValue !== null && value > this.maxValue) {
                return false;
            } else {
                return true;
            }
        }, message);

        this.minValue = minValue;
        this.maxValue = maxValue;
    }
}


export class ChoiceValidator extends Validator {
    constructor(choices, message="Invalid Choice") {
        super(function(value) {
            return this.choices.indexOf(value) !== -1;
        }, message);

        this.choices = choices;
    }

}


// noinspection RedundantIfStatementJS
export class LengthValidator extends Validator {
    constructor(minLength, maxLength, message="Invalid Length") {
        super(function(value) {
            if(this.minLength !== null && value.length < this.minLength) {
                return false;
            } else if(this.maxLength !== null && value.length > this.maxLength) {
                return false;
            } else {
                return true;
            }
        }, message);

        this.minLength = minLength;
        this.maxLength = maxLength;
    }
}


export class Any extends Validator {
    constructor(validators, message="Value failed all tests.") {
        super(function(value) {
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

                return true;
            }

            return false;
        }, message);

        this.validators = validators;
    }
}


export class All extends Validator {
    constructor(validators, message="Value failed all tests.") {
        super(function(value) {
            for(let validator of this.validators) {
                try {
                    Validator.call(validator, value);
                } catch (e) {
                    if(e instanceof InvalidErrorBase) {
                        return false;
                    } else {
                        throw e;
                    }
                }
            }

            return true;
        }, message);

        this.validators = validators;
    }
}


export class Not extends Validator {
    constructor(validator, message="Invalid") {
        super(function(value) {
            try {
                Validator.call(this.validator, value);
            } catch (e) {
                if(e instanceof InvalidErrorBase) {
                    return true;
                } else {
                    throw e;
                }
            }

            return false;
        }, message);

        this.validator = validator;
    }
}