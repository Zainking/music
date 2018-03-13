import React from 'react';
import FontAwesome from 'react-fontawesome';

import 'font-awesome/css/font-awesome.css';
import './HeaderComponent.styl'
const HeaderComponent = () => {
  return (
    <header className='header-component'>
      <FontAwesome name='music' size='lg' /> Zain's Music
    </header>
  );
};

export default HeaderComponent;
