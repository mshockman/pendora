/**
 * @interface
 */
export default class FormWidgetBase {
    constructor(element) {
        this.element = null;

        if(typeof element === 'string') {
            this.element = document.querySelector(element);
        } else if(element) {
            this.element = element;
        }
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.element);
        } else if(selector.appendChild) {
            selector.appendChild(this.element);
        } else if(selector.append) {
            selector.append(this.element);
        }
    }

    /**
     * Returns the current raw value without any cleaning, typecasting, or validation.
     * @abstract
     */
    getValue() {

    }

    /**
     * Sets the widgets raw value.
     *
     * @abstract
     * @param value {*}
     */
    setValue(value) {

    }

    /**
     * Sets the name of the widget.
     *
     * @abstract
     * @param name {String}
     */
    setName(name) {

    }

    /**
     * Returns the name of the widget.
     * @abstract
     * @returns {String}
     */
    getName() {

    }
}
