import Modal from "../../src/core/ui/Modal";


export default class TestModalPage {
    constructor() {

    }

    load() {
        let modal = new Modal({element: '#my-modal'});

        modal.on('modal.hidden', () => {
            console.log("modal hidden", modal.isVisible);
        });

        modal.on('modal.hide', () => {
            console.log("modal hiding");
        });

        modal.on('modal.show', () => {
            console.log("modal showing");
        });

        modal.on("modal.visible", () => {
            console.log("modal visible");
        });

        document.querySelector("#show-modal1-btn").addEventListener('click', () => {
            modal.show();
        });

        this.modal = modal;
        window.testModal = modal;
    }
}
