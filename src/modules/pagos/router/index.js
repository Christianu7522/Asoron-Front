

export default {
    name: 'checkout-layout',
    component: () => import(/* webpackChunvkName: "checkout" */ '../layouts/CheckoutLayout'),
    children: [
        {
            path: '',
            name: 'checkout-cliente',
            component: () => import(/* webpackChunvkName: "checkout-index" */ '../pages/CheckoutCliente'),
        },
        {
            path: 'empleado',
            name: 'checkout-empleado',
            component: () => import(/* webpackChunvkName: "checkout-index" */ '../pages/CheckoutEmpleado'),
        },
    ]
}