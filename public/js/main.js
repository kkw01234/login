import {header} from "./header.js";
import {footer} from "./footer.js";
export const main = (status)=>{
    return `${header.render(status)}
    <div> This is main Page</div>
    ${footer.render()}`;
}