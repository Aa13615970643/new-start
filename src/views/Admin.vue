<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-divider></v-divider>

        <v-list>
         <v-list-group
          v-for="(item, index) in getarticlelist"
          :key="index"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </template>

        

            <v-list-item
              v-for="(item, index) in item.sub_category"
              @click="getInquireArticle(item)"
              :key="index"
              link
            >
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
         
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
           <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

  文章列表
<script>
  export default {
    data: () => ({
       drawer: null,
      //导航栏树
      getarticlelist:[
        {
      name: "管理人员",
      sub_category:[{
        name:'权限分配',
        url:'Authority'
      }],
     },
        {
      name: "文章管理",
      sub_category:[
        {
        name:'文章列表',
        url:'AticleList'
      },
        {
        name:'新增列表',
        url:'NewList'
      },
      ],
     },
        {
      name: "分类管理",
      sub_category:[
        {
        name:'分类列表',
        url:'CategoryList'
      },
        {
        name:'新增分类',
        url:'NewCategory'
      }
      ],
     }
        ],
    }),
    methods:{
          //路由跳转
    getInquireArticle(index){
       this.$router.push({
         name:index.url
       })
    },
    }
  }
</script>