import { useState, useEffect } from "react";
import "./loader.css";

function Loader() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [arraySize, setArraySize] = useState(6);

  useEffect(() => {
    if (windowWidth <= 600) {
      setArraySize(3);
    }
  }, [windowWidth]);

  const temp = new Array(arraySize).fill(null);
  return (
    <div className="container-12">
      {temp.map((item, index) => (
        <div className="container-12-1" key={index}></div>
      ))}
    </div>
  );
}

export default Loader;
