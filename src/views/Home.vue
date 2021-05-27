<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>

        <div>708929573@qq.com</div>
      </v-sheet>

      <v-divider></v-divider>

    <v-list>
      <v-list-group
        v-for="(item,index) in getarticlelist "
        :key="index"
        :value="true"
        prepend-icon="mdi-account-circle"
        @click="getInquireArticle(item)"
      >
        <template v-slot:activator>
          <v-list-item-title>{{item.name}}</v-list-item-title>
        </template>

        <v-list-group
          :value="true"
          no-action
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
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

      </v-list-group>
    </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col>
            <v-card>
              <v-subheader>文章</v-subheader>

              <v-list two-line>
                <template v-for="item in article">
                  <v-list-item :key="item">
                     <v-list-item-avatar color="grey darken-1">
                     </v-list-item-avatar>
                     <v-list-item-content>
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
                    v-if="n !== 6"
                    :key="`divider-${item}`"
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
import { getArticle,getArticleList,getInquireArticle} from "@/request";
export default {
  data() {
    return {
      arr:[],
      getarticlelist:[],
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
      drawer: null,
      links: [
        ["mdi-inbox-arrow-down", "Inbox"],
        ["mdi-send", "Send"],
        ["mdi-delete", "Trash"],
        ["mdi-alert-octagon", "Spam"],
      ],
      //文章的默认数据
      article: [],
      //选择栏的数据
      Selectionbar: [],
    };
  },
  methods: {
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
      getInquireArticle(index){
      this.Recursion(index)
      console.log(this.arr);
      this.article=[]
     this.arr.forEach( async element => {
     let params={
        id:element
      }
      let res = await getInquireArticle(params,element)
      if (res.data.data[0].articles.length !== 0) {
          this.article.push(res.data.data[0].articles[0])
      }
     });
     
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
