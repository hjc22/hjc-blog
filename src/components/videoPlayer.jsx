import React, {Component} from 'react';
// import { Row, Col } from 'antd';
import styles from '../assets/css/videoPlayer.css'


class VideoPlayer extends Component {
   render(){
     return (
       <div className={styles.videoWrap}>
         <img src={'http://p1.music.126.net/SWDOrvO3f6L8Q1xGPTbb6w==/109951163102543599.jpg?param=1000y500'} alt='bg' className={styles.videoBg}/>
       </div>
     )
   }
}



export default VideoPlayer
