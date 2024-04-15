
// export const myGetter =  ( state ) => {
//     return state
// }

// export const getRonesById = (state) => (id) => {

//     // const entry = state.entries.find((entry) => entry.id === id)

//     // if (!entry) {
//     //     return
//     // }

//     // return { ...entry }             // Utuilizado para que las modifcaciones no se hagan directo en el objeto

//     for (const entry of state.entries) {     // Forma Aless
//         if (entry.id === id) {
//             return { ...entry }

//         }
//     }
// }

// export const getRonesByTerm = (state) => (term = '') => {

//     if (term.length === 0) {
//         return state.ronList
//     }
//     return state.ronList.filter(ron => ron.ron_nombre.toLowerCase().includes(term.toLocaleLowerCase()))
// }

export const getTokenAccess = (state) => state.token.access