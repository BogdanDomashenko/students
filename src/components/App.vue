<template>
   <div class="main">
       <div class="header">
           <h1>Students</h1>
           <div class="header-right" v-if="user">
               <p class="header-user-name">{{ user.name }}</p>
               <button class="btn" @click="logOut()">Вийти</button>
           </div>
       </div>
       <div class="content">
           <router-view></router-view>
       </div>
   </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    mounted: function () {
        // this.$set(this.user, this.$store.getters.getUser)
        // this.user = this.$store.getters.getUser;
    },
    methods: {
        logOut: function () {
            this.$store.commit('removeUser');
            this.$router.push('/login');
        }
    },
    computed: {
        user: function () {
            return this.$store.getters.getUser
        }
    }
}
</script>

<style scoped>
    .light {
        background: #fff;
        color: #000;
    }
    .dark {
        background: #000;
        color: #fff;
    }
    .header {
        display: flex;
        justify-content: space-between;
    }
    .header-right {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .btn {
        background: #000;
        color: #fff;
    }
    .header-user-name {
        margin: auto 0;
        margin-right: 10px;
    }
</style>