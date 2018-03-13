import React from 'react';
import { connect } from 'react-redux';
import './List.styl';
import { Link } from 'react-router-dom';

import ListItemComponent from '../components/ListComponent/ListItemComponent'

class ListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.musicdata = this.props.musicdata;
  }
  render () {
    const _this = this;
    return (
      <ul className='list-component'>
        <li><Link to='/'>返回播放页 &gt;</Link></li>
        { _this.musicdata.map((item)=> {
          return <ListItemComponent active={item.id === this.props.currentMusic + 1} {...item} key={item.id} switch={this.props.switch}/>;
        })}
      </ul>
    );
  }
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    switch: (e, id) => {
      return dispatch({type:'MUSIC_TO',payload:{musicId: id - 1}})
    }
  }
}

const List = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent)

export default List;
