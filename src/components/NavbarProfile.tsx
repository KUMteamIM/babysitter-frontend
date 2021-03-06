import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { logOut } from "../api/login";
import { useCurrentUser } from "../custom_hooks/user";
import { User } from "../interfaces";
import { ActionButton } from "./ActionButton";
import TinyProfile from "./TinyProfile";

export const NavbarProfile = () => {
  const currentUser: User|null = useCurrentUser();
  const [t] = useTranslation();

  const triggerLogout = () => logOut();

  return (
    <div className="rowflex navbar-profile">
      {!!currentUser ? (
        <>
          <TinyProfile user={currentUser}>
            <span className="small">
              {t("signed_in_as")}
              <br />
            </span>
          </TinyProfile>
          <ActionButton
            icon={faSignOutAlt}
            className="sel-distinct"
            title="sign_out"
            onClick={triggerLogout}
          />
        </>
      ) : (
        <ActionButton title="sign_in" icon={faSignInAlt} />
      )}
    </div>
  );
};
