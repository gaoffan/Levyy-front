<template>
  <v-flex xs12 sm10 md6 lg5 xl4>
    <v-card>
      <v-list two-line subheader>
        <v-subheader inset>作业列表</v-subheader>
        <v-list-tile v-for="item in items"  :key="item.id" avatar @click="viewHomework(item.hid)">
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
      <v-subheader>不会显示已截止超过 3 天的作业</v-subheader>
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
