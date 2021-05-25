export const setLocalStorage = (name, data) => {
    localStorage.setItem(`${name}`, data);
}
export const getLocalStorage = (name) => {
    JSON.parse(localStorage.getItem(`${name}`));
}