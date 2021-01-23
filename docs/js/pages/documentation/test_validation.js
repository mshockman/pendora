import {InvalidNode, ValidationErrorList} from "../../../../src/validation/errors";
import {Schema, SchemaList, SchemaNode} from "../../../../src/validation/schema";
import {StringType, IntegerType} from "../../../../src/validation/types";
import {LengthValidator} from "../../../../src/validation/validators";



class AttributeSchema extends Schema {
    constructor() {
        super({
            nodes: [
                new SchemaNode({name: "id", type: new IntegerType()}),
                new SchemaNode({name: "name", type: new StringType()}),
                new SchemaNode({name: "options", type: new StringType(true, true), missing: ""}),
                new SchemaNode({name: "default_value", type: new StringType(true, true), missing: null})
            ]
        });
    }

    clean(value) {
        if(value.options && value.default_value) {
            let options = value.options.split("|");

            if(options.indexOf(value.default_value) === -1) {
                throw new InvalidNode(null, "Default value must be an option.");
            }
        }
        return super.clean(value);
    }
}


class UserSchema extends Schema {
    constructor() {
        super({
            schema: {
                id: new SchemaNode({type: new IntegerType()}),
                first_name: new SchemaNode({type: new StringType(), validator: new LengthValidator(1, 32)}),
                last_name: new SchemaNode({type: new StringType(), validator: new LengthValidator(1, 32)})
            }
        });
    }
}


class ClassificationSchema extends Schema {
    constructor() {
        super({
            schema: {
                id: new SchemaNode({type: new IntegerType()}),
                name: new SchemaNode({type: new StringType(), validator: new LengthValidator(1, 32)}),
                attributes: new SchemaList({node: new AttributeSchema()}),
                user: new UserSchema()
            }
        });
    }
}



export default class ValidationPage {
    load() {

        window.test = this;
        window.InvalidNode = InvalidNode;
        window.ValidationErrorList = ValidationErrorList;
        window.SchemaNode = SchemaNode;
        window.StringType = StringType;
        window.AttributeSchema = AttributeSchema;
        window.ClassificationSchema = ClassificationSchema;
        let schema = window.schema = new ClassificationSchema();

        // schema.deserialize({id: 1, name: "test", options: "red|green|blue", "default_value": "red"});
    }
}
