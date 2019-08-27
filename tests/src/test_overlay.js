import Draggable from 'ui/Draggable';
import Sortable from 'ui/Sortable';
import Animation from 'core/Animation';
import {privateCache} from "../../src/core/data";
import {getTranslation} from "core/position";


window.Animation = Animation;
window.privateCache = privateCache;

window.test = new Animation({left: 0}, {left: 200}, 200000);


window.getTranslation = getTranslation;


function testGetElementByPositionFunctions(sortable, x, y, before, after) {
    let b = sortable.getItemBeforePoint(x, y),
        a = sortable.getItemAfterPoint(x, y);

    if(b) b = b.innerText.trim();
    if(a) a = a.innerText.trim();

    let ob = before === b ? console.log : console.error,
        oa = after === a ? console.log : console.error;

    ob(`getItemBeforePoint(${x}, ${y}) results ${b} === ${before}`);
    oa(`getItemAfterPoint(${x}, ${y}) results ${a} === ${after}`);
}


window.addEventListener('load', () => {
    window.d1 = new Draggable("#test-draggable1", {container: 'viewport', helper: Draggable.CLONE(0.5), revert: 300});
    window.d2 = new Draggable("#test-window1", {container: 'viewport', helper: null, handle: '.drag-handle'});

    window.d3 = new Draggable(document.querySelector('#drag-list-test'), {selector: '.drag-list-item', droppables: '.drop-list'});
    window.d4 = new Draggable(document.querySelector('#drag-list-test2'), {selector: '.drag-list-item', droppables: '.drop-list'});
    new Draggable(document.querySelector('#sortable-grid'), {selector: '.grid-item'});

    let sortable1 = window.s1 = new Sortable('#drag-list-test', {placeholder: true});
    new Sortable('#drag-list-test2', {placeholder: true, selector: '.drag-list-item', droppables: '.drop-list'});
    new Sortable('#sortable-grid', {items: '.grid-item', layout: 'xy'});

    testGetElementByPositionFunctions(sortable1, 100, 0, null, 'Item #1');
    testGetElementByPositionFunctions(sortable1, 100, 43, 'Item #1', 'Item #2');
    testGetElementByPositionFunctions(sortable1, 100, 81, 'Item #2', 'Item #3');
    testGetElementByPositionFunctions(sortable1, 100, 115, 'Item #3', 'Item #4');
    testGetElementByPositionFunctions(sortable1, 100, 150, 'Item #4', 'Item #5');
    testGetElementByPositionFunctions(sortable1, 100, 192, 'Item #5', null);

});


window.addEventListener('mousemove', (event) => {
    let output = document.getElementById('mouse-pos-client-output');
    output.innerText = `(${event.clientX}, ${event.clientY})`;

    output = document.getElementById('mouse-pos-screen-output');
    output.innerText = `(${event.screenX}, ${event.screenY})`;

    output = document.getElementById('mouse-pos-page-output');
    output.innerText = `(${event.pageX}, ${event.pageY})`;

    output = document.getElementById('mouse-pos-client-scroll-output');
    output.innerText = `(${event.pageX + window.scrollX}, ${event.pageY + window.scrollY})`;
});