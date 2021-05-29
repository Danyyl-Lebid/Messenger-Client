import "../css/chat.css";
import {getCookie} from "./helpers/cookieHelper";
const CHAR_RETURN = 13;

const socket = new WebSocket('ws://localhost:8080/chat');
const usr = document.getElementById('users');
const chat = document.getElementById('chat');
const msg = document.getElementById('message');
const btn = document.getElementById('btn');

msg.focus();
const nickname = getCookie("nickName");
const token = getCookie("token").toString();

const usersNickName = nickname => {
    const line = document.createElement('li');
    line.innerHTML = `<img src="https://www.meme-arsenal.com/memes/755658588d31fbf527a72b152150e4fa.jpg" alt="">
                <div>
                    <h2>${nickname}</h2>
                    <h3>
                        <span class="status green"></span>
                        online
                    </h3>
                </div>`;
    usr.appendChild(line);
};

const writeLineNickName = nickname => {
    const line = document.createElement('div');
    line.innerHTML = `<p>${nickname}</p>`;
    line.setAttribute("class", "nickName");
    chat.appendChild(line);
};

const writeLineTime = time => {
    time = new Date().toLocaleString('en-US', {timeZone: 'Europe/Kiev'});
    const line = document.createElement('div');
    line.setAttribute("class", "times");
    line.innerHTML = `<p>${time}</p>`;
    chat.appendChild(line);
};

const writeLine = text => {
    const line = document.createElement('div');
    line.setAttribute("class", "messageText");
    line.innerHTML = `<p>${text}</p>`;
    chat.appendChild(line);
};


socket.onopen = () => {

    let payload = {
        text: "Has connected to chat.",
        time: new Date(),
        nickname: nickname
    }
    usersNickName(nickname);
    let envelope = {
        topic: 'LOGIN',
        token: token,
        payload: JSON.stringify(payload)
    };
    socket.send(JSON.stringify(envelope));
};

socket.onclose = () => {
    writeLine('<div class="close">Closed</div>');
};

btn.onclick = () => {
    const s = msg.value;
    msg.value = '';
    let payload = {
        nickname: nickname,
        time: new Date(),
        text: s
    }

    let envelope = {
        topic: 'GLOBAL_MESSAGE',
        token: token,
        payload: JSON.stringify(payload)
    };
    socket.send(JSON.stringify(envelope));
}

msg.addEventListener('keydown', event => {
    if (event.keyCode === CHAR_RETURN) {
        const s = msg.value;
        msg.value = '';
        let payload = {
            nickname: nickname,
            time: new Date(),
            text: s
        }

        let envelope = {
            topic: 'GLOBAL_MESSAGE',
            token: token,
            payload: JSON.stringify(payload)
        };
        socket.send(JSON.stringify(envelope));
    }
});

socket.onmessage = function (event) {
    let payload = JSON.parse(event.data);
    if (payload) {
        if (payload && payload.text) {
            writeLineNickName(payload.nickname);
            writeLineTime(payload.time);
            writeLine(payload.text);
        }
    }
};