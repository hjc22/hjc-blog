import {observable, action, computed, runInAction} from 'mobx'

import { axios,toTop } from '../utils'
import { Message } from 'antd'
import timeStorage from 'time-localstorage'
import { createLoading } from '../utils'


import mySetting from './mySetting'
import myMessage from './message'
import messageBoard from './messageBoard'
import tag from './tag'



class CommStore {
  @observable isLogin = false
  @observable isLogingModal = false

  @observable isRegister = false

  @observable userName = ''

  @observable myUserInfo = ''

  @observable password = ''

  @observable email = ''

  @action setLoginModal(val = true){
    this.isLogingModal = val
  }

  @computed get userInfo(){
    if(this.myUserInfo) return this.myUserInfo

    const userInfo = timeStorage.get('userInfo')

    if(userInfo){
      this.myUserInfo = userInfo
      this.isLogin = true
      return userInfo
    }
    else {
      this.isLogin = false
      return false
    }
  }

  @action setRegister(val = true){
    this.isRegister = val
  }

  @action setText(name,value){
    this[name] = value

  }
  @action logout(){

    axios('/api/logout',{}).then( dt => {
      runInAction(() => {
        timeStorage.remove('userInfo')

        this.isLogin = false

        this.myUserInfo = {}

      })
    })


  }

  @action getLogin(){
    return new Promise((resolve,reject) => {
      const { userName,password } = this

      if(!checkInput(0,userName,password)) return reject()


      axios('/api/login',{userName,password},{method:'post'}).then( dt => {

        timeStorage.set('userInfo',dt,3 * 3600 * 24)

        runInAction(() => {
           this.isLogin = true
           this.isLogingModal = false

           this.myUserInfo = dt
        })
      })
    })
  }

  @action getRegister(){
    return new Promise((resolve,reject) => {
      const { userName,password,email } = this

      if(!checkInput(1,userName,password,email)) return reject()



      axios('/api/register',{userName,password,email},{method:'post'}).then( dt => {

        timeStorage.set('userInfo',dt,3 * 3600 * 24)

        runInAction(() => {
           this.isLogin = true
           this.isLogingModal = false

           this.myUserInfo = dt
        })
      })
    })
  }
}

function checkInput(type,userName,password,email){
  let pwdreg=/^[a-zA-Z]\w{5,17}$/,namereg=/.{3,10}/,emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if(!userName) return Message.warning('没输入用户名哦(๑´ڡ`๑)'),0
  if(!namereg.test(userName)) return Message.warning('用户名需要3-10个字符(๑´ڡ`๑)'),0
  if(!password) return Message.warning('没输入密码哦(๑´ڡ`๑)'),0
  if(!pwdreg.test(password)) return Message.warning('密码需要首字母，6-18个字符(๑´ڡ`๑)'),0

  if(type){
    if(!email) return Message.warning('没输入邮箱哦(๑´ڡ`๑)'),0
    if(!emailReg.test(email)) return Message.warning('邮箱不规范(๑´ڡ`๑)'),0
  }


  return 1
}

class NavMenuStore {
  @observable menus = [
    {name:'首页',path:'/index'},
    {name:'标签',path:'/tag'},
    // {name:'动态',path:'/action'},
    {name:'留言板',path:'/messageBoard'},
    {name:'关于',path:'/about'},

  ]

  @observable myMenu = [
    {name:'通知',path:'/message'},
    {name:'设置',path:'/mySetting'},
    {name:'退出',type:'fn',fn:(commonStore) => {
      commonStore.logout()
    }},
  ]

  @observable status = false
  @observable mMenuStatus = false


  @action open(){
    this.status = !this.status
  }

  @action mobileOpen(){
    this.mMenuStatus = !this.mMenuStatus
  }

  @action getPage(item,history,commonStore){

    this.mMenuStatus = false
    if(item.type === 'fn') return item.fn(commonStore)
    history.push(item.path)
  }
}

class MusicPlayerStore {
  @observable songs = [
    {
      id:'28406753',
      name:'义气',
      album:{
        picUrl:'http://p1.music.126.net/Nl0RTYfKGynZsS89SKpjdQ==/3385396303311359.jpg'
      },
      artists:[
        { name:'黄海波' },{ name:'王雷' },{ name:'李健' },{ name:'张宁江' },
      ]
    }
  ]

  @observable list = []

  @observable playStatus = false
  @observable muted = true

  @observable activeIndex = 0

  @observable audio = {}

  @computed get activeSong (){
    return this.songs[this.activeIndex] || {}
  }

  @action setAudio (audio){
    this.audio = audio
  }
  @action play(){

    this.playStatus = !this.playStatus

    if(this.playStatus) this.audio.play()
    else this.audio.pause()
  }
  @action stop(){
    this.playStatus = false
  }
  @action next(){
    let len = this.songs.length


    if(this.activeIndex === len - 1 ) this.activeIndex = 0
    else this.activeIndex++

    setTimeout(() => this.audio.play(),this.playStatus = true)

  }
  @action prev(audio){
    let len = this.songs.length
    // this.playStatus = true
    if(this.activeIndex === 0 ) this.activeIndex = len - 1
    else this.activeIndex--
    setTimeout(() => this.audio.play(),this.playStatus = true)

  }
  @action pickSong(i,audio){
    let index = Number(i)
    if(this.activeIndex === index) return
    this.playStatus = true
    this.activeIndex = index
    setTimeout(() => this.audio.play())
  }
  @action getMute(audio){

    this.muted = !this.muted
    this.audio.muted = !this.muted
  }

  @action getList(){
    axios('/api/musics',{},{ method:'get' }).then( dt => {
      runInAction( () => {
        this.songs = this.songs.concat(dt)
      })
    })

  }
}

class NearCommentsStore {
  @observable comments = []
  @observable loading = false
  @observable isNull = false
  @observable isError = false

  @action open(){
    this.status = !this.status
  }

  @action init(){
    getLoading(this,'/api/nearComments',{},{method:'get'}).then( dt => {
      runInAction(() => {
        this.comments = dt
      })
    })
  }
}

function getLoading(store,url,data = {},opts = {}){
  return new Promise((resolve,reject) => {
    store.loading = true
    opts.isAlert = false
    axios(url,data,opts).then( dt => {

      resolve(dt)

      runInAction(() => {
        store.loading = false
        store.isError = false,
        store.isNull = Array.isArray(dt) && !dt.length
      })
    })
    .catch(err => {
      runInAction( () => {
        store.loading = false
        store.isError = true
      })
      reject(err)
    })
  })
}

class HotArticlesStore {
  @observable list = []

  @observable loading = false
  @observable isNull = false
  @observable isError = false

  @observable status = false


  @action open(){
    this.status = !this.status
  }

  @action init(){
    getLoading(this,'/api/hotArticles',{},{method:'get'}).then( dt => {
      this.list = dt
    })
  }
}
class NearArticlesStore {
  @observable list = []

  @observable loading = false
  @observable isNull = false
  @observable isError = false

  @observable status = false


  @action open(){
    this.status = !this.status
  }

  @action init(){
    getLoading(this,'/api/nearArticles',{},{method:'get'}).then( dt => {
      this.list = dt
    })
  }
}

class CountStore {
  @observable list = []

  @observable loading = false
  @observable isNull = false
  @observable isError = false

  @action init(){
    getLoading(this,'/api/counts',{},{method:'get'}).then( dt => {
      runInAction(() => {
        this.list = dt
      })
    })
  }
}

class SwiperStore {
  @observable list = [
    {imgUrl:'http://p1.music.126.net/SWDOrvO3f6L8Q1xGPTbb6w==/109951163102543599.jpg?param=700y260',title:'',id:'',type:''},
    {imgUrl:'http://p1.music.126.net/SWDOrvO3f6L8Q1xGPTbb6w==/109951163102543599.jpg?param=700y260',title:'',id:'',type:''},
    {imgUrl:'http://p1.music.126.net/SWDOrvO3f6L8Q1xGPTbb6w==/109951163102543599.jpg?param=700y260',title:'',id:'',type:''},

  ]
}

class ArticleListStore {
  @observable list = []

  @observable loading = false
  @observable isNull = false
  @observable isError = false

  @observable nowPage = 0
  @observable totalPage = 0
  @action getPageList(page = 1,tagId){

    console.log(tagId)
    this.nowPage = page
    let data = {
      page
    }

    tagId && (data.tagId = tagId)
    axios('/api/queryArticleList',data,{method:'get'}).then( dt => {

      runInAction(() => {
        this.totalPage = dt.allCount
        this.list = dt.list
        // toTop()
      })
    })
  }
}

class EditStore {
  @observable artPhotoStatus = false
  @observable isInputLink = false

  @observable titleImgloading = false

  @observable preloadShow = false

  @observable articleText = ''

  @observable articleTitle = ''

  @observable tagId = 1

  @observable titleImg = ''

  @action setArtPhotoStatus(val){


    this.artPhotoStatus = !!val
  }

  @action setPreloadShow(val = true){


    this.preloadShow = val
  }
  @action edit(text){
    this.articleText = text
  }

  @action setTitle(val){
    this.articleTitle = val
  }
  @action setTagId(id){
    this.tagId = id
  }
  @action setInputLink(val = true){
    this.isInputLink = val
  }

  @action setTitleImg(val){
    this.titleImg = val
  }
  @action clearAll(){
    this.articleText = ''
    this.titleImg = ''
    this.articleTitle = ''
    this.tagId = 1
  }
  @action editArticle(input,entryInput){

    const { articleText,titleImg,articleTitle,tagId} = this

    if(!articleTitle) return Message.warning('没有输入文章标题哦！(๑´ڡ`๑) ')
    if(!articleText) return Message.warning('没有输入文章内容哦！(๑´ڡ`๑) ')

    let simpleText = entryInput.textContent.substring(0,80)+'...'

    axios('/api/editArticle',{articleText,titleImg,articleTitle,tagId,simpleText} ).then( dt => {
       runInAction(() => {
           this.clearAll()
       })
       Message.success('文章发布成功！(｡◕‿◕｡)')

       input.value = null
    })
  }
  @action upload(file,input){
    let form = new FormData()

    form.append('img',file)

    this.titleImgloading = true

    axios('/api/uploadPhoto',form,{ headers:{'Content-Type':'multipart/form-data'} } ).then( dt => {
       runInAction(() => {
         this.titleImg = dt
         this.titleImgloading = false


       })

       input.value = null
    })
    .catch( err => {

      runInAction(() => {
        this.titleImgloading = false
      })
      input.value = null
      Message.error(err)
    })
  }
}

class ArticleStore {
  @observable infos = {}

  @observable commentData = {
    commentsList:[]
  }

  @observable loading = false
  @observable isNull = false
  @observable isError = false


  @observable commentText = ''

  @observable payStatus = false

  @observable activeCommentId = ''

  @observable sender = {}

  @action open(){
    this.payStatus = !this.payStatus
  }

  @action setCommentId(id){
    this.activeCommentId = id
  }

  @action init(id){
    getLoading(this,'/api/queryArticle',{articleId:id},{method:'get'}).then( dt => {
       this.infos = dt
    })

    axios('/api/getComment',{articleId:id},{method:'get'}).then( dt => {
       runInAction(() => {
         this.commentData.commentsList = dt
       })
    })
  }
  @action setSender(info){
    this.sender = info
  }
  @action setText(text){

    this.commentText = text
  }
  @action setComment(input,type){
    let { commentText,infos,activeCommentId,sender } = this,{ articleId } = infos
    if(!commentText) return Message.warning('总要打点字吧(๑´ڡ`๑)')

    let data = { articleId,commentText }
    if(type){

      data.commentId = type?type:activeCommentId
      data.senderId = sender.userId
      data.senderName = sender.userName
    }

    axios('/api/setComment',data).then( dt => {
      runInAction(() => {

        if(!type) this.commentData.commentsList.push(dt)

        else {
          let index = this.commentData.commentsList.findIndex(item => item.commentId === type)
          if(index!==-1) this.commentData.commentsList[index].replyList.push(dt)

        }
        this.commentText = ''
        input.value = null

        this.activeCommentId = ''
      })
    })
  }

}
export const navMenuStore = new NavMenuStore()
export const musicPlayerStore = new MusicPlayerStore()
export const nearCommentsStore = new NearCommentsStore()
export const hotArticlesStore = new HotArticlesStore()
export const countStore = new CountStore()
export const articleListStore = new ArticleListStore()
export const swiperStore = new SwiperStore()
export const nearArticlesStore = new NearArticlesStore()
export const articleStore = new ArticleStore()
export const editStore = new EditStore()

export const commonStore = new CommStore()
export const mySettingStore = mySetting
export const myMessageStore = myMessage
export const messageBoardStore = messageBoard
export const tagStore = tag
