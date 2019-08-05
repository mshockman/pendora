import Draggable from 'ui/Draggable';





window.addEventListener('load', () => {
    window.d1 = new Draggable("#test-draggable1", {container: 'viewport', helper: Draggable.CLONE(0.5), distance: 100});
    window.d1 = new Draggable("#test-window1", {container: 'viewport', helper: null, handle: '.drag-handle', delay: 1000});
});