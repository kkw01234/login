
import {router,routerMap} from "./render.js";
export const nav = {
    render(validaty){
        if(validaty.user_name !== ""){
            return /*html*/`${this.log_in_status(validaty)}`;
        }else
            return /*html*/`${this.not_log_in_status()}`;
    },
    log_in_status(validaty){
        return /*html*/`<div class="navigator"><span class="logo">
                            <a href="/">
                                <img class="logo" src="../images/logo.png">
                            </a>
                        </span>
                        <span class="right-nav">
                            <span style="color:white;font-size:1.2em">${validaty.user_name}님 환영합니다.</span>
                            <span class="btn logout">Log out</span>
                            <span class="btn mypage">My page</span>
                            <img class="menuicon" src="../images/menu.svg" >
                        </span></div>
                        <div class="menu" style="display:none"></div>`;
    },
    not_log_in_status(){
        return /*html*/`<div class="navigator"><span>
                            <a href="/">
                                <img class="logo" src="../images/logo.png">
                            </a>
                        </span>
                        <span class="right-nav">
                            <a class="btn" href="/loginpage">Sign in</a> 
                            <a class="btn" href="/registerpage"> Sign up</a>
                            <img class="menuicon" src="../images/menu.svg">
                        </span></div>
                        <div class="menu" style="display:none"></div>`
    },
    setMenu(){
        const menu = document.querySelector(".menu");
        menu.innerHTML = 
        /*html*/`<ul>
                    <li><a href="/">HOME</a></li>
                    <li>ABOUT US</li>
                    <li>CONTANT</li>
                </ul>`;
    },
    otherwise(){
        return ``;
    },
    addLogoutEvent(){
        const logout = document.querySelector(".logout");
        logout.addEventListener("click", this.addLogoutHandler); 
    },
    addMenuEvent(){
        const menuicon = document.querySelector(".menuicon");
        menuicon.addEventListener('click',()=>{
            const menu = document.querySelector(".menu");
            if(menu.style.display === 'none'){
                menu.style.display = 'block';
            }else{
                menu.style.display = 'none';
            }
        });
    },
    addLogoutHandler(){
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
    addMenuButtonHandler(){
        
    },
    setNav(validatyCookie){
        routerMap.nav.innerHTML = nav.render(validatyCookie);
        this.setMenu();
        if(validatyCookie.user_id !== ''){
            this.addLogoutEvent();
        }
        this.addMenuEvent();
        
    },
   
}