import React, {Component} from 'react';
import cs from '../assets/css/comments.css'
import { commonStore } from '../stores'
import { observer } from 'mobx-react';
import { Link,withRouter } from 'react-router-dom'
import { dateFilter,likeNumFilter } from '../utils'
import { Icon } from 'antd';




@observer
class AllComments extends Component{
  render(){

    let {commentNum,jobPersons,commentsList,activeCommentId,isLogin,store,type} = this.props
    let inputShow = activeCommentId !== ''?'hide':''

    let idName = type===1?'boardId':'commentId'

    return (
        <div className={cs.allComment}>
          {
            type===1?null:(
              <div className={cs.commentHead}>
                <h4 className={cs.headTit}>全部评论</h4>
                <div className={cs.headRight}>
                  <span><span className={cs.commentNum}>{jobPersons}</span>人参与</span>，<span><span className={cs.commentNum}>{commentNum}</span>条评论</span>
                </div>

              </div>
            )
          }

          {isLogin?null:(<h5 className={cs.loginAlert}>要发表{type===1?'留言':'评论'}或者回复，您必须<span onClick={() => commonStore.setLoginModal()} className={cs.loginBtn}>登录</span></h5>)}


          <ul className={cs.commentList}>
            {commentsList.map( (item,i) => commentItem(item,i,store,idName,isLogin))}
          </ul>

          {
            isLogin?(<div className={cs.commentSubmitBox+' '+inputShow}>
              <textarea className={cs.replyInput} onInput={e => store.setText(e.target.value)} type='text' placeholder={type===1?'写下你的留言...':'写下你的评论...'} onClick={() => store.setCommentId('')} ref='commentInput'></textarea>
              <button  className={cs.commentBtn} onClick={() => store.setComment(this.refs.commentInput)}>{type===1?'留言':'评论'}</button>
            </div>):null
          }




        </div>
      )
  }
}


const commentItem = (props,i,store,idName,isLogin) => {
  let { replyList,userInfo } = props,loginInfo = commonStore.userInfo
  return(
    <li className={cs.commentItem} key={i}>
      <img src={userInfo.userImg?userInfo.userImg:'https://static.hdslb.com/images/akari.jpg'} className={cs.userImg} alt='userImg'/>
      <div className={cs.itemRight}>
         <div className={cs.itemTop}>
           <span className={cs.comItemName}>{userInfo.userName}<span className={cs.gradeIcon} grade={userInfo.grade}>潜水</span></span>
           <span className={cs.comItemDate}>{props.date}</span>
         </div>
         <div className={cs.itemMid}>
           <p className={cs.comItemText}>{props.commentText}</p>
           {!isLogin || loginInfo.userId === userInfo.userId?null:(<ReplyInput id={props[idName]} store={store} sender={userInfo} />)}
         </div>

         {
           replyList.length?(<ul className={cs.replyList}>
             {replyList.map( (item,i2) => {
               let { userInfo } = item
               return (
                <li key={i2} className={cs.comItemText}><span className={cs.replyName}>
                  <span className={cs.comItemName}>{userInfo.userName}</span> 回复 <span className={cs.comItemName}>{item.senderName}</span>：</span>{item.commentText}
                  {!isLogin || loginInfo.userId === userInfo.userId?null:(<SmallReply id={item[idName]} store={store} parentId={item.parentCommentId} sender={userInfo} index={i2}/>)}

                </li>
              )}
           )}
         </ul>):null
         }
      </div>
    </li>
)}

class SmallReply extends Component{
  render(){

      let {id,parentId,sender,index,store} = this.props

      let inputShow = store.activeCommentId === id?'show':'',btnHide = store.activeCommentId === id?'hide':''
      return (
        <div className={cs.smallReply} key={index}>
          <div className={cs.smallInputBox + ' '+inputShow}>
            <textarea className={cs.replyInput} placeholder={'回复 '+sender.userName} ref={'smallInput'+index} onInput={e => store.setText(e.target.value)}></textarea>
            <div className={cs.smallInputBtns}>
              <button onClick={() => store.setCommentId('')} className={cs.smallCancel}>取消</button>
              <button className={cs.commentBtn} onClick={() => store.setComment(this.refs['smallInput'+index],parentId)}>评论</button>
            </div>
          </div>
          <div className={cs.smallBtns +' ' + btnHide}>
            <button className={cs.replyLikeBtn} onClick={() => {store.setCommentId(id);store.setSender(sender)}}>回复</button>
            <button className={cs.replyLikeBtn}>
              <span className={cs.replyIcon}>
                <Icon type="like-o" className={cs.replyIconStyle}/>
                1
              </span>
            </button>
            <button className={cs.replyLikeBtn}>
              <span className={cs.replyIcon}>
                <Icon type="dislike-o" className={cs.replyIconStyle}/>
                2
              </span>
            </button>
          </div>
        </div>
    )
  }
}



@observer
class ReplyInput extends Component {
  render() {

    let {id,sender,store} = this.props

    let inputShow = store.activeCommentId === id?'show':'',btnHide = store.activeCommentId === id?'hide':''

    return (
      <div className={cs.replyInputBox}>
         <div className={cs.replyInputPanel + ' '+inputShow}>
           <textarea className={cs.replyInput} type='text' onInput={e => store.setText(e.target.value)} placeholder={'回复 '+sender.userName} ref='replyInput'></textarea>
           <div className={cs.inputBtns}>
             <button onClick={() => store.setCommentId('')}>取消</button>
             <button className={cs.commentBtn} onClick={() => store.setComment(this.refs.replyInput,id)}>评论</button>
           </div>
         </div>
         <div className={cs.replyRightBtns + ' '+btnHide}>
           <button className={cs.replyLikeBtn} onClick={() => {store.setCommentId(id);store.setSender(sender)}}>回复</button>
           <button className={cs.replyLikeBtn}>
             <span className={cs.replyIcon}>
               <Icon type="like-o" className={cs.replyIconStyle}/>
               1
             </span>
           </button>
           <button className={cs.replyLikeBtn}>
             <span className={cs.replyIcon}>
               <Icon type="dislike-o" className={cs.replyIconStyle}/>
               2
             </span>
           </button>
         </div>
      </div>


    )
  }
}

export default AllComments
