<template>
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
                <v-expansion-panel>
                    <v-expansion-panel-content>
                        <template v-slot:header>
                            <div>别人冒充我提交了作业，现在我不能提交了，怎么办？</div>
                        </template>
                        <v-card-text>
                            请联系作业发布者，他们可以移除提交。
                        </v-card-text>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "FAQ"
    }
</script>
