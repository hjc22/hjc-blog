import React, {Component} from 'react'
import Loadable from 'react-loadable'
import {Spin} from 'antd'
import cs from '../assets/css/loading.css'

// import Index from './start.jsx'
// import Order from './order.jsx'
// import Login from './login.jsx'
// // import Article from './article.jsx'
// import ErrorPage from './error.jsx'
// import Edit from './editArticle.jsx'
// // import MySetting from './mySetting'
// import MessagePage from './message'
// import MessageBoard from './messageBoard'
// import Tag from './tag'
// import About from './about'
// import Edit2 from './edit2'

const Index = asyncComponent(() => import('./start.jsx'))
const Article = asyncComponent(() => import('./article.jsx'))
const MySetting = asyncComponent(() => import('./mySetting.jsx'))
const Order = asyncComponent(() => import('./order.jsx'))
const Login = asyncComponent(() => import('./login.jsx'))
const ErrorPage = asyncComponent(() => import('./error.jsx'))
const Edit = asyncComponent(() => import('./editArticle.jsx'))
const MessagePage = asyncComponent(() => import('./message.jsx'))
const MessageBoard = asyncComponent(() => import('./messageBoard.jsx'))
const Tag = asyncComponent(() => import('./tag.jsx'))
const About = asyncComponent(() => import('./about.jsx'))
const Edit2 = asyncComponent(() => import('./edit2.jsx'))

export {
  Index,
  Order,
  Login,
  Article,
  ErrorPage,
  Edit,
  MySetting,
  MessagePage,
  MessageBoard,
  Tag,
  About,
  Edit2
}



function asyncComponent(importComponent) {
  return Loadable({
    loader: importComponent,
    loading:Loading,
  })
}

function Loading(isLoading) {

  return (
    <div className={cs.loading+' '+cs.loadingWhite}>
        <Spin className={cs.spinStyle}></Spin>
    </div>
  )
}