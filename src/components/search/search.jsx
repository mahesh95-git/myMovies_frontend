import { useState, useEffect } from "react";
import ViewInY from "../viewInY/viewInY";
import "./search.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchResult,
} from "../../reducer/content.reducer";
import Loader from "../loader/loader";

function Search() {
  const dispatch = useDispatch();
  const { data, loader } = useSelector((state) => state.content.searchResult);
  useEffect(() => {
    const temp = localStorage.getItem("query");
    if (temp) {
      setQuery(temp);
      dispatch(getSearchResult({ query: temp }));
    }
  }, [dispatch]);
  const [query, setQuery] = useState("");
  const handleSearchQuery = () => {
    localStorage.setItem("query", query);
    dispatch(getSearchResult({ query: query }));
  };
  return (
    <div className="container-20">
      <div className="container-20-1">
        <input
          type="text"
          placeholder="Search movies and webseries"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button onClick={handleSearchQuery}>Search</button>
      </div>
      <div className="container-20-2">
        {loader ? (
          <Loader />
        ) : (
          !data.contents?.length?<div className="container-20-2-1">
          <h2>Not Found</h2>
        </div>:<ViewInY moviesInfo={{ ...data, title: "Search" }} />
        )}
      </div>
    </div>
  );
}

export default Search;
