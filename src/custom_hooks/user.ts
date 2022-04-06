import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { User } from "../interfaces";
import { RootState } from "../redux/store";

/**
 * Returns currently logged in user from state.dashboard
 * @returns object
 */
 export const useCurrentUser = ():User | null => {
  const [cu, setCU] = useState<User | null>(null);
  const { currentUser } = useSelector((state: RootState) => state);

  useEffect(() => {
    setCU(currentUser);
  }, [currentUser]);

  return cu;
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
