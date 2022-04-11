import React from "react";
import CommonNavbar from "@lmu-med/ci-components/dist/components/CommonNavbar";
import logo from "../assets/logo1.png";
import { useCurrentUser } from "./../custom_hooks/user";
import { NavbarProfile } from "./NavbarProfile";
import { NavbarLink } from "./NavbarLink";
import {
  faChild,
  faClipboardCheck,
  faClipboardQuestion,
  faHandHoldingHeart,
  faMagnifyingGlass,
  faPaste,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

export const AppHeader = () => {
  const currentUser = useCurrentUser();

  return currentUser ? (
    <header>
      <CommonNavbar logo={logo}>
        <ul className="navbar-links">
          <NavbarLink
            icon={faMagnifyingGlass}
            title="listings"
            path="/listings"
          />
          <NavbarLink
            icon={faClipboardQuestion}
            title="requests"
            path="/requests"
          />
          <NavbarLink
            icon={faClipboardCheck}
            title="bookings"
            path="/bookings"
          />
          <NavbarLink icon={faHandHoldingHeart} title="offers" path="/offers" />
          <NavbarLink icon={faStar} title="favorites" path="/favorites" />
        </ul>
        <NavbarProfile />
      </CommonNavbar>
    </header>
  ) : null;
};
