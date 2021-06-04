<template>
 <v-app id="inspire">
            <v-card >
              <v-toolbar color="black" dark flat>
                <v-toolbar-title>新增文章</v-toolbar-title>
                <v-spacer></v-spacer>
          
              </v-toolbar>
              <v-card-text>
                <v-form
                 ref="form"
                 v-model="valid">
                  <v-text-field 
                   v-model="Acticletitle"
                   :rules="ActicletitleRules"
                   required
                   label="文章标题" 
                   name="文章标题"
                   type="text">
                  </v-text-field>
                  <v-text-field 
                   v-model="Acticleauthor"
                   :rules="ActicleauthorRules"
                   required
                   label="文章作者" 
                   name="文章作者"
                   type="text">
                  </v-text-field>
    
                  <v-select
                    v-model="ActiclecategoryId"
                    :rules="ActiclecategoryIdRules"
                    required
                    :items="items"
                    item-text="name"
                    item-value="id"
                    label="文章分类"
                    name="文章分类"
                  ></v-select>
                  <v-text-field
                    v-model="tag"
                    :rules="tagRules"
                    required
                    label="文章标签"
                    name="文章标签"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="introduction"
                    :rules="introductionRules"
                    required
                    label="文章简介"
                    name="文章简介"
                    type="text"
                  ></v-text-field>
           <quill-editor 
            v-model="content" 
            :rules="contentRules"
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
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
              <!-- 富文本 -->
               <div class="edit_container">
         </div>
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
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import {addActicle,getArticleList} from '../../request.js'
export default {
  components:{
    quillEditor
  },
 data(){
     return{
        snackbar:false,
        //富文本
         content: `<p></p><p><br></p><ol><li><strong><em>Or drag/paste an image here.</em></strong></li><li><strong><em>rerew</em></strong></li><li><strong><em>rtrete</em></strong></li><li><strong><em>tytrytr</em></strong></li><li><strong><em>uytu</em></strong></li></ol>`,
         editorOption: {},
         items:[],
         //提示消息框数据
         snackbar: false,
         text: ``,
         //表单验证信息
         valid: false,
         Acticletitle:'',
         Acticleauthor:'',
         ActiclecategoryId:'',
         tag:'',
         introduction:'',
         ActicleauthorRules:[
        v => !!v || '不能为空',
        ],
         ActicletitleRules:[
        v => !!v || '不能为空',
        ],
         ActiclecategoryIdRules:[
        v => !!v || '不能为空',
        ],
         tagRules:[
        v => !!v || '不能为空',
        ],
         introductionRules:[
        v => !!v || '不能为空',
        ],
         contentRules:[
        v => !!v || '不能为空',
        ],
    

     }
 },
 methods:{
      //富文本
      onEditorReady(editor) { // 准备编辑器
        },
       onEditorBlur(){}, // 失去焦点事件
       onEditorFocus(){}, // 获得焦点事件
       onEditorChange(){}, // 内容改变事件
       getArticleList(){
       getArticleList().then(res=>{
      this.items = res.data.data
  
       })
      },
    //添加新的文章
     addActicle(){
       let index ={
         title:this.Acticletitle ,
         author:this.Acticleauthor,
         categoryId:this.ActiclecategoryId,
         tag:this.tag,
         introduction:this.introduction,
         content:this.content,
         cover:''
       }
       addActicle(index).then(res=>{
         if (res.status ==200) {
            this.snackbar= true
            this.text = '创建文章成功'
            this.reset()
            this.content =''
         }else{
           this.snackbar = true
           this.text = '创建文章失败'
         }
       })
     },
    //表单提交的方法
      validate () {
        this.$refs.form.validate()
        if (this.valid) {
           this.addActicle()
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
 },
 computed:{
   editor(){
     return this.$refs.myQuillEditor.quill
   }
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