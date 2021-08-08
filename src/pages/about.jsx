import React, {Component} from 'react';
import cs from '../assets/css/about.css'
import { myMessageStore,commonStore } from '../stores'

import { dateFilter,likeNumFilter } from '../utils'
import { Timeline } from 'antd'

class About extends Component {
  componentDidMount(){
     // myMessageStore.init()
  }
  render() {

    return (
      <div className={cs.about}>
         <h4 className={cs.msgTitle}>关于</h4>
         <div className={cs.aboutSlugn}>
           <img src='http://p0.meituan.net/scarlett/bd0d816c585ff5fb652b1217588c54a762008.jpg' alt='bg'></img>
           <div className={cs.slugnText}>
             <p>Difficult roads almost always lead to beautiful destinations.</p>
             <p>艰难的道路几乎总是通向美丽的目的地。</p>
           </div>
         </div>
         <div className={cs.timeline}>
           <h4 className={cs.contentTit}>时间线</h4>
           <Timeline className={cs.timelineBox}>
              <Timeline.Item color='#0cc0fb'>上线时间 2019-07-16 历时3个月</Timeline.Item>
              <Timeline.Item color='#0cc0fb'>开发于 2019-04-16</Timeline.Item>
            </Timeline>
         </div>
         <div className={cs.aboutShow}>
           <h4 className={cs.contentTit}>介绍</h4>
           <p className={cs.aboutText}>LXF博客，是一个完全原创的博客性质的网站，前端使用了react+react-router+mobx+antd等技术栈，后端技术使用了nodejs+koa2+mongodb。同时支持响应式，优化对移动端访问。对外提供注册登录功能，仅限于评论留言。</p>

         </div>

      </div>


    )
  }
}


export default About
