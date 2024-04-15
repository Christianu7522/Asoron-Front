import api from '@/lib/api'

async function getDiarioRoneroPdf() {
    const { data } = await api.get(`/store/diario-ronero/pdf`, { responseType: 'blob' })
    console.log(data)
    if (data) return data
    else return []
}

export default getDiarioRoneroPdf