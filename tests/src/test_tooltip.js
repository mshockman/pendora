import Tooltip from "../../src/core/ui/Tooltip";


export default class ToolTipTestPage {
    constructor() {

    }

    load() {
        this.initDebug();
        let tooltips = new WeakMap();

        for(let node of document.querySelectorAll("[data-tooltip]")) {
            let tooltip = new Tooltip(node.dataset.tooltip, node.dataset.placement, {animation: 'fade', animationDuration: 200});
            tooltip.init(node, 'toggle', false);

            // node.addEventListener('click', (event) => {
            //     /**
            //      * @type {Tooltip}
            //      */
            //     let tooltip = tooltips.get(event.target);
            //
            //     if(!tooltip) {
            //         // noinspection JSUnresolvedVariable
            //         tooltip = new Tooltip(event.target.dataset.tooltip, node.dataset.placement, {animation: 'fade', animationDuration: 200});
            //         tooltips.set(event.target, tooltip);
            //         tooltip.appendTo(document.body);
            //     }
            //
            //     if(tooltip.state === Tooltip.hidden || tooltip.state === Tooltip.hiding) {
            //         tooltip.show(event.target);
            //     } else if(tooltip.state === Tooltip.showing || tooltip.state === Tooltip.visible) {
            //         tooltip.hide();
            //     }
            // });
        }
    }

    initDebug() {
        let debug = document.querySelector('#debug_output');

        document.addEventListener('mousemove', event => {
            debug.innerHTML = `(${event.clientX}, ${event.clientY})`;
        });
    }
}
