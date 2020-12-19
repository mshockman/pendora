import {FormValidator, Field, InputWidget} from "../../../../src/validation/form";
import {SchemaNode} from "../../../../src/validation/schema";
import {StringType} from "../../../../src/validation/types";
import {All, LengthValidator} from "../../../../src/validation/validators";
import Notification from "../../../../src/core/ui/Notification";


function notifyError(e) {
    Notification.notify()
}


export default class FormValidationPage {
    load() {
        let form = new FormValidator("#attribute-form");

        form.addValidator(new Field(
            new InputWidget("#attribute_form__name"),
            new SchemaNode({
                type: new StringType(false, true),
                validator: new All(
                    [
                        new LengthValidator(0, 20)
                    ]
                )
            })
        ));

        form.onInvalid = (e, node) => {
            console.log(e);
        };
    }
}