<template>
    <v-flex xs12 sm10 md6 lg5 xl4>
        <v-card>
            <v-card-title>
                <div class="headline">登录到 Levy</div>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="userName" label="账号" required box></v-text-field>
                    <v-text-field v-model="password" label="密码" required></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn dark color="red" @click="login">登录</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
    export default {
        name: "signin",
        data() {
            return{
                userName:"",
                password:""
            }
        },
        methods:{
            login(){
                let router = this.$router;
                let ajax = new XMLHttpRequest()
                ajax.open("GET","http://127.0.0.1:8080/api/signin?userName=" + this.userName + "&password=" +  this.password, true)
                ajax.onload = function() {
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        let result = JSON.parse(ajax.responseText)
                        console.log(result)
                        if (result.ret == 200)
                            router.go(-1)
                    }
                }
                ajax.withCredentials = true
                ajax.send()
            }
        },
        created(){
            let router = this.$router;
            let ajax = new XMLHttpRequest()
            ajax.open("GET","http://127.0.0.1:8080/api/auth/issignin",true)
            ajax.onload = function() {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    let result = JSON.parse(ajax.responseText)
                    console.log(result)
                    if (result.ret != 1999)
                        router.push('/')
                }
            }
            ajax.withCredentials = true
            ajax.send()
        }
    }
</script>

<style scoped>

</style>