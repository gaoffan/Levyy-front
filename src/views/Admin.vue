<template>
    <v-layout row align-center justify-center>
        <v-flex xs12 sm10 md6 lg5 xl4>
            <v-card>
                <v-card-title class="justify-center">
                    <v-btn dark color="blue" to="/newhomework"><v-icon>publish</v-icon>发布作业</v-btn>
                </v-card-title>

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
                items: []
            }
        },
        created(){
            let router = this.$router;
            this.$isSignIn(function (result) {
                if (result.ret !== 200)
                    router.push('/signin');
            });
            let items = this.items;
            this.$doAjax("GET","/api/auth/getlist",function (result) {
                console.log(result);
                result.data.map(function(item){
                    items.push({
                        hid: item.id,
                        icon: item.name[0],
                        name: item.name,
                        subtitle: "发布于 " + new Date(item.createDate).Format("yyyy-MM-dd HH:mm"),
                    });
                })
            });
        },
        methods:{
            viewHomework(hid){
                this.$router.push({ name: 'detail', params: { hid: hid }})
            },
            signout(){
                let router = this.$router;
                this.$doAjax("GET","/api/signout",function (result) {
                    if (result.ret === 200)
                        router.push('/signin');
                });
            }
        }
    }
</script>

<style scoped>

</style>