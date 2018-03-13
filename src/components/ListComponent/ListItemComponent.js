import React from 'react';
class ListItemComponent extends React.Component {
  render () {
    return (
      <li className={`item ${this.props.active?'focus':''}`} onClick={(e,id)=>{this.props.switch(e, this.props.id)}}>{this.props.id} . {this.props.title} - {this.props.artist}</li>
    );
  }
};
export default ListItemComponent;
