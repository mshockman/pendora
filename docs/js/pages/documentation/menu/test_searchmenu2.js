import SearchMenu from "../../../../../src/menu2/SearchMenu";
import MenuItem from "../../../../../src/menu2/MenuItem";


export default class Test_searchmenu2 {
    load() {
        let searchMenu = new SearchMenu({placeholder: "Search"}),
            container = document.querySelector("#search-menu-area");

        searchMenu.search = testSearch;

        searchMenu.on("search.change", topic => {
            topic.target.clear();
            topic.target.submenu.empty();
            console.log(topic.value);
        });

        searchMenu.appendTo(container);
        window.test = searchMenu;
    }
}


/**
 *
 * @param value
 * @return {Promise<Array<MenuItem>>}
 */
function testSearch(value) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            let items = [];

            for(let i = 0; i < 10; i++) {
                items.push(new MenuItem({text: `${value} ${i}`}));
            }

            resolve(items);
        }, 1000);
    });
}