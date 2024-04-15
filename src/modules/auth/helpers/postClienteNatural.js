import api from "@/lib/api"
import { setHeader } from "@/lib/api"
import { setCookie } from "@/lib/cookies"

async function postClienteNatural(dataToSave, saveHeader = true) {
    console.log('data to save', dataToSave)
    try {
        const { data } = await api.post('store/clienteNatural/', dataToSave)
        console.log(data)
        if (saveHeader === true) {
            setHeader(data.access)
            setCookie('access', data.access)
        }
        return data
    } catch (error) {
        if (saveHeader === true) {
            setCookie('access', '')
        }
        console.log('error:', error)
        throw error
    }
}
export default postClienteNatural