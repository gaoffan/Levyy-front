<template>
  <v-flex xs12 sm10 md6 lg5 xl4>
    <v-card>
      <v-list two-line subheader>
        <v-subheader inset>作业列表</v-subheader>

        <v-list-tile
                v-for="item in items"
                :key="item.name"
                avatar
                @click="viewHomework(item.hid)"
        >
          <v-list-tile-avatar>
            <v-icon class="blue lighten-1 white--text">{{ item.icon }}</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
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
        let ajax = new XMLHttpRequest()
        ajax.open("GET","http://127.0.0.1:8080/api/getlist",true)
        ajax.onload = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                let result = JSON.parse(ajax.responseText)
                console.log(result);
                result.data.map(function(item){
                    items.push({
                        hid: item.id,
                        icon: item.name[0],
                        name: item.name,
                        subtitle: "由 " + item.owner + " 发布于 " + new Date(item.deadline).Format("yyyy-MM-dd HH:mm:ss"),
                    });
                })
            }
        }
        ajax.send()
    }
}
</script>
