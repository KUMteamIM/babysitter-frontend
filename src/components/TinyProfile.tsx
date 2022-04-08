import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getDisplayName } from "../shared";
import UserImage from "./UserImage";
import { User } from "../interfaces";

interface PropDefs {
  user: User
}

export const TinyProfile = ({user}:PropDefs) => {
  const [t] = useTranslation();

  return (
    <React.Fragment>
      <p className="pr-12">
        <span className="small">
          {t("signed_in_as")}
          <br />
        </span>
        <Link to="/profile" className="profile-link">
          {getDisplayName(user)}
        </Link>
      </p>
      <Link to={`/profile/${user.id}`}>
        <UserImage src={user.image} type="small" />
      </Link>
    </React.Fragment>

  )
}
export default TinyProfile;
