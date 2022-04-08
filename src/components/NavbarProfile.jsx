import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useCurrentUser } from "./../custom_hooks/user";
import { ActionButton } from "./ActionButton";
import TinyProfile from "./TinyProfile";

export const NavbarProfile = () => {
  const currentUser = useCurrentUser();

  return (
    <div className="rowflex navbar-profile">
      {!!currentUser ? (
        <>
          <TinyProfile user={currentUser} />
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
