<template>
    <div class="mx-auto w-25 py-5">
    <h1 class="text-center">Login</h1>
        <div class="mb-3 mt-5">
            <TextInput id="username" label="Username" placeholder="pera123" v-model="username"/>
        </div>
        <div class="mb-3">
            <TextInput type="password" label="Password" placeholder="sifra123" id="password" v-model="password"/>
        </div>
        <div class="mb-3 text-center mt-5">
            <Button buttonText="Login" @wasClicked="loginUser"/>
        </div>
        <div class="mx-auto" v-if="error">
        <br>
            <div class="alert alert-danger text-center">
                {{ error }}
            </div>
       </div>
    </div>
</template>
<script>
    import { mapGetters } from "vuex"
    export default {
        name: "LoginComponent",
        data() {
            return {
                username: "marko",
                password: "sifra123",
                error: "",
            }
        },
        computed: {
            ...mapGetters(['users', 'role', 'user'])
        },
        mounted() {
           let user = JSON.parse(localStorage.getItem("user"))
           if(user != null) {
                if(user.role != "unauthorized"){
                    this.$router.push("/");
                }
           }
        },
        methods: {
            loginUser() {
                this.error = ""
                if(!this.username) {
                    this.error = "Email is required.";
                    return;
                }
                if(!this.password) {
                    this.error = "Password is required.";
                    return;
                }
                let loggedUser;
                for(let u of this.users){
                    if(u.username == this.username && u.password == this.password) {
                        loggedUser = u;
                        break;
                    }
                }
                if(!loggedUser) {
                    this.error = "Wrong credentials."
                    return;
                }
                let localStorageItem = {
                    username : loggedUser.username,
                    role : loggedUser.role
                }
                localStorage.setItem("user", JSON.stringify(localStorageItem));
                this.$router.push("/");
                this.$emit("userLoggedIn");               
            }
        }
    }
</script>