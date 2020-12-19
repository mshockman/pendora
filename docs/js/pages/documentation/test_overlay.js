import Overlay from "../../../../src/core/ui/Overlay";
import Arrow from "../../../../src/core/ui/Arrow";
import {SlideIn, SlideInY, SlideOutY} from "../../../../src/core/fx/effects";
import Notification2 from "../../../../src/core/ui/Notification2";
import Rect from "../../../../src/core/vectors/Rect";
import PointerTracker from "../../../../src/core/ui/PointerTracker";


export default class TestOverlayPage {
    load() {
        window.Rect = Rect;
        let toggleBTN = document.querySelector("#tooltip-overlay-btn1");
        PointerTracker.DebugMouseTracker();

        // let notification = new Notification2({message: "Hello World!", className: "tooltip", showFX: SlideInY, showDuration: 200, hideFX: SlideOutY, hideDuration: 200});
        //
        // let arrow = new Arrow("bottom", "center", true);
        // arrow.target = notification.content;
        // notification.overlay.setArrow(arrow);
        // arrow.appendTo(notification.content);
        //
        // notification.overlay.target = toggleBTN;
        // notification.overlay.addPlacement("top");
        //
        // let page = document.querySelector("#overlay-container-page");
        //
        // notification.appendTo(page);
        // notification.hide(true);
        //
        // window.notification = notification;
        // let showing = false;

        toggleBTN.addEventListener("click", () => {
            Notification2.notify("Hello World", "success", {target: toggleBTN, placement: "top"});
        });

        for(let btn of document.querySelectorAll("[data-notification]")) {
            let {notification, placement, message, type} = btn.dataset;

            btn.addEventListener('click', () => {
                if(notification === "page") {
                    Notification2.notify(message, type, {placement});
                } else {
                    Notification2.notify(message, type, {target: btn, placement});
                }
            });
        }
    }
}