import React from "react";
import { Route, Routes } from "react-router-dom";
import { useCurrentUser } from "./../custom_hooks/user";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import LoginForm from "./LoginForm";
import { Home } from "./Home";
import { JobRequestIndex } from "./job_requests/JobRequestIndex";
import UserView from "./user/UserView";
import JobView from "./jobs/JobView";
// import { JobRequest } from "./job_requests/JobRequestDetails";
import { Bookings } from "./Bookings";
import { JobListings } from "./jobs/JobListings";
import { Offers } from "./Offers";
import { Favorites } from "./Favorites";
import JobListingEditor from "./jobs/JobListingEditor";

export const AppContent = () => {
  const currentUser = useCurrentUser();

  return (
    <Container>
      <Row>
        <Routes>
          {!!currentUser ? (
            <>
              <Route path="/login" element={<LoginForm />}></Route>
              <Route path="/jobs/booked" element={<Bookings />} />
              <Route path="/jobs/new" element={<JobListingEditor />} />
              <Route path="/jobs" element={<JobListings />} />
              <Route path="/jobs/:id" element={<JobView />} />
              {/* <Route path="/requests/:id" element={<JobRequestShow />} /> */}
              <Route path="/requests" element={<JobRequestIndex />} />
              <Route path="/users/:id" element={<UserView />} />
              <Route path="/profile" element={<UserView />} />
              {/* <Route path="/profile/edit" element={<ProfileEditor />} /> */}
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/offers" element={<Offers />} />
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
