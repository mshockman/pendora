import {debounce} from "./debounce";
import {proto} from "./decorators";
import {createFragment, findChild, findChildren, emptyElement, addClasses, removeClasses, selectElement, assignAttributes, getScroll, isWindow, setScroll, closest} from "./dom";
import {all, any, chain, enumerate, firstValue, items, keys, values} from "./iter";
import {clamp, modulo, calcDistance} from "./math";
import {arraysEqual, getOwnProperty, getPropertyByPath, isEmptyObject, randomChoice, rangeFindItem, setPropertyByPath, exportWND, hasPropertyPath} from "./object";

export {
    debounce,
    proto,
    createFragment, findChild, findChildren, emptyElement, addClasses, removeClasses, selectElement, assignAttributes,
    getScroll, isWindow, setScroll, all, any, chain, enumerate, firstValue, items, keys, values,
    clamp, modulo, calcDistance,
    arraysEqual, getPropertyByPath, getOwnProperty, isEmptyObject, randomChoice, rangeFindItem, closest, setPropertyByPath, exportWND, hasPropertyPath
};
