import { useState } from "react";
import { useUserContext } from "./useUserContext";

const UseUserApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { users, setUsers, setPrefillUser, setPage } = useUserContext();

  const getAllUsers = async () => {
    setLoading(true);
    setError(null);
    const res = await fetch("https://tasks.vitasoftsolutions.com/userdata");

    if (res.ok) {
      const json = await res.json();
      setUsers(json);
    } else {
      setError("Error fetching Userdata");
    }
    setLoading(false);
  };

  const getUser = async (userId) => {
    setError(null);
    setPrefillUser(null);
    const user = users.find((user) => user.id == userId);
    if (!user) {
      setError("User Not Found");
      return;
    }
    setPrefillUser(user);
  };

  const createUser = async (user) => {
    setError(null);
    setLoading(false);

    try {
      const res = await fetch("https://tasks.vitasoftsolutions.com/userdata", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await res.json();
    } catch {}

    setUsers([user, ...users]);
    setPage("list");
    setLoading(false);
  };

  const editUser = async (user, id) => {
    setError(null);
    setLoading(false);

    try {
      const res = await fetch(
        `https://tasks.vitasoftsolutions.com/userdata/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await res.json();
    } catch {}

    const index = users.findIndex((eachUser) => eachUser.id == id);
    const updated = users;
    updated[index] = user;

    // Update the state with the new array
    setUsers(updated);
    setPage("list");
    setLoading(false);
  };

  return { loading, error, getAllUsers, getUser, createUser, editUser };
};
export default UseUserApi;
