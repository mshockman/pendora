import {debounce} from "./debounce";
import {proto} from "./decorators";
import {createFragment, findChild, filterChildren, emptyElement, addClasses, removeClasses, selectElement, assignAttributes, getScroll, isWindow, setScroll} from "./dom";
import {all, any, chain, enumerate, firstValue, items, keys, values} from "./iter";
import {clamp, modulo, calcDistance} from "./math";
import {arraysEqual, getOwnProperty, getPropertyByPath, isEmptyObject, randomChoice} from "./object";

export {
    debounce,
    proto,
    createFragment, findChild, filterChildren, emptyElement, addClasses, removeClasses, selectElement, assignAttributes,
    getScroll, isWindow, setScroll, all, any, chain, enumerate, firstValue, items, keys, values,
    clamp, modulo, calcDistance,
    arraysEqual, getPropertyByPath, getOwnProperty, isEmptyObject, randomChoice
};
