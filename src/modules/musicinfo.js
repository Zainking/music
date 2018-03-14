import musicData from '../assets/musicdata.json';
import { createStore } from 'redux';
import $ from 'jquery';
import 'jplayer';
import timeTrans from '../utils/timeTrans'

function musicinfo(state = {
  musicdata: musicData,
  currentMusic: 0,
  isPlaying: false,
  volume: 0.5,
  progress: 0,
  mode: 0, //0:顺序循环，1：随机循环，2：单曲循环
  total: musicData.length,
  timeSurplus: "0:00",
  duration: 0
}, action) {

  const musicdata = state.musicdata;
  const currentMusic = state.currentMusic;
  const isPlaying = state.isPlaying;
  const total = state.total;
  const mode = state.mode;
  const duration = state.duration;

  switch (action.type) {
    case 'MUSIC_NEXT':
      $('#player').jPlayer('stop');
      $('#player').jPlayer('setMedia',{mp3:musicdata[(currentMusic + 1) % total].url});
      if(isPlaying){
        $('#player').jPlayer('play');
      } else {
        $('#player').jPlayer('pause');
      }
      return {...state, currentMusic: (currentMusic + 1) % total }
    case 'MUSIC_PREV':
      $('#player').jPlayer('stop');
      $('#player').jPlayer('setMedia',{mp3:musicdata[(currentMusic - 1 + total) % total].url});
      if(isPlaying){
        $('#player').jPlayer('play');
      } else {
        $('#player').jPlayer('pause');
      }
      return {...state, currentMusic: (currentMusic - 1 + total) % total }
    case 'MUSIC_TO':
      $('#player').jPlayer('stop');
      $('#player').jPlayer('setMedia',{mp3:musicdata[action.payload.musicId].url});
      if(isPlaying){
        $('#player').jPlayer('play');
      } else {
        $('#player').jPlayer('pause');
      }
      return {...state, currentMusic: action.payload.musicId}
    case 'MUSIC_TRIGGLE':
      if(isPlaying){
        $('#player').jPlayer('pause');
      } else {
        $('#player').jPlayer('play');
      }
      return {...state, isPlaying: !isPlaying }
    case 'SWITCH_MODE':
      return {...state, mode: (mode + 1) % 3 }
    case 'VOLUME_TO':
      $('#player').jPlayer('volume', action.payload.volume);
      return {...state, volume: action.payload.volume > 1?1:action.payload.volume }
    case 'PROGRESS_TO':
      $('#player').jPlayer('play', action.payload.progress * duration);
      if(!isPlaying){
        $('#player').jPlayer('pause');
      }
      return {...state, progress: action.payload.progress>1?1:action.payload.progress }
    case 'UPDATE_TO':
      const progress = action.payload.progress;
      const timeSurplus = timeTrans(action.payload.timeSurplus);
      return {...state, progress, timeSurplus }
    case 'UPDATE_MUSIC':
      return {...state, duration:action.payload.duration}
    default:
      return state
  }
}

const store = createStore(musicinfo);
export default store;
