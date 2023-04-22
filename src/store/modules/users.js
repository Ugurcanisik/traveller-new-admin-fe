import axios from "axios";
import {store} from "../index";


const state = {
    users: [],
    find: {},
    role: {}
}

const getters = {
    allUsers(state) {
        return state.users;
    },
    findOneUser(id) {
        return state.users.filter(element => {
            return element.id == id
        })
    },
    getUserModal(state) {
        return state.find
    },
    getUserRoleModal(state) {
        return state.role
    },
}

const mutations = {
    updateUsersList(state, payload) {
        state.users.push(payload);
    },
    updateUserModal(state, payload) {
        state.find = payload
    },
    updateUserRoleModal(state, payload) {
        state.role = payload
    }
}

const actions = {
    initUsersApp({dispatch, commit, state}) {
        return axios.get('/users')
            .then(response => {
                if (response.status === 200) {
                    let data = response.data;
                    const activeUser = store.getters.getUser.id
                    state.users = []
                    for (let key in data) {
                        if (data[key].id != activeUser) {
                            commit("updateUsersList", data[key]);
                        }
                    }
                }
            })
    },
    saveUser({dispatch, commit, state}, payload) {
        return axios.post("/users", payload)
            .then(response => {
                if (response.status === 201) {
                    payload.id = response.data.id;
                    commit("updateUsersList", payload);
                    return true
                } else {
                    return false
                }
            })
    },
    findUser({dispatch, commit, state}, payload) {
        const user = getters.findOneUser(payload)
        if (user.length > 0) {
            commit('updateUserModal', user)
        }
    },
    findRole({dispatch, commit, state}, payload) {
        const user = getters.findOneUser(payload)
        if (user.length > 0) {
            commit('updateUserRoleModal', user)
        }
    },
    updateRoleUser({dispatch, commit, state}, payload) {
        const user = getters.findOneUser(payload.id)
      //  alert(JSON.stringify(user))

        if (user.length > 0) {
            return axios.patch("/users/rights/" + payload.id, payload.data)
                .then(response => {
                    if (response.status === 200) {
                        user[0].rights = payload.data.rights
                        return true
                    } else {
                        return false
                    }
                })
        }

    },
    updateUser({dispatch, commit, state}, payload) {

        if (store.getters.getUser.id === payload.id) {
            return axios.patch("/users/" + payload.id, payload.data)
                .then(response => {
                    if (response.status === 200) {
                        store.getters.getUser.firstName = payload.data.firstName
                        store.getters.getUser.lastName = payload.data.lastName
                        store.getters.getUser.userName = payload.data.userName
                        store.getters.getUser.email = payload.data.email
                        return true
                    } else {
                        return false
                    }
                })
        }else{

            const user = getters.findOneUser(payload.id)

            if (user.length>0){
                return axios.patch("/users/" + payload.id, payload.data)
                    .then(response => {
                        if (response.status === 200) {
                            user[0].firstName = payload.data.firstName
                            user[0].lastName = payload.data.lastName
                            user[0].userName = payload.data.userName
                            user[0].email = payload.data.email
                            return true
                        } else {
                            return false
                        }
                    })
            }



        }

    },
    updatePassword({dispatch, commit, state}, payload) {
        if (store.getters.getUser.id === payload.id) {
            return axios.patch("/users/password/" + payload.id, payload.data)
                .then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        if (response.data) {
                            return true
                        } else {
                            return false
                        }
                    }
                })
        }

    },
    deleteUser({dispatch, commit, state}, payload) {
        const user = getters.findOneUser(payload)
        if (user.length > 0) {
            return axios.delete("/users/" + payload, payload)
                .then(response => {
                    if (response.status === 200) {
                        let data = state.users
                        for (let i in data) {
                            if (data[i].id == payload) {
                                let index = data.indexOf(data[i])
                                state.users.splice(index, 1)
                            }
                        }
                        return true
                    } else {
                        return false
                    }
                })
        }

    }
}

export default {
    state,
    getters,
    mutations,
    actions
}

