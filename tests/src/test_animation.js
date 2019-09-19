import Animation from 'core/Animation';
import {Vec3} from 'core/vectors';


window.Animation = Animation;


window.testAnimation = new Animation({
    '0%': {
        left: 0,
        top: 0,
        rotation: 0,
        scale: 1,
        display: 'block',
        backgroundColor: new Vec3(255, 0, 0)
    },

    '50%': {
        left: 500,
        top: 500,
        scale: 0.25,
    },

    '90%': {
        left: 700,
        top: 100
    },

    '65%': {
        opacity: 1,
    },

    '100%': {
        left: 1200,
        top: 100,
        rotation: 1440,
        scale: 2,
        opacity: 0,
        display: 'none',
        backgroundColor: new Vec3(0, 0, 255)
    }
}, {
    applyFrame: function(element, frame) {
        element.style.transform = `translate(${frame.left}px, ${frame.top}px) rotate(${frame.rotation}deg) scale(${frame.scale})`;
        element.style.display = frame.display;
        element.style.background = frame.backgroundColor.toHex();
        if(frame.opacity) element.style.opacity = frame.opacity;
    }
});


export default class TestAnimationPage {
    constructor() {

    }

    load() {
        let box1 = document.querySelector('#test_box1');

        testAnimation.animate(box1, 5000, null);
    }
}