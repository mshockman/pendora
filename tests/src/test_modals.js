import Modal from 'ui/modal';


window.Modal = Modal;


export default class TestModalPage {
    constructor(props) {

    }

    load() {
        let btn1 = document.querySelector('#btn1'),
            modal1 = document.querySelector('#test-modal');

        let modalInstance1 = new Modal({element: modal1});

        // btn1.addEventListener('click', () => {
        //     modalInstance1.show();
        // });

        window.m1 = modalInstance1;
    }
}