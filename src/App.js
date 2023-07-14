import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import axios from "axios";
import { useState, useEffect } from "react";
import Homepage from "./components/Homepage";
import Positions from "./components/Positions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Committe from "./components/Committe";
import BodyWrapper from "./components/BodyWrapper";

function App() {
  const isLoggedIn = useSelector((state) => state.adminReducer.isLoggedIn);
  const [user, setUser] = useState(isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const check = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_APP_URL}/admins/check`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setUser(true);
      setIsLoading(false);
      dispatch({ type: "ADMIN_LOGIN", payload: response.data.user });
    } catch (error) {
      dispatch({ type: "ADMIN_LOGOUT" });
      localStorage.removeItem("token");
      setIsLoading(false);
      setUser(false);
    }
  };

  useEffect(() => {
    check();
  }, [isLoggedIn]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00b2ff]"></div>
      </div>
    );

  return (
    <BrowserRouter>
      {isLoggedIn ? <Navbar /> : null}
      <BodyWrapper>
        <Routes>
          <Route
            path="/login"
            exact
            element={user ? <Homepage /> : <Login />}
          />
          <Route path="/" exact element={user ? <Homepage /> : <Login />} />
          <Route
            path="/committe"
            exact
            element={user ? <Committe /> : <Login />}
          />

          <Route
            path="/position"
            exact
            element={user ? <Positions /> : <Login />}
          />
        </Routes>
      </BodyWrapper>
    </BrowserRouter>
  );
}

export default App;
