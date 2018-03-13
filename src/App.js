import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import HeaderComponent from './components/HeaderComponent';
import Music from './routes/Music';
import Player from './routes/Player';
import List from './routes/List';
import musicinfo from './modules/musicinfo';
import { Provider } from 'react-redux';

class App extends Component {
  render () {
    return (
      <div>
        <HeaderComponent/>
        <Provider store={ musicinfo }>
            <HashRouter>
              <div className='main'>
                <Music />
                <Route path='/' exact component={ Player } />
                <Route path='/list' component={ List } />
              </div>
            </HashRouter>
          </Provider>
      </div>
    );
  }
}

export default App;
