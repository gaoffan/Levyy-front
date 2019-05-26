<template>
    <div>
        <v-layout row align-center justify-center>
            <v-flex xs12 sm10 md6 lg5 xl4>
                <v-card>
                    <v-list two-line subheader>
                        <v-subheader inset>作业列表</v-subheader>
                        <v-list-tile v-for="item in items"  :key="item.hid" avatar @click="viewHomework(item.hid)">
                            <v-list-tile-avatar>
                                <v-icon class="blue lighten-1 white--text">{{ item.icon }}</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-if="items.length === 0">
                            <v-list-tile-content>
                                <v-list-tile-title>这里空空如也</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                    <v-subheader>不会显示已截止超过 7 天的作业</v-subheader>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row align-center justify-center>
            <v-flex xs12 sm10 md6 lg5 xl4>
                <v-card style="margin-top: 1rem;">
                    <v-card-title primary-title><h3 class="headline mb-0">FAQ</h3></v-card-title>
                    <v-expansion-panel>
                        <v-expansion-panel-content>
                            <template v-slot:header>
                                <div>提交文件时候需要设置密码是什么意思？</div>
                            </template>
                                <v-card-text>
                                    我们使用密码来识别提交的每位用户。当你第一次提交文件时，需要设置一个密码，这个密码将用于确认覆盖提交时的身份，以及下载自己之前提交的文件。
                                </v-card-text>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data(){
            return {
                items: []
            }
        },
        methods:{
            viewHomework(hid){
                this.$router.push({ name: 'detail', params: { hid: hid }})
            }
        },
        created(){
            let items = this.items;
            this.$doAjax("GET","/api/getlist",function (result) {
                result.data.map(function(item){
                    items.push({
                        hid: item.id,
                        icon: item.name[0],
                        name: item.name,
                        subtitle: item.owner + " - " + item.deadline_format + "截止",
                    });
                })
            });
        }
    }
</script>
