import {hsvToRGB, rgbToHsv, clamp} from "core/utility";
import Publisher from "core/Publisher";
import {HSV} from "core/vectors";


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
        this.isMouseDown = false;
        this.image = null;
        this.hue = hue;
        this.saturation = saturation;
        this.value = value;

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
        this.x = x;
        this.y = y;
        this.render();
        let hsv = this.getHSV();
        this.hue = hsv.h;
        this.saturation = hsv.s;
        this.value = hsv.v;

        this.publish('color-change', {
            wheel: this
        });
    }

    getColorAt(x, y) {
        let hsv = this._getHsvAt(x, y);

        if(hsv) {
            return hsvToRGB(hsv.h, hsv.s, hsv.v);
        }
    }

    _getHsvAt(x, y) {
        let distance = this._getStrengthDistance(x, y);

        if(distance > 1) {
            return;
        }

        let x2 = x,
            y2 = y,
            theta = this._getThetaPercentage(x2, y2);

        return {
            h: theta * 360,
            s: distance,
            v: this.value
        };
    }

    refreshImage() {
        let width = this.radius*2,
            height = this.radius*2;

        this.image = this.context.createImageData(width, height);

        for(let x = 0; x < width; x++) {
            for(let y = 0; y < height; y++) {
                let rgb = this.getColorAt(x, y),
                    index = 4*(x+(y*width));

                if(!rgb) {
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
        if(!this.image) {
            this.refreshImage();
        }

        this.context.putImageData(this.image, 0, 0);

        this.cursor.draw(this.context, this.x, this.y);
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

    setRGB(r, g, b) {
        let hsv = rgbToHsv(r, g, b),
            {x, y} = this._getXY(hsv.h, hsv.s);

        this.chooseColorAt(x, y);
    }

    getHSV() {
        return this._getHsvAt(this.x, this.y);
    }

    getRGB() {
        return this.getColorAt(this.x, this.y);
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
}


export class ColorRangeSlider extends Publisher {
    constructor(width, height) {
        super();
        this.element = document.createElement('canvas');
        this.context = this.element.getContext('2d');
        this.element.width = width;
        this.element.height = height;
        this.element.style.border = "1px solid #000";  // todo remove debug only
        this.value = 1;
        this.isMouseDown = false;
        this.from = new HSV(0, 0, 1.0);
        this.to = new HSV(0, 0, 0.0);

        this.image = null;

        this.cursor = new TrianglesCursorX(this.element.height / 2, this.element.height, "#000000", "#ffffff", 10);

        let onMouseMove = (event) => {
            if(this.isMouseDown) {
                event.preventDefault();
                let bb = this.element.getBoundingClientRect(),
                    x = event.clientX - bb.left;

                let v = clamp(x / (this.element.width), 0, 1);

                this.setValue(v);
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
        let width = this.element.width,
            height = this.element.height;

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
        let delta = this.to.subtract(this.from),
            color = this.from.add(delta.scalar(pos));

        return color.toRGB();
    }

    render() {
        if(!this.image) {
            this.refreshImage();
        }

        this.context.putImageData(this.image, 0, 0);

        let v = 1 - this.value;

        let x = v * (this.element.width);

        this.cursor.draw(this.context, x, 0);
    }

    setValue(value) {
        if(value !== this.value) {
            this.value = value;
            this.render();
        }
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


export class ColorPickerWheel {
    constructor(width, height) {
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
        this.slider = new ColorRangeSlider(this.wheel, this.width, 25, 20);

        this.wheel.appendTo(wheelContainer);
        this.slider.appendTo(sliderContainer);
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
        this.slider.render();
    }
}
