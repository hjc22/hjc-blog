import {observable, action, computed, runInAction} from 'mobx'


class MySettingStore {
  @observable list = []

  @action init(page = 1){

  }
}


export default new MySettingStore()
