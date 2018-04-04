import React, {Component} from 'react';
// import { Row, Col } from 'antd';

import { observer } from 'mobx-react';
import { countStore } from '../stores'
import cs from '../assets/css/count.css'
import { ModuleTitle,Loading } from '../components'
import { runTime } from '../utils'
@observer
class Count extends Component {
   componentDidMount(){
      countStore.init()
   }

   render(){
     let {loading,isNull,isError} = countStore

     return (
       <div className={cs.count}>
          <ModuleTitle title="统计" />

          <Loading loading={loading} isNull={isNull} isError={isError}>
            <ul className={cs.countList}>
               {countStore.list.map( (item,i) => Item(item,i))}
            </ul>
          </Loading>
       </div>
     )
   }
}


const Item = (props,i) => (
  <li className={cs.countItem} key={i}>
    <span>{props.type}</span>
    <span>{props.type=='运行时间'?runTime(props.num):String(props.num)}{props.unit}</span>
  </li>
)



export default Count
