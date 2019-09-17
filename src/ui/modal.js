import {privateCache} from 'core/data';


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
            if(event.target === this.element && this.hideOnClick && this.isVisible) {
                this.hide();
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

    show() {
        if(!this.isVisible) {
            this.element.classList.remove(this.hideClassName);

            let event = new CustomEvent('modal-show', {
                bubbles: true,
                detail: this
            });

            this.element.dispatchEvent(event);
        }
    }

    hide() {
        if(this.isVisible) {
            this.element.classList.add(this.hideClassName);

            let event = new CustomEvent('modal-hide', {
                bubbles: true,
                detail: this
            });

            this.element.dispatchEvent(event);
        }
    }

    get isVisible() {
        return !this.element.classList.contains(this.hideClassName);
    }

    static getInstance(element) {
        if(typeof element === 'string') {
            element = document.querySelector(element);
        }

        return privateCache.get(element, 'modal');
    }
}