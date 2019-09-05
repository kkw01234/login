import { register } from "./register.js";
import { login } from "./login.js";
import { footer } from "./footer.js";
import { main } from "./main.js";
const routerMap = {
    body: document.querySelector('body'),
    '': function () {
        this.body.innerHTML = main();
    },
    'loginpage': function () {
        this.body.innerHTML = "";
        this.body.appendChild(login.makeLoginPage());
        this.body.insertAdjacentHTML("beforeend", footer.render());
    },
    'registerpage': function () {
        this.body.innerHTML = register.render();
        register.init();
        this.body.insertAdjacentHTML("beforeend", footer.render());
    }
}

export const router = {

    render(address) {
        routerMap[address]();
    }
}
// router.render("");