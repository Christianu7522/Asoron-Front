import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        Authorization: ''
    },
});


export const setHeader = (token) => {
    api.defaults.headers.Authorization = "JWT " + token
};

export const emptyHeader = () => {
    api.defaults.headers.Authorization = ""
}

export const getHeader = () => {
    return api.defaults.headers.Authorization
}
export default api;
