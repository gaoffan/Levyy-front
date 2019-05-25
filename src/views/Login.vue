<template>
    <v-flex xs12 sm10 md6 lg5 xl4>
        <v-card>
            <v-card-title>
                <div class="headline">登录到作业平台</div>
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
        name: "Login",
        data() {
            return{
                userName:"",
                password:""
            }
        },
        methods:{
            login(){

            }
        },
        created(){

        }
    }
</script>

<style scoped>

</style>