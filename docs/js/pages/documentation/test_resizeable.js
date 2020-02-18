import Resizeable from "core/ui/Resizeable";
import Draggable from "core/ui/Draggable";


export default class TestResizeablePage {
    load() {
        this.loadDraggables();

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