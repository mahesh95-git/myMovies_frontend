import  { useState } from "react";
import "./forgotePassword.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { forgotPassword, sendEmail } from "../../reducer/user.reducer";
import "./forgotePassword.css";
export function ForgoteP() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(sendEmail({ email: email }));
    }
  };
  return (
    <div className="container-23">
      <div className="container-23-1">
        <h2>MYMOVIES</h2>
        <form action="">
          <label htmlFor="email">Enter existing account email id </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <button onClick={handleEmailSubmit}>Submit</button>
        </form>
        <div className="container-23-1-1">
          <p>Copyright © 2021 My Movies All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const { token } = useParams();
  const dispatch = useDispatch();
  const handleChangePassword = (e) => {
    e.preventDefault();
       dispatch(forgotPassword({token:token,newPassword:newPassword,confirmPassword:confirmPassword}))
  };
  return (
    <div className="container-23">
      <div className="container-23-1">
        <h2>MYMOVIES</h2>
        <form action="">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="text"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="text"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />

          <button onClick={handleChangePassword}>Submit</button>
        </form>
        <div className="container-23-1-1">
          <p>Copyright © 2021 My Movies All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
