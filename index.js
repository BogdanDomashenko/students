import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

new Vue({
    el: '#app',
    data: {
        inputName: '',
        students: [],
        studentName: '',
        studentGroup: '',
        studentBdate: '',
        studentCompleate: false,
        studentMark: 0,
        addStudentError: ''
    },
    mounted: function() {
        axios.get("http://46.101.212.195:3000/students").then((response) => {
            console.log(response.data);
            this.students = response.data;
        });
    },
    methods: {
        deleteStudent: function(id) {
            this.students.splice(id, 1); 
        },
        addStudent: function() {
            if (this.studentName && this.studentGroup && this.studentMark) {
                this.addStudentError = '';
                this.students.push({name: this.studentName, group: this.studentGroup, mark: this.studentMark, isDonePr: this.studentCompleate});
            }
            else {
                this.addStudentError = 'Все поля должны быть заполнены';
            }
        }
    },
    computed: {
        filteredStudents: function() {
            if (this.inputName) {
                return this.students.filter(item => {
                    return item.name.toLowerCase().includes(this.inputName.toLowerCase())
                });
            }
            return this.students;
        },
        convertedDate: function() {
            if (!this.studentBdate) return '';
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(this.studentBdate);
            return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('.');
          }
    }
});