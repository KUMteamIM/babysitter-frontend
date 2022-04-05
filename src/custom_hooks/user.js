import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/**
 * Returns currently logged in user from state.dashboard
 * @returns object
 */
 export const useCurrentUser = () => {
  const [cu, setCU] = useState(0);
  const { currentUser } = useSelector((state) => state);

  useEffect(() => {
    setCU(currentUser);
  }, [currentUser]);

  return cu;
};
