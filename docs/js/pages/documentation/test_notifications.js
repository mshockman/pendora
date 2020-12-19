import Notification2 from "../../../../src/core/ui/Notification2";

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
                target = getRadioValue("target-radio-button");

            if(target === "element") {
                Notification2.notify(message, "success", {placement, target: btn});
            } else {
                Notification2.notify(message, "success", {placement});
            }
        });
    }
}