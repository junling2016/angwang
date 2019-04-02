import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'

const { $message } = Vue.prototype
const cancelToken = axios.CancelToken
// 创建axios实例
const http = axios.create({
  // 配置超时
  timeout: 30000,
  // 请求携带描述多语言信息的头部
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  // 携带cookie信息
  withCredentials: true,
  // get请求参数序列化，针对数组不添加[]
  paramsSerializer: function(params) {
    return Qs.stringify(params, { indices: false })
  }
})

// 用于缓存取消请求的cancelToken，以method和url组合作为键名
const pendingRequest = {}

// 取消请求操作
const removePending = config => {
  const pendingName = `${config.method}:${config.url}`
  const cancel = pendingRequest[pendingName]
  if (cancel) {
    cancel('取消重复请求')
    delete pendingRequest[pendingName]
  }
}

// http请求拦截器
http.interceptors.request.use(
  config => {
    // 默认请求不允许重复提交
    if (!config.unCancel) {
      removePending(config)
      config.cancelToken = new cancelToken(c => {
        pendingRequest[`${config.method}:${config.url}`] = c
      })
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http响应拦截器
http.interceptors.response.use(
  res => {
    const { code, message } = res.data
    // 请求得到响应后，再执行取消操作，目的是移除缓存的cancelToken
    removePending(res.config)

    if (code !== 0) {
      $message && $message.error(message)
      return Promise.reject(message)
    }

    return res.data
  },
  err => {
    // 请求的错误判断,根据不同的错误码不同消息提醒
    if (err && err.response) {
      const { status } = err.response
      switch (status) {
        case 400:
          err.message = '错误请求'
          break
        case 401:
          err.message = '未授权，请重新登录'
          break
        case 403:
          err.message = '请重新登录'
          break
        case 404:
          err.message = '请求错误,未找到该资源'
          break
        case 405:
          err.message = '请求方法未允许'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务端出错'
          break
        case 501:
          err.message = '网络未实现'
          break
        case 502:
          err.message = '网络异常'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网络超时'
          break
        case 505:
          err.message = 'http版本不支持该请求'
          break
        default:
          err.message = `连接错误${status}`
      }

      $message && $message.error(err.message)
    }

    return Promise.reject(err)
  }
)

export default http
