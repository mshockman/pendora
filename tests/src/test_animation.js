import Animation from 'core/ui/Animation';
import {Vec3} from 'core/vectors';


window.Animation = Animation;


window.testAnimation = new Animation({
    frames: {
        '0%': {
            left: '0px',
            top: '0px',
            rotation: 0,
            scale: 1,
            opacity: 1,
            display: 'block',
            backgroundColor: new Vec3(255, 0, 0)
        },

        '50%': {
            left: '500px',
            top: '500px',
            scale: 0.25,
        },

        '90%': {
            left: '700px',
            top: '100px'
        },

        '65%': {
            opacity: 1,
        },

        '100%': {
            left: '1200px',
            top: '100px',
            rotation: 1440,
            scale: 2,
            opacity: 0,
            display: 'none',
            backgroundColor: new Vec3(0, 0, 255)
        }
    },

    applyFrame(element, frame) {
        // console.log(frame);
        element.style.transform = `translate(${frame.left}, ${frame.top}) rotate(${frame.rotation}deg) scale(${frame.scale})`;
        element.style.display = frame.display;
        element.style.background = frame.backgroundColor.toHex();
        if(frame.opacity) element.style.opacity = frame.opacity;
    }
});


window.t = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(2), 1000);
}).then(function(result) {
    console.log(result);

    return new Promise(function(resolve, reject) {
        setTimeout(() => resolve(result * 2), 2000);
    });
}).then(function(result) {
    console.log(result);
});


export default class TestAnimationPage {
    constructor() {

    }

    load() {
        let box1 = document.querySelector('#test_box1');
        let box2 = document.querySelector('#test_box2');

        window.fx1 = testAnimation.animate(box1, 10000);
        window.fx2 = testAnimation.animate(box2, 5000);

        window.fx1.then(() => {
            console.log("Animation Complete");

            return new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
        }).then(() => console.log("Hello World!"));
    }
}
