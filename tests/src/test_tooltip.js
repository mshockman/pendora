import Tooltip from "../../src/core/ui/Tooltip";


export default class ToolTipTestPage {
    constructor() {

    }

    load() {
        this.initDebug();

        for(let node of document.querySelectorAll("[data-tooltip]")) {
            Tooltip.tooltip(node, node.dataset.tooltip, {
                placement: node.dataset.placement,
                showFX: "slideIn",
                hideFX: "slideOut",
                showDuration: 2000,
                hideDuration: 200,
                type: 'hover',
                refreshPositionOnMouseMove: true
            });
        }
    }

    initDebug() {
        let debug = document.querySelector('#debug_output');

        document.addEventListener('mousemove', event => {
            debug.innerHTML = `(${event.clientX}, ${event.clientY})`;
        });
    }
}
