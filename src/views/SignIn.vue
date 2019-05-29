<template>
    <v-layout row align-center justify-center>
        <v-flex xs12 sm8 md5 lg4 xl3>
            <v-card>
                <v-alert :value="ret.show" type="error" color="red">
                    {{ ret.resultText }}
                </v-alert>
                <v-toolbar dark color="#64B5F6">
                    <v-toolbar-title>登录到 Levyy</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form id="form">
                        <v-text-field name="userName" type="text" v-model="userName" label="账号" required box></v-text-field>
                        <v-text-field name="password" type="password" v-model="password" label="密码" required></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="red" @click="login">登录</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "signin",
        data() {
            return {
                userName:"",
                password:"",
                ret: {
                    show :false,
                    resultText: ""
                }
            }
        },
        methods:{
            login(){
                let formData = new FormData();
                formData.set('userName', this.userName);
                formData.set('password', this.password);
                this.$doAjax('POST',"/api/signin", (result) => {
                    if (result.ret === 200){
                        this.$router.go(-1);
                    }
                    else{
                        this.ret.resultText = result.desc;
                        this.ret.show = true;
                    }
                }, formData);
            }
        },
        created(){
            this.$isSignIn((result) => {
                if (result.ret !== 1999)
                    this.$router.push('/');
            });
        }
    }
</script>