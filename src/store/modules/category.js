import axios from "axios";

const state = {
    categories: [],
    find: {}
}

const getters = {
    allCategories(state) {
        return state.categories;
    },
    findOneCategory(id) {
        return state.categories.filter(element => {
            return element.id == id
        })
    },
    getCategoryModal(state) {
        return state.find
    }
}

const mutations = {
    updateCategoryList(state, payload) {
        state.categories.push(payload);
    },
    updateCategoryModal(state, payload) {
        state.find = payload
    }
}

const actions = {
    initCategoryApp({commit, state}) {
        return axios.get('/category')
            .then(response => {
                if (response.status === 200) {
                    let data = response.data;
                    state.categories=[]
                    for (let key in data) {
                        commit("updateCategoryList", data[key]);
                    }
                }
            })
    },
    saveCategory({dispatch, commit, state}, payload) {
        return axios.post("/category", payload)
            .then(response => {
                console.log(response)
                if (response.status === 201) {
                    payload.id = response.data.id;
                    commit("updateCategoryList", payload);
                    return true
                } else {
                    return false
                }
            })
    },
    findCategory({dispatch, commit, state}, payload) {
        const category = getters.findOneCategory(payload)
        if (category.length > 0) {
            commit('updateCategoryModal', category)
        }
    },
    updateCategory({dispatch, commit, state}, payload) {
        const category = getters.findOneCategory(payload.id)

        if (category.length > 0) {
            return axios.patch("/category/" + payload.id, payload.data)
                .then(response => {
                    if (response.status === 200) {
                        category[0].name = payload.data.name
                        return true
                    } else {
                        return false
                    }
                })
        }

    },
    isActiveCategory({dispatch, commit, state}, payload) {
        const category = getters.findOneCategory(payload.id)
        if (category.length > 0) {
            axios.patch("/category/isActive/" + payload.id, payload.data)
                .then(response => {
                    category[0].isActive = payload.data.isActive
                })
        }

    },
    deleteCategory({dispatch, commit, state}, payload) {
        const category = getters.findOneCategory(payload)

        if (category.length > 0) {
            return axios.delete("/category/" + payload, payload)
                .then(response => {
                    if (response.status === 200) {
                        let data = state.categories
                        for (let i in data) {
                            if (data[i].id == payload) {
                                let index = data.indexOf(data[i])
                                state.categories.splice(index, 1)
                            }
                        }
                        return true
                    } else {
                        return false
                    }
                })
        }

    },
    sortableCategory({dispatch, commit, state}, payload) {
        axios.post("/category/rank", payload)
            .then(response => {
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}

