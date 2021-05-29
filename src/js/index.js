import "../css/registration.scss";
import {postRequest, URL} from "./helpers/request.js";
import {setCookie} from "./helpers/cookieHelper.js";
import {redirect} from "./helpers/general";
import {renderError, renderText} from "./helpers/render.js";
import {setLocalStorage} from "./helpers/localStorageOperations.js";
import * as CryptoJS from "crypto-js";
import axios from "axios";

export const IndexInit = () => {

    //login nodes
    const regForm = document.querySelector("form");
    const login = regForm.login;
    const password = regForm.password;
    const signButton = document.querySelector("#submit-auth");
    const guestLink = document.querySelector("#guest");
    const errorText = document.querySelector(".error-text");

    function _arrayBufferToBase64( buffer ) {
        let binary = '';
        let bytes = new Uint8Array( buffer );
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    guestLink.addEventListener("click", (e) => {
        e.preventDefault();
        setLocalStorage("role", 'guest');
        redirect("chat.html");
    });
    signButton.addEventListener("click", (event) => {
        event.preventDefault();
        renderText(errorText, "");
        const bodyObject = {
            login: login.value,
            password: password.value,
        };

        const authURL = URL + "/users/auth";
        axios.post(authURL, bodyObject
        ).then((data) => {

            console.log(data.headers.nickname);
            /*let buffer = data.data.split(".");
            let publicToken = buffer[0];
            let bytes  = CryptoJS.AES.decrypt(publicToken, "NotTheBestChoice");

            let originalText = bytes.toString(CryptoJS.enc.Utf8);*/

            if (data.status === 200) {
                // if (data.body.role !== 'admin') {
                //     data.body.role = 'user';
                // }
                //setCookie("token", data.body.token);
                setLocalStorage(data);
                redirect("chat.html");
            } else {
                return renderError(errorText, "некоректный логин или пароль");
            }
        })
            .catch((e) => {
                renderText(errorText, "");
                return renderError(errorText, "некоректный логин или пароль");
            });
    });
};

IndexInit();
