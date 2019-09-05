import { register } from "./register.js";
import { login } from "./login.js";
import {header} from "./header.js";
import { footer } from "./footer.js";
import { main } from "./main.js";
const routerMap = {
    section: document.querySelector('.container'),
    '': function () {
        this.section.innerHTML = main('not_log_in_status');
    },
    'loginpage': function () {
        this.section.innerHTML = "";
        this.section.insertAdjacentHTML("beforeend",header.render());
        this.section.appendChild(login.makeLoginPage());
        this.section.insertAdjacentHTML("beforeend", footer.render());
    },
    'registerpage': function () {
        this.section.innerHTML = register.render();
        register.init();
        this.section.insertAdjacentHTML("beforeend", footer.render());
    }
}

export const router = {

    render(address) {
        routerMap[address]();
    }
}
// router.render("");