
import React, {Component} from 'react';
import { Swiper,ArticleList } from '../components'
// import cs from '../assets/css/start.css'

export default class Start extends Component {
  render() {

    console.log(this.props)


    return (
      <div>
        <Swiper />
        <ArticleList history={this.props.history} match={this.props.match} location={this.props.location}/>
      </div>
    )
  }
}
