import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import LoginPage from "./component/pages/LoginPage";
import SignUpPage from "./component/pages/SignUpPage";
import UserProfile from "./component/Authantication/UserProfile";
import ForgotPassword from "./component/Authantication/ForgotPassword";

import ExpensePage from "./component/pages/ExpensePage";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./component/Store/Authreducer";

function App() {
  const auth = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      dispatch(authActions.login({ token: storedToken, userId: storedUserId }));
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
