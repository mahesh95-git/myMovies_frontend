import { useState } from "react";
import "./me.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, updateUser } from "../../reducer/user.reducer";
import WatchHistoyr from "../watchHistory/watchHistoyr";

function Me() {
  const { firstName, lastName, email, phone, avatar, role } = useSelector(
    (state) => state.user.user
  );
  const { _id } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [user, setUserInfo] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    avatar: avatar,
  });
  const [temp, setTemp] = useState({});
  const handleUpdateInfo = () => {
    const updatedData = new FormData();
    for (const key in temp) {
      updatedData.append(key, temp[key]);
    }
    dispatch(updateUser({ updatedData, userId: _id }));
    setreadOnly(true);
  };

  const [readOnly, setreadOnly] = useState(true);
  return (
    <>
      <div className="container-3">
        <div className="container-3-1">
          <div className="container-3-1-1">
            {readOnly ? (
              <img
                src={
                  user.avatar.length > 0
                    ? user.avatar[0].url
                    : "./filelogo.webp"
                }
                alt=""
              />
            ) : (
              <input
                type="file"
                onChange={(e) => {
                  setUserInfo({ ...user, avatar: e.target.files[0] });
                  setTemp({ ...temp, avatar: e.target.files[0] });
                }}
              />
            )}
          </div>
          <div className="container-3-1-2">
            <input
              type="text"
              value={user.firstName}
              onChange={(e) => {
                setUserInfo({ ...user, firstName: e.target.value });
                setTemp({ ...temp, firstName: e.target.value });
              }}
              readOnly={readOnly}
            />
            {lastName ? (
              <input
                type="text"
                value={user.lastName}
                onChange={(e) => {
                  setUserInfo({ ...user, lastName: e.target.value });
                  setTemp({ ...temp, lastName: e.target.value });
                }}
                readOnly={readOnly}
              />
            ) : !readOnly ? (
              <input
                type="text"
                value={user.lastName}
                placeholder="lastName"
                onChange={(e) => {
                  setUserInfo({ ...user, lastName: e.target.value });
                  setTemp({ ...temp, lastName: e.target.value });
                }}
                readOnly={readOnly}
              />
            ) : (
              ""
            )}
            {role == "admin" ? <Link to={"/admin/dashboard"}>admin</Link> : ""}
          </div>
          <div className="container-3-1-3">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                value={user.email}
                onChange={(e) => {
                  setUserInfo({ ...user, email: e.target.value });
                  setTemp({ ...temp, email: e.target.value });
                }}
                id="email"
                readOnly={readOnly}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone No.</label>
              <input
                type="phone"
                value={user.phone}
                onChange={(e) => {
                  setUserInfo({ ...user, phone: e.target.value });
                  setTemp({ ...temp, phone: e.target.value });
                }}
                id="phone"
                readOnly={readOnly}
              />
            </div>

            {readOnly ? (
              <div className={`action`}>
                <button onClick={() => setreadOnly(false)}>Edit</button>
              </div>
            ) : (
              <div className={`action`}>
                <button onClick={handleUpdateInfo}>submite</button>
              </div>
            )}
            {!readOnly ? (
              <div className={`action`}>
                <button onClick={() => setreadOnly(true)}>Cancel</button>
              </div>
            ) : (
              ""
            )}
            <div className="logout">
              <button onClick={() => dispatch(logoutUser())}>Logout</button>
            </div>
            <div className="change">
              <Link to="/resetpassword">
                <button>Change Password</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="container-3-2">
          <WatchHistoyr />
        </div>
      </div>
    </>
  );
}

export default Me;
