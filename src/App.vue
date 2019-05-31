<template>
    <div id="app">
        <v-app>
<!--            <v-navigation-drawer app></v-navigation-drawer>-->
            <v-toolbar color="#1976D2" dark app>
                <v-btn icon to="/"><v-icon>home</v-icon></v-btn>
                <v-toolbar-title>Levyy</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn flat to="/admin">管理员</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-content >
                <v-container fluid>
                    <v-layout v-if="!isload" align-center justify-center>
                        <v-progress-circular
                                indeterminate
                                color="primary"
                        ></v-progress-circular>
                    </v-layout>
                    <router-view/>
                </v-container>
            </v-content>
            <v-footer dark color = "#2196F3" class="justify-center">
                &copy;2019 Levyy | 一个交电子版作业的平台 <strong> Gou Faan</strong>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
    export default {
        name: "app",
        data(){
            return{
                isload:false
            }
        },
        methods:{
            loading(){
                this.$nextTick(()=>this.isload = false);
            },
            loaded(){
                this.$nextTick(()=>this.isload = true);
            }
        },
        created() {
            this.$root.loading = this.loading;
            this.$root.loaded = this.loaded;
        }
    }
</script>