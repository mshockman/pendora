import Draggable from 'core/interactions/Draggable';
import {CONTAINERS} from 'core/interactions/Draggable';
import Sortable from 'core/interactions/Sortable';
import Animation from 'core/Animation';
import {privateCache} from "../../src/core/data";
import {getTranslation} from "core/position";


window.Animation = Animation;
window.privateCache = privateCache;


window.getTranslation = getTranslation;


window.addEventListener('load', () => {
    window.draggableBox1 = new Draggable("#test-draggable1", {container: CONTAINERS.client, helper: Draggable.CLONE(0.5), revert: 1000});
    window.draggableWindow1 = new Draggable("#test-window1", {container: CONTAINERS.client, handle: '.drag-handle'});
    window.draggableBox2 = new Draggable('#drop-test1-droppable', {droppables: '#drop-zone-test1'});

    window.draggableScrollable = new Draggable(document.querySelector("#scroll-draggable-test"), {scroll: 1, container: CONTAINERS.viewport});

    window.sortableGrid = new Sortable("#sortable-grid", {layout: 'xy', setPlaceholderSize: true});
    window.sortableList1 = new Sortable('#drag-list-test', {droppables: '.drop-list', placeholder: true, setPlaceholderSize: true});
    window.sortableList2 = new Sortable('#drag-list-test2', {droppables: '.drop-list', placeholder: true, setPlaceholderSize: true});

    document.querySelector('#drop-zone-test1').addEventListener('drop', event => {
        event.target.style.backgroundColor = '#00ff00';
    });
});


window.addEventListener('mousemove', (event) => {
    let output = document.getElementById('mouse-pos-client-output');
    output.innerText = `(${event.clientX}, ${event.clientY})`;

    output = document.getElementById('document-position-output');
    output.innerText = `(${event.clientX + window.scrollX}, ${event.clientY + window.scrollY})`;
});
