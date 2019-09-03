import {registerForm} from "./register.js";
(function () {
    const body = document.querySelector('body');
    const routerMap = {
        '': () => {
            body.innerHTML = mainPage();
        },
        'loginpage': () => {
            body.innerHTML = "";
            body.appendChild(loginForm.makeLoginPage());
            body.appendChild(footerForm.makeFooter());
        },
        'register': () => {
            body.innerHTML = registerForm.makeRegisterForm();
            registerForm.init();
            body.appendChild(footerForm.makeFooter());
        }
    }
    const router = () => {
        const hashValue = location.hash.replace('#', '');
        // console.log(location.pathname);
        // console.log(hashValue);
        routerMap[hashValue]();
    }
    // router();
    window.addEventListener('DOMContentLoaded', router);
    window.addEventListener('hashchange', router);
})();
