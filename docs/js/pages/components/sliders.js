import Slider from "core/ui/Slider";


export default class SlidersPage {
    load() {
        let slider1 = new Slider({value: '50%'}),
            input = document.createElement('input'),
            container = document.querySelector("#slider1-container");

        input.type = "text";
        input.value = "50%";

        slider1.appendTo(container);
        window.slider1 = slider1;

        container.appendChild(input);

        function setInputValue(input, value) {
            value = (value * 100).toFixed(2);
            input.value = value + '%';
        }

        slider1.on('change', topic => {
            setInputValue(input, topic.value);
        });

        slider1.on("slide", topic => {
            setInputValue(input, topic.value);
        });


        let slider2 = new Slider({value: '50%', axis: "y"}),
            input2 = document.createElement('input');

        input2.type = "text";
        input2.value = "50%";

        slider2.appendTo(container);
        window.slider2 = slider2;

        container.appendChild(input2);

        slider2.on('change', topic => {
            setInputValue(input2, topic.value);
        });

        slider2.on("slide", topic => {
            setInputValue(input2, topic.value);
        });
    }
}
