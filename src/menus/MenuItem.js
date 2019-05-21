import MenuNode from './MenuNode';


export default class MenuItem extends MenuNode {
    constructor({target, text}={}) {
        let element;

        if(!target) {
            element = document.createElement("li");
            let item = document.createElement('a');
            item.classList.add('c-menuitem__item');
            item.innerHTML = text;

            element.appendChild(item);
        } else if(typeof target === 'string') {
            element = document.querySelector(target);
        } else {
            element = target;
        }

        super(element);

        this.toggle = false;
        this.menuNodeType = 'menuitem';

        this.element.classList.add('c-menuitem');
        this.element.dataset.role = 'menuitem';
    }

    activate() {

    }

    deactivate() {

    }
}
