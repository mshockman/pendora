import Draggable2, {ScrollArea, clone} from "core/ui/Draggable2";


export default class TestDraggablePage {
    load() {
        this.drag1 = new Draggable2("#drag-example1", {resistance: 0, delay: 0, scrollSpeed: 1000, container: ScrollArea('.example-zone')});
        this.drag2 = new Draggable2("#drag-example2", {resistance: 0, delay: 0, container: ScrollArea('#ez2'), helper: clone(0.5)});
    }
}
