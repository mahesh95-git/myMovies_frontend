import React from "react";
import "./loader.css";
function Loader3() {
    console.log("hello")
  return (
    <div className="loader-container">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader3;
