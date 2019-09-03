import {register} from "./register.js";
import {login} from "./login.js"
(function () {
    const body = document.querySelector('body');
    const routerMap = {
        '': () => {
            body.innerHTML = mainPage();
        },
        'loginpage': () => {
            body.innerHTML = "";
            body.appendChild(login.makeLoginPage());
            body.appendChild(footer.render());
        },
        'register': () => {
            body.innerHTML = register.makeRegisterForm();
            register.init();
            body.appendChild(footer.render());
        }
    }
    const router = () => {
        const hashValue = location.hash.replace('#', '');
        routerMap[hashValue]();
    }
    window.addEventListener('DOMContentLoaded', router);
    window.addEventListener('hashchange', router);
})();
