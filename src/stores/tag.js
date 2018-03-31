import {observable, action, computed, runInAction} from 'mobx'
import { axios } from '../utils'


class TagStore {
  @observable tags = []

  @observable tagId = 1

  @action init(){
    if(this.tags.length) return
    axios('/api/getTags',{},{method:'get'}).then( dt => {
      runInAction( () => {
        this.tags = dt
      })
    })
  }
  @action selectTag(id){
    if(this.tagId == id) return
    this.tagId = id
  }
}


export default new TagStore()
