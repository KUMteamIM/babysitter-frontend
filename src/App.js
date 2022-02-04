import React from 'react';
import './App.css';
import '@lmu-med/styles/dist/lmu.css'
import {CommonNavbar} from '@lmu-med/ci-components';
import {CommonFooter} from '@lmu-med/ci-components';
import {CommonCookieNotice} from '@lmu-med/ci-components';

function App() {
  return (
    <div className="App">
      <header>
        <CommonNavbar>
          Hello
        </CommonNavbar>
      </header>
      <div className='container'>
          <h1>Babysitterbrösel</h1>
          <p>Welcome</p>
      </div>
      <CommonFooter />
      <CommonCookieNotice />
    </div>
  );
}

export default App;
