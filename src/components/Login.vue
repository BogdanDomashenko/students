<template>
    <div>
        <input type="text" :class="{'wrong-input': errorMsg}" @change='errorMsg = null' v-model="login">
        <button @click="auth()">Війти</button>
        <p v-if="errorMsg">
            {{ errorMsg }}
        </p>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
    data() {
        return {
            login: '',
            errorMsg: null
        };
    },
    methods: {
        auth() {
            Vue.axios.get('http://46.101.212.195:3000/students/name/' + this.login).then((response) => {
                if (response.data === null || response.data.name == 'CastError') {
                    this.errorMsg = 'Такого студента не існує'
                    return
                }
                this.errorMsg = null;
                this.$store.commit('setUser', response.data);
                this.$router.push('/');
            })
        }
    }
}
</script>

<style scoped>
    .wrong-input {
        border-color: rgb(248, 57, 57);
    }
</style>