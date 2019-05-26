<template>
    <div id="app">
        <v-toolbar color="#1976D2" dark app>
            <v-btn icon to="/"><v-icon>home</v-icon></v-btn>
            <v-toolbar-title>Levy</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat to="/admin">管理面板</v-btn>
                <v-btn flat to="/newhomework">FAQ</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <v-layout row align-center justify-center>
                    <router-view/>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer dark app color = "#2196F3" class="justify-center">
            &copy;2019 Levy —  一个交电子版作业的平台 <strong>Gou Faan</strong>
        </v-footer>
    </div>
</template>

<script>

</script>

<style>

</style>