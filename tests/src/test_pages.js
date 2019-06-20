
import Application from 'app';
import AutoLoader from 'autoloader';
import "menus";
import "filters";


__webpack_public_path__ = "dist/";


let app = new Application({
    'test_menubar': () => import("test_menubar.js"),
    'test_menus': () => import("test_menu.js"),
    'test_dropdown': () => import("test_dropdown.js")
});


window.app = app;
AutoLoader.load();