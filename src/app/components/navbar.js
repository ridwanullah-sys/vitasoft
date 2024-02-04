import UseUserApi from "../hooks/useUserApi";
import { useUserContext } from "../hooks/useUserContext";

const NavBar = () => {
  const { page, setPage, setPrefillUser } = useUserContext();

  return (
    <div className="navbar">
      {page != "list" && (
        <div>
          <button
            className="button go-back"
            onClick={() => {
              setPrefillUser(null);
              setPage("list");
            }}
          >
            Go Back
          </button>
        </div>
      )}
      <div className="vitasoft">VITASOFT</div>
    </div>
  );
};
export default NavBar;
