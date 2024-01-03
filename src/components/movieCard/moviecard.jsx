import { useState,useEffect } from "react";
import "./moviecard.css";
import { Link } from "react-router-dom";
function Moviecard({ movie, handleRemoveWatchlist, handleWatchlist ,remove}) {

  const[isInWatchlist,setInWatchlist]=useState(movie.isInWatchlist|| false)
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="poster">
       <Link to={`/moviedetail/${movie._id}`}>
        <div className="imageLoader" style={{display:!loaded?'block':'none'}}></div>
      <img src={movie.poster.url} onLoad={()=>(setLoaded(true))}  loading="lazy"  style={{ display: loaded ? 'block' : 'none' }}/>
      </Link>
      {remove?<>
        <div className="delete-container">
        <button onClick={()=>remove(movie._id)}><img src="/close.png" alt="" /> </button>
      </div>
      <div className="duration-container" style={{width:movie.duration && movie.duration+'%',display:!movie.duration?'none':'block'}}>
    
      </div>
      </>:<div></div>}
      
     {!remove?<div className="temp">
        <div className="details">
          <h2 className="title">{movie.title}</h2>
          <div className="cta">
            <Link to={`/moviedetail/${movie._id}`}>
              <button className="watch-button">Watch Now</button>
            </Link>
            {isInWatchlist ? (
              <div className="wb">
                    <button
                className="watchlist-button"
                onClick={() => {
                  setInWatchlist(!isInWatchlist)
                   handleRemoveWatchlist && handleRemoveWatchlist(movie._id);
                }}
              >
                <img src="/check.png" />
              </button>
            <span>Added</span>
              </div>
        
            ) : (
              <div className="wb">
              <button
                className="watchlist-button"
                onClick={() => {
                  setInWatchlist(!isInWatchlist)
                 handleWatchlist && handleWatchlist(movie._id);
                }}
              >
                <img src="/add.png" />
              </button>
              <span>Watchlist</span>
              </div>
            )}
          </div>
          <p className="description">{movie.description}</p>
          <div className="tags">
            {movie.genres.map((genre, index) => (
              <span className="tag" key={index}>
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>:<div></div>}
    </div>
  );
}

export default Moviecard;
