import React, {Component} from 'react';
import cs from '../assets/css/article.css'
import { PageNav,Comments,Loading } from '../components'
import { articleStore,commonStore } from '../stores'
import { observer } from 'mobx-react';
import { Link,withRouter } from 'react-router-dom'
import { dateFilter,likeNumFilter } from '../utils'
import { Icon } from 'antd'


@observer
class Article extends Component {
  componentDidMount(){
    document.body.scrollTop = document.documentElement.scrollTop = 0
    articleStore.init(this.props.match.params.id)
  }
  setLike(params){
     const {articleId,isLike} = articleStore.infos
     commonStore.setLike({articleId},isLike).then(() => articleStore.setLikeNum(1))
  }
  render() {
    const { infos,activeCommentId,loading,isNull,isError,commentData } = articleStore
    let { isLogin } = commonStore


    let { payQrs={},likeNum,prevArticle = {},nextArticle = {},payStatus,articleId,isLike } = infos,
        {jobPersons,commentNum,commentsList = []} = commentData

    return (
      <div className={cs.article}>
        <PageNav paths={['首页']}/>
          <div className={cs.articleItem}>

            <Loading loading={loading} isNull={isNull} isError={isError}>
                <TextShow {...infos}/>
                <Award likeNum={likeNum} qrUrls={payQrs} payStatus={articleStore.payStatus} articleId={articleId} isLike={isLike} setLike={this.setLike}/>
                <PrevNextArticle prev={prevArticle} next={nextArticle}/>
                <Comments store={articleStore} jobPersons={jobPersons} commentNum={commentNum} commentsList={commentsList} activeCommentId={activeCommentId} isLogin={isLogin}/>
            </Loading>
          </div>


      </div>


    )
  }
}

//
//


const TextShow  = (props) => {
  const [month,day] = dateFilter(props.date)
  return (
    <div>

      <h2 className={cs.itemTitle}>{props.articleTitle}</h2>
      <div className={cs.itemHead}>
         <span className={cs.itemDate}>发表于{props.date}</span><span className={cs.itemCircle}></span>
         <span className={cs.autor}>作者：{props.autor}<span className={cs.itemCircle}></span></span>
         <span className={cs.readNum}>{props.seeNum}次浏览</span><span className={cs.itemCircle}></span>
         <span className={cs.readNum}>{props.commentNum}条评论</span>

      </div>
      <div className={cs.itemText} dangerouslySetInnerHTML={{__html: props.articleText}} />



    </div>
  )
}
// <div className={cs.monthTitle}><span className={cs.monthText}>{month}</span><span className={cs.dayText}>{day}月</span></div>

const Award = ({likeNum,qrUrls,payStatus,articleId,setLike}) => {
  let payOpen = () => {

  }
  return (
    <div className={cs.awardBox}>
      <button className={cs.awardBtn}>赏
        <div className={cs.qrPayPanel}>
          <div className={cs.qrPayImgs}>
            <div className={cs.qrImgBox}>
              <img className={cs.qrImg} alt='payImg' src={qrUrls.wxQrUrl}/>
              微信支付
            </div>
            <div className={cs.qrImgBox}>
              <img className={cs.qrImg} alt='payImg' src={qrUrls.zfbQrUrl}/>
              支付宝支付
            </div>
          </div>
          <span className={cs.menuArrow}></span>
        </div>
      </button>
      <button className={cs.likeBtn} onClick={() => setLike()}><Icon type="like" className={cs.likeIcon}/><span className={cs.likeNum}>{likeNumFilter(likeNum)}</span></button>
    </div>

)}


const PrevNextArticle  = ({prev,next}) => {
  return (
    <div className={cs.nearArticle}>
      <div className={cs.showItem}>上一篇：{prev.articleId?(<Link to={'/article/'+prev.articleId}>{prev.title}</Link>):'没有了，已经是最后一篇了'}</div>
      <div className={cs.showItem}>下一篇：{next.articleId?(<Link to={'/article/'+next.articleId}>{next.title}</Link>):'没有了，已经是最新文章了'}</div>
    </div>
  )
}

@observer
class AllComments extends Component{
  render(){

    let {commentNum,jobPersons,commentsList,activeCommentId,isLogin} = this.props
    let inputShow = activeCommentId !== ''?'hide':''

    return (
        <div className={cs.allComment}>
          <div className={cs.commentHead}>
            <h4 className={cs.headTit}>全部评论</h4>
            <div className={cs.headRight}>
              <span><span className={cs.commentNum}>{jobPersons}</span>人参与</span>，<span><span className={cs.commentNum}>{commentNum}</span>条评论</span>
            </div>

          </div>
          {isLogin?null:(<h5 className={cs.loginAlert}>要发表评论，您必须<span className={cs.loginBtn}>登录</span></h5>)}


          <ul className={cs.commentList}>
            {commentsList.map( (item,i) => commentItem(item,i))}
          </ul>

          <div className={cs.commentSubmitBox+' '+inputShow}>
            <textarea className={cs.replyInput} onInput={e => articleStore.setText(e.target.value)} type='text' placeholder='写下你的评论...' onClick={() => articleStore.setCommentId('')} ref='commentInput'></textarea>
            <button  className={cs.commentBtn} onClick={() => articleStore.setComment(this.refs.commentInput)}>评论</button>
          </div>



        </div>
      )
  }
}


const commentItem = (props,i) => {
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
           {loginInfo.userId === userInfo.userId?null:(<ReplyInput id={props.commentId} sender={userInfo} />)}
         </div>

         {
           replyList.length?(<ul className={cs.replyList}>
             {replyList.map( (item,i2) => {
               let { userInfo } = item
               return (
                <li key={i2} className={cs.comItemText}><span className={cs.replyName}>
                  <span className={cs.comItemName}>{userInfo.userName}</span> 回复 <span className={cs.comItemName}>{item.senderName}</span>：</span>{item.commentText}
                  {loginInfo.userId === userInfo.userId?null:(<SmallReply id={item.commentId} parentId={item.parentCommentId} sender={userInfo} index={i2}/>)}

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

      let {id,parentId,sender,index} = this.props

      let inputShow = articleStore.activeCommentId === id?'show':'',btnHide = articleStore.activeCommentId === id?'hide':''
      return (
        <div className={cs.smallReply} key={index}>
          <div className={cs.smallInputBox + ' '+inputShow}>
            <textarea className={cs.replyInput} placeholder={'回复 '+sender.userName} ref={'smallInput'+index} onInput={e => articleStore.setText(e.target.value)}></textarea>
            <div className={cs.smallInputBtns}>
              <button onClick={() => articleStore.setCommentId('')} className={cs.smallCancel}>取消</button>
              <button className={cs.commentBtn} onClick={() => articleStore.setComment(this.refs['smallInput'+index],parentId)}>评论</button>
            </div>
          </div>
          <div className={cs.smallBtns +' ' + btnHide}>
            <button className={cs.replyLikeBtn} onClick={() => {articleStore.setCommentId(id);articleStore.setSender(sender)}}>回复</button>
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

    let {id,sender} = this.props

    let inputShow = articleStore.activeCommentId === id?'show':'',btnHide = articleStore.activeCommentId === id?'hide':''

    return (
      <div className={cs.replyInputBox}>
         <div className={cs.replyInputPanel + ' '+inputShow}>
           <textarea className={cs.replyInput} type='text' onInput={e => articleStore.setText(e.target.value)} placeholder={'回复 '+sender.userName} ref='replyInput'></textarea>
           <div className={cs.inputBtns}>
             <button onClick={() => articleStore.setCommentId('')}>取消</button>
             <button className={cs.commentBtn} onClick={() => articleStore.setComment(this.refs.replyInput,id)}>评论</button>
           </div>
         </div>
         <div className={cs.replyRightBtns + ' '+btnHide}>
           <button className={cs.replyLikeBtn} onClick={() => {articleStore.setCommentId(id);articleStore.setSender(sender)}}>回复</button>
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


export default Article
