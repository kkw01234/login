export const header = {
    render(name){
        return `<nav class="navigation">${header[name]() || this.otherwise()}</nav>`;
    },
    log_in_status(){
        return `<a href="">Main Page</a><a href="logout">Log out</a>`;
    },
    not_log_in_status(){
        return `<a href="loginpage">Sign in</a><a href="register"> Sign up</a>`
    },
    otherwise(){
        return ``;
    }
}