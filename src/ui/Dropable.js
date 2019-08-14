

export default class Dropable {
    constructor(element) {
        if(typeof element === 'string') {
            this.element = document.querySelector(element);
        }
    }

    onEnter() {

    }

    onLeave() {

    }

    onDrop() {

    }

    onPickup() {}
}