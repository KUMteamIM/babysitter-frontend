import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import CommonNavbar from "@lmu-med/ci-components/dist/components/CommonNavbar";
import React from "react";
import logo from "../assets/logo1.png";
import { iconByStatus } from "../shared";
import { useCurrentUser } from "./../custom_hooks/user";
import { NavbarLink } from "./NavbarLink";
import { NavbarProfile } from "./NavbarProfile";

export const AppHeader = () => {
  const currentUser = useCurrentUser();

  return (
    currentUser && (
      <header>
        <CommonNavbar logo={logo}>
          <ul className="navbar-links">
            <NavbarLink
              icon={iconByStatus["available"]}
              title="listings"
              path="/jobs"
            />
            <NavbarLink
              icon={iconByStatus["booked"]}
              title="bookings"
              path="/jobs/booked"
            />
            <NavbarLink
              icon={faHandHoldingHeart}
              title="offers"
              path="/offers"
            />
          </ul>
          <NavbarProfile />
        </CommonNavbar>
      </header>
    )
  );
};
