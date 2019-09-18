import {privateCache} from 'core/data';
import AutoLoader from 'autoloader';


export default class Modal {
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

    appendTo(element) {
        if(typeof element === 'string') {
            document.querySelector(element).appendChild(this.element);
        } else if(element.appendChild) {
            element.appendChild(this.element);
        } else if(element.append) {
            element.append(this.element);
        }
    }

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

    toggle() {
        if(this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    get isOpen() {
        return !this.element.classList.contains(this.hideClassName);
    }

    static getInstance(element) {
        if(typeof element === 'string') {
            element = document.querySelector(element);
        }

        return privateCache.get(element, 'modal');
    }

    static buildFromElement(element) {
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
    return Modal.buildFromElement(element);
});