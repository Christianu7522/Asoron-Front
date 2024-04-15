

export default {
    name: 'eventos',
    component: () => import(/* webpackChunvkName: "eventos" */ '../layouts/EventosLayout'),
    children: [
        {
            path: '',
            name: 'eventos-list',
            component: () => import(/* webpackChunvkName: "eventos-list" */ '../pages/EventosLista'),
        },
        {
            path: ':id',
            name: 'evento-detail',
            component: () => import(/* webpackChunvkName: "eventos-detail" */ '../pages/EventoDetail.vue'),
            props: (route) => {
                return {
                    id: route.params.id
                }
            }

        }

    ]
}