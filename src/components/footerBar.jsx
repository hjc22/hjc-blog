import React, {Component} from 'react';

import { observer } from 'mobx-react';
import { countStore } from '../stores'
import cs from '../assets/css/footerbar.css'
import { Icon } from 'antd'
import { runTime } from '../utils'

@observer
class FooterBar extends Component {
   componentDidMount(){

   }

   render(){
     return (
       <div className={cs.footerBar}>
          <p>博客已运行{runTime(countStore.list[1]?countStore.list[1].num:'--')}天</p>
          <p>托管于阿里云</p>
          <p>Made by lxf</p>
          <p><a href='https://github.com/lxiafei' target='_blank'><Icon type="github" className={cs.github}/></a></p>
       </div>
     )
   }
}





export default FooterBar
