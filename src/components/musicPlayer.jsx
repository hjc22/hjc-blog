import React, {Component} from 'react';
import { Menu, Dropdown, Icon } from 'antd';

import { observer } from 'mobx-react';
import { musicPlayerStore } from '../stores'
import cs from '../assets/css/musicPlayer.css'


@observer
class MusicPlayer extends Component {
   componentDidMount(){
    console.log('1111111',this.audio)
     this.audio.addEventListener('ended', this.songNext.bind(this), false);
     musicPlayerStore.setAudio(this.audio)
   }
   componentWillMount(){
     musicPlayerStore.getList()
   }
   componentWillUnmount(){
     let audio = this.audio

     audio.removeEventListener('ended', this.songNext.bind(this), false);

   }
   songNext(){
     musicPlayerStore.next(this.audio)
   }

   audio(){
     return this.audio
   }
   render(){
     let {name,album={},id,artists = []} = musicPlayerStore.activeSong
     let playBtn = musicPlayerStore.playStatus?'anticon-pause-circle':'anticon-play-circle',
         headPlay = musicPlayerStore.playStatus?'anticon-pause '+cs.headPause:'anticon-caret-right',
         // audio = this.audio,
         songAnim = musicPlayerStore.playStatus?'':cs.songPaused
     return (
       <div className={cs.musicPlayer}>
         <audio src={getUrl(id)} ref={(audio) => {this.audio=audio}}></audio>
         <div className={cs.head}> 
            <i className={cs.headBtn} onClick={() => musicPlayerStore.prev(this.audio)}><Icon type="fast-backward" /></i>
            <i className={cs.headPlayBtn} onClick={() => musicPlayerStore.play(this.audio)}><Icon type="caret-right" /></i>
            <i className={cs.headBtn} onClick={() => musicPlayerStore.next(this.audio)}><Icon type="fast-forward" /></i>
            <span className={cs.headName} title={name}>{name}</span>

           <div className={cs.headRight}>
             <span className={cs.voiceIcon} type={musicPlayerStore.muted?'2':'0'} onClick={() => musicPlayerStore.getMute(this.audio)}></span>
             <Dropdown overlay={ songList(this.audio) } placement="bottomRight" trigger={['click']}>
               <i className={cs.headList}><Icon type="unordered-list" /></i>
             </Dropdown>
           </div>
         </div>
         <div className={cs.imgBox} >
           <div className={cs.imgBg} style={getBg(album.picUrl + '?param=300y200')}></div>
             <img src={album.picUrl +'?param=100y100'} className={cs.songImg +' '+ cs.songPlay+' '+songAnim} alt='song-bg'/>
         </div>
         <div className={cs.footer}>
            <i className={'anticon '+playBtn +' ' +cs.playBtn} onClick={() => musicPlayerStore.play(this.audio)}><Icon type="play-circle" /></i>
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
    <Menu onClick={({ key }) => musicPlayerStore.pickSong(key)} className='musicMenus'>
        {musicPlayerStore.songs.map( (item,i) => (
          <Menu.Item key={i}>
            {item.name}
          </Menu.Item>
        ))}
    </Menu>
  )


export default MusicPlayer
