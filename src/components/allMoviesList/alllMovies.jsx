import { useEffect } from "react";
import MovieListing from "../movieListing/movieListing";
import Loader from "../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { getALLContentList } from "../../reducer/content.reducer";
function AllMovies({type}) {
  const dispatch = useDispatch();
  const { data, loader } = useSelector((state) => state.content.allMoviesList);
  useEffect(() => {
    dispatch(getALLContentList({type:type?type:""}));
  }, []);

  return loader ? ( 
    <Loader />
  ) : (
    <div>
      {data.map((value, index) => (
        <MovieListing
          movieSection={value.title}
          movieInfo={value.contents}
          id={value._id}
          type={'contents'}
          key={index}
        />
      ))}
    </div>
  );
}

export default AllMovies;
