import React, {Component} from 'react';
import { Menu, Dropdown } from 'antd';

import { observer } from 'mobx-react';
import { musicPlayerStore } from '../stores'
import cs from '../assets/css/musicPlayer.css'


@observer
class MusicPlayer extends Component {
   componentDidMount(){
     let audio = this.refs.audio

     audio.addEventListener('ended', this.songNext.bind(this), false);
     musicPlayerStore.setAudio(this.refs.audio)


   }
   componentWillMount(){
     musicPlayerStore.getList()

   }
   componentWillUnmount(){
     let audio = this.refs.audio



     audio.removeEventListener('ended', this.songNext.bind(this), false);

   }
   songNext(){
     musicPlayerStore.next(this.refs.audio)
   }

   audio(){
     return this.refs.audio
   }
   render(){
     let {name,album={},id,artists = []} = musicPlayerStore.activeSong
     let playBtn = musicPlayerStore.playStatus?'anticon-pause-circle':'anticon-play-circle',
         headPlay = musicPlayerStore.playStatus?'anticon-pause '+cs.headPause:'anticon-caret-right',
         // audio = this.refs.audio,
         songAnim = musicPlayerStore.playStatus?'':cs.songPaused
     return (
       <div className={cs.musicPlayer}>
         <audio src={getUrl(id)} ref='audio'></audio>
         <div className={cs.head}>
           <i className={'anticon anticon-fast-backward '+cs.headBtn} onClick={() => musicPlayerStore.prev(this.refs.audio)}></i>
           <i className={'anticon '+headPlay +' ' +cs.headPlayBtn} onClick={() => musicPlayerStore.play(this.refs.audio)}></i>
           <i className={'anticon anticon-fast-forward '+cs.headBtn} onClick={() => musicPlayerStore.next(this.refs.audio)}></i>
           <span className={cs.headName} title={name}>{name}</span>

           <div className={cs.headRight}>
             <span className={cs.voiceIcon} type={musicPlayerStore.muted?'2':'0'} onClick={() => musicPlayerStore.getMute(this.refs.audio)}></span>
             <Dropdown overlay={ songList(this.refs) } placement="bottomRight" trigger={['click']}>
               <i className={'anticon anticon-bars '+cs.headList}></i>
             </Dropdown>
           </div>
         </div>
         <div className={cs.imgBox} >
           <div className={cs.imgBg} style={getBg(album.picUrl + '?param=300y200')}></div>
             <img src={album.picUrl +'?param=100y100'} className={cs.songImg +' '+ cs.songPlay+' '+songAnim} alt='song-bg'/>

         </div>
         <div className={cs.footer}>
            <i className={'anticon '+playBtn +' ' +cs.playBtn} onClick={() => musicPlayerStore.play(this.refs.audio)}></i>
            <div className={cs.footerInfo}>
               <p className={cs.footerSonger}>{artists.map(v => v.name).join('/')}</p>
               <p className={cs.footerSongName}>{name}</p>
            </div>
         </div>
       </div>
     )
   }
}

const getBg = url => (
  {
    background:`url(${url}) 50% 50% / cover no-repeat`
  }
)

const getUrl = id => `http://music.163.com/song/media/outer/url?id=${id}.mp3`


const songList = audio => (
    <Menu onClick={({ key }) => musicPlayerStore.pickSong(key)}>

      {musicPlayerStore.songs.map( (item,i) => (
        <Menu.Item key={i}>
          {item.name}
        </Menu.Item>
      ))}
    </Menu>
  )


export default MusicPlayer
