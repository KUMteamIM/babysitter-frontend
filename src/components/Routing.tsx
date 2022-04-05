import React from 'react';
import { faEdge } from '@fortawesome/free-brands-svg-icons';
import { faBabyCarriage } from '@fortawesome/free-solid-svg-icons';
import { useCurrentUser } from './../custom_hooks/user';
import { Link } from 'react-router-dom';
import ContentContainer from './ContentContainer';
import LoginForm from './LoginForm';

export const Routing = () => {
  const currentUser = useCurrentUser()

  return (
    <React.Fragment>
      {!currentUser ? (
        <LoginForm/>
      ) : (
        <ContentContainer title='Babysitterbrösel' icon={faBabyCarriage} link={<Link to="/bookings">I am a link</Link>}>
          <p>Welcome</p>
        </ContentContainer>
      )}
    </React.Fragment>
  )
}