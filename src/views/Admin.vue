<template>
    <v-flex xs12 sm10 md6 lg5 xl4>
        <v-card>
            <v-card-title class="justify-center">
                    <v-btn dark color="blue" to="/newhomework"><v-icon>publish</v-icon>发布作业</v-btn>
            </v-card-title>

            <v-list two-line subheader>
                <v-subheader inset>我发布的作业</v-subheader>

                <v-list-tile
                        v-for="item in items"
                        :key="item.title"
                        avatar
                        @click=""
                >
                    <v-list-tile-avatar>
                        <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                    </v-list-tile-content>

                </v-list-tile>
            </v-list>
        </v-card>
    </v-flex>
</template>

<script>
    export default {
        name: 'Admin',
        data(){
            return {
                items: [
                    { icon: 'A', iconClass: 'blue lighten-1 white--text', title: 'C++ Homework', subtitle: 'ABC - 3 天后截止' },
                    { icon: 'B', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
                ]
            }
        },
        created(){
            console.log("233")
        }
    }
</script>

<style scoped>

</style>