import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from '@/views/dashboard'
import ChildView from '@/views/childView'
import category from "@/views/category";
import traveller from "@/views/traveller";
import users from "@/views/users";
import {store} from "../store/index";
import Auth from "@/views/auth";
import accountSettings from "../views/accountSettings";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: ChildView,
        children: [
            {
                path: '', redirect: '/dashboard',
            },
            {
                path: '/dashboard', component: Dashboard,
            },
            {
                path: '/category', component: category,
                beforeEnter: (to, from, next) => {
                    const rights = store.getters.getUser.rights.categories

                    if (rights) {
                        next();
                    } else {
                        next('/dashboard');
                    }
                }
            },
            {
                path: '/traveller', component: traveller,
                beforeEnter: (to, from, next) => {
                    const rights = store.getters.getUser.rights.traveller
                    if (rights) {
                        next();
                    } else {
                        next('/dashboard');
                    }
                }
            },
            {
                path: '/users', component: users,
                beforeEnter: (to, from, next) => {
                    const rights = store.getters.getUser.rights.users
                    if (rights) {
                        next();
                    } else {
                        next('/dashboard');
                    }
                }
            },
            {
                path: '/accountSettings', component: accountSettings,
            },
        ]
    },
    {
        path: "/auth",
        component: Auth
    },
    {
        path: "*", redirect: "/",
    }
];


export const router = new VueRouter({
    mode: "history",
    routes
})


router.beforeEach((to, from, next) => {
    if (store.getters.isAuthenticated) {
        if (to.fullPath == '/auth') {
            next('/')
        } else {
            next()
        }
    } else {
        if (to.fullPath != '/auth') {
            next('/auth')
        } else {
            next()
        }
    }
})

