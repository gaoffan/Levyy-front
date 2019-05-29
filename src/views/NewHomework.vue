<template>
    <v-layout row align-center justify-center>
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
                        <v-text-field v-model="stype" label="支持的格式（以英文逗号分割,如:doc,docx）" required></v-text-field>
                        <v-text-field v-model="sLimit" label="应收份数" required></v-text-field>
                        <v-text-field v-model="deadline" label="截止时间（格式如:2019-05-25） (注意是当天0点)" required></v-text-field>
                        <v-text-field v-model="fnExample" label="用户名（作为文件名）示例（例如：B18030XXX某某）" required></v-text-field>
                        <v-text-field v-model="fnFormat" label="正则表达式用户名限制（示例^B1803XX\d\d[\u4e00-\u9fa5]+） 可以不写"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="red" @click="submit">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "NewHomework",
        data() {
            return{
                name: "",
                fnFormat:"^B1803XX\\d\\d[\\u4e00-\\u9fa5]+",
                sLimit: "",
                fnExample: "",
                deadline: "",
                stype: "doc,docx",
                ret: {
                    show :false,
                    resultText: ""
                }
            }
        },
        methods:{
            submit(){
                let formData = new FormData();
                formData.set('name', this.name);
                formData.set('stype', this.stype);
                formData.set('sLimit', this.sLimit);
                formData.set('fnExample', this.fnExample);
                formData.set('deadline', this.deadline);
                formData.set('fnFormat', this.fnFormat);
                this.$doAjax('POST',"/api/auth/newhomework",(result) => {
                    // console.log(result);
                    if (result.ret === 200){
                        this.$router.push({ name: 'detail', params: { hid: result.data }});
                    }
                    else{
                        this.ret.resultText = result.desc;
                        this.ret.show = true;
                    }
                },formData);
            }
        },
        created() {
            this.$isSignIn((result) => {
                if (result.ret !== 200)
                    this.$router.push('/signin');
            })
        }
    }
</script>

<style scoped>

</style>