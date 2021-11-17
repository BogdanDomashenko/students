import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
    plugins: [createPersistedState(
        {
            path: ['theme', 'user']
        }
    )],
    state: {
        count: 0,
        theme: 'light',
        user: null
    },
    mutations: {
        setCount: (state, count) => state.count = count,
        SET_THEME: (state, theme) => state.theme = theme,
        setUser: (state, user) => state.user = user,
        removeUser: (state) => state.user = null,
    },
    getters: {
        getCount: (state) =>
        {
            return state.count
        },
        getTheme: (state) => {
            return state.theme
        },
        getUser: (state) =>
        {
            return state.user
        },
    },
});

export default store;