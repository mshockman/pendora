import Vec4 from './Vec4';

const regPercentage = /^(\d+\.?\d*)%$/;


export default class RGBA extends Vec4 {
    constructor(r, g, b, a) {
        if(typeof r === 'object') {
            super(r);
        } else {
            super(r, g, b, a);
        }
    }

    toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    static parseRGBAColorStringArgs(value) {
        value = value.trim().split(/\s+/);

        let r = value[0],
            g = value[1],
            b = value[2],
            a = value[3];

        if(r) {
            if(regPercentage.test(r)) {
                r = (parseFloat(r) / 100) * 255;
            } else {
                r = parseInt(r, 10);
            }
        }

        if(g) {
            if(regPercentage.test(g)) {
                g = (parseFloat(g) / 100) * 255;
            } else {
                g = parseInt(g, 10);
            }
        }

        if(b) {
            if(regPercentage.test(b)) {
                b = (parseFloat(b) / 100) * 255;
            } else {
                b = parseInt(b, 10);
            }
        }

        if(a) {
            if(regPercentage.test(a)) {
                a = (parseFloat(a) / 100);
            } else {
                a = parseFloat(a);
            }
        }

        a = a || 1.0;

        return new RGBA(r, g, b, a);
    }

    static parseHexColorStringArg(value) {
        value = value.trim().substring(1);

        let r, g, b, a = 1.0;

        if(value.length === 3) {
            r = value[0];
            g = value[1];
            b = value[2];

            r = parseInt(r+r, 16);
            g = parseInt(g+g, 16);
            b = parseInt(b+b, 16);
        } else if(value.length === 6) {
            r = value.substr(0, 2);
            g = value.substr(2, 2);
            b = value.substr(4, 2);

            r = parseInt(r, 16);
            g = parseInt(g, 16);
            b = parseInt(b, 16);
        } else if(value.length === 8) {
            r = value.substr(0, 2);
            g = value.substr(2, 2);
            b = value.substr(4, 2);
            a = value.substr(6, 2);

            r = parseInt(r, 16);
            g = parseInt(g, 16);
            b = parseInt(b, 16);
            a = parseInt(a, 16) / 255;
        }

        return new RGBA(r, g, b, a);
    }
}
