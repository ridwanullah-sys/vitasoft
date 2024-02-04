import { useContext } from "react";
import { UserContext } from "../context/user";

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("userContext must be used within a UserContextProvider");
  }

  return context;
};
