import Draggable, {ScrollArea, clone} from "core/ui/Draggable";


export default class TestDraggablePage {
    load() {
        this.drag1 = new Draggable("#drag-example1", {resistance: 0, delay: 0, scrollSpeed: 1000, container: ScrollArea('#ez1')});
        this.drag2 = new Draggable("#drag-example2", {resistance: 0, delay: 0, container: ScrollArea('#ez2'), helper: clone(0.5), revert: true, revertDuration: 1000});
        this.drag3 = new Draggable("#drag-example3", {resistance: 0, delay: 0, container: ScrollArea('#ez3'), revert: true, revertDuration: 1000});
        this.drag4 = new Draggable("#drag-example4", {resistance: 0, delay: 0, container: ScrollArea('#ez4'), tolerance: 1});
        this.drag5 = new Draggable("#drag-example5", {resistance: 0, delay: 0, container: ScrollArea('#ez5'), axis: 'x'});
        this.drag6 = new Draggable("#drag-example6", {resistance: 0, delay: 0, container: ScrollArea('#ez6'), axis: 'y'});
        this.drag7 = new Draggable("#drag-example7", {resistance: 0, delay: 0, container: ScrollArea('#ez7'), grid: 50});
        this.drag8 = new Draggable("#drag-example8", {resistance: 0, delay: 0, container: ScrollArea('#ez8')});
        this.drag9 = new Draggable("#drag-example9", {resistance: 0, delay: 0, container: ScrollArea('#ez9'), selector: '.drag-item'});
        this.drag10 = new Draggable("#drag-example10", {resistance: 0, delay: 0, container: ScrollArea('#ez10'), helper: clone(0.5)});
        this.drag11 = new Draggable("#drag-example11", {resistance: 0, delay: 0, container: ScrollArea('#ez11'), selector: '.drag-item', revert: true, revertDuration: 1000, helper: clone(0.5)});
        this.drag12 = new Draggable("#drag-example12", {resistance: 0, delay: 500, scrollSpeed: 0, container: ScrollArea('#ez12')});
        this.drag13 = new Draggable("#drag-example13", {resistance: 200, delay: 0, scrollSpeed: 0, container: ScrollArea('#ez13')});
        this.drag14 = new Draggable("#drag-example14", {resistance: 0, delay: 0, container: ScrollArea('#ez14'), tolerance: 1, helper: clone(0.5), revertDuration: 1000, revert: true});

        this.connectDZ(this.drag4, '#dz1');
        this.connectDZ(this.drag14, '#dz14');
    }

    connectDZ(drag, dz) {
        let dz1 = document.querySelector(dz);

        drag.connect(dz1);

        dz1.addEventListener('drag.enter', event => {
            dz1.classList.add('active');
        });

        dz1.addEventListener('drag.leave', event => {
            dz1.classList.remove('active');
        });
    }
}
