(function(){
    const body = document.querySelector('body');
    const routerMap = {
        '' : ()=>{
            mainPage();
        },
        'loginpage' : ()=>{
            loginPage();
        },
        'register' : ()=>{
            registerForm();
        }
    }
    const router = ()=>{
        const hashValue = location.hash.replace('#','');
        // console.log(location.pathname);
        // console.log(hashValue);
        routerMap[hashValue]();
    }
    // router();
    window.addEventListener('DOMContentLoaded', router);
    window.addEventListener('hashchange',router);
})();
