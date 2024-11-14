import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loader3 from "../components/loader/loader3";

const PrivateRoute = ({ ...rest }) => {
  const navigate = useNavigate();
  const { isLogIn, loader } = useSelector((state) => state.user);
  const { isAuthicated } = { ...rest };

  if (!isLogIn && isLogIn !== isAuthicated) {
    navigate("/signin");
  }

  if (loader) {
    return <Loader3 />;
  }
  if (isAuthicated && isLogIn === isAuthicated) {
    return <Outlet/>;
  }

  return null;
};

export default PrivateRoute;
