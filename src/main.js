import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import {store} from './store'

import VueMeta from 'vue-meta'
import {Vuelidate} from "vuelidate"
import ToggleButton from 'vue-js-toggle-button'
import {BootstrapVue} from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios";


axios.defaults.baseURL = "http://localhost:3000"

Vue.use(Vuelidate)
Vue.use(ToggleButton)
Vue.use(VueMeta, {
    refreshOnceOnNavigation: true
})
Vue.use(BootstrapVue)


store.dispatch('initAuth').then(response => {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
}).catch(e => {
    console.log(e)
})



