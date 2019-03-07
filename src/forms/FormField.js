

export default class FormField {
    constructor(widget, validator) {
        this.widget = widget;
        this.validator = validator;
    }

    validate() {
        let value = this.widget.getValue();
    }

    getValue() {
        return this.widget.getValue();
    }

    setValue(value) {
        this.widget.setValue(value);
    }

    onValidationError(error) {
        return this.widget.onValidationError(error);
    }
}
