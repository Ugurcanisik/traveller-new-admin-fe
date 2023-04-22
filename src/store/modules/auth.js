import axios from "axios";
import {router} from '@/router'


const state = {
    token: "",
    user: null
}

const getters = {
    isAuthenticated(state) {
        return state.token !== ""
    },
    getUser(state) {
        return state.user
    },
    getToken(state) {
        return state.token
    }
}

const mutations = {
    setToken(state, token) {
        state.token = token
    },
    clearToken(state) {
        state.token = ""
    },
    setUser(state, payload) {
        state.user = payload
    }
}

const actions = {
    initAuth({commit, dispatch, state}) {
        let token = localStorage.getItem("token")
        if (token) {
            return axios.get('/auth/' + token)
                .then(response => {
                    if (response.data) {
                        //console.log(response.data)
                        const user = response.data
                        user.rights = JSON.parse(user.rights)
                        commit('setUser', user)
                        commit("setToken", token)
                        //router.push("/")
                        return true
                    } else {
                        dispatch('logout')
                        return false
                    }
                })

        } else {
            return false
        }
    },
    login({commit, dispatch, state}, payload) {
        return axios.post('/auth', payload)
            .then(response => {

                return axios.post('/auth', payload.user)
                    .then(response => {
                        if (response.data != false) {
                            let timer = 3000
                            let token = response.data.token
                            // console.log(response.data)
                            localStorage.setItem("token", token)
                            commit("setToken", token)
                            const user = response.data
                            user.rights = JSON.parse(user.rights)
                            commit('setUser', user)
                            swal({
                                text: "Giriş Başarılı",
                                icon: "success",
                                button: false,
                                timer: timer,
                                closeOnClickOutside: false,
                            });
                            setTimeout(() => {
                                router.push("/")
                                //  router.replace('/')
                            }, timer)
                        } else {
                            return false
                        }
                    })
            })
    },
    logout({commit, dispatch, state}) {
        commit("clearToken")
        localStorage.removeItem("token")
        router.push("/auth")
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}

