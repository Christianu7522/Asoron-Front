// import authLogin from "../api/loginApi";
import api from "@/lib/api"
import { setHeader } from "@/lib/api"
import { setCookie } from "@/lib/cookies"


// function postLogin(username, password) {
//     const dataToSave = { username, password }
//     return authLogin.post('/', dataToSave)
// }

async function postLogin(username, password) {
    const dataToSave = { username, password }
    try {
        const { data } = await api.post('/auth/jwt/create/', dataToSave)
        setHeader(data.access)
        setCookie('access', data.access)
        return data
    } catch (error) {
        setCookie('access', '')
        console.log(error)
    }
}
export default postLogin