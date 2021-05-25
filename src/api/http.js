//导入封装好的实例
import request from './api'
//封装各种请求方式
const http={
    // methode:请求
    // url:请求地址
    // params:请求参数
    get(url,params){
        const config={
            method:'get',
            url:url
        }
        if (params) config.params = params
        return request(config)    
    },
    post(url,data){
        const config={
            method:'post',
            url:url,
            data:{
                time: "1246",
                config: {},
                sgin: "5456",
                data: {}     
            },
        }
        if (data) config.data.data = data
        return request(config)    
    },
    put(url,params){
        const config={
            method:'put',
            url:url
        }
        if (params) config.params = params
        return request(config)    
    },
    delete(url,params){
        const config={
            method:'delete',
            url:url
        }
        if (params) config.params = params
        return request(config)    
    },
    
}
//导出
export default http