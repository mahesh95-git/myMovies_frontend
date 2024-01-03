import React from "react";
import "./viewInY.css";
import Moviecard from "../movieCard/moviecard";
import { useDispatch } from "react-redux";
import {
  addmovieToWatchList,
  getWatchlist,
  removeWatchlistContent,
} from "../../reducer/content.reducer";
function ViewInY({ moviesInfo,remove,type }) {
  const dispatch = useDispatch();
  const handleWatchlist = (movieId) => {
    dispatch(addmovieToWatchList({ id: movieId }));
  };
  const handleRemoveWatchlist = async(movieId) => {
   await dispatch(removeWatchlistContent({ id: movieId }));
    dispatch(getWatchlist())
  };
  return (
    <div className="container-19">
      <div className="container-19-1">
        <h2>{moviesInfo.title}</h2>
      </div>

      <div className="container-19-2">
      {moviesInfo.contents.map((value, index) => (
          type==='watchhistory'?<Moviecard
            handleWatchlist={handleWatchlist}
            handleRemoveWatchlist={handleRemoveWatchlist}
            movie={value.content}
            key={index}
            remove={remove}

          />:<Moviecard
          handleWatchlist={handleWatchlist}
          handleRemoveWatchlist={handleRemoveWatchlist}
          movie={value.content}
          key={index}

        />
        ))}
      </div>
    </div>
  );
}

export default ViewInY;
