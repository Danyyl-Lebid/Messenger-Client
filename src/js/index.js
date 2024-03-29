import "../css/registration.scss";
import {postRequest, URL} from "./helpers/request.js";
import {setCookie} from "./helpers/cookieHelper.js";
import {redirect} from "./helpers/general";
import {renderError, renderText} from "./helpers/render.js";

import axios from "axios";


export const IndexInit = () => {

    //login nodes
    const regForm = document.querySelector("form");
    const login = regForm.login;
    const password = regForm.password;
    const signButton = document.querySelector("#submit-auth");
    const errorText = document.querySelector(".error-text");

    signButton.addEventListener("click", (event) => {
        event.preventDefault();
        renderText(errorText, "");
        const bodyObject = {
            login: login.value,
            password: password.value,
        };

        const authURL = URL + "/messenger/auth";
        axios.post(authURL, bodyObject
        ).then((response) => {
            if (response.status === 200) {
                setCookie("nickName",response.headers.nickname);
                setCookie("token", response.data);
                // setLocalStorage("role", data.body.role);
                redirect("chat.html");
            } else return renderError(errorText, "некоректный логин или пароль");
        })
            .catch((e) => {
                renderText(errorText, "");
                return renderError(errorText, "некоректный логин или пароль");
            });

    });
};

IndexInit();
