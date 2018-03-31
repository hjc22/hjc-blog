import React, {Component} from 'react';

import {observer} from 'mobx-react';
import {Link} from 'react-router-dom'

import cs from '../assets/css/pageNav.css'

@observer
class PageNav extends Component {

  render() {
    const {paths} = this.props
    return (<div className={cs.pageNav}>
      {
        paths
          ? paths.map((item, i) => {
            return i === paths.length - 1
              ? (<span key={i} className={cs.itemNav}>{item}</span>)
              : (<Link key={i} to='/' className={cs.itemNav}>{item}<span className={cs.arrowRight}>></span>
              </Link>)
          })
          : ''
      }
    </div>)
  }
}

export default PageNav
