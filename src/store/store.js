import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store =  new Vuex.Store({
    state: {
        userInformation: ""
    },
    mutations: {
        saveInformation(state, infor){
            state.userInformation = infor;
        }
    },
    getters: {
        getUserInformation: state => {
            return state.userInformation;
        }
    }
})