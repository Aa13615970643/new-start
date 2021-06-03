<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>
    </v-system-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64" @click="changLogin"></v-avatar>
        <div>708929573@qq.com</div>
      </v-sheet>
      <v-divider></v-divider>
    <v-list>
       <v-list-group
        v-for="(item,index) in getarticlelist "
        :key="index"
        @click="getInquireArticle(item)"
       >
        <template v-slot:activator>
          <v-list-item-title>{{item.name}}</v-list-item-title>
        </template>

        <v-list-group
          sub-group
          v-for="(item,index) in item.sub_category"
          @click="getInquireArticle(item)"
         :key="index"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{item.name}}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(item,index) in item.sub_category"
            @click="getInquireArticle(item)"
            :key="index"
            link
          >
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item>
        </v-list-group>

      </v-list-group>
    </v-list>
    </v-navigation-drawer>
    <router-view :article='article'></router-view>

  </v-app>
</template>
<script>
import { getArticle,getArticleList,getInquireArticle} from "@/request";
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
  methods: {

    //跳转登录
    changLogin(){
      this.$router.push({
         name:'Login'
         
      })
    },
    //递归
    Recursion(index){
       let that = this
       if (!index.sub_category) {
            that.arr.push(index.id)
       }else{
            that.arr.push(index.id)
            that.Recursion(index.sub_category[0])
       }

    },
    //文章的查询
    async  getInquireArticle(index){
      this.$router.push({
         path:`/`
      })
      this.Recursion(index)
      let articles=[]
      for (const iterator of this.arr) {
        let params={
        id:iterator
      }
       let res = await getInquireArticle(params,iterator)
      if (res.data.data[0].articles.length !== 0) {
          articles.push(...res.data.data[0].articles)
      }else{
        this.article=[]
      }
      }
      console.log(articles);
     this.article= articles
     this.arr =[]  
    },
    //获取文章
    getArticle() {
      getArticle().then((res) => {
        this.article = res.data.data.data;
      });
    },
    //获取文章分类列表
    getArticleList(){
      let params ={
        include:'tree'
      }
      getArticleList(params).then((res) => {
        this.getarticlelist = res.data.data
      });
    }
  },
  created() {
    this.getArticle();
    this.getArticleList()
  },
};
</script>

<style></style>
