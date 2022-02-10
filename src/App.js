import { useState, useRef, useCallback } from "react";
import { Loader, Typeahead } from "./components";
import { useDebounce, callBackTool } from "./store";

function App() {
  // search state stores the word we search with
  const [search, setSearch] = useState("");
  // users state stores all the users we fount for the search word
  const [users, setUsers] = useState([]);
  // pagenumber is used to load more users
  const [pageNumber, setPageNumber] = useState(1);
  // totalUsers state stores the total number of the users found
  const [totalUsers, setTotalUsers] = useState(0);

  const [loading, setLoading] = useState("none");

  // useDebounce fetches data
  useDebounce(search, setUsers, setLoading, pageNumber, setTotalUsers);

  const observer = useRef();
  const lastUserRef = useCallback(
    (node) => {
      callBackTool(node, loading, observer, setPageNumber, users, totalUsers);
    },
    [loading, users, totalUsers]
  );

  return (
    <div className="main-container">
      <div className="github">
        <i className="fab fa-github-alt"></i>
        <p>Github User Search</p>
      </div>
      <input
        type="text"
        placeholder="Type to search"
        value={search}
        onChange={(e) => {
          setUsers([]);
          setPageNumber(1);
          setSearch(e.target.value);
          setLoading("true");
        }}
      />
      {loading !== "none" && (
        <p className="users-count">found {totalUsers} users</p>
      )}

      {users.length > 0 ? (
        <Typeahead lastUserRef={lastUserRef} users={users} />
      ) : null}
      {loading === "true" && <Loader />}
    </div>
  );
}

export default App;
