import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "./movieDetail.css";
import {
  addmovieToWatchList,
  getMovieDetail,
  getRecommendedContent,
  removeWatchlistContent,
} from "../../reducer/content.reducer";
import Loader1 from "../loader/loader1";
import Loader from "../loader/loader";
import MovieListing from "../movieListing/movieListing";
import EpisodeListing from "../episodeListing/episodeListing";

function MovieDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [auto, setAuto] = useState(false);
  const [trailer, setTrailer] = useState(false);
  const [mute, setMute] = useState(true);
  const [changeVideo, setChangeVideo] = useState(false);
  const [changeButton, setChangebutton] = useState(false);
  const [percentageWatched, setPercentageWatched] = useState(0);
  const videoRef = useRef(null);
  const { movieDetail, recommendedMovies } = useSelector(
    (state) => state.content
  );
  const [videourl, setvideourl] = useState("");
  const [isInWatchlist, setInWatchlist] = useState(
    movieDetail.data.isInWatchlist
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getRecommendedContent({ id: id }));
      dispatch(getMovieDetail({ id: id }));
    };
    window.scroll(0, 1);
    const timeout = setTimeout(() => {
      setAuto(true);
      setTrailer(true);
    }, 3000);

    if (window.innerWidth <= 600) {
      setChangebutton(true);
    }
    setChangeVideo(false);
    fetchData();
    return () => {
      clearTimeout(timeout);
      setAuto(false);
      setTrailer(false);
      setMute(true);
    };
  }, [id, dispatch]);

  const handleWatchlist = () => {
    dispatch(addmovieToWatchList({ id: movieDetail.data._id }));
    setInWatchlist(true);
  };
  const handleRemoveWatchlist = () => {
    dispatch(removeWatchlistContent({ id: movieDetail.data._id }));
    setInWatchlist(false);
  };

  const handlevideo = (type) => {
    setChangeVideo(true);
    if (type == "trailer") {
      setvideourl(movieDetail.data.trailer.url);
    }
    if (type == "fullMovie") {
      setvideourl(movieDetail.data.fullMovie.url);
    }
  };
  const handleMute = () => {
    setMute(!mute);
  };

  return (
    <div className="container-11">
      {movieDetail.loader ? (
        <Loader1 />
      ) : (
        <>
          <div>
            <div className="container-11-1">
              {!changeVideo ? (
                <div>
                  {trailer
                    ? movieDetail.data.trailer && (
                        <video
                          autoPlay={auto}
                          loop={true}
                          muted={mute}
                          src={movieDetail.data.trailer.url}
                        ></video>
                      )
                    : movieDetail.data.banner && (
                        <img src={movieDetail.data.banner.url} alt="" />
                      )}
                  <div className="container-11-1-1"></div>
                </div>
              ) : (
                <div>
                  <video
                    controls
                    src={videourl}
                    autoPlay
                    className="player"
                    ref={videoRef}
                    onTimeUpdate={() => {
                      setPercentageWatched(
                        (videoRef.current.currentTime /
                          videoRef.current.duration) *
                          100
                      );
                    }}
                  ></video>
                </div>
              )}
            </div>
            <span
              onClick={handleMute}
              className="container-11-1-2"
              style={{ display: changeVideo ? "none" : "block" }}
            >
              <img src={mute ? "/mute.png" : "/unmute.png"} alt="" />
            </span>
            <div className="container-11-2-7">
              <div className="container-11-2">
                <div className="container-11-2-1">
                  <h1>{movieDetail.data.title}</h1>
                </div>
                <div className="container-11-2-6">
                  <span>{movieDetail.data.year}</span>
                  <span>{movieDetail.data.duration}</span>
                  <span>{movieDetail.data.languages.length} Languages</span>
                </div>
                <div className="container-11-2-2">
                  {movieDetail.data.description}
                </div>
                <div className="cotainer-11-2-4">
                  {movieDetail.data.genres.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="container-11-2-5">
                  {movieDetail.data.languages.map((value) => {
                    return <span key={value}>{value}</span>;
                  })}
                </div>
                <div className="container-11-2-3">
                  {!changeButton ? (
                    <Link
                      to={(() => {
                        const url = movieDetail.data.trailer.url.split("d/");
                        console.url;
                        return `/video/${url[1]}/${movieDetail.data.title}/${movieDetail.data._id}`;
                      })()}
                    >
                      <button className="container-11-2-3-1">Watch Now</button>
                    </Link>
                  ) : (
                    <button
                      className="container-11-2-3-1"
                      onClick={() => {
                        handlevideo("fullMovie");
                      }}
                    >
                      Watch Now
                    </button>
                  )}
                  <div className="container-11-2-3-2">
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
            </div>
          </div>
          {movieDetail.data.type == "Webserie" ? (
            <EpisodeListing id={id} />
          ) : (
            <div></div>
          )}{" "}
        </>
      )}

      {recommendedMovies.loader ? (
        <Loader />
      ) : (
        <div className="container-11-4">
          <MovieListing
            movieSection={"Recommended"}
            movieInfo={recommendedMovies.data.movies}
            id={null}
          />
        </div>
      )}

      <div className="container-11-5">
        <div className="container-11-5-2">
          <span>{movieDetail.data.title} - Trailer</span>
        </div>
        {movieDetail.loader ? (
          <Loader />
        ) : (
          <div className="container-11-5-1">
            {!changeButton ? (
              <Link
                to={(() => {
                  const url = movieDetail.data
                    ? movieDetail.data.fullMovie.url.split("d/")
                    : "";
                  console.url;
                  return `/video/${url[1]}/${movieDetail.data.title}`;
                })()}
              >
                <img src={movieDetail.data.poster.url} alt="" />
              </Link>
            ) : (
              <img
                src={movieDetail.data.poster.url}
                alt=""
                onClick={() => {
                  handlevideo("trailer");
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
