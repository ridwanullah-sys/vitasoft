import Image from "next/image";
import UseUserApi from "../hooks/useUserApi";
import { useUserContext } from "../hooks/useUserContext";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { Pagination } from "./pagination";

export const List = () => {
  const { users, setPage } = useUserContext();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { error, getUser } = UseUserApi();

  const [currentPage, setCurrentPage] = useState(0);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="listPage">
      <button className="button create" onClick={() => setPage("create")}>
        Create
      </button>
      {users.length > 0 ? (
        <div className="listValues">
          {currentItems &&
            currentItems.map((user) => (
              <div key={`${user.id}${user.name}`}>
                <div>
                  <p>Name: </p>
                  {user.name}
                </div>
                <div>
                  {" "}
                  <p>Phone Number: </p>
                  {user.phone_number}
                </div>
                <div>
                  <p>Description: </p>
                  {user.description}
                </div>
                <div>
                  <p>Birthdate: </p>
                  {user.birthdate}
                </div>
                <div>
                  <p>Joining Date: </p>
                  {user.joining_date}
                </div>
                <div>
                  <p>Active Status: </p>
                  {user.active_status ? <p>True</p> : <p>False</p>}
                </div>
                <div className="pp">
                  {user.profile_picture && (
                    <div>
                      <p>Profile Picture: </p>
                      <Image
                        src={user.profile_picture}
                        alt="Profile Image"
                        width={"80"}
                        height={"80"}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <button
                    className="button update"
                    onClick={() => {
                      getUser(user.id);
                      setPage("edit");
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>Loading...</div>
      )}

      <Pagination
        users={users}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};
