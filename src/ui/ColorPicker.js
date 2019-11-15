import {hsvToRGB, rgbToHsv, clamp} from "core/utility";
import Publisher from "core/Publisher";
import {HSV, RGBA} from "core/vectors";


export class SquareColorPickerCursor {
    constructor(size, lineWidth, outlineColor="#000000", borderColor="#ffffff", outlineWidth=1) {
        this.size = size;
        this.lineWidth = lineWidth;
        this.outlineColor = outlineColor;
        this.borderColor = borderColor;
        this.outlineWidth = outlineWidth;
    }

    draw(context, x, y) {
        let size = this.size,
            lineWidth = this.lineWidth;

        context.lineWidth = lineWidth;
        context.strokeStyle = this.borderColor;

        context.strokeRect(x - (size/2), y - (size/2), size, size);
        context.strokeStyle = this.outlineColor;
        context.lineWidth = this.outlineWidth;
        context.strokeRect(x - lineWidth - (size/2), y-lineWidth-(size/2), size+(lineWidth*2), size+(lineWidth*2));
    }
}


export class RectSliderCursorX {
    constructor(width, height, borderColor="#000000", outlineColor="#ffffff", borderSize=1, outlineSize=1) {
        this.width = width;
        this.height = height;
        this.borderColor = borderColor;
        this.outlineColor = outlineColor;
        this.borderSize = borderSize;
        this.outlineSize = outlineSize;
    }

    draw(context, x, y) {
        context.lineWidth = this.outlineSize;
        context.strokeStyle = this.outlineColor;
        context.strokeRect(x, y, this.width, this.height);

        context.lineWidth = this.borderSize;
        context.strokeStyle = this.borderColor;
        context.strokeRect(x + this.outlineSize, y, this.width - (this.outlineSize*2), this.height);
    }
}


export class TrianglesCursorX {
    constructor(width, height, topTriangleColor="#000000", bottomTriangleColor="#ffffff", space=5) {
        this.width = width;
        this.height = height;
        this.topTriangleColor = topTriangleColor;
        this.bottomTriangleColor = bottomTriangleColor;
        this.space = space;
    }

    draw(context, x, y) {
        // Bottom Triangle
        context.fillStyle = this.bottomTriangleColor;
        context.beginPath();
        context.moveTo(x - (this.width/2), y+this.height);
        context.lineTo(x, y + (this.height /2) + (this.space / 2));
        context.lineTo(x + (this.width/2), y+this.height);
        context.fill();

        // top triangle
        context.fillStyle = this.topTriangleColor;
        context.beginPath();
        context.moveTo(x - (this.width/2), y);
        context.lineTo(x, y + (this.height/2) - (this.space/2));
        context.lineTo(x + (this.width/2), y);
        context.fill();
    }
}


export class ColorWheel extends Publisher {
    constructor(size, hue=0, saturation=0, value=1) {
        super();

        this.element = document.createElement('canvas');
        this.context = this.element.getContext('2d');
        this.element.width = size;
        this.element.height = size;
        this.radius = size / 2;
        this.x = this.radius;
        this.y = this.radius;
        this.v = 1.0;
        this.isMouseDown = false;
        this.image = null;

        this.value = new HSV(0.0, 0.0, 1.0);

        this.cursor = new SquareColorPickerCursor(20, 2);

        let debug = document.getElementById('debug-area');
        this.element.addEventListener('mousemove', (event) => {
            let {x, y} = this._getXYPositionFromEvent(event),
                theta = this._getThetaPercentage(x-this.radius, y-this.radius),
                distance = this._getStrengthDistance(x, y);

            debug.innerHTML = `(${x}, ${y})<br>Theta: ${theta}<br>${distance}<br>${this.isMouseDown}`;
        });

        let onMouseMove = event => {
            event.preventDefault();

            let {x, y} = this._getXYPositionFromEvent(event),
                distance = this._getStrengthDistance(x, y);

            if(this.isMouseDown && distance <= 1) {
                this.chooseColorAt(x, y);
            }
        };

        let onMouseUp = () => {
            this.isMouseDown = false;
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
            this.element.style.cursor = '';
        };

        this.element.addEventListener('mousedown', (event) => {
            this.isMouseDown = true;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            this.element.style.cursor = 'none';

            let bb = this.element.getBoundingClientRect(),
                x = event.clientX - bb.left,
                y = event.clientY - bb.top,
                distance = this._getStrengthDistance(x, y);

            if(distance <= 1) {
                this.chooseColorAt(x, y);
            }
        });
    }

    chooseColorAt(x, y) {
        this.value = this._getHsvAt(x, y);

        this.publish('color-change', {
            wheel: this
        });
    }

    getHSV() {
        return this.value;
    }

    getColorAt(x, y) {
        let hsv = this._getHsvAt(x, y);

        if(hsv) {
            return hsvToRGB(hsv.h, hsv.s, hsv.v);
        }
    }

    _getHsvAt(x, y) {
        let distance = this._getStrengthDistance(x, y);

        let x2 = x,
            y2 = y,
            theta = this._getThetaPercentage(x2, y2);

        return new HSV(
            clamp(theta * 360, 0, 360),
            clamp(distance, 0, 1),
            clamp(this.v, 0, 1)
        );
    }

    refreshImage() {
        let width = this.radius*2,
            height = this.radius*2;

        this.image = this.context.createImageData(width, height);

        for(let x = 0; x < width; x++) {
            for(let y = 0; y < height; y++) {
                let rgb = this.getColorAt(x, y),
                    index = 4*(x+(y*width)),
                    distance = this._getStrengthDistance(x, y);

                if(distance > 1) {
                    continue;
                }

                this.image.data[index] = rgb.r;
                this.image.data[index+1] = rgb.g;
                this.image.data[index+2] = rgb.b;
                this.image.data[index+3] = 255;
            }
        }
    }

    render() {
        if(!this._renderID) {
            this._renderID = window.requestAnimationFrame(() => {
                this._renderID = null;

                if(!this.image) {
                    this.refreshImage();
                }

                this.context.putImageData(this.image, 0, 0);

                this.cursor.draw(this.context, this.x, this.y);
            });
        }
    }

    _getStrengthDistance(x, y) {
        x = x - this.radius;
        y = y - this.radius;

        let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        return distance / this.radius;
    }

    _getThetaPercentage(x, y) {
        x -= this.radius;
        y -= this.radius;

        if(y >= 0) {
            return 1 - (Math.atan2(y, x) / (Math.PI*2));
        } else {
            return 1 - ((Math.PI - Math.abs(Math.atan2(y, x)) + Math.PI) / (Math.PI*2));
        }
    }

    _getXY(h, s) {
        h = (360 - h) / 360;
        let t = Math.PI*2*h; // theta

        return {
            x: (Math.cos(t)*s*this.radius) + this.radius,
            y: (Math.sin(t)*s*this.radius) + this.radius
        };
    }

    getRGB() {
        return this.value.toRGB();
    }

    _getXYPositionFromEvent(event) {
        let bb = this.element.getBoundingClientRect(),
            x = (event.clientX - bb.left),
            y = (event.clientY - bb.top);

        return {x, y};
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.element);
        } else if(selector.appendChild) {
            selector.appendChild(this.element);
        } else if(selector.append) {
            selector.append(this.element);
        }
    }

    get value() {
        return this._getHsvAt(this.x, this.y);
    }

    set value(value) {
        value = value.toHSV();
        let currentValue = this.value;

        if(!currentValue.equals(value)) {
            if(currentValue.v !== value.v) {
                this.image = null;
            }

            let {x, y} = this._getXY(value.hue, value.saturation);
            this.x = x;
            this.y = y;
            this.v = value.value;

            this.render();
        }
    }
}


export class ColorRangeSlider extends Publisher {
    constructor(width, height) {
        super();
        this.element = document.createElement('canvas');
        this.context = this.element.getContext('2d');
        this.element.width = width;
        this.element.height = height;
        this.value = 0;
        this.imagePaddingX = 6;
        this.imagePaddingY = 3;
        this.isMouseDown = false;
        this.start = new HSV(0, 0, 0.0);
        this.end = new HSV(0, 0, 1.0);

        this.image = null;

        this.cursor = new TrianglesCursorX(this.element.height / 2, this.element.height, "#000000", "#ffffff", 6);

        let onMouseMove = (event) => {
            if(this.isMouseDown) {
                event.preventDefault();
                let bb = this.element.getBoundingClientRect(),
                    x = event.clientX - bb.left;

                let v = clamp(x / (this.element.width), 0, 1);

                this.chooseColorAt(v);
            }
        };

        let onMouseUp = (event) => {
            this.isMouseDown = false;
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
            this.element.style.cursor = "";
        };

        let onMouseDown = event => {
            if(!this.isMouseDown) {
                this.isMouseDown = true;
                this.element.style.cursor = "none";
                document.addEventListener('mouseup', onMouseUp);
                document.addEventListener('mousemove', onMouseMove);
            }
        };

        this.element.addEventListener('mousedown', onMouseDown);
    }

    refreshImage() {
        let width = this.element.width-(this.imagePaddingX*2),
            height = this.element.height-(this.imagePaddingY*2);

        this.image = this.context.createImageData(width, height);

        for(let x = 0; x < width; x++) {
            for(let y = 0; y < height; y++) {
                let index = 4*(x+(y*width));

                let m = x / width,
                    rgb = this.getColorAt(m);

                this.image.data[index] = rgb.r;
                this.image.data[index+1] = rgb.g;
                this.image.data[index+2] = rgb.b;
                this.image.data[index+3] = 255;
            }
        }
    }

    getColorAt(pos) {
        let delta = this.end.subtract(this.start),
            color = this.start.add(delta.scalar(pos));

        return color.toRGB();
    }

    render() {
        if(!this._renderID) {
            this._renderID = window.requestAnimationFrame(() => {
                this._renderID = null;

                if(!this.image) {
                    this.refreshImage();
                }

                this.context.clearRect(0, 0, this.element.width, this.element.height);
                this.context.putImageData(this.image, this.imagePaddingX, this.imagePaddingY);

                let v = this.value;

                let imageWidth = (this.element.width - (this.imagePaddingX*2)),
                    pos = clamp(v * imageWidth, 0, imageWidth);

                this.cursor.draw(this.context, this.imagePaddingX + pos, 0);
            });
        }
    }

    chooseColorAt(value) {
        if(value !== this.value) {
            this.value = value;
            this.render();
            this.publish('color-change', {target: this, value});
        }
    }

    set value(value) {
        if(value !== this._value) {
            this._value = value;
            this.render();
        }
    }

    get value() {
        return this._value;
    }

    set end(value) {
        this._end = value;
        this.image = null;
        this.render();
    }

    get end() {
        return this._end;
    }

    set start(value) {
        this._start = value;
        this.image = null;
        this.render();
    }

    get start() {
        return this._start;
    }

    getColorValue() {
        return this.getColorAt(this.value);
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.element);
        } else if(selector.appendChild) {
            selector.appendChild(this.element);
        } else if(selector.append) {
            selector.append(this.element);
        }
    }
}


export class ColorPickerWheel extends Publisher {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;

        this.element = document.createElement('article');

        let wheelContainer = document.createElement('div'),
            sliderContainer = document.createElement('div');

        wheelContainer.className = "cpw__wheel-container";
        sliderContainer.className = "cpw__slider-container";
        this.element.className = "color-picker-wheel";

        this.element.appendChild(wheelContainer);
        this.element.appendChild(sliderContainer);
        this.element.appendChild(sliderContainer);

        this.wheel = new ColorWheel(this.width, 0, 0, 1);
        this.sliderValue = new ColorRangeSlider(this.width, 25, 20);

        this.wheel.on('color-change', topic => {
            let color = this.wheel.getHSV();

            this.sliderValue.start = new HSV(color.h, color.s, 0.0);
            this.sliderValue.end = new HSV(color.h, color.s, 1.0);

            this.publish('color-change', {target: this});
        });

        this.sliderValue.on('color-change', topic => {
            let hsv = this.wheel.value;
            this.wheel.value = new HSV(hsv.hue, hsv.saturation, topic.value);
            this.publish('color-change', {target: this});
        });

        this.wheel.appendTo(wheelContainer);
        this.sliderValue.appendTo(sliderContainer);

        this.value = new HSV(0, 0, 1.0);
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.element);
        } else if(selector.appendChild) {
            selector.appendChild(this.element);
        } else if(selector.append) {
            selector.append(this.element);
        }
    }

    render() {
        this.wheel.render();
        this.sliderValue.render();
    }

    get value() {
        return this.wheel.value;
    }

    set value(value) {
        value = value.toHSV();
        this.wheel.value = value;

        console.log(value);
        this.sliderValue.start = new HSV(value.hue, value.saturation, 0.0);
        this.sliderValue.end = new HSV(value.hue, value.saturation, 1.0);
        this.sliderValue.value = value.value;
    }
}


export class ColorComponentSlider extends Publisher {
    constructor(width, height, label, start, end, value=0, name="", max=255, step=1, round=false) {
        super();
        this.slider = new ColorRangeSlider(width, height);
        this.element = document.createElement('div');
        this.label = document.createElement('label');
        this.input = document.createElement('input');
        this.textBox = document.createElement('span');

        this.element.className = "rgb-slider";
        this.label.className = "rgb-slider__label";
        this.input.className = "rgb-slider__input";
        this.textBox.className = "rgb-slider__text";
        this.slider.element.classList.add('rgb-slider__slider');

        this.max = max;
        this.round = round;
        this.input.name = name;
        this.input.type = "number";
        this.input.max = max+"";
        this.input.min = "0";
        this.input.step = step+"";
        this.textBox.innerText = label;

        this.element.appendChild(this.label);
        this.label.appendChild(this.textBox);
        this.slider.appendTo(this.label);
        this.label.appendChild(this.input);

        this.slider.start = start;
        this.slider.end = end;

        this.slider.on('color-change', topic => {
            let value = topic.value * max;

            if(round) {
                value = Math.round(value);
            }

            this.value = value;
            this.publish('color-change', {target: this});
        });

        this.input.addEventListener('change', (event) => {
            this.value = parseInt(this.input.value, 10);
            this.publish('color-change', {target: this});
        });

        this.value = value;
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.element);
        } else if(selector.appendChild) {
            selector.appendChild(this.element);
        } else if(selector.append) {
            selector.append(this.element);
        }
    }

    render() {
        this.slider.render();
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if(this.round) {
            value = Math.round(value);
        }

        value = clamp(value, 0, this.max);

        this._value = value;
        this.input.value = value + "";
        this.slider.value = value / this.max;
    }
}


export class ColorPanel extends Publisher {
    constructor() {
        super();
        this.element = document.createElement("div");
        this.element.className = "color-panel";

        this.redSlider = new ColorComponentSlider(100, 20, "R", new RGBA(0, 0, 0, 1), new RGBA(255, 0, 0, 1), 0, "", 255, 1, true);
        this.greenSlider = new ColorComponentSlider(100, 20, "G", new RGBA(0, 0, 0, 1), new RGBA(0, 255, 0, 1), 0, "", 255, 1, true);
        this.blueSlider = new ColorComponentSlider(100, 20, "B", new RGBA(0, 0, 0, 1), new RGBA(0, 0, 255, 1), 0, "", 255, 1, true);

        this.redSlider.appendTo(this.element);
        this.greenSlider.appendTo(this.element);
        this.blueSlider.appendTo(this.element);

        this.redSlider.on('color-change', () => {
            this.value = new RGBA(this.redSlider.value, this.value.g, this.value.b);
            this.publish('color-change', {target: this});
        });

        this.greenSlider.on('color-change', () => {
            this.value = new RGBA(this.value.r, this.greenSlider.value, this.value.b);
            this.publish('color-change', {target: this});
        });

        this.blueSlider.on('color-change', () => {
            this.value = new RGBA(this.value.r, this.value.g, this.blueSlider.value);
            this.publish('color-change', {target: this});
        });

        this.value = new RGBA(255, 255, 255, 1);
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.element);
        } else if(selector.appendChild) {
            selector.appendChild(this.element);
        } else if(selector.append) {
            selector.append(this.element);
        }
    }

    render() {
        this.redSlider.render();
        this.greenSlider.render();
        this.blueSlider.render();
    }

    set value(value) {
        this._value = value;
        let rgb = this._value.toRGB();
        this.redSlider.value = rgb.r;
        this.greenSlider.value = rgb.g;
        this.blueSlider.value = rgb.b;
    }

    get value() {
        return this._value;
    }
}


export class ColorPicker {
    constructor() {
        this.element = document.createElement('article');

        let col1 = document.createElement('div'),
            col2 = document.createElement('div');

        this.colorPicker = new ColorPickerWheel(300, 500);
        this.panel = new ColorPanel();

        this.element.appendChild(col1);
        this.element.appendChild(col2);

        this.colorPicker.appendTo(col1);
        this.panel.appendTo(col2);

        this.element.className = "color-picker";
        col1.className = "color-picker__col1";
        col2.className = "color-picker__col2";

        this.colorPicker.on('color-change', () => {
            this.panel.value = this.colorPicker.value;
        });

        this.panel.on('color-change', () => {
            this.colorPicker.value = this.panel.value;
        });
    }

    appendTo(selector) {
        if(typeof selector === 'string') {
            document.querySelector(selector).appendChild(this.element);
        } else if(selector.appendChild) {
            selector.appendChild(this.element);
        } else if(selector.append) {
            selector.append(this.element);
        }
    }

    render() {
        this.colorPicker.render();
        this.panel.render();
    }
}