<template>
  <v-app id="article">
     <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col>
            <v-card>
              <v-subheader>文章</v-subheader>
              <v-list two-line>
                 <template v-for="(item,index) in article" >
                    <v-list-item :key="index" @click="changeDetails(item.id)">
                     <v-list-item-avatar color="grey darken-1">
                      <v-img :src="item.cover"></v-img>
                     </v-list-item-avatar>
                     <v-list-item-content v-cloak>
                      <v-list-item-title>{{item.title}}</v-list-item-title>
                      <v-list-item-subtitle>
                        <v-btn
                        elevation="1"
                        small
                        >{{item.tag}}
                        </v-btn>   
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>阅读{{item.browser}}次   {{item.author}}  {{item.createdAt}}</v-list-item-subtitle>
                      <v-list-item-subtitle>{{item.introduction}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="item !== 6"
                    :key="`divider-${index}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>  
  </v-app>
</template>

<script>
export default {
 data() {
    return {
      articles:[],
      arr:[],
      getarticlelist:[],
      drawer: null,
      //文章的默认数据
      article: [],
      //选择栏的数据
      Selectionbar: [],
    };
  },
 methods:{
    changeDetails(index){
      this.$router.push({
          name:'homeDetails',
          params:{
              id:index
          }
      })
    } 
 },
 props:{
   article:{
       type:Array
   }
 }
}
</script>

<style>

</style>