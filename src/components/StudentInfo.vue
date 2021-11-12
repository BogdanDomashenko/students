<template>
    <div>
        <router-link :to="'/'">Головна</router-link>
        <div class="student-info">
            <div>
                <img :src="student.photo" alt="">
            </div>
            <div>
                <h3>{{student.name}}</h3>
                <br>
                <p>Група: {{student.group}}</p>
                <p>Оцінка: {{student.mark}}</p>

            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'


export default {
    props: {
        id: '',
    },
    data() {
        return {
            student: {}
        }
    },
    mounted: function() {
        axios.get("http://46.101.212.195:3000/students/" + this.id).then((response) => {
            this.student = response.data;
            console.log(this.student)
        });
    },
}
</script>

<style scoped>
    .student-info {
        display: flex;
    }
</style>