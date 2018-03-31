import React, {Component} from 'react';
// import { Row, Col } from 'antd';

import { observer } from 'mobx-react';
import { nearArticlesStore } from '../stores'
import cs from '../assets/css/nearArticle.css'
import { ModuleTitle,Loading } from '../components'
import { Link } from 'react-router-dom'

@observer
class NearArticles extends Component {
   componentDidMount(){
      nearArticlesStore.init()
   }

   render(){
     let {loading,isNull,isError} = nearArticlesStore

     return (
       <div className={cs.hotArticles}>
          <ModuleTitle title="近期文章" />

          <Loading loading={loading} isNull={isNull} isError={isError}>
            <ul className={cs.artList}>
              { nearArticlesStore.list.map( (item,i) => Item(item,i))}
            </ul>
          </Loading>


       </div>
     )
   }
}


const Item = (props,i) => (
  <li className={cs.artItem} key={i}>
    <div className={cs.itemRight}>
      <Link to={`/article/${props.articleId}`} className={cs.artName} title={props.articleTitle}>{props.articleTitle}</Link>
      <span className={cs.artHot}>{props.date}</span>
    </div>

  </li>
)



export default NearArticles
