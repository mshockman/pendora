import {privateCache} from 'core/data';
import AutoLoader from 'autoloader';


/**
 * <h1>Modal Component</h1>
 *
 * A Component for a modal area that can contain a dialog window, alert, notification, lightbox or any other custom content.
 *
 * ## Auto Hide
 * By default the modal will close when the user clicks it's background area directly.  This is controlled by the
 * hideOnClick property which defaults to true.  You can disable this behavior by setting closeOnClick to false.  If the
 * user clicks a child element of modal then the modal will not be closed.
 *
 * ## Closing Windows
 * You can mark an element to dismiss the modal on click by setting the attribute data-action to dismiss.  If these
 * elements are clicked the modal will checked if it's the closest related modal in the dom tree and if it is it will
 * dismiss itself.
 *
 * ---
 *
 * ## Auto Loading
 * If you are using the AutoLoader module you can assign the modal behavior to an element by setting the data-init
 * attribute to "modal".
 *
 * ---
 *
 * ## Events
 *
 * | Event Name  | Event Description               |
 * | ----------- | ------------------------------- |
 * | modal.open  | Triggered when the modal opens  |
 * | modal.close | Triggered when the modal closes |
 *
 * @class
 */
export default class Modal {
    /**
     * Constructor for Modal class.
     *
     * @param element {HTMLElement|String|Function} - Element to initialize component on.  If null a new element will be created.
     * @param hideOnClick {Boolean} - If true the modal will close when directly clicked.
     * @param hideClassName - The class that gets toggled during show / hide.
     */
    constructor({element=null, hideOnClick=true, hideClassName="hidden"}={}) {
        if(typeof element === 'string') {
            this.element = document.querySelector(element);
        } else if(typeof element === 'function') {
            this.element = element.call(this);
        } else {
            this.element = element;
        }

        let cache = privateCache.cache(this.element);

        if(cache.modal) {
            throw new Error("Element is already initialized as Modal.");
        }

        cache.modal = this;

        if(!this.element) {
            this.element = document.createElement('div');
            this.element.classList.add('c-modal');
            this.element.classList.add(hideClassName);
        }

        this.hideOnClick = hideOnClick;
        this.hideClassName = hideClassName;

        this._onClick = (event) => {
            if(this.isOpen) {
                if(event.target === this.element && this.hideOnClick) {
                    this.close();
                }

                // Hide the modal if the dismiss action is clicked
                // Make sure to check that the action doesn't come from a child modal and
                // that for whatever reason the dismiss action isn't a ancestor.
                let dismiss = event.target.closest('[data-action="dismiss"]'),
                    targetModal = dismiss ? dismiss.closest('.c-modal') : null;

                if(dismiss && targetModal && targetModal === this.element) {
                    this.close();
                }
            }
        };

        this.element.addEventListener('click', this._onClick);
    }

    /**
     * Appends the component to the provided element.  If a string is passed it is used as a css selector.
     * @param element {HTMLElement|String|{append}}
     */
    appendTo(element) {
        if(typeof element === 'string') {
            document.querySelector(element).appendChild(this.element);
        } else if(element.appendChild) {
            element.appendChild(this.element);
        } else if(element.append) {
            element.append(this.element);
        }
    }

    /**
     * Opens the modal.
     */
    open() {
        if(!this.isOpen) {
            this.element.classList.remove(this.hideClassName);

            let event = new CustomEvent('modal.open', {
                bubbles: true,
                detail: this
            });

            this.element.dispatchEvent(event);
        }
    }

    /**
     * Closes the modal.
     */
    close() {
        if(this.isOpen) {
            this.element.classList.add(this.hideClassName);

            let event = new CustomEvent('modal.close', {
                bubbles: true,
                detail: this
            });

            this.element.dispatchEvent(event);
        }
    }

    /**
     * Toggles the modal opened or closed.
     */
    toggle() {
        if(this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Is true when the modal is open.
     * @returns {boolean}
     */
    get isOpen() {
        return !this.element.classList.contains(this.hideClassName);
    }

    /**
     * Helper method that is used to retrieve the modal instance from it's element.
     *
     * @param element {HTMLElement|String}
     * @returns {Modal|null}
     */
    static getInstance(element) {
        if(typeof element === 'string') {
            element = document.querySelector(element);
        }

        return privateCache.get(element, 'modal');
    }

    /**
     * Builds a Modal instance from a dom element.
     *
     * @param element {HTMLElement}
     * @returns {Modal}
     */
    static buildComponent(element) {
        let args = {};

        if(element.dataset.hideOnClick) {
            args.hideOnClick = element.dataset.hideOnClick === 'true';
        }

        if(element.dataset.hideClassName) {
            args.hideClassName = element.dataset.hideClassName;
        }

        args.element = element;

        return new Modal(args);
    }
}


AutoLoader.register('modal', (element) => {
    return Modal.buildComponent(element);
});
