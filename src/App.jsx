import React, {Component} from 'react';

import cs from './assets/css/base.css';
import {observer} from 'mobx-react'

import {Switch, Route, Redirect, withRouter} from 'react-router-dom'

import {
  Index,
  Article,
  Login,
  ErrorPage,
  Edit,
  MySetting,
  MessagePage,
  MessageBoard,
  Tag,
  About,
  Edit2
} from './pages'
import {commonStore} from './stores'

import {
  NavMenu,
  VideoPlayer,
  MusicPlayer,
  NearComments,
  HotArticles,
  Count,
  FooterBar,
  NearArticles
} from './components'
import {Row, Col, Modal,BackTop,Icon} from 'antd';
import {clss} from './utils';
@observer
class App extends Component {
  componentWillMount() {
    commonStore.userInfo
  }
  render() {
    return (<div className='wrapper'>

      <Switch>

        <Route exact path='/login' component={Login}/>
        <Route exact path='/error' component={ErrorPage}/>
        <Route exact path='/edit' component={Edit}/>
        <Route exact path='/edit2' component={Edit2}/>
        <Route path='/' component={Common}/>
      </Switch>
      <FooterBar/>

    </div>);
  }
}

@observer
class Common extends Component {

  handleOk() {}
  handleCancel() {
    commonStore.setLoginModal(false)
  }
  render() {
    let {isRegister} = commonStore,
      isShow = isRegister
        ? cs.mailShow
        : ''
    return (<div>
      <NavMenu {...this.props}></NavMenu>

      <div className={cs.contentWarp}>
        <div className={cs.startTopBg}></div>
        <div>
          <Row type='flex' justify='center' className={cs.contentWrap}>
            <Col xl={{
                span: 6
              }} lg={{
                span: 8
              }} md={{
                span: 8
              }} sm={{
                span: 23
              }} xs={{
                span: 23
              }} className={cs.startLeft}>
              <MusicPlayer/>
              <NearComments/>
              <HotArticles/>
              <NearArticles/>
              <Count/>
            </Col>
            <Col xl={{
                span: 10
              }} lg={{
                span: 12
              }} md={{
                span: 14
              }} sm={{
                span: 23
              }} xs={{
                span: 23
              }} className={cs.startRight}>
              <Switch>
                <Route exact path='/index' component={withRouter(Index)}></Route>

                <Redirect exact from='/' to='/index'></Redirect>
                <Route exact path='/article/:id' component={withRouter(Article)}></Route>
                <Route exact path='/tag' component={withRouter(Tag)}></Route>
                <Route exact path='/mySetting' component={MySetting}></Route>
                <Route exact path='/message' component={MessagePage}></Route>
                <Route exact path='/messageBoard' component={MessageBoard}></Route>
                <Route exact path='/about' component={About}></Route>

                <Redirect to='/error'/>
              </Switch>

            </Col>
          </Row>
        </div>
        <BackTop>
          <button className={cs.backupIcon} visibilityheight={200}>
            <Icon type="up" />
          </button>
        </BackTop>
        <Modal title={isRegister
            ? '注册'
            : "登录"} visible={commonStore.isLogingModal} onOk={this.handleOk} cancelText='取消' okText='插入' onCancel={this.handleCancel} footer={null} style={{
            top: 40
          }}>
          <div className={cs.loginModal}>
            <div className={cs.loginContent}>
              <div className={cs.inputItem}>
                <input type='text' placeholder={isRegister
                    ? '输入用户名'
                    : '用户名'} onInput={(e) => commonStore.setText('userName', e.target.value)}/>
              </div>

              <div className={cs.inputItem}>
                <input type='password' placeholder={isRegister
                    ? '输入6位以上，首字母密码，'
                    : '密码'} onInput={(e) => commonStore.setText('password', e.target.value)}/>
              </div>
              <div className={clss([cs.inputItem, cs.mailInput, isShow])}>
                <input type='text' placeholder='输入邮箱' onInput={(e) => commonStore.setText('email', e.target.value)}/>
              </div>
              <div className={cs.loginBtnBox}>
                <button onClick={(
                    ) => isRegister
                    ? commonStore.getRegister()
                    : commonStore.getLogin()}>{
                    isRegister
                      ? '注册'
                      : '登录'
                  }</button>
              </div>

              <div className={cs.otherLogin}>
                <button className={cs.otherBtn}>
                  <svg width="17" height="19" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg" className={cs.iconQq} aria-hidden="true">
                    <path d="M9.003 0c-2.265 0-6.29 1.364-6.29 7.325V8.52S.55 12.96.55 15.474c0 .665.17 1.025.28 1.025.115 0 .903-.485 1.75-2.073 0 0-.18 2.197 1.903 3.967 0 0-1.77.495-1.77 1.182 0 .686 4.078.43 6.29 0 2.24.425 6.287.687 6.287 0 0-.688-1.768-1.182-1.768-1.182 2.085-1.77 1.905-3.967 1.905-3.967.845 1.588 1.634 2.072 1.746 2.072.11 0 .283-.36.283-1.026 0-2.514-2.166-6.954-2.166-6.954V7.325C15.29 1.365 11.268 0 9.003 0z" fillRule="evenodd"></path>
                  </svg>
                </button>
              </div>
              <div className={cs.noAccount}>{
                  isRegister
                    ? '已有帐号'
                    : '还没帐号'
                }？<button className={cs.regBtn} onClick={() => commonStore.setRegister(!isRegister)}>{
                    isRegister
                      ? '登录'
                      : '注册'
                  }</button>
              </div>
            </div>
          </div>

        </Modal>
      </div>
    </div>)
  }
}

export default withRouter(App);
