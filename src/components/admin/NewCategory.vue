<template>
 <v-app id="inspire">
            <v-card >
              <v-toolbar color="black" dark flat>
                <v-toolbar-title>新增分类</v-toolbar-title>
                <v-spacer></v-spacer>
          
              </v-toolbar>
              <v-card-text>
                <v-form
                 ref="form"
                 v-model="valid">
                  <v-text-field 
                   v-model="CategoryName"
                   :rules="CategoryNameRules"
                   required
                   label="分类名称" 
                   name="分类名称"
                   type="text">
                  </v-text-field>
    
                  <v-select
                    v-model="Parentcategory"
                    :rules="ParentcategoryRules"
                    required
                    :items="items"
                    item-text="name"
                    item-value="id"
                    label="父级分类"
                    name="父级分类"
                  ></v-select>
                     <v-file-input
            v-model="fileInfo"
            :rules="[(v) => !!v || '文件必选']"
            @change="uploadFile"
            label="点击选择文件，文件格后缀为：.xls、.xlsx"
          ></v-file-input>
                  <v-text-field
                    v-model="Level"
                    :rules="LevelRules"
                    required
                    label="层级"
                    name="层级"
                    type="text"
                  ></v-text-field>
                 </v-form>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                color="primary"
                @click="validate"
                >add</v-btn>
                <v-btn 
                color="red"
                @click="reset"
                >Reset</v-btn>
              </v-card-actions>
            </v-card>
   
    <!-- 消息框 -->
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
  </v-app>
</template>

<script>
import {addCategory,getArticleList,updata } from '../../request.js'
export default {
 data(){
     return{
         items:[],
         cover:'',
         fileInfo:'',
         //提示消息框数据
         snackbar: false,
         text: ``,
         //表单验证信息
         valid: false,
         CategoryName:'',
         Parentcategory:'0',
         Level:'',
         CategoryNameRules:[
        v => !!v || '不能为空',
        ],
         LevelRules: [
        v => !!v || '不能为空',
        ],

     }
 },
 methods:{
     //图片上传
       // 上传图片
    uploadFile() {
      if (!this.fileInfo) {
        return;
      }
      var formData = new window.FormData();
      formData.append("file", this.fileInfo);
      updata(formData)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.snackbar = true;
            this.text = "上传图片成功";
            this.cover = res.data.data.avatar_url;
          }
        })
        .catch((err) => {
          this.snackbar = true;
          this.text = "上传图片失败";
          this.fileInfo = "";
          console.log(err);
        });
    },
     getArticleList(){
       getArticleList().then(res=>{
      this.items = res.data.data
  
       })
     },
      addCategory(){
       let params ={
          name: this.CategoryName,
          icon: this.cover,
          parent_id:this.Parentcategory,
          z_index: this.Level
       }
       addCategory(params).then(res=>{
           if (res.status ==200) {
              this.snackbar = true
              this.text = res.data.message
              this.reset()
           }else{
             this.snackbar = true
             this.text = '创建失败' 
             this.reset()
           }
       }) 
      },
    //表单提交的方法
      validate () {
        this.$refs.form.validate()
        if (this.valid) {
           this.addCategory()
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
 },
 props: {
    source: String,
  },
  created(){
    this.getArticleList()
  }
}
</script>

<style>

</style>