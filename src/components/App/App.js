import React, { Component } from 'react';
import './App.css';

import Header from '../Header/index.js';
import Body from '../Body/index.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header>
        </Header>
        <Body>
        </Body>
      </div>
    );
  }
}

export default App;