<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My Article</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
       
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">请问您确定要删除吗(删除无法找回)</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >取消</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >确定</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.tag`]="{ item }">
      <v-chip color="#CFD8DC" dark>
        {{ item.tag }}
      </v-chip>
    </template>
    <template v-slot:[`item.category.name`]="{ item }">
      <v-chip color="#CFD8DC" dark>
        {{ item.category.name }}
      </v-chip>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Resetfgfgsdf </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { getArticle,deleteArticle} from "../../request";
export default {
  data() {
    return {
      dialtitle:'',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "文章标题",
          align: "start",
          sortable: false,
          value: "title",
        },
        { text: "文章id", value: "id" },
        { text: "浏览次数", value: "browser" },
        { text: "文章分类", value: "category.name", sortable: false },
        { text: "标签", value: "tag", sortable: false },
        { text: "编辑文章", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  methods: {
 
    closeDelete(){
      this.dialogDelete = false
      this.dailname={}
    },
    //  获取列表数据
    getArticle() {
      getArticle().then((res) => {
        this.desserts = res.data.data.data;
      });
    },
    initialize() {
      this.desserts = [
      ];
    },
    //跳转到编辑页面
    editItem(item) {
        this.$router.push({
          name:"NewList",
          params:item 
        })
    },

    deleteItem(item) {
      this.dailname = item
      this.dialogDelete = true;
    },
    //删除文章发送请求
    deleteItemConfirm() {     
      let params={
          id: this.dailname.id,
          is_del:1,
      }
      deleteArticle(params,this.dailname.id).then(res=>{
         if (res.status ==200) {
         this.dialogDelete = false;
         this.getArticle()
         }
      })
        
    },
  },

  created() {
    this.getArticle();
    this.initialize();
  },
};
</script>

<style>
</style>