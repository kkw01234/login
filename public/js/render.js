import { register } from "./register.js";
import { login } from "./login.js";
import { header } from "./header.js";
import { footer } from "./footer.js";
import { main } from "./main.js";
import { nav } from "./nav.js";
const routerMap = {
    init(){
        this.header= document.querySelector('header');
        this.nav= document.querySelector('nav');
        this.section= document.querySelector('.container');
        this.footer=document.querySelector("footer");
    },
    '/': function () {
        fetch("/").then(function(res){
            this.section.id = "main-container";
            this.section.innerHTML = main();
            this.header.innerHTML = header.render();
            this.nav.innerHTML = nav.render('not_log_in_status');
            this.footer.innerHTML = footer.render();
        }.bind(routerMap));
       
    },
    '/loginpage': function (res) {
        fetch("/loginpage").then(function(res){
            routerMap.section.innerHTML = "";
            this.section.id = "login-container";
            this.section.appendChild(login.makeLoginPage());
            this.header.innerHTML = header.render();
            this.nav.innerHTML = nav.render('not_log_in_status');
            this.footer.innerHTML = footer.render();
        }.bind(routerMap));
       
    },
    '/registerpage': function () {
        fetch("/registerpage").then(function(res){
            this.section.id = "register-container"
            this.section.innerHTML = register.render();
            register.init();
            this.header.innerHTML = header.render();
            this.nav.innerHTML = nav.render('not_log_in_status');
            this.footer.innerHTML = footer.render();
        }.bind(routerMap));
        
    },
    otherwise() {
        this.section.innerHTML = 'NOT FOUND';
    }
}

export const router = (address)=>{
    console.log(address);
    (routerMap[address]||routerMap['otherwise'])();
}
const navigator = document.querySelector("nav");
navigator.addEventListener('click', e => {
    if (!e.target || e.target.nodeName !== 'A') return;
    e.preventDefault();
    const path = e.target.getAttribute('href');
    history.pushState({ path }, null, path);
    router(path);
});
window.addEventListener('popstate', e => {
    router(e.state.path);
});
routerMap.init();
router("/");
