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
      <CommonFooter />
      <CommonCookieNotice />
    </div>
  );
}

export default App;
