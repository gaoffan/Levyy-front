<template>
    <v-flex xs12 sm10 md6 lg5 xl4>
        <v-card>
            <v-card-title>
                <div class="headline">新增作业</div>
            </v-card-title>
            <v-alert :value="ret.show" type="error" color="red">
                {{ ret.resultText }}
            </v-alert>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="name" label="作业名称" required box></v-text-field>
                    <v-text-field v-model="fnFormat" label="支持的格式（以英文逗号分割,如:doc,docx）" required></v-text-field>
                    <v-text-field v-model="sLimit" label="应收份数" required></v-text-field>
                    <v-text-field v-model="deadline" label="截止时间（格式如:2019-05-25 20:46）" required></v-text-field>
                    <v-text-field v-model="fnExample" label="文件名示例" required></v-text-field>
                    <v-text-field v-model="fnRegExp" label="提交格式限制"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn flat color="red" @click="submit">确定</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
    export default {
        name: "NewHomework",
        data() {
            return{
                name: "",
                fnFormat:"",
                sLimit: "",
                fnExample: "",
                deadline: "",
                fnRegExp: "",
                ret: {
                    show :false,
                    resultText: ""
                }
            }
        },
        methods:{
            submit(){
                let router = this.$router;
                let ret = this.ret;
                let formData = new FormData();
                formData.set('name', this.name);
                formData.set('fnFormat', this.fnFormat);
                formData.set('sLimit', this.sLimit);
                formData.set('fnExample', this.fnExample);
                formData.set('deadline', this.deadline);
                formData.set('fnRegExp', this.fnRegExp);
                formData.set('stype', this.fnFormat);
                this.$doAjax('POST',"/api/auth/newhomework", function (result) {
                    // console.log(result);
                    if (result.ret === 200)
                        router.push({ name: 'detail', params: { hid: result.data }});
                    else{
                        ret.resultText = result.desc;
                        ret.show = true;
                    }
                },formData);
            }
        },
        created() {
            let router = this.$router;
            this.$isSignIn(function (result) {
                if (result.ret !== 200)
                    router.push('/signin');
            })
        }
    }
</script>

<style scoped>

</style>