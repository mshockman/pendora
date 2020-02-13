import "@babel/polyfill";

import Application from 'app';
// noinspection ES6UnusedImports
import AutoLoader from 'autoloader';


// noinspection JSUnresolvedVariable
__webpack_public_path__ = "dist/";


let app = new Application({
    'test_overlay2': () => import("test_overlay2.js"),
    'test_tooltip': () => import("test_tooltip.js"),
    'test_notifications': () => import("test_notifications.js"),
    'test_modal': () => import("test_modal.js"),
    'test_panes': () => import("test_panes"),
    'test_tabs': () => import('test_tabs')
});


window.app = app;

