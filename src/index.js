import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

let students = [    {name: 'Домашенко Богдан', group: 'rpz 18 1/9', bdate: '17.08.2003', compleated: true}, 
    {name: 'Безсмертних Владислав', group: 'rpz 18 1/9', bdate: '23.07.2003', compleated: true},
    {name: 'Толстов Олег', group: 'rpz 18 1/9', bdate: '23.02.2002', compleated: false},
    {name: 'Скорін Сергій', group: 'rpz 18 1/9', bdate: '21.04.2003', compleated: true},
    {name: 'Гоцький Олксандр', group: 'rpz 18 1/9', bdate: '13.05.2003', compleated: false},
    {name: 'Нільга софія', group: 'rpz 18 1/9', bdate: '01.03.2003', compleated: false}
];

new Vue({
    el: '#app',
    data: {
        inputName: '',
        students: students,
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