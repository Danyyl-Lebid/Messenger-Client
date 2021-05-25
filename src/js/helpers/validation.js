import { renderError } from "./render";

export const validateLogin = (login) => {
    if (!login) return false;
    const reg = new RegExp(/^[a-z0-9_-]{3,25}$/, "i");
    return reg.test(login);


};

export const validatePassword = (password) => {
    if (!password) return false;
    const reg = new RegExp(/^[a-z0-9_-]{4,25}$/, "i");
    return reg.test(password);

};

export const compare = (left, right, node) => {
    const validLeft = validatePassword(left);
    const validRight  = validatePassword(right);
    if(validLeft === false || validRight === false){
        return false;
    }
    if (left === undefined || right === undefined || !node) {
        return false;
    }
    if (left !== right) {
        renderError(node, "password does not match");
        return false;
    }
    return true;

};
