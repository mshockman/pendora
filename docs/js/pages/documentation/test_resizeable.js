import Resizeable, {cloneHelperFactory} from "core/ui/Resizeable";
import Draggable from "core/ui/Draggable";
import PointerTracker from "../../../../src/core/ui/PointerTracker";
import Rect from "../../../../src/core/vectors/Rect";
import {getBoundingOffsetRect} from "../../../../src/core/ui/position";


window.Rect = Rect;
window.getBoundingOffsetRect = getBoundingOffsetRect;


export default class TestResizeablePage {
    load() {
        this.loadDraggables();

        let debugTracker = PointerTracker.DebugMouseTracker();
        document.body.appendChild(debugTracker.element);

        this.resizeable1 = new Resizeable('#resizeable1', {
            helper: cloneHelperFactory(1000, 0.5),
            minWidth: 100,
            minHeight: 100,
            maxWidth: 250,
            maxHeight: 250
        });

        this.resizeable2 = new Resizeable("#resizeable2", {});
        this.resizeable3 = new Resizeable("#resizeable3", {position: "width-height"});

        console.log("Hello WOrld");
    }

    loadDraggables() {
        let elements = document.querySelectorAll('.draggable');

        for(let d of elements) {
            let container = d.closest('.example-zone') || null;
            new Draggable(d, {container});
        }
    }
}