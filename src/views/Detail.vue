<template>
    <v-layout row align-center justify-center>
        <v-flex xs12 sm10 md6 lg5 xl4>
            <v-card>
                <v-layout column>
                    <v-card-title>
                        <v-btn icon @click="back">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn v-show="isMine" color="orange" dark @click="edit">
                            <v-icon>edit</v-icon>编辑
                        </v-btn>
                        <v-btn v-show="isMine" color="red" dark @click="del">
                            <v-icon>delete</v-icon>删除
                        </v-btn>
                        <v-btn v-show="isMine" color="green" dark @click="downloadAll">
                            <v-icon>cloud_download</v-icon>全部下载
                        </v-btn>
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title>
                        <div class="display-1">{{hwData.name}}</div>
                    </v-card-title>
                </v-layout>
                <v-divider></v-divider>
                <v-list two-line>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon color="#448AFF">alarm</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{hwData.deadline}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{hwData.deadline_format}} 截止</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon color="#448AFF">assignment_ind</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{hwData.owner}}</v-list-tile-title>
                            <v-list-tile-sub-title>发布于 {{hwData.createDate}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon color="#448AFF">attachment</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{hwData.format}}</v-list-tile-title>
                            <v-list-tile-sub-title>支持的格式</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon color="#448AFF">supervisor_account</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{hwData.count}}/{{hwData.sLimit}}</v-list-tile-title>
                            <v-list-tile-sub-title>已收/应收</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <v-subheader>提交作业</v-subheader>
                <v-alert style="margin-bottom: 1rem;" :value="ret.show" :type="ret.type" :color="ret.color">
                    {{ ret.resultText }}
                </v-alert>
                <v-form>
                    <v-list-tile>
                        <v-text-field type="text" v-model="user" :label="'君の名は/你是？（例如：' + hwData.fnExample + '）'" required @input="userChanged"></v-text-field>
                    </v-list-tile>
                    <v-list-tile>
                        <v-text-field type="text" v-model="password" :label="password_tip" required></v-text-field>
                    </v-list-tile>
                    <v-list-tile>
                        <div class="upload-box justify-center" @click="doUpload">
                            {{file_info}}
                            <input type="file" style="display: none" id="input_upload" accept="*/*" ref="input" @change="inputChanged">
                        </div>
                    </v-list-tile>
                </v-form>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="red" @click="submit">提交</v-btn>
                    <v-btn flat color="green" @click="downloadMe">下载我之前提交的文件</v-btn>
                </v-card-actions>
                <v-divider></v-divider>
                <v-expansion-panel>
                    <v-expansion-panel-content>
                        <template v-slot:header>
                            <div>已提交</div>
                        </template>
                        <v-card>
                            <v-list dense v-if="isMine">
                                <v-list-tile v-for="(item,index) in hwData.submitted" :key="index">
                                    <v-list-tile-content>{{item.name}}</v-list-tile-content>
                                    <v-list-tile-content class="align-end">{{item.time}}</v-list-tile-content>
                                    <v-btn flat color="red" @click="removeSubmission(item)">删除提交</v-btn>
                                </v-list-tile>
                                <v-list-tile v-if="hwData.submitted.length === 0">
                                    <v-list-tile-content class="align-center">当第一个提交的人吧～</v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                            <v-card-text v-if="!isMine">
                                只有作业的发布者才能看到已经提交作业的人哦～
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: 'detail',
        data(){
            return {
                user: "",
                password: "",
                hwData: {
                    name:"",
                    createDate: null,
                    deadline: null,
                    sLimit:0,
                    owner:"",
                    format:"",
                    deadline_format:null,
                    count:0,
                    fnExample:"",
                    submitted:[]
                },
                isMine:false,
                file_info:"拖动文件到页面或点击这里选择文件",
                password_tip:"密码",
                ret: {
                    show :false,
                    type: "error",
                    color: "",
                    resultText: ""
                }
            }
        },
        props: ['hid'],
        methods:{
            showInfo(text,color = "red",type = "error"){
                this.ret.show = true;
                this.ret.resultText = text;
                this.ret.color = color;
                this.ret.type = type;
            },
            back(){
                this.$router.go(-1);
            },
            userChanged(){
                this.$doAjax("GET","/api/getsubmitted?hid=" + this.hid + "&user=" + this.user, (result) => {
                    this.$nextTick(() =>
                        this.password_tip = result.ret === 200 && !result.data ?
                            "请设置一个密码，作为「下次提交」和「下载已提交文件」的凭据" :  "请输入你上次提交时设置的密码");
                });
            },
            submit(){
                let formData = new FormData();
                formData.set('hid', this.hid);
                formData.set('user', this.user);
                formData.set('password', this.password);
                let files = document.getElementById("input_upload").files;
                if(files.length === 0){
                    this.showInfo("请不要皮这个系统（没有选择文件）","orange","warning");
                    return;
                }
                formData.set('file', files[0], files[0].name);
                this.$doAjax("POST","/api/submit", (result) => {
                    this.showInfo(result.desc, result.ret === 200 ? "green" : "red", result.ret === 200 ? "success" : "error");
                }, formData);
            },
            downloadMe(){
                this.$doAjax("POST","/api/candownloadsubmission?hid=" + this.hid + "&user=" + this.user + "&password=" + this.password, (result) => {
                    if (result.ret !== 200)
                        this.showInfo(result.desc);
                    else
                        location.href = this.$CONFIG.apiUrl +  "/api/downloadsubmission?hid=" + this.hid + "&user="+ this.user + "&password=" + this.password;
                });
            },
            inputChanged(){
                this.file_info = document.getElementById('input_upload').files[0].name;
            },
            edit(){

            },
            del(){
                this.$doAjax("GET","/api/auth/deletehomework?hid=" + this.hid,(result) => {
                    if (result.ret === 200)
                        this.$router.push('/admin');
                });
            },
            downloadAll(){
                location.href = this.$CONFIG.apiUrl + "/api/auth/downloadall?hid=" + this.hid;
            },
            removeSubmission(item){
                this.$doAjax("POST","/api/auth/removesubmission", (result) => {
                    // TODO
                });
            },
            doUpload(){
                document.getElementById('input_upload').click()
            },
            show(){
                this.$nextTick(() => (this.isMine = true))
            }
        },
        created(){
            this.$doAjax("GET","/api/get/" + this.hid, (result) => {
                if (result.ret === 200){
                    result = result.data;
                    this.hwData.name = result.name;
                    this.hwData.deadline = new Date(result.deadline).Format("yyyy-MM-dd HH:mm");
                    this.hwData.sLimit = result.sLimit;
                    this.hwData.owner = result.owner;
                    this.hwData.format = result.format;
                    this.hwData.createDate = new Date(result.createDate).Format("yyyy-MM-dd HH:mm");
                    this.hwData.count = result.count;
                    this.hwData.fnExample = result.fnExample;
                    this.hwData.deadline_format = result.deadline_format;
                    if (result.submitted)
                        result.submitted.map((item) => {
                            this.hwData.submitted.push({
                                name:item.name,
                                time:new Date(item.time).Format("yyyy-MM-dd HH:mm")
                            });
                    });
                }
            });
            this.$doAjax("GET","/api/auth/ismyhomework?hid=" + this.hid, (result) => {
                if (result.ret === 200 && result.data)
                    this.show();
            });
        }
    }
</script>

<style>
    .upload-box{
        border: 2px dotted darkgray;
        border-radius: 8px;
        width: 100%;
        height: 100%;
        cursor: pointer;
        text-align: center;
    }
</style>