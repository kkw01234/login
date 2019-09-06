import { register } from "./register.js";
import { login } from "./login.js";
import { header } from "./header.js";
import { footer } from "./footer.js";
import { main } from "./main.js";
import { nav } from "./nav.js";

const routerMap = {
    init(){
        this.firstloading = false;
        this.header= document.querySelector('header');
        this.nav= document.querySelector('nav');
        this.section= document.querySelector('.container');
        this.footer=document.querySelector("footer");
        this.title=document.querySelector("title");
    },
    '/': function () {
        fetch(`/?firstloading=${routerMap.firstloading}`).then((response)=>{
            routerMap.section.id = "main-container";
            routerMap.section.innerHTML = main();
            routerMap.header.innerHTML = header.render();
            routerMap.nav.innerHTML = nav.render('not_log_in_status');
            routerMap.footer.innerHTML = footer.render();
            
            if(routerMap.firstloading){
                response.text().then(res=>console.log(res));
                response.json().then((res)=>{
                    routerMap.title = res.title;
                });
            }
            routerMap.firstloading = true;
        });
       
    },
    '/loginpage': function () {
        fetch(`/loginpage?firstloading=${routerMap.firstloading}`
           ).then((response)=>{
            routerMap.section.innerHTML = "";
            routerMap.section.id = "login-container";
            routerMap.section.appendChild(login.makeLoginPage());
            routerMap.header.innerHTML = header.render();
            routerMap.nav.innerHTML = nav.render('not_log_in_status');
            routerMap.footer.innerHTML = footer.render();
            if(routerMap.firstloading){
                response.json().then((res)=>{
                    routerMap.title = res.title;
                });
            }
           
            routerMap.firstloading = true;

        });
       
    },
    '/registerpage': function () {
        fetch(`/registerpage?firstloading=${routerMap.firstloading}`).then((response)=>{
            routerMap.section.id = "register-container"
            routerMap.section.innerHTML = register.render();
            register.init();
            routerMap.header.innerHTML = header.render();
            routerMap.nav.innerHTML = nav.render('not_log_in_status');
            routerMap.footer.innerHTML = footer.render();
            if(routerMap.firstloading){
                response.json().then((res)=>{
                    routerMap.title = res.title;
                });
            }
            routerMap.firstloading = true;
        });
        
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
console.log(navigator);
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
// router("/"); //처음 로드 할 때
