import Resizeable from "core/ui/Resizeable";
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

        this.resizeable1 = new Resizeable('#resizeable1');
    }

    loadDraggables() {
        let elements = document.querySelectorAll('.draggable');

        for(let d of elements) {
            let container = d.closest('.example-zone') || null;
            new Draggable(d, {container});
        }
    }
}