import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import authStore from "./store/authStore";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  const { authCheck, user } = authStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
