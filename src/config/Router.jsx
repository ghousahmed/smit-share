import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/Home";
import { ThemeProvider } from "../context/ThemeContext";
import LoginPage from "../pages/Home/Login";
import SignupPage from "../pages/Home/Signup";
import HowItWorks from "../pages/HowItWork/index.jsx";
import { onAuthStateChanged, auth } from "../db/index.js";
import { useEffect, useState } from "react";
import PageNotFound from "../components/PageNotFound.jsx";
import FeedBack from "../pages/feedback/index.jsx";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18nn from "../helper/i18n";
import Feedback from "../pages/feedback/index.jsx";

function AppRouter() {
  const [login, setIslogin] = useState(false);
  const { i18n } = useTranslation();

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
      <div dir={i18n.language === "ur" ? "rtl" : "ltr"}>
        <I18nextProvider i18n={i18nn}>
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
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </I18nextProvider>
      </div>
    </>
  );
}

export default AppRouter;
