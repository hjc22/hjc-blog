import React, {Component} from 'react';
import cs from '../assets/css/messageBoard.css'
import { messageBoardStore,commonStore } from '../stores'
import { Comments } from '../components'
import { observer } from 'mobx-react'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import { dateFilter,likeNumFilter,toTop } from '../utils'
import { Icon,Pagination } from 'antd'



@observer
class MessageBoard extends Component {
  componentWillMount(){

    let p = parseInt(queryString.parse(this.props.location.search).p || 1)


    messageBoardStore.getPageList(p)


  }
  getChange(p){

    const {history,match} = this.props


    messageBoardStore.getPageList(p)

    toTop()


    setTimeout(()=>{

      this.props.history.push(match.path+'?p='+p)
    },0)

  }
  render() {
    const { userInfo = {},isLogin } = commonStore,{ list,activeCommentId } = messageBoardStore

    let userImg = userInfo.userImg?userInfo.userImg:'https://static.hdslb.com/images/akari.jpg'
    return (
      <div className={cs.messageBoard}>
         <h4 className={cs.msgTitle}>留言板</h4>

         <Comments store={messageBoardStore} type={1} commentsList={list} activeCommentId={activeCommentId} isLogin={isLogin}/>

         <div className={cs.pagination}>
           <Pagination current={messageBoardStore.nowPage} pageSize={20} total={messageBoardStore.totalPage} onChange={(p) => this.getChange(p)}/>
         </div>

      </div>


    )
  }
}


export default MessageBoard
