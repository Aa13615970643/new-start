<template>
  <v-app id="inspire">
    <v-card>
      <v-toolbar color="black" dark flat>
        <v-toolbar-title>新增文章</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="Acticletitle"
            :rules="ActicletitleRules"
            required
            label="文章标题"
            name="文章标题"
            type="text"
          >
          </v-text-field>
          <v-text-field
            v-model="Acticleauthor"
            :rules="ActicleauthorRules"
            required
            label="文章作者"
            name="文章作者"
            type="text"
          >
          </v-text-field>
          <v-file-input
            v-show="!changimg"
            v-model="fileInfo"
            :rules="[(v) => !!v || '文件必选']"
            @change="uploadFile"
            label="点击选择文件，文件格后缀为：.xls、.xlsx"
          ></v-file-input>
          <div v-show="changimg">
          <img :src="this.$route.params.cover" alt="" srcset="">
          <v-btn @click="changimg = !changimg">change</v-btn>
          </div>
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
            :options="editorOption"
            v-model="content"
            ref="myQuillEditor"
             required
            :rules="contentRules"
          >
          </quill-editor>
          <input
            type="file"
            hidden
            accept=".jpg,.png"
            ref="fileBtn"
            @change="handleChange"
          />
          <button @click="submit">提交</button>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="validate" v-show="!booo">add</v-btn>
        <v-btn color="primary" @click="changeArticle" v-show="booo">change</v-btn>
        <v-btn color="red" @click="reset">Reset</v-btn>
      </v-card-actions>
      <!-- 富文本 -->
      <div class="edit_container"></div>
    </v-card>

    <!-- 消息框 -->
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { addActicle, getArticleList, updata,changeArticle } from "../../request.js";
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      changimg:false,
      booo:false,
      cover: "",
      fileInfo: "",
      loading: {
        uploadIsLoading: "",
      },
      snackbar: false,
      //富文本
      content: "",
      editorOption: {
        placeholder: "请输入信息详情",
      },
      items: [],
      //提示消息框数据
      snackbar: false,
      text: ``,
      //表单验证信息
      valid: false,
      Acticletitle: "",
      Acticleauthor: "",
      ActiclecategoryId: "",
      tag: "",
      introduction: "",
      ActicleauthorRules: [(v) => !!v || "不能为空"],
      ActicletitleRules: [(v) => !!v || "不能为空"],
      ActiclecategoryIdRules: [(v) => !!v || "不能为空"],
      tagRules: [(v) => !!v || "不能为空"],
      introductionRules: [(v) => !!v || "不能为空"],
      contentRules: [(v) => !!v || "不能为空"],
    };
  },
  methods: {
    submit() {
      console.log(this.content);
    },
    imgHandler(state) {
      if (state) {
        //触发input的单击 ，fileBtn换成自己的
        this.$refs.fileBtn.click();
      }
    },
    handleChange(e) {
      const files = Array.prototype.slice.call(e.target.files);
      if (!files) {
        return;
      }
      let form = new FormData();
      form.append("file", files[0]);
      updata(form).then((res) => {
        console.log(res);
        //这里设置为空是为了联系上传同张图可以触发change事件
        this.$refs.fileBtn.value = "";
        if (res.status === 200) {
          let selection = this.$refs.myQuillEditor.quill.getSelection();
          //这里就是返回的图片地址，如果接口返回的不是可以访问的地址，要自己拼接
          let imgUrl = res.data.data.avatar_url;
          //获取quill的光标，插入图片
          this.$refs.myQuillEditor.quill.insertEmbed(
            selection != null ? selection.index : 0,
            "image",
            imgUrl
          );
          //插入完成后，光标往后移动一位
          this.$refs.myQuillEditor.quill.setSelection(selection.index + 1);
        }
      });
    },
        //更改文章内容
    changeArticle(){
       let index = this.$route.params.id
       let params = {
        title: this.Acticletitle,
        author: this.Acticleauthor,
        categoryId: this.ActiclecategoryId,
        tag: this.tag,
        introduction: this.introduction,
        content: this.content,
        cover: this.cover,
       } 
       changeArticle(index,params).then(res=>{
            this.snackbar = true
            this.text = res.data.message
            this.reset()
             this.changimg = !this.changimg
       })
       
      
    },   
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
    //获取分类名单
    getArticleList() {
      getArticleList().then((res) => {
        this.items = res.data.data;
      });
    },
    //添加新的文章
    addActicle() {
      let index = {
        title: this.Acticletitle,
        author: this.Acticleauthor,
        categoryId: this.ActiclecategoryId,
        tag: this.tag,
        introduction: this.introduction,
        content: this.content,
        cover: this.cover,
      };
      addActicle(index,params).then((res) => {
        if (res.status == 200) {
          this.snackbar = true;
          this.text = "创建文章成功";
          this.reset();
          this.content = "";
        } else {
          this.snackbar = true;
          this.reset()
          this.text = "创建文章失败";
        }
      });
    },
    //表单提交的方法
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        this.addActicle();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  mounted() {
    if (this.$refs.myQuillEditor) {
      //myQuillEditor改成自己的
      this.$refs.myQuillEditor.quill
        .getModule("toolbar")
        .addHandler("image", this.imgHandler);
      //这里初始化，劫持toolbar的image的handler方法，在mounted中处理
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  props: {
    source: String,
  },
  created() {
    var obj = Object.keys(this.$route.params)
    if (obj.length !== 0) {
    this.changimg = true
    this.booo = true
    this.Acticletitle = this.$route.params.title
    this.Acticleauthor= this.$route.params.author
    this.ActiclecategoryId = this.$route.params.categoryId
    this.tag = this.$route.params.tag
    this.introduction = this.$route.params.introduction
    this.cover = this.$route.params.cover
    this.content = this.$route.params.content
    }
    else{
      this.booo =false
      this.changimg = false
    }
    this.getArticleList();
  },
};
</script>

<style>
</style>
