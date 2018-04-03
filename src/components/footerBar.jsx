import React, {Component} from 'react';

import { observer } from 'mobx-react';
import { countStore } from '../stores'
import cs from '../assets/css/footerbar.css'
import { Icon } from 'antd'

@observer
class FooterBar extends Component {
   componentDidMount(){

   }

   render(){
     return (
       <div className={cs.footerBar}>
          <p>博客已运行1000天</p>
          <p>托管于阿里云</p>
          <p>Made with by hjc</p>
          <p><a href='https://github.com/hjc22' target='_blank'><Icon type="github" className={cs.github}/></a></p>
       </div>
     )
   }
}





export default FooterBar
