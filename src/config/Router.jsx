import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import { ThemeProvider } from "../context/ThemeContext";
import LoginPage from "../pages/Home/Login";
import SignupPage from "../pages/Home/Signup";
import PageNotExist from "../pages/PageNotExist";

function AppRouter() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {/* <Route path="/howitwork" element={< />} />
                    <Route path="/feedback" element={< />} /> */}

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="*" element={<PageNotExist />} />

                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default AppRouter;
