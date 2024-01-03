import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singupUser } from "../../reducer/user.reducer";
import Loader3 from "../loader/loader3";

const Singup = () => {
  const { isLogIn, loader, message } = useSelector((state) => state.user);
  const [file, setFile] = useState("/filelogo.webp");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    LastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [avatar, setAavatar] = useState("");
  const dispatch = useDispatch();
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in userInfo) {
      formData.append(key, userInfo[key]);
    }
    if (avatar) {
      formData.append("avatar", avatar);
    }
    dispatch(singupUser(formData));
  };
  console.log(file);
  return loader ? (
    <Loader3 />
  ) : isLogIn ? (
    navigate("/")
  ) : (
    <div className="container-1">
      <div className="container-1-1">
        <h2>MYMOVIES</h2>
        <Link to={"/signin"}>
          <button>Sign In</button>
        </Link>
      </div>

      <div className="container-1-3">
        <form action="">
          <h2>Sign up</h2>
          {message ? <p className="alert">{message}</p> : ""}
          <input
            type="text"
            value={userInfo.firstName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, firstName: e.target.value })
            }
            placeholder="first name"
          />
          <input
            type="text"
            value={userInfo.LastName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, LastName: e.target.value })
            }
            placeholder="last name"
          />
          <input
            type="email"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
            placeholder="email"
          />
          <input
            type="phone"
            value={userInfo.phone}
            onChange={(e) =>
              setUserInfo({ ...userInfo, phone: e.target.value })
            }
            placeholder="phone"
          />
          <input
            type="password"
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            placeholder="password"
          />
          <div>
            <label htmlFor="file-hand">
              <img src={file} alt="" />
              <span>select avatar</span>
            </label>

            <input
              type="file"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setAavatar(selectedFile);
                if (selectedFile) {
                  const reader = new FileReader();
                  reader.onload = function (event) {
                    setFile(event.target.result); // Set the file state to the image data URL
                  };
                  reader.readAsDataURL(selectedFile);
                } else {
                  setFile("/filelogo.webp"); // Set default file logo if no file is selected
                }
              }}
              placeholder="avater"
              className="file-hand"
            />
          </div>

          <button onClick={handleRegister}>submit</button>
        </form>
      </div>
    </div>
  );
};

export default Singup;
