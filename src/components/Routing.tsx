import React from 'react';
import { faBabyCarriage } from '@fortawesome/free-solid-svg-icons';
import { useCurrentUser } from './../custom_hooks/user';
import { Link, Routes, Route } from 'react-router-dom';
import ContentContainer from './ContentContainer';
import LoginForm from './LoginForm';
import { JobIndex } from './jobs/JobIndex';
import { Home } from './Home';

export const Routing = () => {
  const currentUser = useCurrentUser()

  return (
    <React.Fragment>
      {!currentUser ? (
        <LoginForm/>
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/jobs' element={<JobIndex />} />
          <Route path='/jobs/:id' element={<JobIndex />} />
          <Route path='/jobs/:id' element={<JobIndex />} />
        </Routes>
      )}
    </React.Fragment>
  )
}