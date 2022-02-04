import React from 'react';
import './App.css';
import '@lmu-med/styles/dist/lmu.css'
import {CommonNavbar} from '@lmu-med/ci-components';
import {CommonFooter} from '@lmu-med/ci-components';
import {CommonCookieNotice} from '@lmu-med/ci-components';
import ContentContainer from './components/ContentContainer';
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="App">
      <header>
        <CommonNavbar>
          Hello
        </CommonNavbar>
      </header>
      <div className='container'>
        <ContentContainer title='Babysitterbrösel' icon={faQuestion}>
        <p>Welcome</p>
        </ContentContainer>
      </div>
      <CommonFooter />
      <CommonCookieNotice />
    </div>
  );
}

export default App;
