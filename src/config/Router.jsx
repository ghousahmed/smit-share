import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import { ThemeProvider } from "../context/ThemeContext";
import LoginPage from "../pages/Home/Login";
import SignupPage from "../pages/Home/Signup";
import HowItWorks from "../pages/How It Work";

function AppRouter() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default AppRouter;
