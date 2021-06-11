import http from './api/http'

//封装请求地址
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
 //home
//  账号注册
export function postZhuce(data){
    return http .post(`user/register`,data)
}
//获取详情页的数据
export function getDetailsPage(index,params){
   return http.get(`article/detail/${index}`,params)
}
 //文章的查询
export function getInquireArticle(params,index){  
    return http.get(`/category/article/${index}`,params)
}
 //获取文章分类列表
 export function getArticleList(params){
    return http.get('category/list',params)
}
 //获取文章列表
 export function getArticle(params){
     return http.get('article/list',params)
 }

 //admin
 export function Login(data){
      return http.post('user/login',data)
 }

 //删除或者恢复文章
 export function deleteArticle(params,index){
     return http.delete(`/article/hidden/${index}`,params)
 }
 //删除分类
 export function deleteCategory(index){
     return http.delete(`category/delete/${index}`)
 }
 //添加分类数据
 export function addCategory(data){
      return http.post('category/create',data)
 }
 //添加文章
 export function addActicle(data){
     return http.post(`article/create`,data)
 }
 //上传图片接口
 export function updata(data){
     return http.updata('article/updata',data)
 }
 //更改文章
 export function changeArticle(index){
     return http.put(`article/update/${index}`)
 }
 //更改分类
 export function changeCategory(index){
     return http.put(`category/update/${index}`)
 }