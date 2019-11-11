import {hsvToRGB} from "core/utility";


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


export class ColorPickerWheel {
    constructor(size, hue=0, saturation=0, value=1) {
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
                theta = this._getThetaPercentage(x, y),
                distance = this._getStrengthDistance(x, y);

            debug.innerHTML = `(${x}, ${y}, ${theta})<br>${distance}<br>${this.isMouseDown}`;
        });

        let onMouseMove = event => {
            event.preventDefault();

            let {x, y} = this._getXYPositionFromEvent(event),
                distance = this._getStrengthDistance(x, y);

            if(this.isMouseDown && distance <= 1) {
                this.x = x;
                this.y = y;
                this.render();
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
            this.element.style.cursor = 'crosshair';

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
    }

    getColorAt(x, y) {
        let distance = this._getStrengthDistance(x, y);

        if(distance > 1) {
            return;
        }

        let x2 = x - this.radius,
            y2 = y - this.radius,
            theta = this._getThetaPercentage(x2, y2);

        return hsvToRGB(theta * 360, distance, this.value);
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
        if(y >= 0) {
            return Math.atan2(y, x) / (Math.PI*2);
        } else {
            return (Math.PI - Math.abs(Math.atan2(y, x)) + Math.PI) / (Math.PI*2);
        }
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


export class ColorPickerWheelSlider {
    constructor(wheel, width, height) {
        this.element = document.createElement('canvas');
        this.context = this.element.getContext('2d');
        this.element.width = width;
        this.element.height = height;
        this.element.style.border = "1px solid #000";

        this.image = null;
        this.wheel = wheel;
    }

    refreshImage() {
        this.image = this.context.createImageData(this.element.width, this.element.height);

        for(let x = 0, width = this.element.width; x < width; x++) {
            for(let y = 0, height = this.element.height; y < height; y++) {
                let index = 4*(x+(y*width));

                let m = 1 - (x / width),
                    rgb = hsvToRGB(this.wheel.hue, this.wheel.saturation, m);

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
