import Form, {Field} from "../../../../src/validation/form";
import {SchemaNode, Schema} from "../../../../src/validation/schema";
import {StringType} from "../../../../src/validation/types";
import {All, LengthValidator} from "../../../../src/validation/validators";
import Notification from "../../../../src/core/ui/Notification";
import InputWidget from "../../../../src/forms/InputWidget";


export default class FormValidationPage {
    load() {
        const formValidator = new Form({
            schema: {
                "name": new SchemaNode({type: new StringType(), validator: new LengthValidator(1, 32), widget: new InputWidget("[name='name']")}),
                "options": new SchemaNode({type: new StringType(), widget: new InputWidget("[name='options']")}),
                "default_value": new SchemaNode({type: new StringType(), widget: new InputWidget("[name='default_value']")})
            },

            form: "#attribute-form"
        });

        window.f = formValidator;
    }
}