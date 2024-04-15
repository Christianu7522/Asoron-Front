import { createStore } from 'vuex'

import catalogo from '@/modules/catalogo/store/catalogo'
import eventos from '@/modules/eventos/store/eventos'
import auth from '@/modules/auth/store/auth'
import carrito from '@/modules/carrito/store/carrito'

const store = createStore({
    modules: {
        auth,
        carrito,
        catalogo,
        eventos,
    }
})

export default store