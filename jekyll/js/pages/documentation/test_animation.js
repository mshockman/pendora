import {Vec3} from 'core/vectors';
import Animation from "core/fx/Animation";


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

    applyFrame(fx, frame) {
        // console.log(frame);
        fx.element.style.transform = `translate(${frame.left}, ${frame.top}) rotate(${frame.rotation}deg) scale(${frame.scale})`;
        fx.element.style.display = frame.display;
        fx.element.style.background = frame.backgroundColor.toHex();
        if(frame.opacity) fx.element.style.opacity = frame.opacity;
    }
});


export default class TestAnimationPage {
    load() {
        let box1 = document.querySelector('#test_box1');
        let box2 = document.querySelector('#test_box2');

        window.fx1 = testAnimation.animate(box1, {duration: 10000});
        window.fx2 = testAnimation.animate(box2, {duration: 5000});

        window.fx1.then(() => {
            console.log("Animation Complete");

            return new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
        }).then(() => console.log("Hello World!"));
    }
}