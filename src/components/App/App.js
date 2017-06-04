import React, { Component } from 'react';
import './App.css';

import Header from '../Header/index.js';
import Body from '../Body/index.js';
import Footer from '../Footer/index.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <Header>
          </Header>
          <Body>
          </Body>
          <Footer>
          </Footer>
        </div>
      </div>
    );
  }
}

export default App;