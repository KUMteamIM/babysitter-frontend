import React, { useEffect } from 'react';
import './App.scss';
import '@lmu-med/styles/dist/lmu.css'
import { CommonFooter } from '@lmu-med/ci-components';
import { CommonCookieNotice } from '@lmu-med/ci-components';
import { BrowserRouter as Router } from "react-router-dom";
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { AppContent } from './components/AppContent';
import { AppHeader } from './components/AppHeader';
import { checkForUserInSession } from './api/login';

function App() {
  useEffect(() => {
    checkForUserInSession()
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppHeader />
          <AppContent />
          <CommonFooter />
          <CommonCookieNotice />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
