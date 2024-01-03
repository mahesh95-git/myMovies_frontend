import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../reducer/user.reducer";
import "./signIn.Up.css";
import Loader3 from "../loader/loader3";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLogIn, loader, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogIn) {
      navigate("/");
    }
   
  }, [message, navigate, isLogIn]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userInfo = {
      email: email,
      password: password,
    };
    // Dispatch loginUser action
    dispatch(loginUser(userInfo));
   
  };

  return loader?<Loader3/>:(
    <div className="container-1">
      <div className="container-1-1">
        <h2>MYMOVIES</h2>
        <Link to={"/signup"}>
          <button>Sign up</button>
        </Link>
      </div>

      <div className="container-1-3">
        <form action="">
          <h2>Sign In</h2>
          { message?(<p className="alert">
        {message}
          </p>):""}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <Link to="/forgotPassword">Forgot password</Link>
          <button onClick={handleLogin}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
