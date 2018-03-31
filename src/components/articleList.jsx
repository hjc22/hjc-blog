import React, {Component} from 'react';
import { Pagination } from 'antd';

import { observer } from 'mobx-react';
import queryString from 'query-string'
import { dateFilter,toTop } from '../utils'
import { articleListStore } from '../stores'
import { Link,withRouter } from 'react-router-dom'
import cs from '../assets/css/articleList.css'
import { Loading } from '../components'


@observer
class ArticleList extends Component {

   componentWillMount(){

     let {location,tagId} = this.props
     let query = queryString.parse(location.search)
     articleListStore.getPageList(parseInt(query.p || 1),query.tagId || 1)


   }
   getChange(p){

     const {history,match,location} = this.props

     let query = queryString.parse(this.props.location.search)

     query.p = p

     let qs = '?'+queryString.stringify(query)
     // articleListStore.getPageList(p)

     toTop()


     setTimeout(()=>{

       this.props.history.push(match.path+qs)
     },0)

   }
   render(){
     let {loading,isNull,isError} = articleListStore

     return (
       <div className={cs.articlesWrap}>


           <ul className={cs.articleList}>
             { articleListStore.list.map( Item ) }
           </ul>
         <div className={cs.pagination}>
           <Pagination current={articleListStore.nowPage} pageSize={10} total={articleListStore.totalPage} onChange={(p) => this.getChange(p)}/>
         </div>

       </div>
     )
   }
}


const Item  = ( props,i ) => {
  const [month,day] = dateFilter(props.date)
  return (
    <li key={i} className={cs.articleItem}>
      <div className={cs.monthTitle}><span className={cs.monthText}>{month}</span><span className={cs.dayText}>{day}月</span></div>
      <h2 className={cs.itemTitle}>{props.articleTitle}</h2>
      <div className={cs.itemHead}>
         <span className={cs.itemDate}>发表于 {props.date}</span><span className={cs.itemCircle}></span>
         <span className={cs.itemTag}>标签<span className={cs.itemTagName}>{props.tag}</span></span><span className={cs.itemCircle}></span>
         <span className={cs.readNum}>阅读次数 {props.seeNum}</span><span className={cs.itemCircle}></span>
         <span className={cs.autor}>{props.autor}提供</span>
      </div>
      { props.titleImg?<img src={props.titleImg} className={cs.itemImg} alt='article-img'/>:''}
      <p className={cs.itemText}>{props.articleText}</p>
      <div className={cs.seeBtnBox}>
        <button className={cs.itemMore}><Link to={`/article/${props.articleId}`}>阅读全文</Link></button>
      </div>

    </li>
  )
}





export default ArticleList
