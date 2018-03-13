import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import randomInt from '../utils/randomInt';


import 'font-awesome/css/font-awesome.css';
import './Player.styl';
class PlayerComponent extends React.Component {
  switchMode (mode) {
    switch(mode){
      case 0: return 'rotate-left';
      case 1: return 'random';
      case 2: return 'history';
      default: return '';
    }
  }
  changeProgress=(e)=>{
    const progressBar = this.refs.progressBar;
    const progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    this.props.changeProgress(e, progress);
  }
  changeVolume=(e)=>{
    const soundsBar = this.refs.soundsBar;
    const sounds = (e.clientX - soundsBar.getBoundingClientRect().left) / soundsBar.clientWidth;
    this.props.changeVolume(e, sounds);
  }
  prevMusic=(e)=>{
    switch(this.props.mode){
      case 0: this.props.prevMusic();break;
      case 1: this.props.toRandom(e, this.props.total);break;
      case 2: this.props.replay();break;
    }
  }
  nextMusic=(e)=>{
    switch(this.props.mode){
      case 0: this.props.nextMusic();break;
      case 1: this.props.toRandom(e, this.props.total);break;
      case 2: this.props.replay();break;
    }
  }
  render(){
    const currentMusic = this.props.musicdata[this.props.currentMusic];
    return (
      <div className='player-component'>
        <Link to='/list' className='tomylist'>查看我的音乐列表 &gt;</Link>
        <div className='Player'>
        <h3 className='musicTitle'>{currentMusic.title} - {currentMusic.artist}</h3>
        <img src={currentMusic.imgurl} className={`musicImg ${this.props.isPlaying?'musicPlaying':''}`}></img>
        <div className='setting'>
          <div className='modelctrl'>
            <FontAwesome name={`${this.switchMode(this.props.mode)}`} className='model' onClick={this.props.switchMode}/>
          </div>
          <div className='volctrl'>
            <FontAwesome name='volume-up'/><span ref='soundsBar' className='sound' onClick={this.changeVolume}><span style={{width:this.props.volume * 100 + '%'}}></span></span>
          </div>
        </div>
        <div className='timectrl'><span className='time'>-{this.props.timeSurplus}</span></div>
        <div className='progress' ref='progressBar' onClick={this.changeProgress}><div style={{width:this.props.progress * 100 + '%'}}></div></div>
        <div className='controller'>
          <FontAwesome name='step-backward' onClick={this.prevMusic} />
          <FontAwesome name={this.props.isPlaying?'pause':'play'}  onClick={this.props.triggeMusic} size='2x' className='play'/>
          <FontAwesome name='step-forward' onClick={this.nextMusic} />
        </div>
        </div>
      </div>
  );
}
};
function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    triggeMusic: (e) => {
      return dispatch({type:'MUSIC_TRIGGLE'});
    },
    nextMusic: (e) => {
      return dispatch({type:'MUSIC_NEXT'});
    },
    prevMusic: (e) => {
      return dispatch({type:'MUSIC_PREV'});
    },
    switchMode: (e) => {
      return dispatch({type:'SWITCH_MODE'});
    },
    changeProgress: (e, progress) => {
      return dispatch({type:'PROGRESS_TO',payload:{progress}});
    },
    changeVolume: (e, volume) => {
      return dispatch({type:'VOLUME_TO',payload:{volume: volume}});
    },
    toRandom: (e, total) => {
      return dispatch({type:'MUSIC_TO',payload:{musicId: randomInt(total)}})
    },
    replay: (e) => {
      return dispatch({type:'PROGRESS_TO',payload:{progress: 0}});
    }
  }
}

const Player = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerComponent)
export default Player;
