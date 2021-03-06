import Notification from "../../src/core/ui/Notification";


export default class NotificationTestPage {
    constructor() {

    }

    load() {
        // let notification = new BasicNotificationMessage("Hello World!");
        // notification.appendTo(document.body);
        // notification.id = "test-notification-1";

        let testButtons = document.querySelector('#test-buttons');

        testButtons.addEventListener('click', event => {
            let button = event.target.closest('button');

            if(!button) return;

            let text = button.innerText,
                placement = text.toLowerCase().replace(" ", "-");

            Notification.notify("Hello World This is A long Message!", "success", {placement, closeOnClick: true});
        });
    }
}


