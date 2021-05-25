export const URL = "http://localhost:8080";

export const getRequest = async (url, options = { method: "GET" }) => {
    const answer = await fetch(url, options);
    return answer.json();
};
export const postRequest = async (url, options) => {
    const answer = fetch(url, options);
    const body = answer.json();
    return { body, status: answer.status };
};
export const putRequest = async (url, options) => {
    const answer = await fetch(url, options);
    return answer.json();
};
export const deleteRequest = async (url, options) => {
    const answer = await fetch(url, options);
    return answer.json();
};
