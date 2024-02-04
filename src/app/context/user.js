"use client";
const { createContext, useState } = require("react");

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState("list");
  const [prefillUser, setPrefillUser] = useState(null);

  return (
    <UserContext.Provider
      value={{ users, setUsers, page, setPage, setPrefillUser, prefillUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
