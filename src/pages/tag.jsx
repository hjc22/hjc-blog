import React, {Component} from 'react';
import cs from '../assets/css/tags.css'
import { tagStore,commonStore } from '../stores'
import { observer } from 'mobx-react';
import { Link,withRouter } from 'react-router-dom'
import { dateFilter,likeNumFilter,toTop } from '../utils'
import { Icon } from 'antd'
import queryString from 'query-string'
import { ArticleList } from '../components'

@observer
class Tag extends Component {
  componentWillMount(){
    tagStore.init()

  }
  componentDidMount(){


     let query = queryString.parse(this.props.location.search)

     console.log(query)

     tagStore.selectTag(query.tagId || 1)

  }
  getChange(id){

    const {history,match,location} = this.props




    console.log(this.props)

    let query = queryString.parse(this.props.location.search)

    query.p = 1
    query.tagId = id

    let qs = '?'+queryString.stringify(query)

    toTop()


    setTimeout(()=>{

      this.props.history.push(match.path+qs)
    },0)

  }
  render() {

    return (
      <div>
        <div className={cs.tagList}>
          <h4 className={cs.msgTitle}>标签分类</h4>
          <ul className={cs.tagNames}>
            {tagStore.tags.map( (v,i) => (
              <li key={i} className={cs.tagItem+(v.tagId == tagStore.tagId?' ' + cs.active:'')} onClick={() => this.getChange(v.tagId)}>
                 {v.name}
              </li>
            ))}
          </ul>

        </div>
        <ArticleList history={this.props.history} match={this.props.match} location={this.props.location} tagId={tagStore.tagId}/>
      </div>

    )
  }
}


export default Tag
