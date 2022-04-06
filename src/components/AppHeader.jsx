import React from "react";
import { CommonNavbar } from "@lmu-med/ci-components";
import logo from "../assets/logo1.png";
import { useCurrentUser } from "./../custom_hooks/user";
import { NavbarProfile } from "./NavbarProfile";
import { NavbarLink } from "./NavbarLink";
import {
  faChild,
  faClipboardCheck,
  faHouseUser,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

export const AppHeader = () => {
  const currentUser = useCurrentUser();

  return currentUser ? (
    <header>
      <CommonNavbar logo={logo}>
        <ul className="navbar-links">
          <NavbarLink icon={faHouseUser} title="home" path="/" />
          <NavbarLink
            icon={faClipboardCheck}
            title="bookings"
            path="/bookings"
          />
          <NavbarLink icon={faChild} title="listings" path="/listings" />
          <NavbarLink icon={faStar} title="favorites" path="/favorites" />
        </ul>
        <NavbarProfile />
      </CommonNavbar>
    </header>
  ) : null;
};
