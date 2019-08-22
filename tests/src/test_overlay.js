import Draggable from 'ui/Draggable';
import Sortable from 'ui/Sortable';
import Animation from 'core/Animation';
import {privateCache} from "../../src/core/data";
import {getTranslation} from "core/position";


window.Animation = Animation;
window.privateCache = privateCache;

window.test = new Animation({left: 0}, {left: 200}, 200000);


window.getTranslation = getTranslation;


window.addEventListener('load', () => {
    window.d1 = new Draggable("#test-draggable1", {container: 'viewport', helper: Draggable.CLONE(0.5), revert: 5000});
    window.d2 = new Draggable("#test-window1", {container: 'viewport', helper: null, handle: '.drag-handle'});

    new Draggable(document.querySelector('#drag-list-test'), {selector: '.drag-list-item'});
    new Draggable(document.querySelector('#sortable-grid'), {selector: '.grid-item'});

    window.tl = new Sortable('#drag-list-test', {placeholder: true});
    new Sortable('#sortable-grid', {items: '.grid-item', layout: 'xy'});
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