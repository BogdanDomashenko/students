import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
    plugins: [createPersistedState(
        {
            path: ['theme']
        }
    )],
    state: {
        count: 0,
        theme: 'light'
    },
    mutations: {
        setCount: (state, count) => state.count = count,
        SET_THEME: (state, theme) => state.theme = theme,
    },
    getters: {
        getCount: (state) =>
        {
            return state.count
        },
        getTheme: (state) => {
            return state.theme
        }
    },
});

export default store;