import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/index.js';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
