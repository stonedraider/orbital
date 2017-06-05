import React, { Component } from 'react';
import './App.css';

import Header from '../Header/index.js';
import Body from '../Body/index.js';
import Footer from '../Footer/index.js';

// import themeBlack from "../Body/themes/themeBlack.css";
// import themeWhite from "../Body/themes/themeWhite.css";

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