import Draggable from 'ui/Draggable';
import Animation from 'core/Animation';


window.Animation = Animation;

window.test = new Animation({left: 0}, {left: 200}, 200000);


window.addEventListener('load', () => {
    window.d1 = new Draggable("#test-draggable1", {container: 'viewport', helper: Draggable.CLONE(0.5), revert: 5000});
    window.d2 = new Draggable("#test-window1", {container: 'viewport', helper: null, handle: '.drag-handle'});

    for(let item of document.querySelectorAll('#drag-list-test .drag-list-item')) {
        new Draggable(item, {revert: 2000});
    }
});