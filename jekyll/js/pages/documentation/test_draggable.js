import Draggable2, {ScrollArea, clone} from "core/ui/Draggable2";


export default class TestDraggablePage {
    load() {
        this.drag1 = new Draggable2("#drag-example1", {resistance: 0, delay: 0, scrollSpeed: 1000, container: ScrollArea('#ez1')});
        this.drag2 = new Draggable2("#drag-example2", {resistance: 0, delay: 0, container: ScrollArea('#ez2'), helper: clone(0.5), revert: true, revertDuration: 1000});
        this.drag3 = new Draggable2("#drag-example3", {resistance: 0, delay: 0, container: ScrollArea('#ez3'), revert: true, revertDuration: 1000});
        this.drag4 = new Draggable2("#drag-example4", {resistance: 0, delay: 0, container: ScrollArea('#ez4')});
        this.drag5 = new Draggable2("#drag-example5", {resistance: 0, delay: 0, container: ScrollArea('#ez5'), axis: 'x'});
        this.drag6 = new Draggable2("#drag-example6", {resistance: 0, delay: 0, container: ScrollArea('#ez6'), axis: 'y'});
        this.drag7 = new Draggable2("#drag-example7", {resistance: 0, delay: 0, container: ScrollArea('#ez7'), grid: 50});
        this.drag8 = new Draggable2("#drag-example8", {resistance: 0, delay: 0, container: ScrollArea('#ez8')});
        this.drag8 = new Draggable2("#drag-example9", {resistance: 0, delay: 0, container: ScrollArea('#ez9'), selector: '.drag-item'});

        let dz1 = document.querySelector('#dz1');

        this.drag4.connect(dz1);

        dz1.addEventListener('drag.enter', event => {
            console.log(event);
            dz1.classList.add('active');
        });

        dz1.addEventListener('drag.leave', event => {
            console.log(event);
            dz1.classList.remove('active');
        });
    }
}
