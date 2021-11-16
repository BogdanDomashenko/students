import Vue from 'vue'
import App from './components/App.vue'
import Students from './components/Students.vue'
import StudentInfo from './components/StudentInfo.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import {store} from './store'

const routes = [
    {path: '/', component: Students},
    {path: '/student-info/:id', component: StudentInfo, props: true},
];

const router = new VueRouter({
    routes
});

Vue.use(VueAxios, axios);
Vue.use(VueRouter);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});