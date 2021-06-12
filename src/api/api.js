import axios from 'axios'
const api = axios.create({
  
  //  baseURL:`http://121.4.52.201/api/v1`,  
      baseURL:`http://localhost:3000/api/v1`,  
      
    timeout:5000 //请求超时5000毫秒
})
//请求拦截
api.interceptors.request.use(config=>{
    //发送请求之前做什么
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      let token = window.sessionStorage.getItem('token')
      if (!config.headers.hasOwnProperty('Authorization') && token) {
        config.headers.Authorization = 'Bearer ' +token;
      }
      return config;
  },
    error=>{
    //对请求错误的处理
    return Promise.reject(error)
    }
    )
//响应拦截
api.interceptors.response.use(response=>{
    //对响应数据做点什么
    return response
    },error=>{
      /***** 接收到异常响应的处理开始 *****/
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
        alert('服务器响应超时，请刷新当前页')
    }
    error.message = '连接服务器失败'
  }

  alert(error.message)
  /***** 处理结束 *****/
  //如果不需要错误处理，以上的处理过程都可省略
  return Promise.resolve(error.response)
    }
    )
    //导出封装好的axios
    export default api
