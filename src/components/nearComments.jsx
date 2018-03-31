import React, {Component} from 'react';
// import { Row, Col } from 'antd';

import { observer } from 'mobx-react';
import { nearCommentsStore } from '../stores'
import cs from '../assets/css/nearComments.css'
import { ModuleTitle,Loading } from '../components'

@observer
class NearComments extends Component {
   componentDidMount(){
      nearCommentsStore.init()
   }

   render(){
     let {loading,isNull,isError} = nearCommentsStore
     return (
       <div className={cs.nearComments}>
          <ModuleTitle title="近期评论" />

          <Loading loading={loading} isNull={isNull} isError={isError}>
            <ul className={cs.commentsList}>
              {nearCommentsStore.comments.map( (item,i) => commentItem(item,i))}
            </ul>
          </Loading>
       </div>
     )
   }
}
// <div className='globalSeeMore'><button className='globalSeeMore'>查看更多</button></div>


const commentItem = (props,i) => {
  const { userInfo = {},replyList = []} = props
  return (
    <li className={cs.commentItem} key={i}>
      <img src={userInfo.userImg?userInfo.userImg:'https://static.hdslb.com/images/akari.jpg'} className={cs.userImg} alt='userImg'/>
      <div className={cs.itemRight}>
         <div className={cs.itemTop}>
           <span className={cs.itemName}>{userInfo.userName}</span>
           <span className={cs.itemDate}>{props.date}</span>
         </div>
         <div className={cs.itemMid}>
           <p className={cs.itemText}>{props.commentText}</p>
           {replyList.length?(<ul className={cs.itemMore}>
             {replyList.map( (item,i2) => replyItem(item,i2))}
           </ul>):null}

         </div>
      </div>
    </li>
  )
}

const replyItem = (props = {},i) => {
  const {userInfo,senderName,commentText} = props
  return (
    <li className={cs.replyItem} key={i}>
      <span><span className={cs.nameCol}>{userInfo.userName}</span> 回复 <span className={cs.nameCol}>{senderName}</span>：</span>{commentText}
    </li>
  )
}


export default NearComments
