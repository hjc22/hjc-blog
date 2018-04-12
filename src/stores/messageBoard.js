import {observable, action, runInAction} from 'mobx'
import { axios } from '../utils'
import { Message,toTop } from 'antd'

class MessageBoard {
  @observable list = []

  @observable commentText = ''

  @observable activeCommentId = ''

  @observable sender = {}

  @action setSender(info){
    this.sender = info
  }
  @action setText(text){

    this.commentText = text
  }
  @action setComment(input,type){
    let { commentText,activeCommentId,sender } = this,boardId = type?type.boardId:null
    if(!commentText) return Message.warning('总要打点字吧(๑´ڡ`๑)')

    let data = { boardId,commentText }
    if(type){

      data.boardId = type?type:activeCommentId
      data.senderId = sender.userId
      data.senderName = sender.userName
    }

    axios('/api/setMessageBoard',data).then( dt => {
      runInAction(() => {

        if(!type) this.list.unshift(dt)

        else {
          let index = this.list.findIndex(item => item.boardId === type)
          if(index!==-1) this.list[index].replyList.push(dt)

        }
        this.commentText = ''
        input.value = null

        this.activeCommentId = ''
      })
    })
  }

  @action setCommentId(id){
    this.activeCommentId = id
  }

  // @action init(){
  //   axios('/api/getMessageBoard',{},{method:'get'}).then( dt => {
  //     runInAction( () => {
  //       this.list = dt
  //     })
  //   })
  // }

  @observable nowPage = 0
  @observable totalPage = 0
  @action getPageList(page = 1){
    this.nowPage = page
    axios('/api/getMessageBoard',{page},{method:'get'}).then( dt => {

      runInAction(() => {
        this.totalPage = dt.allCount
        this.list = dt.list
        // toTop()
      })
    })
  }
}


export default new MessageBoard()
