import React from "react";
import { Route, Routes } from "react-router-dom";
import { useCurrentUser } from "./../custom_hooks/user";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import LoginForm from "./LoginForm";
import { JobIndex } from "./jobs/JobIndex";
import { Home } from "./Home";
import { JobRequestIndex } from "./jobs/JobRequestIndex";

export const AppContent = () => {
  const currentUser = useCurrentUser();

  return (
    <Container>
      <Row>
        <Routes>
          {!!currentUser ? (
            <>
              <Route path="/login" element={<LoginForm />}></Route>
              <Route path="/jobs/booked" element={<JobIndex status="booked" />} />
              <Route path="/jobs/available" element={<JobIndex status="available" />} />
              <Route path="/jobs/:id" element={<JobIndex />} />
              <Route path="/job_requests" element={<JobRequestIndex />} />
              <Route path="/" element={<Home />} />
            </>
          ) : (
            <Route path="/" element={<LoginForm />} />
          )}
        </Routes>
      </Row>
    </Container>
  );
};
