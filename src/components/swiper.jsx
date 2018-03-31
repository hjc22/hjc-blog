import React, {Component} from 'react';
import { Carousel } from 'antd'
import { observer } from 'mobx-react';
import { swiperStore } from '../stores'
import cs from '../assets/css/swiper.css'

@observer
class Swiper extends Component {
   componentDidMount(){

   }

   next(){
     this.refs.swiper.next()
   }
   prev(){
     this.refs.swiper.prev()
   }

   render(){
     return (
       <div className={cs.swiperWrap}>

         <Carousel afterChange={onChange} ref='swiper' autoplay>
           { swiperStore.list.map(Item)}
         </Carousel>
         <button className={cs.prevBtn} onClick={() => this.prev()}><i className='anticon anticon-left' ></i></button>
         <button className={cs.nextBtn} onClick={() => this.next()}><i className='anticon anticon-right'></i></button>
       </div>
     )
   }
}

const Item = (item,i) => (
  <div className={cs.swiperItem} key={i} title={item.title}>
    <img src={item.imgUrl} alt='swiper-img' className={cs.imgItem}/>
  </div>
)
function onChange(a, b, c) {
  // console.log(a, b, c);
}


export default Swiper
