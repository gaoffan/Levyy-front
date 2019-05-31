<template>
    <v-layout row align-center justify-center>
        <v-flex xs12 sm8 md5 lg4 xl3>
            <v-card>
                <v-alert :value="ret.show" type="error" color="red">
                    {{ ret.resultText }}
                </v-alert>
                <v-toolbar dark color="#64B5F6">
                    <v-toolbar-title>注册</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form id="form">
                        <v-text-field type="text" v-model="code" label="邀请码" required box></v-text-field>
                        <v-text-field type="text" v-model="userName" label="账号" required></v-text-field>
                        <v-text-field type="text" v-model="realName" label="真实姓名" required></v-text-field>
                        <v-text-field type="password" v-model="password" label="密码" required></v-text-field>
                        <v-text-field type="password" v-model="confirm_password" label="确认密码" required></v-text-field>
                        <v-text-field type="text" v-model="email" label="邮箱" required></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="red" @click="submit">注册</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "SignUp",
        data(){
            return {
                code:null,
                userName:null,
                realName:null,
                password:null,
                confirm_password:null,
                email:null,
                ret: {
                    show :false,
                    resultText: ""
                }
            }
        },
        methods:{
            submit(){
                let formData = new FormData();
                formData.set('userName', this.userName);
                formData.set('code', this.code);
                formData.set('realName', this.realName);
                formData.set('password', this.password);
                formData.set('confirmPassword', this.confirm_password);
                formData.set('email', this.email);
                this.$doAjax('POST',"/api/register", (result) => {
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

<style scoped>

</style>