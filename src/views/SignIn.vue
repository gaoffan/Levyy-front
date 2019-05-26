<template>
    <v-flex xs12 sm10 md6 lg5 xl4>
        <v-card>
            <v-alert :value="ret.show" type="error" color="red">
                {{ ret.resultText }}
            </v-alert>
            <v-toolbar dark color="#64B5F6">
                <v-toolbar-title>登录到 Levy</v-toolbar-title>
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
                let router = this.$router;
                let ret = this.ret;
                let formData = new FormData();
                formData.set('userName', this.userName);
                formData.set('password', this.password);
                this.$doAjax('POST',"/api/signin", function (result) {
                    if (result.ret === 200)
                        router.go(-1);
                    else{
                        ret.resultText = result.desc;
                        ret.show = true;
                    }
                }, formData);
            }
        },
        created(){
            let router = this.$router;
            this.$isSignIn(function (result) {
                if (result.ret !== 1999)
                    router.push('/');
            });
        }
    }
</script>