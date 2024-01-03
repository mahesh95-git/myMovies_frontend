import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
function Footer() {
  const options = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Movies",
      path: "/movies",
    },

    {
      name: "Webseries",
      path: "/webseries",
    },
    {
      name: "Watchlist",
      path: "/watchlist",
    },
    {
      name: "Search",
      path: "/search",
    },
  ];
  return (
    <div className="container-9">
  
      <div className="container-9-2">
        <div className="container-9-2-1">
          <h1>MYMOVIES</h1>
        </div>
        <div className="container-9-2-2">
          <p>Copyright © 2021 My Movies All rights reserved.</p>
       
        </div>
      </div>
      <div className="container-9-3">
            <div className="container-9-3-1">
                Contact
            </div>
        <div className="container-9-3-1">
          <a href="mailto:mahesh956154">mahesh956154@gmail.com</a>
          <br />
            <a href="">instagram</a>
            <br />
            <a href="">Linkedin</a>
         
        </div>
        </div>
    </div>
  );
}

export default Footer;
