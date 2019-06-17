
import Application from 'app';


__webpack_public_path__ = "dist/";


let app = new Application({
    'test_menubar': () => import("test_menubar.js"),
    'test_dropdown': () => import("test_dropdown.js")
});


window.app = app;
