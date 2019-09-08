import { register } from "./register.js";
import { login } from "./login.js";
import { header } from "./header.js";
import { footer } from "./footer.js";
import { main } from "./main.js";
import { nav } from "./nav.js";
import {getCookie} from "./utils.js";
const routerMap = {
    init(){
        this.firstloading = false;
        this.header= document.querySelector('header');
        this.nav= document.querySelector('nav');
        this.section= document.querySelector('.container');
        this.footer=document.querySelector("footer");
        this.title=document.querySelector("title");
    },
    '/': function (validatyCookie =false) {
        
        fetch(`/?firstloading=${routerMap.firstloading}`).then((response)=>{
            routerMap.section.id = "main-container";
            routerMap.section.innerHTML = main.render();
            routerMap.header.innerHTML = header.render();
            console.log(validatyCookie);
            
            routerMap.footer.innerHTML = footer.render();
            
            if(routerMap.firstloading){
                response.json().then((res)=>{
                    routerMap.title = res.title;
                    console.log(res.validatyCookie);
                    routerMap.nav.innerHTML = nav.render(res.validatyCookie);
                    if(res.validatyCookie === true)
                        nav.addEvent(document.querySelector(".logout"));
                });
            }else //reloading 되었을경우
                routerMap.nav.innerHTML = nav.render(validatyCookie);
            routerMap.firstloading = true;
        });
       
    },
    '/loginpage': function (validatyCookie = false) {
        fetch(`/loginpage?firstloading=${routerMap.firstloading}`
           ).then((response)=>{
            routerMap.section.innerHTML = "";
            routerMap.section.id = "login-container";
            routerMap.section.appendChild(login.makeLoginPage());
            routerMap.header.innerHTML = header.render();
            routerMap.footer.innerHTML = footer.render();
            if(routerMap.firstloading){
                response.json().then((res)=>{
                    routerMap.title = res.title;
                    console.log(res.validatyCookie);
                    routerMap.nav.innerHTML = nav.render(res.validatyCookie);
                });
            }else
                routerMap.nav.innerHTML = nav.render(validatyCookie);
           
            routerMap.firstloading = true;

        });
       
    },
    '/registerpage': function (validatyCookie=false) {
        fetch(`/registerpage?firstloading=${routerMap.firstloading}`).then((response)=>{
            routerMap.section.id = "register-container"
            routerMap.section.innerHTML = register.render();
            register.init();
            routerMap.header.innerHTML = header.render();
            routerMap.footer.innerHTML = footer.render();
            if(routerMap.firstloading){
                response.json().then((res)=>{
                    routerMap.title = res.title;
                    console.log(res.validatyCookie);
                    routerMap.nav.innerHTML = nav.render(res.validatyCookie);
                });
            }else
                routerMap.nav.innerHTML = nav.render(validatyCookie);
            routerMap.firstloading = true;
        });
        
    },
    otherwise() { /* Error*/
        routerMap.section.innerHTML = 'NOT FOUND';
    }
}

/**
 * 
 * @param {String} address 
 * @param {Boolean} validatyCookie 
 */
export const router = (address,validatyCookie = false)=>{
    
    console.log(address);
    (routerMap[address]||routerMap['otherwise'])(validatyCookie);
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
    console.log(e.state.path);
    router(e.state.path);
});
routerMap.init();
// router("/"); //처음 로드 할 때
