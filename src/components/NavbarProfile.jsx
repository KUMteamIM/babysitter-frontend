import {
  faDoorOpen,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { getDisplayName } from "../shared";
import { useCurrentUser } from "./../custom_hooks/user";
import { ActionButton } from "./ActionButton";

export const NavbarProfile = () => {
  const currentUser = useCurrentUser();
  const [t] = useTranslation();

  return (
    <div className="rowflex navbar-profile">
      {!!currentUser ? (
        <>
          <p>
            <span className="small">
              {t("signed_in_as")}
              <br />
            </span>
            {getDisplayName(currentUser)}
          </p>
          <ActionButton
            icon={faSignOutAlt}
            className="button-md sel-distinct"
            title="sign_out"
          />
        </>
      ) : (
        <ActionButton title="sign_in" icon={faSignInAlt} />
      )}
    </div>
  );
};
