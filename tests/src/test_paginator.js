import Paginator from '../../src/ui/Paginator';


let paginator = new Paginator(1, 100);
paginator.appendTo('#output');
window.paginator = paginator;