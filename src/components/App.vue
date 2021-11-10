<template>
    <div>
        <h3>Поиск</h3>
        <br>
        Имя
        <input type="text" v-model="inputName">
        <div class="students">
            <p></p>
            <p>Колличество студентов: {{students.length}}</p>
            <!-- <div class="div editStudent" v-if="editStudentActive">
                <form action="" class="editStudent" v-on:submit.prevent="editStudent">
                <br>
                <h3>Редагування студентів</h3>
                <br>
                Ім'я<input type="text" v-model="editStudentData.name">
                <br>
                Група
                <select v-model="editStudentData.group">
                    <option>RPZ 18 1/9</option>
                    <option>RPZ 18 2/9</option>
                </select>
                <br>
                Оцінка<input type="number" v-model="editStudentData.mark">
                <br>
                Виконано<input type="checkbox" v-model="editStudentData.compleate">
                <br><br>
                <input type="submit" value="Оновити">
        </form>
            </div> -->
            <table class="studentsTable">
                <tr>
                    <td>Ім'я</td>
                    <td>Група</td>
                    <td>Оцінка</td>
                    <td>Виконано</td>
                    <td>Видалити</td>
                    <td>Оновити</td>
                    <td>Редагувати</td>
                </tr>
                <tr v-for="(student, index) in filteredStudents" :key="student._id">
                    <td>{{student.name}}</td>
                    <td>{{student.group}}</td>
                    <td>{{student.mark}}</td>
                    <td>
                        <input type="checkbox" v-model="student.isDonePr" name="" id="">
                    </td>
                    <td>
                        <a href="" v-on:click.prevent="deleteStudent(student._id)">Удалить</a>
                    </td>
                                        <td>
                        <a href="" v-on:click.prevent="updateStudent(student._id)">Оновити</a>
                    </td>
                    <td>
                        <img class="editImg" src="/static/img/edit.png" alt="" v-on:click="editStudentShow(student._id)">
                    </td>
                </tr>
            </table>
        </div>

        <form action="" class="addStudent" v-on:submit.prevent="addStudent">
            <br>
            <h3>Додавання студентів</h3>
            <br>
            Ім'я<input type="text" v-model="studentName">
            <br>
            Група
            <select v-model="studentGroup">
                <option>RPZ 18 1/9</option>
                <option>RPZ 18 2/9</option>
            </select>
            <br>
            Оцінка<input type="number" v-model="studentMark">
            <br>
            Виконано<input type="checkbox" v-model="studentCompleate">
            <br><br>
            <input type="submit" v-if="!editStudentActive" value="Додати">
            <input type="button" v-if="editStudentActive" v-on:click="editStudent" value="Оновити">
            <input type="button" v-if="editStudentActive" v-on:click="cancelEdit" value="Відмінити">

            <div class="addStudentError" v-if="addStudentError">
                {{addStudentError}}
            </div>
        </form>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
    data: function() {
        return {
            inputName: '',
            students: [],
            studentName: '',
            studentGroup: 'RPZ 18 1/9',
            studentBdate: '',
            studentCompleate: false,
            studentMark: 0,
            addStudentError: '',
            editStudentActive: false,
            editStudentId: ''
        }
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
            Vue.axios.delete(`http://46.101.212.195:3000/students/${id}`).then((response) => {
                this.students = this.students.filter(student=>student._id != id);
            });
        },
        addStudent: function() {
            if (this.studentName && this.studentGroup) {
                this.addStudentError = '';
                Vue.axios.post("http://46.101.212.195:3000/students", {
                    name: this.studentName,
                    group: this.studentGroup,
                    isDonePr: this.studentCompleate
                }).then((response) => {
                    this.students.push({_id: response.data._id, name: this.studentName, group: this.studentGroup, mark: this.studentMark, isDonePr: this.studentCompleate});
                });
            }
            else {
                this.addStudentError = 'Все поля должны быть заполнены';
            }
        },
        updateStudent: function(id) {
            Vue.axios.put(`http://46.101.212.195:3000/students/${id}`).then((response) => {
                let elementIndex = this.students.findIndex(item => item._id == id);

                this.students[elementIndex].group = response.data.group;
                this.students[elementIndex].isDonePr = response.data.isDonePr;
                this.students[elementIndex].mark = response.data.mark;
                this.students[elementIndex].name = response.data.name;
                this.students[elementIndex].photo = response.data.photo;
                this.students[elementIndex]._id = response.data._id;
                
                //response.data.name = 'abxc';
                //this.students[elementIndex] = response.data; об'ект присвовюється але не рендереться заново на сторінці
                //console.log(this.students[elementIndex])
            });
        },
        editStudent: function() {
            Vue.axios.put(`http://46.101.212.195:3000/students/${this.editStudentId}`, {
                    name: this.studentName,
                    mark: this.studentMark,
                    group: this.studentGroup,
                    isDonePr: this.studentCompleate
                }).then((response) => {
                        let elementIndex = this.students.findIndex(item => item._id == this.editStudentId);
                        console.log(this.students[elementIndex]);
                        this.students[elementIndex].group = response.data.group;
                        this.students[elementIndex].isDonePr = response.data.isDonePr;
                        this.students[elementIndex].mark = response.data.mark;
                        this.students[elementIndex].name = response.data.name;
                        this.students[elementIndex].photo = response.data.photo;
                        this.students[elementIndex]._id = response.data._id;
                });
        },
        editStudentShow: function(id) {
            this.editStudentActive = true;
            this.editStudentId = id;

            const editingStudent = this.students.find(item => item._id == this.editStudentId);
            this.studentName = editingStudent.name;
            this.studentGroup = editingStudent.group;
            this.studentMark = editingStudent.mark;
            this.isDonePr = editingStudent.isDonePr;
        },
        cancelEdit: function() {
            this.editStudentActive = false;
            this.clearForm();
        },
        clearForm: function() {
            this.studentName = '';
            this.studentGroup = '';
            this.studentMark = '';
            this.isDonePr = '';
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
}
</script>

<style scoped>
    .editImg {
        width: 30px;
    }
</style>