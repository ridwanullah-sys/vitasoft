"use client";
import styles from "./page.module.css";
import { useUserContext } from "./hooks/useUserContext";
import { List } from "./components/list";
import Create from "./components/create";
import Edit from "./components/edit";
import { useEffect } from "react";
import UseUserApi from "./hooks/useUserApi";
import NavBar from "./components/navbar";

export default function Home() {
  const { page, setPage } = useUserContext();
  const { getAllUsers } = UseUserApi();

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="list">
      <NavBar />
      {page == "edit" ? <Edit /> : page == "create" ? <Create /> : <List />}
    </div>
  );
}
