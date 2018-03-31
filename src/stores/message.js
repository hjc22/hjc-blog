import {observable, action, runInAction} from 'mobx'
import { axios } from '../utils'


class MyMessage {
  @observable list = []

  @action init(){
    axios('/api/getMessage',{},{method:'get'}).then( dt => {
      runInAction( () => {
        this.list = dt
      })
    })
  }
  @action removeMessae(messageId,i){
    axios('/api/delMessage',{messageId},{method:'post'}).then( dt => {
      runInAction( () => {
        this.list.splice(i,1)
      })
    })
  }
}


export default new MyMessage()
