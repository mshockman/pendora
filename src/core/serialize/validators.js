import {ValidationError} from "../errors";


export function choice(...choices) {
    return function(value) {
        if(choices.indexOf(value) === -1) {
            throw new ValidationError("Invalid choice");
        }

        return value;
    }
}


export function length(minLength=null, maxLength=null) {
    return function(value) {
        let l = value.length;

        if(minLength !== null && l < minLength) {
            throw new ValidationError("Array length is to small");
        }

        if(maxLength !== null && l > maxLength) {
            throw new ValidationError("Array length is to big");
        }

        return value;
    }
}


export function range(min=null, max=null) {
    return function(value) {
        if(min !== null && value < min) {
            throw new ValidationError("Value is to small.");
        }

        if(max !== null && value > max) {
            throw new ValidationError("Value is to big.");
        }

        return value;
    }
}


export function regex(pattern, flags=null) {
    let reg = flags ? new RegExp(pattern, flags) : new RegExp(pattern);

    return function(value) {
        if(!reg.test(value)) {
            throw new ValidationError("Value did not match pattern.");
        }

        return value;
    }
}


export function all(...validators) {
    return function(value) {
        for(let validator of validators) {
            value = validator(value);
        }

        return value;
    }
}


export function any(...validators) {
    return function(value) {
        for(let validator of validators) {
            try {
                value = validator(value);
                return value;
            } catch (e) {
                if(!(e instanceof ValidationError)) {
                    throw e;
                }
            }
        }

        throw new ValidationError("Value did not pass any validator.");
    }
}
