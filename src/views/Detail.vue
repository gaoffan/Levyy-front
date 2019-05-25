<template>
    <v-flex xs12 sm10 md6 lg5 xl4>
        <v-card>
            <v-layout column>
                <v-card-title>
                    <v-btn icon @click="back">
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="orange" dark @click="edit">
                        <v-icon>edit</v-icon>编辑
                    </v-btn>
                    <v-btn color="red" dark @click="del">
                        <v-icon>delete</v-icon>删除
                    </v-btn>
                    <v-btn color="green" dark @click="del">
                        <v-icon>cloud_download</v-icon>全部下载
                    </v-btn>
                </v-card-title>

                <v-spacer></v-spacer>

                <v-card-title class="">
                    <div class="display-1">Homework {{hid}}</div>
                </v-card-title>
            </v-layout>
            <v-divider></v-divider>
            <v-list two-line>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon color="#448AFF">alarm</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>2019-5-26</v-list-tile-title>
                        <v-list-tile-sub-title>截止时间</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon color="#448AFF">assignment_ind</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>ABC</v-list-tile-title>
                        <v-list-tile-sub-title>发布于 3天前</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon color="#448AFF">attachment</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>doc,docx</v-list-tile-title>
                        <v-list-tile-sub-title>支持的格式</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon color="#448AFF">supervisor_account</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>1/99</v-list-tile-title>
                        <v-list-tile-sub-title>已收/应收</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-divider></v-divider>
            <v-subheader>提交作业</v-subheader>

            <v-form>
                <v-list-tile>
                    <v-text-field v-model="user" label="你是？" required></v-text-field>
                </v-list-tile>
                <v-list-tile>
                    <v-text-field v-model="password" label="密码（确保第二次提交时身份相同）" required></v-text-field>
                </v-list-tile>
            </v-form>

            <v-card-actions>
                <v-btn flat color="red">提交</v-btn>
                <v-btn flat color="green">下载我之前提交的文件</v-btn>
            </v-card-actions>

            <v-divider></v-divider>

            <v-expansion-panel>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <div>已提交</div>
                    </template>
                    <v-card>
                        <v-card-text>Somebody</v-card-text>
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
            }
        },
        props: ['hid'],
        methods:{
            back(){
                this.$router.go(-1);
            },
            edit(){

            },
            del(){

            }
        }
    }
</script>