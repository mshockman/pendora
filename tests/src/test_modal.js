import Modal from "../../src/core/ui/Modal";


export default class TestModalPage {
    constructor() {

    }

    load() {
        let modal = new Modal({element: '#my-modal'});

        document.querySelector("#show-modal1-btn").addEventListener('click', () => {
            modal.show();
            console.log(modal.state);
        });

        this.modal = modal;
        window.testModal = modal;
    }
}
