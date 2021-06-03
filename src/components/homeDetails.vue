<template>
    <v-app id="Details">
     <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col>
            <v-card>
              <v-subheader>详情页</v-subheader>
            <v-card-title>{{detailsList.title}}</v-card-title>
            <v-card-subtitle> <v-btn
                        elevation="1"
                        small
                        >
                        {{detailsList.tag}}
                        </v-btn>  
                        <v-btn
                        elevation="1"
                        small
                        >
                         {{detailsList.category.name}}
                        </v-btn>    
                        阅读{{detailsList.browser}}次   {{detailsList.author}}  {{detailsList.createdAt}}
            </v-card-subtitle>
            <v-card-text>
              <div v-html="detailsList.content"></div>
            </v-card-text>
            
            
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>  
  </v-app>
</template>

<script>
import { getDetailsPage} from "@/request";
export default {
  data(){
      return{
         detailsList:{} 
      }
  },
  methods:{
      //获取详情页的数据
      getDetailsPage(){
          let index = this.$route.params.id
          getDetailsPage(index).then(res=>{
              this.detailsList = res.data.data
         })
      }
  },
  created(){
      this.getDetailsPage()
  }
}
</script>

<style>

</style>