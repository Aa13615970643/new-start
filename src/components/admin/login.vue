<template>
 <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn :href="source" icon large target="_blank" v-on="on">
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form
                 ref="form"
                 v-model="valid">
                  <v-text-field 
                   v-model="Loginname"
                   :rules="LoginRules"
                   required
                   label="Login" 
                   name="login"
                   prepend-icon="mdi-account" 
                   type="text">
                  </v-text-field>
                  <v-text-field
                    v-model="passwordname"
                    :rules="passwordRules"
                    required
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                 </v-form>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                color="primary"
                @click="validate"
                >Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
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
import {Login} from '../../request.js'
export default {
 data(){
     return{
         //提示消息框数据
         snackbar: false,
         text: `Hello, I'm a snackbar`,
         //表单验证信息
         valid: false,
         LoginRules:'',
         Loginname:'',
         passwordname:'',
         LoginRules:[
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
         passwordRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
        ],

     }
 },
 methods:{
      Login(){
          let aa ={
              username: this.Loginname,
              password: this.passwordname
          }
          Login(aa).then(res=>{
               this.snackbar= true
               this.text = res.data.message
              if (res.status == 200) {
                //保存token
                 window.sessionStorage.setItem('token', res.data.data.token)
                //跳转到管理后台
                 this.$router.push({
                     path:`/Admin`
                 })
              }
          })
      },
    //表单提交的方法
      validate () {
        this.$refs.form.validate()
        if (this.valid) {
           this.Login()
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
}
</script>

<style>

</style>