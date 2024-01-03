import { useEffect } from "react";
import "./episodeListing.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loader/loader";
import { getEpisodes } from "../../reducer/content.reducer";
function EpisodeListing({ id }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEpisodes({ id: id }));
  }, [dispatch, id]);
  const { data, loader } = useSelector((state) => state.content.episodes);
  return loader ? (
    <Loader />
  ) : (
    <div className="container-15">
      <div className="container-15-1">
        <h2>Episodes</h2>
      </div>
      <div className="container-15-4">
        {data?.length
          ? data.map((value, index) => (
              <div className="container-15-2" key={index}>
                <div className="container-15-2-1">
                  <img src={value.poster[0].url} alt="" />
                  <button>
                    <img src="/play.png" alt="" />
                  </button>
                </div>
                <div className="container-15-2-2">
                  <div className="container-title">{value.title}</div>
                  <div className="container-container-details">
                    <span className="episodeNo">s1 {value.episodeNumber}</span>
                    <span className="date">
                      {(() => {
                        const d = new Date(value.releaseDate);
                        let month = d.getMonth() + 1;
                        let day = d.getDay();
                        let year = d.getFullYear();

                        return [month, day, year].map((value) => (
                          <span key={value}>{value}</span>
                        ));
                      })()}
                    </span>
                    <span className="duration">{value.duration}m</span>
                  </div>
                  <div className="container-description">
                    {value.description}
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default EpisodeListing;
