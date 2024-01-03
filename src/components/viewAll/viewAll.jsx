import React, { useEffect } from "react";
import ViewInY from "../viewInY/viewInY";
import { useParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader3 from "../loader/loader3";
import { deleteFromWatchHistory, getViewAll } from "../../reducer/content.reducer";

function ViewAll() {
  const { id, type } = useParams();
  const dispatch = useDispatch();
  const { data, loader } = useSelector((state) => state.content.viewAll);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getViewAll({ id, type }));
    };
    fetchData();
  }, [dispatch, id, type]);

  const removeFromWatchHistory = async (itemId) => {
    await dispatch(deleteFromWatchHistory({ id: itemId }));
    await dispatch(getViewAll({ id, type }));
  };
  return loader ? <Loader3 /> : (
    <div>
      <ViewInY
        moviesInfo={
          data?.title ? data : { ...data, title: 'Watch History' }
        }
        remove={removeFromWatchHistory}
        type={type}
      />
    </div>
  );
}

export default ViewAll;
