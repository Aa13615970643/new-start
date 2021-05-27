import http from './api/http'

//封装请求地址
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
 let resquest = "/testIp/request/"
//  // 测试数据
//  export function postWebHome(data){
//     return http.post(`/web_home`,data)
//  }
//  export function postregiter(data){
//     return http.post(`/user/register`,data)
//  }
//  export function postlogin(data){
//     return http.post(`/user/login`,data)
//  }
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
 // get请求
 export function getListAPI(params){
     return http.get(`${resquest}/getList.json`,params)
 }
 // post请求
 export function postFormAPI(params){
     return http.post(`${resquest}/postForm.json`,params)
 }
 // put 请求
 export function putSomeAPI(params){
     return http.put(`${resquest}/putSome.json`,params)
 }
 // delete 请求
 export function deleteListAPI(params){
     return http.delete(`${resquest}/deleteList.json`,params)
 }
