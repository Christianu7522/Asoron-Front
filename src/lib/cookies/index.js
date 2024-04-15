
import Cookies from 'js-cookie';

/**
 * Sets a cookie with the specified key and value.
 * @param {string} key - The key of the cookie.
 * @param {string} value - The value of the cookie.
 */
export const setCookie = (key, value) => {
    Cookies.set(key, value, { expires: 1 });
}

/**
 * Retrieves the value of the cookie with the specified key.
 * @param {string} key - The key of the cookie.
 * @returns {string} The value of the cookie.
 */
export const getCookie = (key) => {
    return Cookies.get(key);
}

/**
 * Removes the cookie with the specified key.
 * @param {string} key - The key of the cookie to be removed.
 */
export const removeCookie = (key) => {
    Cookies.remove(key);
}

