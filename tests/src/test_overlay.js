import Draggable from 'ui/Draggable';
import Animation from 'core/Animation';
import {privateCache} from "../../src/core/data";


window.Animation = Animation;
window.privateCache = privateCache;

window.test = new Animation({left: 0}, {left: 200}, 200000);


window.addEventListener('load', () => {
    window.d1 = new Draggable("#test-draggable1", {container: 'viewport', helper: Draggable.CLONE(0.5), revert: 5000});
    window.d2 = new Draggable("#test-window1", {container: 'viewport', helper: null, handle: '.drag-handle'});

    document.body.addEventListener('drag', (event) => {
        console.log(event);
    });

    document.body.addEventListener('drag-end', (event) => {
        if(Math.round(Math.random())) {
            event.detail.accept();
        }
    });

    new Draggable(document.querySelector('#drag-list-test'), {selector: '.drag-list-item'});
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