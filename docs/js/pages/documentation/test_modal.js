import Modal from "../../../../src/core/ui/Modal";


export default class TestModalPage {
    load() {
        let modal = new Modal({element: "#my-modal"});

        modal.appendTo("#modal-container");

        document.querySelector("#show-modal-btn").addEventListener("click", event => {
            modal.show();
        });
    }
}