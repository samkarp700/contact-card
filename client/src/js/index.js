//entry point that webpack will look at to determine dependencies and assets for app
import "./form";
import "./submit";
//import bootstrap and popper
import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


//import css files
import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

//import css files
import "../css/index.css";

import { getDB, initDB, postDB } from '../js/database';

window.addEventListener('load', function() {
    initDB();
    getDB();
    postDB();
    getDB();
    document.getElementById('logo').src = Logo;
    document.getElementById('bear').src = Bear;
    document.getElementById('dog').src = Dog;
})


