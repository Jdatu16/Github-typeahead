import { useEffect } from "react";
export const useDebounce = (
  search,
  setUsers,
  setLoading,
  pageNumber,
  setTotalUsers
) => {
  useEffect(() => {
    if (search === "") {
      setLoading("none");
      return setUsers([]);
    }
    // setTimeout is used to give user time (1 second) to keep typing before fetching data
    // once user stops typing, fetching process will start
    let timer = setTimeout(() => {
      setLoading("true");
      fetch(
        `https://api.github.com/search/users?per_page=20&page=${pageNumber}&q=${search}`
      )
        .then((response) => response.json())
        .then((data) => {
          setTotalUsers(data.total_count);
          // if there is no more data to fetch it returns null
          if (!data.items) return null;
          setUsers((prev) => {
            return [...prev, ...data.items];
          });
          setLoading("false");
        })
        .catch((err) => console.log(err));
    }, 1000);
    return () => clearTimeout(timer);
  }, [search, pageNumber, setLoading, setUsers, setTotalUsers]);
};
