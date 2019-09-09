
import {router,routerMap} from "./render.js";
export const nav = {
    render(validaty){
        if(validaty){
            return `<nav class="navigation">${this.log_in_status()}</nav>`;   
        }else
            return `<nav class="navigation">${this.not_log_in_status()}</nav>`;
    },
    log_in_status(){
        return `<span class="logout">Log out</span>`;
    },
    not_log_in_status(){
        return `<a href="/loginpage">Sign in</a><a href="/registerpage"> Sign up</spn>`
    },
    otherwise(){
        return ``;
    },
    addEvent(button){
        button.addEventListener("click", this.logoutHandler);
    },
    logoutHandler(){
        fetch("/loginpage/logout").then(response=>{
            response.json().then(data=>{
                console.log(data);
                if(data.result === true){
                    history.pushState(null,null,"/")
                    router("/");
                }else
                    alert("다시 로그아웃 해주세요");
            });
        });
    },
    setNav(validatyCookie){
        routerMap.nav.innerHTML = nav.render(validatyCookie);
        if(validatyCookie){
            nav.addEvent(document.querySelector(".logout"));
        }
    }
}