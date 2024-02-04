import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/Home";
import { ThemeProvider } from "../context/ThemeContext";
import LoginPage from "../pages/Home/Login";
import SignupPage from "../pages/Home/Signup";
import HowItWorks from "../pages/How It Work";
import { onAuthStateChanged, auth } from "../db/index.js";
import { useEffect, useState } from "react";
import PageNotFound from "../components/PageNotFound.jsx";
function AppRouter() {
  const [login, setIslogin] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user, uid);
        uid && setIslogin(true);
      } else {
        console.log("Not logged in");
        setIslogin(false);
      }
    });
  }, []);
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage login={login} />} />
            <Route
              path="/login"
              element={
                login ? (
                  <Navigate to="/" />
                ) : (
                  <LoginPage login={login} setIslogin={setIslogin} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                login ? <Navigate to="/" /> : <SignupPage login={login} />
              }
            />
            <Route
              path="/how-it-works"
              element={<HowItWorks login={login} />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default AppRouter;
