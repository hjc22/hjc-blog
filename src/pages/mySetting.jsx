import React, {Component} from 'react';
import cs from '../assets/css/mySetting.css'
import { mySettingStore,commonStore } from '../stores'
import { observer } from 'mobx-react';
import { Link,withRouter } from 'react-router-dom'
import { dateFilter,likeNumFilter } from '../utils'
import { Icon } from 'antd'


@observer
class Setting extends Component {
  componentDidMount(){

  }
  render() {
    const { userInfo = {} } = commonStore

    let userImg = userInfo.userImg?userInfo.userImg:'https://static.hdslb.com/images/akari.jpg'
    return (
      <div className={cs.mySetting}>
         <div className={cs.settingHead}>
           <div className={cs.userImgBox}><img src={userImg} alt="userImg"/></div>
           <span className={cs.userName}>{userInfo.userName}</span>
         </div>
         <div>
           <h4 className={cs.settingTitle}>账户管理</h4>
         </div>
      </div>


    )
  }
}



export default Setting
