import api from "@/lib/api"
import { setHeader } from "@/lib/api"
import { setCookie } from "@/lib/cookies"

async function postClienteJuridico(dataToSave, saveHeader = true) {
    console.log('data to save', dataToSave)
    try {
        const { data } = await api.post('store/clienteJuridico/', dataToSave)
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
export default postClienteJuridico