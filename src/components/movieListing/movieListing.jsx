import MovieCard from "../movieCard/moviecard";
import "./movieListing.css";
import { useDispatch } from "react-redux";
import {
  addmovieToWatchList,
  removeWatchlistContent,
} from "../../reducer/content.reducer";
import { Link } from "react-router-dom";
function MovieListing({ movieSection, movieInfo, id, remove, type }) {
  const dispatch = useDispatch();
  const handleWatchlist = (movieId) => {
    dispatch(addmovieToWatchList({ id: movieId }));
  };
  const handleRemoveWatchlist = (movieId) => {
    dispatch(removeWatchlistContent({ id: movieId }));
  };
  return (
    <div className="container-10">
      <div className="container-10-1">
        <h2>{movieSection}</h2>
        {id ? (
          <Link to={`/viewall/${id}/${type}`}>
            <span>View All </span>
          </Link>
        ) : (
          ""
        )}
      </div>

      <div className="container-10-2">
        {movieInfo.map((value, index) => {
          return (
            <MovieCard
              key={index}
              movie={{ ...value.content, duration: value.duration }}
              handleRemoveWatchlist={handleRemoveWatchlist}
              handleWatchlist={handleWatchlist}
              remove={remove && remove}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MovieListing;
