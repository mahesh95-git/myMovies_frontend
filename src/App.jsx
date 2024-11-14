import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUserDetail } from "./reducer/user.reducer";
import { useEffect } from "react";
import Layout from "./components/layout";
import Home from "./pages/home";
import SignIn from "./components/auth/signIn";
import Singup from "./components/auth/singup";
import PrivateRoute from "./util.js/protected";
import AdminProtected from "./util.js/adminProtected";
import {
  AddNewContent,
  AdminPanel,
  GetAllUser,
  UpdateUserProfile,
  Header,
  UpdateConent,
  Search,
  VideoPlayer,
  ChangePassword,
} from "./components";
import '/app.css'
import Watchlists from "./pages/watchlist";
import MovieDetails_page from "./pages/movieDetails.page";
import Webseries from "./pages/webseries";
import Movies from "./pages/movies";
import User from "./pages/UserDetail";
import ViewAll from "./components/viewAll/viewAll";
import ForgotePassword from "./pages/forgotePassword";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./components/changePassword/changePassword";
import { PaymentForm } from "./components/payment";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(loadUserDetail());
    })();
  });

  return (
    <div className="main">
      <BrowserRouter>
        <Routes>
         
            <Route path="signup" element={<Singup />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="payment" element={<PaymentForm/>}/>
            <Route path="/forgotPassword" element={<ForgotePassword />} />
            <Route path="/forgotpassword/:token" element={<ChangePassword />} />
            <Route element={<PrivateRoute isAuthicated={true} />}>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/moviedetail/:id" element={<MovieDetails_page />} />
              <Route path="/webseries" element={<Webseries />} />
              <Route path="/me" element={<User />} />
              <Route path="/search" element={<Search />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/watchlists" element={<Watchlists />} />
              <Route
                path="/video/:id/:folder/:name/:contentname/:videoId"
                element={<VideoPlayer />}
              />
              <Route path="/viewAll/:id/:type" element={<ViewAll />} />
              <Route path="/admin" element={<AdminProtected />}>
                <Route path="dashboard" element={<AdminPanel />}>
                  <Route
                    path="addnewconent"
                    element={
                      <AddNewContent>
                        <Header />
                      </AddNewContent>
                    }
                  />
                  <Route path="alluser" element={<GetAllUser />} />
                  <Route
                    path="edituserprofile"
                    element={<UpdateUserProfile />}
                  />
                  <Route path="updatecontent" element={<UpdateConent />} />
                </Route>
              </Route>
            </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "linear-gradient(to right, #0f1014b3,#020648)",
              color: "white",
              fontSize: "15px",
              fontfamily: "myfont",

              padding: "10px 20px",
              height: "20px",
            },
          },
          error: {
            style: {
              background: "linear-gradient(to right, #0f1014b3,red)",
              color: "white",
              fontSize: "15px",
              fontfamily: "myfont",

              padding: "10px 20px",
              height: "20px",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
