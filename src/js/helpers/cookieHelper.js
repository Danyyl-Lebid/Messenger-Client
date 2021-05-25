export const setCookie = (name, data) => {
  document.cookie = `${name}=${data}; max-age=3600`;
};
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
export const killCookie = (name) => { window.document.cookie = `${name}=;max-age=0`};
