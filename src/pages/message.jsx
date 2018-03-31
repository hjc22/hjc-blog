import React, {Component} from 'react';
import cs from '../assets/css/message.css'
import { myMessageStore,commonStore } from '../stores'
import { observer } from 'mobx-react';
import { Link,withRouter } from 'react-router-dom'
import { dateFilter,likeNumFilter } from '../utils'
import { Icon } from 'antd'


@observer
class MessagePage extends Component {
  componentDidMount(){
     myMessageStore.init()
  }
  render() {
    const { userInfo = {} } = commonStore,{ list } = myMessageStore

    let userImg = userInfo.userImg?userInfo.userImg:'https://static.hdslb.com/images/akari.jpg'
    return (
      <div className={cs.message}>
         <h4 className={cs.msgTitle}>通知列表</h4>
         <ul className={cs.msgList}>
           { list.map( ({commentUserName,originArticleTitle,originArticleId,text,type,messageId},i) => (
             <li className={cs.msgItem} key={i}>
                 {type===1?(
                    <div>
                      <span>{commentUserName} </span>
                      在文章
                      <Link to={'/article/'+originArticleId}> {originArticleTitle} </Link>中评论了你：{text}
                    </div>
                 ):type===2?(
                   <div>
                      <span>{commentUserName} </span>在文章<Link to={'/article/'+originArticleId}> {originArticleTitle} </Link>中回复了你：{text}
                   </div>
                 ):(
                   <span>{text}</span>
                 )}
                 <div className={cs.itemAction}>
                    <div>
                      <button onClick={() => myMessageStore.removeMessae(messageId,i)}>删除</button>
                    </div>
                 </div>
             </li>
           ))}
         </ul>

      </div>


    )
  }
}


export default MessagePage
