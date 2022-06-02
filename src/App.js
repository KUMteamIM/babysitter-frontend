import React, { useEffect } from 'react';
import '@lmu-med/styles/dist/lmu.css'
import './App.scss';
import CommonFooter from '@lmu-med/ci-components/dist/components/CommonFooter';
import CommonCookieNotice from '@lmu-med/ci-components/dist/components/CommonCookieNotice';
import { BrowserRouter as Router } from "react-router-dom";
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { AppContent } from './components/AppContent';
import { AppHeader } from './components/AppHeader';
import { checkForUserInSession } from './api/login';
import './i18n'

function App() {
  useEffect(() => {
    checkForUserInSession()
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <AppHeader />
        <AppContent />
        <CommonFooter />
        {/* <CommonCookieNotice /> */}
      </Router>
    </Provider>
  );
}

export default App;
