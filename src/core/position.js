

const regMatrix = /matrix(3d)?\(([^)]+)\)/;


export function getOffsetElement(element) {
    let o = element.parentElement;

    while(o) {
        let position = getComputedStyle(o).position;
        if(position !== 'static') return o;
        o = o.parentElement;
    }
}


export function getDocumentPosition(element) {
    let box = element.getBoundingClientRect();

    return {
        left: box.left + window.scrollX,
        top: box.top + window.scrollY
    };
}


export function getTranslation(element) {
    let transform = getComputedStyle(element).transform,
        m = regMatrix.exec(transform);

    if(!m) {
        return {
            x: 0,
            y: 0,
            z: 0
        }
    }

    let data = m[2].split(/\s*,\s*/);

    if(m[1]) {
        return {
            x: parseFloat(data[12]),
            y: parseFloat(data[13]),
            z: parseFloat(data[14])
        };
    } else {
        return {
            x: parseFloat(data[4]),
            y: parseFloat(data[5]),
            z: 0
        };
    }
}
