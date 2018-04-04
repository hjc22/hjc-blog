import Axios from 'axios'
import { Message } from 'antd'

const dateFilter = date => {
  if(!date) return ''

  return date.split('-').filter( (item,i) => i !== 0 )
}


const likeNumFilter = val => {
  if(!val) return 0
  if(val < 10000) return val
  let str = String(val),x = str.length - 4
  return str.substring(0,x) + 'w+'
}

const clss = cls => {
  return cls.join(' ')
}

const runTime = time => {
  if(!time) return ''

  const nowTime = +new Date(),chaTime = nowTime - time


  return Math.floor(chaTime / (1000 * 60 * 60 * 24))
}

const axios = (url,data = {},opts = {}) => {
   return new Promise((resolve,reject) => {
     let { method = 'post',load = true ,headers,isAlert = true} = opts


     if(method === 'get'){
       let arr = []
       for(let i in data){
         arr.push(i+'='+data[i])
       }
       url = arr.length?url+'?'+arr.join('&'):url

       data = {}
     }
     Axios({method,url,data,headers}).then( res => {
       let dt = res.data
       if(dt.code!==1) {
         const msg = dt.error || '参数错误'
         isAlert && Message.error(msg)
         return reject(msg)
       }

       resolve(dt.data)
     })
     .catch(err => {
       console.log(err)

       const msg = err || '服务器故障啦'

       isAlert && Message.error(msg)

       reject(msg)
     })
   })

}

function createLoading(target){
  console.log(target)
  target.loading = false
  target.isNull = false
  target.isError = false
}

const toTop = (top = 0) => document.body.scrollTop = document.documentElement.scrollTop = top

export {
  dateFilter,
  likeNumFilter,
  axios,
  clss,
  toTop,
  createLoading,
  runTime
}
