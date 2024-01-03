import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Banner.css";
import Loader1 from "../loader/loader1";
import { useEffect, useState } from "react";
import {
  getContentOverview,
  removeWatchlistContent,
  addmovieToWatchList,
} from "../../reducer/content.reducer";

export default function Banner({ type }) {
  const { data, loader } = useSelector(
    (state) => state.content.contentOverview
  );
  const [isInWatchlist, setInWatchlist] = useState(data.isInWatchlist);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContentOverview({ type: type ? type : null }));
  }, [dispatch,type]);

  const handleWatchlist = () => {
    dispatch(addmovieToWatchList({ id: data._id }));
    setInWatchlist(true);
  };
  const handleRemoveWatchlist = () => {
    dispatch(removeWatchlistContent({ id: data._id }));
    setInWatchlist(false);
  };

  return loader ? (
    <Loader1 />
  ) : (
    <div className="container-4">
      <div className="container-4-1">
        <div className="container-4-1-1">
          <div className="container-4-1-1-title">{data.title}</div>
          <div className="container-4-1-1-description">{data.description.split(" ").slice(0,20).join(" ")}</div>
          <div className="container-4-1-1-button">
            <Link to={`/moviedetail/${data._id}`}>
              <button>More Details</button>
            </Link>
            <div className="container-4-1-1-2">
              {isInWatchlist ? (
                <div className="wb1">
                  <button onClick={handleRemoveWatchlist}>
                    <img src="/check.png" />
                  </button>
                  <span>Added</span>
                </div>
              ) : (
                <div className="wb1">
                  <button onClick={handleWatchlist}>
                    <img src="/add.png" />
                  </button>
                  <span>Watchlist</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container-4-2">
          <div className="container-4-2-1">
            {data.banner && (
              <img src={data.banner.url} alt="" className="banner" />
            )}
          
          </div>
        </div>
      </div>
    </div>
  );
}
