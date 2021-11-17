import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import {store} from './store'

import App from './components/App.vue'
import Students from './components/Students.vue'
import StudentInfo from './components/StudentInfo.vue'
import login from './components/Login.vue'

const routes = [
    {path: '/', component: Students, meta: { requiresAuth: true}},
    {path: '/student-info/:id', component: StudentInfo, props: true, meta: { requiresAuth: true }},
    {path: '/login', component: login}
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // этот путь требует авторизации, проверяем залогинен ли
      // пользователь, и если нет, перенаправляем на страницу логина
      if (store.getters.getUser === null) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next()
    }
})

Vue.use(VueAxios, axios);
Vue.use(VueRouter);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});