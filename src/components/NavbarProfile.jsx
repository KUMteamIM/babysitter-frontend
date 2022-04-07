import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getDisplayName } from "../shared";
import { useCurrentUser } from "./../custom_hooks/user";
import { ActionButton } from "./ActionButton";
import UserImage from "./UserImage";

export const NavbarProfile = () => {
  const currentUser = useCurrentUser();
  const [t] = useTranslation();

  return (
    <div className="rowflex navbar-profile">
      {!!currentUser ? (
        <>
          <p className="pr-12">
            <span className="small">
              {t("signed_in_as")}
              <br />
            </span>
            <Link to="/profile" className="profile-link">
              {getDisplayName(currentUser)}
            </Link>
          </p>
          <Link to="/profile">
            <UserImage src={currentUser.image} type="small" />
          </Link>
          <ActionButton
            icon={faSignOutAlt}
            className="sel-distinct"
            title="sign_out"
          />
        </>
      ) : (
        <ActionButton title="sign_in" icon={faSignInAlt} />
      )}
    </div>
  );
};
