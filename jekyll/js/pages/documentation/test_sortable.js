import Sortable from "core/ui/Sortable";


export default class TestSortablePage {
    load() {
        window.sortableGrid = new Sortable("#sortable-grid", {layout: 'xy', setPlaceholderSize: true});
        window.sortableList1 = new Sortable('#drag-list-test', {droppables: '.drop-list', placeholder: true, setPlaceholderSize: true});
        window.sortableList2 = new Sortable('#drag-list-test2', {droppables: '.drop-list', placeholder: true, setPlaceholderSize: true});
    }
}
