import React from "react";
import { CommonNavbar } from "@lmu-med/ci-components";
import logo from "../assets/logo1.png";
import { useCurrentUser } from "./../custom_hooks/user";

export const AppHeader = () => {
  const currentUser = useCurrentUser();

  return currentUser ? (
    <header>
      <CommonNavbar logo={logo}></CommonNavbar>
    </header>
  ) : null;
};
