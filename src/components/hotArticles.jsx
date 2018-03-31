import React, {Component} from 'react';
// import { Row, Col } from 'antd';

import { observer } from 'mobx-react';
import { hotArticlesStore } from '../stores'
import cs from '../assets/css/hotArticles.css'
import { ModuleTitle,Loading } from '../components'
import { Link } from 'react-router-dom'


@observer
class HotArticles extends Component {
   componentDidMount(){
      hotArticlesStore.init()
   }

   render(){
     let {loading,isNull,isError} = hotArticlesStore
     return (
       <div className={cs.hotArticles}>
          <ModuleTitle title="热门文章" />

          <Loading loading={loading} isNull={isNull} isError={isError}>
            <ul className={cs.artList}>
              { hotArticlesStore.list.map( (item,i) => Item(item,i))}
            </ul>
          </Loading>
       </div>
     )
   }
}


const Item = (props,i) => (
  <li className={cs.artItem} key={i}>
    <span className={cs.itemIndex}>{i+1}</span>
    <div className={cs.itemRight}>
      <Link to={`/article/${props.articleId}`} className={cs.artName} title={props.articleTitle}>{props.articleTitle}</Link>
      <span className={cs.artHot}>{props.likeNum}</span>
    </div>

  </li>
)



export default HotArticles
