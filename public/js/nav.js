
import {router,routerMap} from "./render.js";
export const nav = {
    render(validaty){
        if(validaty.user_name !== ""){
            return /*html*/`${this.log_in_status(validaty)}`;
        }else
            return /*html*/`${this.not_log_in_status()}`;
    },
    log_in_status(validaty){
        return /*html*/`<span class="logo"><a href="#"><img href= "/" src="../images/logo.png"></a></span><span><span style="color:white">${validaty.user_name}님 환영합니다.</span><span class="btn logout">Log out</span><span>`;
    },
    not_log_in_status(){
        return /*html*/`<span class="logo"><a href="#"><img href= "/" src="../images/logo.png"></a></span><span><a class="btn" href="/loginpage">Sign in</a> <a class="btn" href="/registerpage"> Sign up</a></span>`
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
                }else{
                    alert("Session에 문제가 있습니다. 다시 로그인 해주세요");
                    history.pushState(null,null,'/loginpage');
                    router("/loginpage");
                }
                    
            });
        });
    },
    setNav(validatyCookie){
        routerMap.nav.innerHTML = nav.render(validatyCookie);
        if(validatyCookie.user_id !== ''){
            nav.addEvent(document.querySelector(".logout"));
        }
    }
}