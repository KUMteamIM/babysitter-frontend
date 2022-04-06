import React from 'react';
import { Route, Routes } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LoginForm from './LoginForm';
import { Routing } from './Routing';

export const AppContent = () => {
  return (
    <Container>
      <Row>
        <Routes>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/" element={<Routing />}></Route>
        </Routes>
      </Row>
    </Container>
  )
}
