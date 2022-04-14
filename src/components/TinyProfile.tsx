import React from "react";
import { Link } from "react-router-dom";
import { getDisplayName } from "../shared";
import UserImage from "./UserImage";
import { User } from "../interfaces";

interface PropDefs {
  user: User;
  children?: any;
  logoFirst?: boolean;
}

export const TinyProfile = ({
  user,
  children,
  logoFirst = false,
}: PropDefs) => {
  const path: string = `/users/${user.id}`;
  const logo = (
    <Link to={path}>
      <UserImage src={user.image} type="small" />
    </Link>
  );
  return (
    <React.Fragment>
      {logoFirst && logo}
      <p className="pr-12">
        {children}
        <Link to={path} className="profile-link">
          {getDisplayName(user)}
        </Link>
      </p>
      {!logoFirst && logo}
    </React.Fragment>
  );
};
export default TinyProfile;
