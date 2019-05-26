<template>
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

                <v-card-title class="">
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
                        <v-list-tile-sub-title>截止时间</v-list-tile-sub-title>
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
                    <v-text-field v-model="user" label="你是？" required></v-text-field>
                </v-list-tile>
                <v-list-tile>
                    <v-text-field v-model="password" label="密码（确保第二次提交时身份相同）" required></v-text-field>
                </v-list-tile>
                <v-list-tile>
                    <div class="upload-box" @click="doUpload">
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
                        <v-list dense>
                            <v-list-tile v-for="(item,index) in hwData.submitted" :key="index">
                                <v-list-tile-content>{{item.name}}</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{item.time}}</v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>

        </v-card>
    </v-flex>
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
                    createDate: new Date(),
                    deadline: new Date(),
                    sLimit:0,
                    owner:"",
                    format:"",
                    count:0,
                    submitted:[]
                },
                isMine:false,
                file_info:"拖动文件到页面或点击这里选择文件",
                ret: {
                    show :false,
                    type: "",
                    color: "",
                    resultText: ""
                }
            }
        },
        props: ['hid'],
        methods:{
            back(){
                this.$router.go(-1);
            },
            submit(){
                let ret = this.ret;
                let formData = new FormData();
                formData.set('hid', this.hid);
                formData.set('user', this.user);
                formData.set('password', this.password);
                formData.set('file', document.getElementById("input_upload").files[0], document.getElementById("input_upload").files[0].name);
                this.$doAjax("POST","/api/submit", function (result) {
                    ret.show = true;
                    ret.resultText = result.desc;
                    ret.color = result.ret === 200 ? "green" : "red";
                    ret.type = result.ret === 200 ? "success" : "error";
                }, formData);
            },
            downloadMe(){

            },
            inputChanged(){
                this.file_info = document.getElementById('input_upload').files[0].name;
            },
            edit(){

            },
            del(){
                let router = this.$router;
                this.$doAjax("GET","/api/auth/deletehomework?hid=" + this.hid, function (result) {
                    // console.log(result);
                    if (result.ret === 200)
                        router.push('/admin');
                });
            },
            downloadAll(){
                location.href = this.$CONFIG.apiUrl + "/api/auth/download?hid=" + this.hid;
            },
            doUpload(){
                document.getElementById('input_upload').click()
            },
            show(){
                this.$nextTick(() => (this.isMine = true))
            }
        },
        created(){
            let hid = this.hid;
            let hwd = this.hwData;
            this.$doAjax("GET","/api/get/" + hid,function (result) {
                if (result.ret === 200){
                    result = result.data;
                    hwd.name = result.name;
                    hwd.deadline = new Date(result.deadline).Format("yyyy-MM-dd HH:mm:ss");
                    hwd.sLimit = result.sLimit;
                    hwd.owner = result.owner;
                    hwd.format = result.format;
                    hwd.createDate = new Date(result.createDate).Format("yyyy-MM-dd HH:mm:ss");
                    hwd.count = result.count;
                    // console.log(result.submitted);
                    for (let item of result.submitted){
                        hwd.submitted.push({
                            name:item.name,
                            time:new Date(item.time).Format("yyyy-MM-dd HH:mm:ss")
                        });
                    }
                }
            });
            let show = this.show;
            this.$doAjax("GET","/api/auth/ismyhomework?hid=" + hid,function (result) {
                if (result.ret === 200 && result.data)
                    show();
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