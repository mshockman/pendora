import {InvalidNode, ValidationErrorList} from "../../../../src/validation/errors";
import {Schema, SchemaNode} from "../../../../src/validation/schema";
import {StringType, IntegerType} from "../../../../src/validation/types";



class AttributeSchema extends Schema {
    constructor() {
        super({
            nodes: [
                new SchemaNode({name: "id", type: new IntegerType()}),
                new SchemaNode({name: "name", type: new StringType()}),
                new SchemaNode({name: "options", type: new StringType(true, true)}),
                new SchemaNode({name: "default_value", type: new StringType(true, true)})
            ]
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
        let schema = window.schema = new AttributeSchema();

        schema.deserialize({id: 1, name: "test", options: "red|green|blue", "default_value": "red"});
    }
}
