import { register } from "./register.js";
import { login } from "./login.js";
import {header} from "./header.js";
import { footer } from "./footer.js";
import { main } from "./main.js";
import {nav} from "./nav.js";
const routerMap = {
    header : document.querySelector('header'),
    nav : document.querySelector('nav'),
    section : document.querySelector('.container'),
    footer : document.querySelector("footer"),
    '': function () {
        this.section.id = "main-container";
        this.section.innerHTML = main();
        this.header.innerHTML = header.render();
        this.nav.innerHTML = nav.render('not_log_in_status');
        this.footer.innerHTML = footer.render();
    },
    'loginpage': function () {
        this.section.innerHTML = "";
        this.section.id = "login-container";
        this.section.appendChild(login.makeLoginPage());
        this.header.innerHTML = header.render();
        this.nav.innerHTML = nav.render('not_log_in_status');
        this.footer.innerHTML = footer.render();
    },
    'registerpage': function () {
        this.section.id = "register-container"
        this.section.innerHTML = register.render();
        register.init();
        this.header.innerHTML = header.render();
        this.nav.innerHTML = nav.render('not_log_in_status');
        this.footer.innerHTML = footer.render();
    },
    otherwise(){
        this.app.innerHTML = 'NOT FOUND';
    }
}

export const router = {

    render(address) {
        routerMap[address]();
    }
}
// router.render("");