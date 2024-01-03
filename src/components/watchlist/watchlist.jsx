import "./watchlist.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getWatchlist,
} from "../../reducer/content.reducer";
import ViewInY from "../viewInY/viewInY";
import Loader3 from "../loader/loader3";

function Watchlist() {
  const { watchlist } = useSelector((state) => state.content);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWatchlist());
  }, [dispatch]);
  return watchlist.loader ? (
    <Loader3 />
  ) : (
    <ViewInY moviesInfo={{ ...watchlist.data, title: "Watchlist" }} />
  );
}

export default Watchlist;
