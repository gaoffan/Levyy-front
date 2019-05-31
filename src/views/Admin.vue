<template>
    <v-layout v-if="load" row align-center justify-center>
        <v-flex xs12 sm10 md6 lg5 xl4>
            <v-card>
                <v-card-title class="justify-center">
                    <v-btn dark color="blue" to="/newhomework"><v-icon>publish</v-icon>发布作业</v-btn>
                </v-card-title>
                <v-list-tile>
                    <v-list-tile-avatar>
                        <v-icon class="red lighten-1 white--text">A</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-title>你好，{{userName}}</v-list-tile-title>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list two-line subheader>
                    <v-subheader inset>我发布的作业</v-subheader>
                    <v-list-tile v-for="item in items" :key="item.hid" avatar @click="viewHomework(item.hid)">
                        <v-list-tile-avatar>
                            <v-icon class="grey lighten-1 white--text">{{ item.icon }}</v-icon>
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
            </v-card>
            <div class="text-xs-center">
                <v-btn dark color="red" @click="signout"><v-icon>exit_to_app</v-icon>退出登录</v-btn>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: 'Admin',
        data(){
            return {
                load:false,
                userName:null,
                items: []
            }
        },
        created(){
            this.$root.loading();
            this.$isSignIn((result) => {
                if (result.ret !== 200)
                    this.$router.push('/signin');
                else{
                    this.$doAjax("GET","/api/auth/getlist",(result) => {
                        if (result.data)
                            result.data.map((item) =>{
                                this.items.push({
                                    hid: item.id,
                                    icon: item.name[0],
                                    name: item.name,
                                    subtitle: "发布于 " + new Date(item.createDate).Format("yyyy-MM-dd HH:mm"),
                                });
                            });
                    });
                    this.$doAjax("GET","/api/auth/issignin",(result) =>{
                        if (result.ret === 200)
                            this.userName = result.data.realName;
                        this.$root.loaded();
                        this.$nextTick(()=>this.load = true);
                    });
                }
            });
        },
        methods:{
            viewHomework(hid){
                this.$router.push({ name: 'detail', params: { hid: hid }})
            },
            signout(){
                this.$doAjax("POST","/api/signout",(result) => {
                    if (result.ret === 200){
                        this.$router.push('/signin');
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>