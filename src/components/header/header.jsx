import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { useSelector } from "react-redux";

function Header() {
  const { avatar } = useSelector((state) => state.user.user);
  const [change, setChange] = useState("transparent");
  const changeNavbarColor = () => {
    if (window.scrollY >= 630) {
      setChange("");
    } else {
      setChange("transparent");
    }
  };

  window.addEventListener("scroll", changeNavbarColor);
  const [userImage] = useState(
    avatar.length > 0 ? avatar[0].url : "/filelogo.webp"
  );
  return (
    <>
      <div className={`contianer-2 ${change}`}>
        <div className="container-2-1">
          <h2>MYMOVIES</h2>
        </div>
        <div className="container-2-2">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/webseries">Webseries</Link>
          <Link to="/watchlists">Watchlist</Link>
          <Link to="/search">Search</Link>
        </div>
        <div className="container-2-3">
          <div className="container-2-3-1">
            <Link to={"/me"}>
              {" "}
              <img src={userImage} alt="userImage" />
            </Link>
          </div>
        </div>
        <div className="container-2-5">
        <Link to="/search">Search</Link>
        </div>
      </div>
      <div className="container-2-4">
        <div>
          <span>
          <Link to="/"><img src="/home.png" alt="" />
          </Link>
          </span>
          <span>home</span>
        </div>
        <div>
          <span> <Link to="/movies"><img src="/movies.png" alt="" /></Link></span>
          <span>movies</span>
        </div>
        <div>
          <span>
          <Link to="/webseries"><img src="/webseries.png" alt="" /></Link>
          </span>
          <span>Webseries</span>
        </div>

        <div>
          <span> <Link to="/watchlists"> <img src="/watchlist.png" alt="" /></Link></span>
          <span>Watchlist</span>
        </div>

        <div>
        <span>
        <Link to={"/me"}>  <img src={userImage} alt="" /></Link>
          </span>
          <span>Webseries</span>
        </div>
      </div>
    </>
  );
}

export default Header;
