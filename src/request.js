import http from './api/http'
require('./api/mock')
//封装请求地址
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
 let resquest = "/testIp/request/"
 // 测试数据
 export function postWebHome(data){
    return http.post(`/web_home`,data)
 }
 //mock 的测试数据
 export function getMock(params){
    return http.get(`data/index`,params)
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
