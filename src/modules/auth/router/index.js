

export default {
    name: 'auth',
    component: () => import(/* webpackChunvkName: "auth" */ '../layouts/AuthLayout'),
    children: [
        {
            path: 'login',
            name: 'login',
            component: () => import(/* webpackChunvkName: "Login" */ '../pages/Login'),
        },
        {
            path: 'register',
            name: 'register',
            component: () => import(/* webpackChunvkName: "Register" */ '../pages/Register'),
        }
    ]
}