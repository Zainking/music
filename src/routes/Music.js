import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import 'jplayer';
import randomInt from '../utils/randomInt';

class MusicComponent extends React.Component{
  componentDidMount () {
    const currentMusic = this.props.musicdata[this.props.currentMusic];
    $('#player').jPlayer({
      ready: function(){
        $(this).jPlayer('setMedia',{mp3:currentMusic.url});
      },
      supplied: 'mp3',
      wmode: 'window'
    }).jPlayer('volume', 0.5);
    $('#player').on($.jPlayer.event.loadeddata, (e) => {
      const duration = e.jPlayer.status.duration;
      this.props.newduration(e, duration);
    });
    $('#player').on($.jPlayer.event.ended, (e)=>{
      switch(this.props.mode){
        case 0: this.props.nextMusic();break;
        case 1: this.props.toRandom(e, this.props.total);break;
        case 2: this.props.replay();break;
        default: return;
      }
    })
    $('#player').on($.jPlayer.event.timeupdate, (e) => {
      const duration = e.jPlayer.status.duration;
      const currentTime = e.jPlayer.status.currentTime;
      const progress = currentTime / duration;
      if(progress){
        this.props.update(e, progress, parseInt(duration - currentTime, 10));
      }
    });
  }
  render(){
    return (<div id='player'></div>)
  }
}
function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    update: (e, progress, timeSurplus) => {
      return dispatch({type:'UPDATE_TO', payload:{progress, timeSurplus}});
    },
    newduration:(e, duration) => {
      return dispatch({type:'UPDATE_MUSIC', payload:{duration}});
    },
    replay: (e) => {
      return dispatch({type:'PROGRESS_TO',payload:{progress: 0}});
    },
    nextMusic: (e) => {
      return dispatch({type:'MUSIC_NEXT'});
    },
    toRandom: (e, total) => {
      return dispatch({type:'MUSIC_TO',payload:{musicId: randomInt(total)}})
    }
  }
}

const Music = connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicComponent)

export default Music;
