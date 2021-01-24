/**
 * @interface
 * @abstract
 */
export default class FormWidgetBase {
    #element;

    constructor(element) {
        this.#element = null;

        if(typeof element === 'string') {
            this.#element = document.querySelector(element);
        } else if(element) {
            this.#element = element;
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

    remove() {
        this.element.parentElement.removeChild(this.element);
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

    get id() {
        return this.element.id;
    }

    set id(id) {
        this.element.id = id;
    }

    get classList() {
        return this.element.classList;
    }

    set classList(value) {
        this.element.classList = value;
    }

    get dataset() {
        return this.element.dataset;
    }

    set dataset(dataset) {
        this.element.dataset = dataset;
    }

    get name() {
        return this.getName();
    }

    set name(value) {
        this.setName(value);
    }

    get value() {
        return this.getValue();
    }

    set value(value) {
        this.setValue(value);
    }

    get element() {
        return this.#element;
    }
}
