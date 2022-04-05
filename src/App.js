import React from 'react';
import './App.scss';
import '@lmu-med/styles/dist/lmu.css'
import { CommonNavbar } from '@lmu-med/ci-components';
import { CommonFooter } from '@lmu-med/ci-components';
import { CommonCookieNotice } from '@lmu-med/ci-components';
import ContentContainer from './components/ContentContainer';
import logo from './assets/logo1.png';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { faBabyCarriage } from '@fortawesome/free-solid-svg-icons';
import { faEdge } from '@fortawesome/free-brands-svg-icons';

function App() {
  return (
    <div className="App">
      <header>
        <CommonNavbar logo={logo}>

        </CommonNavbar>
      </header>
      <Container>

      <Row>
        <ContentContainer title='Babysitterbrösel' icon={faBabyCarriage}>
        <p>Welcome</p>
        </ContentContainer>
        <ContentContainer title='Rechte Spalte' icon={faEdge}>
          Edit
        </ContentContainer>
      </Row>
      </Container>

      <CommonFooter />
      <CommonCookieNotice />
    </div>
  );
}

export default App;
