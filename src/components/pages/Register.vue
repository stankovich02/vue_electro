<template>
   <div class="mx-auto w-25 py-5">
    <h1 class="text-center">Register</h1>
        <ValidationProvider name="Email" rules="emailRegex" v-slot="{ errors }">
            <TextInput :error="errors[0]" id="email" label="Email" placeholder="Type your email..." v-model="user.email"/>
        </ValidationProvider>
        <ValidationProvider name="Username" rules="usernameRegex" v-slot="{ errors }">
            <TextInput :error="errors[0]" id="username" label="Username" placeholder="Type username..." v-model="user.username"/>
        </ValidationProvider>
        <ValidationProvider name="Password" rules="passwordRegex" v-slot="{ errors }">
            <TextInput :error="errors[0]" type="password" label="Password" placeholder="Type password..." id="password" v-model="user.password"/>
        </ValidationProvider>
        <ValidationProvider name="Repeated password" rules="" v-slot="{ errors }">
            <TextInput :error="errors[0]" type="password" label="Retype password"  placeholder="Retype password..." id="repassword" v-model="user.repassword"/>
        </ValidationProvider>
        <div v-if="user.repassword && user.password != user.repassword " class="alert p-1 mt-2 alert-danger" role="alert">
            Passwords do not match.
        </div>
        <div class="mt-5 text-center">
            <Button buttonText="Register" @wasClicked="registerUser"/>
        </div>
        <div class="w=50 mx-auto" v-if="error">
        <br>
            <div class="alert alert-danger text-center fs-3">
                {{ error }}
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from "vuex"
    export default {
        name: "RegisterComponent",
        data() {
            return {
                user: 
                {
                    email: "",
                    username: "",
                    password: "",
                    repassword: ""
                },
                error: ""
            }
        },
        computed: {
            ...mapGetters(['users', 'role'])
        },
        mounted() {
           let user = JSON.parse(localStorage.getItem("user"))
           if(user != null && user.role != "unauthorized") {
               this.$router.push("/");
           }
        },
        methods: {
            registerUser() {
                if(!this.user.email || !this.user.username || !this.user.password || !this.user.repassword) {
                    this.error = "All fields are required.";
                    return;
                }
                let user = {
                    email: this.user.email,
                    username: this.user.username,
                    password: this.user.password,
                    role: "user"
                }
                this.$store.commit("registerUser", user);
                this.user = {
                    email: "",
                    username: "",
                    password: "",
                    repassword: ""
                };
                this.$router.push("/login");
            },
        }
    }
</script>