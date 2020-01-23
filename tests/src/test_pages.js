import "@babel/polyfill";

import Application from 'app';
// noinspection ES6UnusedImports
import AutoLoader from 'autoloader';

import {privateCache} from "core/data";
// noinspection ES6UnusedImports
import Modal from 'ui/modal';
// noinspection ES6UnusedImports
import Tabs from 'ui/tabs';


// noinspection JSUnresolvedVariable
__webpack_public_path__ = "dist/";


let app = new Application({
    'test_resizeable': () => import("test_resizeable.js"),
    'test_overlay2': () => import("test_overlay2.js"),
    'test_animation': () => import("test_animation.js"),
    'test_positioner': () => import("test_positioner.js"),
    'test_tooltip': () => import("test_tooltip.js"),
    'test_notifications': () => import("test_notifications.js")
});


window.app = app;
window.privateCache = privateCache;
