import React, {Component} from 'react';
import { Row, Col, Popover,Icon } from 'antd';

import { observer } from 'mobx-react';
import { navMenuStore,commonStore } from '../stores'
import styles from '../assets/css/navMenu.css'
import { Link,NavLink,withRouter } from 'react-router-dom'

const LoginPanel = () => (
  <ul className={styles.userSelects}>
    <li className={styles.selectItem}><Link to='/message'>通知</Link></li>
    <li className={styles.selectItem}><Link to='/mySetting'>设置</Link></li>
    <li className={styles.selectItem} onClick={() => commonStore.logout()}>退出</li>
  </ul>
)


@observer
class NavMenu extends Component {
   render(){
     const { history } = this.props

     let val = navMenuStore.status?'anticon-close':'anticon-search',mMenuStyle =  navMenuStore.mMenuStatus?styles.mobileDropMenuOpen:styles.mobileDropMenuClose,
     { userInfo,isLogin } = commonStore,userImg = userInfo.userImg?userInfo.userImg:'https://static.hdslb.com/images/akari.jpg'





     return (
       <div>
         <Row type="flex" justify="center" align='middle' className={styles.navWrap}>
           <Col lg={{ span: 2 }} md={{span:3}} xs={{span:11}} className={styles.logo}>HJC博客</Col>
           <Col lg={{ span: 14 }} md={{span:19}} xs={{span:11}} className={styles.navRight} >
              <ul className={styles.navList}>
                { navMenuStore.menus.map( item => navItem(item)) }
              </ul>
              <i className={'anticon '+val+' '+styles.searchBtn} onClick={ () => navMenuStore.open()}></i>
              <span className={styles.regLoginbtn} >
                {
                  isLogin?(<span className={styles.userInfo}>
                    <Popover placement="bottomRight" title={userInfo.userName} content={LoginPanel()} trigger="hover">
                       <img className={styles.userImg} src={userImg} alt='userImg'/>
                    </Popover></span>

                  ):(<span onClick = {() => commonStore.setLoginModal()}>注册/登录</span>)
                }
              </span>


           </Col>
           <SearchBar status={navMenuStore.status}/>
           <div className={styles.mobileMenu}>
             <i className={'anticon anticon-bars '+styles.mobileBtn} onClick={() => navMenuStore.mobileOpen()}></i>
           </div>

         </Row>
         <div className={styles.mobileDropMenu +' '+ mMenuStyle} >
            <Icon type="close" className={styles.mbClose} onClick={ () => navMenuStore.mobileOpen()}/>
            <div className={styles.mbHead}>
              {isLogin?(
                <span className={styles.mbUserInfo}>
                  <img className={styles.mbUserImg} src={userImg} alt='userImg'/>
                  <span className={styles.mbName}>{userInfo.userName}</span>
                </span>
            ):(<button className={styles.mbLoginBtn} onClick={() => commonStore.setLoginModal()}>注册/登录</button>)}
            </div>
            <ul className={styles.mobileList}>
              { navMenuStore.menus.map( item => mbNavItem(item,history)) }

            </ul>
            { isLogin?(
              <ul className={styles.loginNav}>
                { navMenuStore.myMenu.map( item => mbNavItem(item,history)) }
              </ul>
            ):null}

         </div>
       </div>

     )
   }
}


const navItem  = ( props ) => (
  <li key={props.name} className={styles.navItem}>
    <NavLink to={props.path} className={styles.navLink} activeClassName={styles.active}>{props.name}</NavLink>
  </li>
)

const mbNavItem  = ( props,history ) => (
  <li key={props.name} className={styles.mbNavItem} onClick={() => navMenuStore.getPage(props,history,commonStore)}>
    {props.name}
  </li>
)

const SearchBar = props => {
  let val = props.status?styles.searchOpen:styles.searchClose

  return (
    // <div className={styles.searchBar + ' ' +val}>
      <Row type="flex" justify="center" align='middle' className={styles.searchBar + ' ' +val}>
         <Col xs={{ span: 10 }}>
            <div className={styles.searchBox} >
              <input placeholder='请输入搜索关键字' className={styles.searchInput}/>
              <button className={styles.searchOkBtn}>
                 <i className='anticon anticon-search'></i>
              </button>
            </div>
         </Col>
      </Row>
    // </div>
  )
}



export default withRouter(NavMenu)
