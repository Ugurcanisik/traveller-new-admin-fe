import axios from "axios";
import {store} from "@/store";


const state = {
    traveller: [],
    find: {},
    picture: {}
}

const getters = {
    allTraveller(state) {
        return state.traveller;
    },
    findOneTravel(id) {
        return state.traveller.filter(element => {
            return element.id == id
        })
    },
    getTravelModal(state) {
        return state.find
    },
    getTravelPictureModal(state) {
        return state.picture
    }
}

const mutations = {
    updateTravellerList(state, payload) {
        state.traveller.push(payload);
    },
    updateTravelModal(state, payload) {
        state.find = payload
    },
    updateTravelPictureModal(state, payload) {
        state.picture = payload
    }
}

const actions = {
    initTravellerApp({dispatch, commit, state}) {
        axios.get('/travels')
            .then(response => {
                if (response.status === 200) {
                    state.traveller = []
                    let data = response.data;
                    for (let key in data) {
                        commit("updateTravellerList", data[key]);
                    }
                }
            })
    },
    saveTravel({dispatch, commit, state}, payload) {
        return axios.post('/travels', payload)
            .then(response => {
                if (response.status === 201) {
                    payload.id = response.data.id;
                    payload.isVerify = true;
                    const category = store.getters.allCategories
                    category.forEach(element => {
                        if (element.id == payload.category) {
                            payload.category = element
                        }
                    })
                    commit("updateTravellerList", payload);
                    return true
                } else {
                    return false
                }
            })
    },
    findTravel({dispatch, commit, state}, payload) {
        const travel = getters.findOneTravel(payload)
        if (travel.length > 0) {
            commit('updateTravelModal', travel)
        }
    },
    findTravelPicture({dispatch, commit, state}, payload) {
        const travel = getters.findOneTravel(payload)
        if (travel.length > 0) {
            commit('updateTravelPictureModal', travel)
        }
    },
    updateTravel({dispatch, commit, state}, payload) {
        const travel = getters.findOneTravel(payload.id)

        if (travel.length > 0) {

            return axios.patch("/travels/" + payload.id, payload.data)
                .then(response => {
                    if (response.status === 200) {
                        travel[0].name = payload.data.name
                        travel[0].description = payload.data.description
                        travel[0].isVerify = payload.data.isVerify
                        const category = store.getters.allCategories
                        category.forEach(element => {
                            if (element.id == payload.data.category) {
                                travel[0].category = element
                            }
                        })
                        return true
                    } else {
                        return false
                    }
                })


        }

    },
    updatePicture({dispatch, commit, state}, payload) {
        const travel = getters.findOneTravel(payload.id)

        if (travel.length > 0) {

            let formData = new FormData()
            formData.append('picture', payload.data.picture)

            return axios.patch("/travels/picture/" + payload.id, formData, {
                async: false,
                cache: false,
                contentType: false,
                processData: false,
            })
                .then(response => {
                    if (response.status === 200) {
                        return true
                    } else {
                        return false
                    }
                })


        }

    },
    isActiveTravel({dispatch, commit, state}, payload) {
        const product = getters.findOneTravel(payload.id)
        if (product.length > 0) {
            axios.patch("/travels/isActive/" + payload.id, payload.data)
                .then(response => {
                })
        }

    },
    deleteTravel({dispatch, commit, state}, payload) {
        const product = getters.findOneTravel(payload)

        if (product.length > 0) {
            return axios.delete("/travels/" + payload, payload)
                .then(response => {
                    if (response.status === 200) {
                        let data = state.traveller
                        for (let i in data) {
                            if (data[i].id == payload) {
                                let index = data.indexOf(data[i])
                                state.traveller.splice(index, 1)
                            }
                        }
                        return true
                    } else {
                        return false
                    }
                })
        }

    },
    sortableTraveller({dispatch, commit, state}, payload) {
        return axios.post("/travels/rank", payload)
            .then(response => {
            })
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}

