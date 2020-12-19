import Tooltip from "../../../../src/core/ui/Tooltip";


export default class TestTooltipPage {
    load() {
        let tooltipTopBtn = document.querySelector("#tooltip-top-btn");

        Tooltip.tooltip(tooltipTopBtn, "Hello World", {type: "toggle", placement: "bottom"});
    }
}
