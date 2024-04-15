

export default {
    name: 'profile',
    component: () => import(/* webpackChunvkName: "profile" */ '../layouts/ProfileLayout'),
    children: [
        {
            path: 'natural',
            name: 'natural',
            component: () => import(/* webpackChunvkName: "natural" */ '../pages/PerfilClienteNatural'),
        },
        {
            path: 'juridico',
            name: 'juridico',
            component: () => import(/* webpackChunvkName: "juridico" */ '../pages/PerfilClienteJuridico'),
        },
        {
            path: 'empleado',
            name: 'empleado',
            component: () => import(/* webpackChunvkName: "empleado" */ '../pages/PerfilEmpleado'),
        }
    ]
}