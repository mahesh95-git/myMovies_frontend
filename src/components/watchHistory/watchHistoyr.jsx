import { useEffect } from "react";
import "./watchHistory.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromWatchHistory, getAllWatchHistory } from "../../reducer/content.reducer";
import MovieListing from "../movieListing/movieListing";
import Loader from "../loader/loader";
function WatchHistory() {
  const dispatch = useDispatch();
  const { data, loader,userId } = useSelector((state) => state.content.watchHistory);
 
  useEffect(() => {
    dispatch(getAllWatchHistory());
  }, [dispatch]);
  
  const removeWatchHistory =async (id) => {
   await dispatch(deleteFromWatchHistory({id:id}))
    dispatch(getAllWatchHistory());
  };
  return (
    <div className="container-21">
      {loader ? (
        <Loader />
      ) : (
        <div className="container-21-1">
          {data.length?<MovieListing movieInfo={data} movieSection={'WatchHistory'} remove={removeWatchHistory} id={userId} type={'watchhistory'} />:<div></div>}
        </div>
      )}
    </div>
  );
}

export default WatchHistory;
