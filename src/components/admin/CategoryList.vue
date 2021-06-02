<template> 
  
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
    <v-snackbar
      v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
      <v-toolbar flat>
        <v-toolbar-title>My Article</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
       
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">请问您确定要删除吗(删除将无法恢复)</v-card-title>
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
      <v-icon small class="mr-2" @click="editItem"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Resetfgfgsdf </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { getArticleList,deleteCategory} from "../../request";
export default {
  data() {
    return {
      snackbar: false,
      text: ``,
      dialtitle:'',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "分类名称",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "分类id", value: "id" },
        { text: "父分类id", value: "parent_id" },
        { text: "编辑分类", value: "actions", sortable: false },
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
    //类别列表
    getArticleList(){
      getArticleList().then(res=>{
        this.desserts = res.data.data;
      })
    },
    initialize() {
      this.desserts = [
      ];
    },
    //跳转到编辑页面
    editItem() {
        this.$router.push({
          name:"NewCategory"
        })
    },

    deleteItem(item) {
      this.dailname = item
      this.dialogDelete = true;
    },
    //删除分类
    deleteItemConfirm() {
      deleteCategory(this.dailname.id).then(res=>{
         if (res.status ==200) {
         this.dialogDelete = false;
         this.snackbar = true
         this.text =  res.data.message
         this.getArticleList()
         }else{
           this.snackbar = true
           this.text = '该分类不能删除'
           this.dialogDelete = false;
         }
      })
        
    },
  },

  created() {
    this.getArticleList()
    this.initialize();
  },
};
</script>

<style>
</style>