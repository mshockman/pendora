import Notification from "../../../../src/core/ui/Notification";

export default class TestNotificationsPage {
    load() {
        this.initApplyNotification();
    }

    initApplyNotification() {
        let btn = document.querySelector("#apply-notification-btn");

        function getMessage() {
            return document.querySelector("#message-input").value;
        }

        function getRadioValue(name) {
            return document.querySelector(`input[name="${name}"]:checked`).value;
        }

        btn.addEventListener("click", () => {
            let message = getMessage(),
                placement = getRadioValue("placement-radio-button"),
                target = getRadioValue("target-radio-button"),
                type = getRadioValue("style-radio-button"),
                timeout = parseInt(document.querySelector("#timeout").value, 10);

            if(target === "element") {
                Notification.notify(message, type, {placement, target: btn, timeout});
            } else if(target === "global") {
                Notification.notify(message, type, {placement, timeout});
            } else if(target === "target") {
                Notification.notify(message, type, {placement: "#notification-placeholder", timeout});
            }
        });
    }
}